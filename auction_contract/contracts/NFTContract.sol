// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTAuction is ERC721URIStorage, ReentrancyGuard {
    uint256 public tokenCounter;
    uint256 public listingCounter;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; 

    uint8 public constant STATUS_OPEN = 1;
    uint8 public constant STATUS_DONE = 2;
    uint256 startingPrice = 0.01 ether;

    uint256 public minAuctionIncrement = 10; // 10 percent
    address payable owner;
    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price; // display price
        uint256 netPrice; // actual price
        uint256 startAt;
        uint256 endAt; 
        uint256 revealEndtime;
        uint8 status;
    }

    event Minted(address indexed minter, uint256 nftID, string uri);
    event AuctionCreated(uint256 listingId, address indexed seller, uint256 price, uint256 tokenId, uint256 startAt, uint256 endAt);
    event BidCreated(uint256 listingId, address indexed bidder, uint256 bid);
    event AuctionCompleted(uint256 listingId, address indexed seller, address indexed bidder, uint256 bid);
    event WithdrawBid(uint256 listingId, address indexed bidder, uint256 bid);

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => mapping(address => uint256)) public bids;
    mapping(uint256 => address) public highestBidder;
    mapping(uint256 => uint256) public highestBid;
    mapping(address => uint256[]) public tokenaddress;

    uint private bidCount = 0;
    uint private revealedCount = 0;

    constructor() ERC721("piggyNFT", "PNFT") {
        tokenCounter = 0;
        listingCounter = 0;
        owner = payable(msg.sender);
    }
    struct Bid {
        bytes32 sealedBid;
        uint depositAmt;
        bool exists;
    }

    mapping (uint256 => mapping(address => Bid[])) public bidMap;
    // EVENTS 
    event AuctionEnded(address winner, uint highestBid);

    function getListPrice() public view returns (uint256) { return startingPrice; }
   
    function tokenlength(address add) public view returns (uint256) { uint v = tokenaddress[add].length;  return v; }

    function mintNftAuction(string memory tokenURI) public returns (uint256) {
        tokenCounter++;
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        emit Minted(msg.sender, newTokenId, tokenURI);
        tokenaddress[msg.sender].push(newTokenId);
        return newTokenId;
    } 
    function startAuctionListing (uint256 tokenId, uint256 price, uint256 durationInSeconds, uint256 revealInSeconds) public payable returns (uint256) {
        require(msg.value == startingPrice, "Must pay the starting price value to start an auction");
        require(price > 0, "Make sure the price isn't negative");
        listingCounter++;
        uint256 listingId = listingCounter;
        uint256 startAt = block.timestamp;
        uint256 endAt = startAt + durationInSeconds;
        uint256 revealEndtime = endAt + revealInSeconds;

        listings[listingId] = Listing({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            netPrice: price,
            status: STATUS_OPEN,
            startAt: startAt,
            endAt: endAt,
            revealEndtime: revealEndtime
        });

        _transfer(msg.sender, address(this), tokenId);
        payable(owner).transfer(startingPrice);
        emit AuctionCreated(listingId, msg.sender, price, tokenId, startAt, endAt);
        return listingId;
    }

    function getMyListingNFTs() public view returns (Listing[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        uint currentId;
        for(uint i=0; i < totalItemCount; i++)
        {
            if(listings[i+1].seller == msg.sender){
            itemCount += 1;
        }
        }
        Listing[] memory items = new Listing[](itemCount);
        for(uint i=0; i < totalItemCount; i++) {
        if(listings[i+1].seller == msg.sender) {
        currentId = i+1;
        Listing storage currentItem = listings[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
        }
        }
        return items;
    }

     function getAllNFTListings() public view returns (Listing[] memory) {
        uint nftCount = _tokenIds.current();
        Listing[] memory tokens = new Listing[](nftCount);
        uint currentIndex = 0;
        uint currentId;
        for(uint i=0;i<nftCount;i++)
        {
            currentId = i + 1;
            Listing storage currentItem = listings[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }

    function sealBid(uint _value, string calldata _passcode) public view returns (bytes32) {
        return keccak256(abi.encodePacked(_value, _passcode, msg.sender));
    }

    function bid(uint256 listingId, bytes32 _sealedBid) public payable nonReentrant {
        require(!isAuctionExpired(listingId), 'auction has ended');
        Listing storage listing = listings[listingId];
        require(msg.sender != listing.seller, "Cannot bid on what you own"); 
        require(bidMap[listingId][msg.sender].length < 1,"There can only be one bid per account");
        uint256 newBid = bids[listingId][msg.sender] + msg.value;
        require(newBid >= listing.price, "Cannot bid below the latest bidding price");
        require(msg.value > 0,"You can't bid nothing");
        bids[listingId][payable(msg.sender)] = msg.value;
        uint256 incentive = listing.price / minAuctionIncrement;
        listing.price = listing.price + incentive;
        bidMap[listingId][msg.sender].push(Bid({ 
        sealedBid: _sealedBid, 
        depositAmt: msg.value, 
        exists: true 
        }));
        bidCount +=1;
        emit BidCreated(listingId, msg.sender, newBid);
    }

    function reveal(uint256 listingId, uint _value, string memory _passcode) external {
        require(isAuctionExpired(listingId), 'Wait until the auction ended');
        require(isReavelTimeOpen(listingId), 'You missed it,you no longer participating you can withdraw your money.');
        Bid storage myBid = bidMap[listingId][msg.sender][0]; 
        uint value = _value;
        string memory passcode = _passcode;
        require(myBid.sealedBid == keccak256(abi.encodePacked(value, passcode, msg.sender)),"The sealedBid doesn't match the hash");
        if(myBid.depositAmt == value){
        myBid.sealedBid = bytes32(0);
        if(!checkBid(listingId,msg.sender, value)) { 
        payable(msg.sender).transfer(myBid.depositAmt); 
        }
        } 
        revealedCount +=1; 
    } 

    function checkBid(uint256 listingId, address _bidder, uint _value) internal returns(bool success) { 
        uint value = _value;
        address bidder = _bidder;
            if (value <= highestBid[listingId]){
            bids[listingId][payable(msg.sender)] = value;
            return false; //not a higher bid
        }
        if (highestBidder[listingId] != address(0)) { 
            bids[listingId][highestBidder[listingId]] += highestBid[listingId]; 
        }
        highestBid[listingId] = value; 
        highestBidder[listingId] = bidder;
        return true; //a higher bid
    }

    function completeAuction(uint256 listingId) public payable nonReentrant {
        require(isAuctionExpired(listingId), 'auction is still open');
        Listing storage listing = listings[listingId];
        address winner = highestBidder[listingId]; 
        require(msg.sender == listing.seller || msg.sender == winner, 'only seller or winner can complete auction');
        if(winner != address(0)) {
            _transfer(address(this), winner, listing.tokenId);
            uint256 amount = bids[listingId][winner]; 
            bids[listingId][winner] = 0;
            _transferFund(payable(listing.seller), amount);
            //update the details of the token
            listings[listingId].seller = winner; 

        } else {
            _transfer(address(this), listing.seller, listing.tokenId);
        }
        listing.status = STATUS_DONE;
        emit AuctionCompleted(listingId, listing.seller, winner, bids[listingId][winner]);
    }

    function withdrawBid(uint256 listingId) public payable nonReentrant {
        require(isAuctionExpired(listingId), 'auction must be ended');
        require(highestBidder[listingId] != msg.sender, 'highest bidder cannot withdraw bid');
        require(!isReavelTimeOpen(listingId), 'Not yet, wait until the revealing time ended.');
        uint256 balance = bids[listingId][msg.sender];
        if(balance != 0){
            _transferFund(payable(msg.sender), balance);
            bids[listingId][msg.sender] = 0;
        }
        else { console.log("Money already withdrawn."); }
        emit WithdrawBid(listingId, msg.sender, balance);
    }

    function isAuctionExpired(uint256 id) public view returns (bool) {
        return listings[id].endAt <= block.timestamp;
    }

    function isReavelTimeOpen(uint256 id) public view returns (bool) { 
        return
            listings[id].status == STATUS_OPEN &&
            listings[id].revealEndtime > block.timestamp;
    }

    function _transferFund(address payable to, uint256 amount) internal {
        if (amount == 0) {
            return;
        }
        require(to != address(0), 'Error, cannot transfer to address(0)');

        (bool transferSent, ) = to.call{value: amount}("");
        require(transferSent, "Error, failed to send Ether");
    }
}

