import React, { useContext, createContext, useEffect, useState} from 'react';
// 1:56:07 / 3:33:50
import { useAddress, useContract, useMetamask, useContractWrite,useNFTs, useMintNFT } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pages/pianata";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import axios from "axios";

const StateContext = createContext();

const getContractData = async() => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const sdk = ThirdwebSDK.fromSigner(signer);
   //const sdk = new ThirdwebSDK(Sepolia);
   const contract = await sdk.getContract("0xFcdb6dA1Ae562c6a39b8D72aff3299af464b907F");
   return contract;
};

export const StateContextProvider = ({ children }) => {
   const [currentaddress, setAddress] = useState("");
   const [mynft, storeMyNft] = useState(""); 
   const [sealed, sealSuccess] = useState(false);
   const [donebid, bidSuccess] = useState(false);
   const [revealed, revealSuccess] = useState(false);
   const [revealmessage, revealMessage] = useState("");
   const [winnerAddress, highestBidder] = useState("");
   const [highestVal, highestValue] = useState("");
   const [message, updateMessage] = useState("");
   const address = useAddress();
   const connect = useMetamask();

  const [formParams, updateFormParams] = useState({ ownername: '', description: ''});
  const [listingParams, updateListingParams] = useState({ tokenId: '', price: '', auction_duration: '', auction_reveal: ''});
  const [sealParams, setsealParams ] = useState({ bidvalue:'', passcode:'' });
  const [bidParams, setbidParams ] = useState({ listId:'', sealhash:'', bidamount:'' });
  const [revealParams, setrevealParams ] = useState({ listId:'', bidvalue:'', passcode:'' });
  const [idParams, setidParams ] = useState({ listId:'' });
  const [transferParams, settransferParams ] = useState({ to:'', amount:'' });
  const [byte, setByte] = useState();

   
   const checkIfWalletIsConnected = async () => {
     try {
      const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          const sdk = ThirdwebSDK.fromSigner(signer);
          console.log("provider", provider);
          console.log("signer", signer);
          console.log("address", address);
          console.log("sdk", sdk);
          const contract = await sdk.getContract("0xFcdb6dA1Ae562c6a39b8D72aff3299af464b907F");
          //console.log("monica", contract);
      } catch (error) {
      console.log(error);
      }
   }
   //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS(fileURL) {
      const {ownername, description} = formParams;
      // console.log("get",IPname);
      if( !ownername || !description || !fileURL)
          return;

      const nftJSON = {
          ownername, description, image: fileURL
      }
      try {
          //upload the metadata JSON to IPFS
          const response = await uploadJSONToIPFS(nftJSON);
          if(response.success === true){
              console.log("Uploaded JSON to Pinata: ", response)
              return response.pinataURL;
          }
      }
      catch(e) {
          console.log("error uploading JSON metadata:", e)
      }
    }

    const mintNft = async (fileURL) => {
      const { ownername, description } = formParams;
  
      console.log("form data",formParams);
      console.log("addressing", address);
      try {
        if(address){
          const contracts = await getContractData();      
          const metadataURL = await uploadMetadataToIPFS(fileURL);      
          const data = await contracts.call("mintNftAuction",[metadataURL]);
          //const data = await contracts.call("name");       
          console.log("people", await data);
        } else {
          alert("connect to you wallet, to proceed")
        }
      } catch(error) {
        console.log("failed", error);
      }
      
    }  

    async function getMyNfts() {
      try {
        if(address){
          const contracts = await getContractData();
          //Pull the deployed contract instance
          // let transaction = await contracts.call('getMyNFTs');
          // console.log("support to her", transaction);
          //const items = await Promise.all(transaction.map(async i => {
            let val = 1;
            let tokenId = val.toString();
              const tokenURI = await contracts.call('tokenURI', [tokenId]);
              let meta = await axios.get(tokenURI);
              meta = meta.data;
              // console.log("meta dts", meta);
              let item = {
                //tokenId: i.tokenId.toNumber(),
                image: meta.image,
                ownername: meta.ownername,
                description: meta.description,
              }
              storeMyNft(meta);
              console.log("my nfts", item);
              return item;
              
          //}))
          //updatemyData(items);
        } else { console.log("connect to you wallet, to proceed"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }
  
    async function startAuction() {
      const { tokenId, price, auction_duration, auction_reveal } = listingParams;
      let _price = ethers.utils.parseEther(price);
      let _tokenId = tokenId.toString();
      let durationInSeconds = ethers.utils.parseEther(auction_duration);
      let revealInSeconds = ethers.utils.parseEther(auction_reveal);
      try {
        if(address){     
          const contracts = await getContractData();
          updateMessage("Please wait.. uploading (upto 5 mins)")     
          let startingPrice = await contracts.call('getListPrice');
          startingPrice = startingPrice.toString()
          let transaction = await contracts.call('startAuctionListing', [_tokenId, _price, durationInSeconds, revealInSeconds],{ value: startingPrice });
          //console.log("success", transaction);
          updateMessage("Data inserted successfully!")  
          //window.location.replace("/")
        } else { console.log("connect to you wallet, to proceed"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function getNFTData() {
      try {
        if(address){
          const contracts = await getContractData();
          console.log("support con", contracts);
          let transaction = await contracts.call('getMyNFTs');
          console.log("support con", transaction);
          const items = await Promise.all(transaction.map(async i => {
              const tokenURI = await contracts.call('tokenURI', [i.tokenId]);
              console.log('alya', i.tokenId);
              console.log('alya', tokenURI);
              let meta = await axios.get(tokenURI);
              meta = meta.data;
              let item = {
                tokenId: i.tokenId.toNumber(),
                image: meta.image,
                ownername: meta.ownername,
                description: meta.description,
              }
              console.log("support to her", item);
              return item;
              
          }))
          //updatemyData(items);
        } else { console.log("connect to you wallet, to proceed"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function sealBid() {
      const { bidvalue, passcode } = sealParams;
      let value = ethers.utils.parseEther(bidvalue);
      let _passcode = passcode;
      try {
        if(address){     
          const contracts = await getContractData();
          let transaction = await contracts.call('sealBid', [value, _passcode]);
          //alert("Success"); 
          setByte(transaction);
          console.log("success bytes", transaction);    
          sealSuccess(true);      
        } else { console.log("No wallet is connected"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function bid() {
      const { listId, sealhash, bidamount } = bidParams;
      // console.log("vla", listId);
      // console.log("you", sealhash);
      // console.log("stirn", sealhash.toString());
      try {
        if(address){    
          let _sealhash =  sealhash.toString();
          let _listId = listId.toString();
          let _bidamount = ethers.utils.parseEther("0.1"); 
          const contracts = await getContractData();
          let transaction = await contracts.call('bid', [_listId, _sealhash],{ value: _bidamount});
         // console.log("success", transaction);
          bidSuccess(true);
          //alert("Success");            
        } else { console.log("No wallet is connected"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }
    
    async function reveal() {
      const { listId, bidvalue, passcode } = revealParams;
      try {
        if(address){   
          let _bidvalue = ethers.utils.parseEther(bidvalue);
          let _listId = listId.toString();  
          let _passcode = passcode; 
          const contracts = await getContractData();
          let transaction = await contracts.call('reveal', [_listId, _bidvalue, _passcode]);
          revealSuccess(true);   
          revealMessage("winner will be shown when the reveal time ends, keep waiting till then...");         
        } else { console.log("No wallet is connected"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function completeAuction(listingId) {
      const { listId } = idParams;
      try {
        if(address){  
          let listId = listingId.toString();      
          const contracts = await getContractData();
          let transaction = await contracts.call('completeAuction', [listId]);
          alert("Success");            
        } else { console.log("No wallet is connected"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function withdrawBid(listingId) {
      const { listId } = idParams;
      try {
        if(address){  
          let listId = listingId.toString();      
          const contracts = await getContractData();
          let transaction = await contracts.call('withdrawBid', [listId]);
          alert("Success");            
        } else { console.log("No wallet is connected"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function transferFund(){
      const { to, amount } = transferParams;
      try {
        if(address){  
          let amountvalue = ethers.utils.parseEther(amount);   
          const contracts = await getContractData();
          let transaction = await contracts.call(' _transferFund', [to, amountvalue]);
          alert("Success");            
        } else { console.log("No wallet is connected"); } 
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function isAuctionOpen(id){
      try {
        if(address){  
          let Id = id.toString();   
          const contracts = await getContractData();
          let transaction = await contracts.call('isAuctionOpen', [Id]);
          console.log("success", transaction);
          //alert("Success");            
        } else { console.log("No wallet is connected"); } 
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function winAdd(){
      const { listId } = idParams;
      try {
        if(address){    
          const contracts = await getContractData();
          let transaction = await contracts.call('highestBidder', [listId]);
          highestBidder(transaction);
          console.log("win address", transaction);  
        } else { console.log("No wallet is connected"); } 
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function highestBid(){
      const { listId } = idParams;
      
      try {
        if(address){    
          const contracts = await getContractData();
          let transaction = await contracts.call('highestBid', [listId]);
          highestValue(transaction);
          console.log("highvalue",transaction);     
        } else { console.log("No wallet is connected"); } 
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function nfttoken(){
      const { listId } = idParams;      
      try {
        if(address){ 
          let transaction = [];   
          const contracts = await getContractData();
          console.log("tokenId amir");
          for(let i = 0; i < 1; i++){
            let transact = await contracts.call('tokenaddress', [address,i]);
            transact = transact.toString();
            transaction.push(transact);
          }
          //highestValue(transaction);
          console.log("tokenId amir",transaction);
        } else { console.log("No wallet is connected"); } 
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }
    
    async function sealedDetails(){
      const { listId } = idParams;      
      try {
        if(address){ 
          let transaction = [];   
          const contracts = await getContractData();
          console.log("sealed info", contracts);
          //for(let i = 0; i < 1; i++){
            let transact = await contracts.call('bidMap', [1, address, 0]);
           transact = transact.toString();
            // transaction.push(transact);
         // }
          //highestValue(transaction);
          console.log("tokenId amir",transact);
        } else { console.log("No wallet is connected"); } 
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }
    useEffect(()=>{
      checkIfWalletIsConnected();
      //getMyNfts();
      
      nfttoken();
      //getNFTData();
    }, []);
    

  return (
    <StateContext.Provider
      value={{ 
        formParams, 
        updateFormParams,
        mintNft,
        connect,
        address,
        currentaddress,
        setAddress,
        startAuction,
        sealBid,
        bid,
        reveal,
        completeAuction,
        withdrawBid,
        transferFund,
        isAuctionOpen,
        getNFTData,
        getMyNfts,
        mynft,
        sealed,
        donebid,
        revealed,
        revealmessage,
        winnerAddress,
        highestVal,
        listingParams,
        updateListingParams,
        message,
        setsealParams,
        setbidParams,
        setrevealParams,
        setidParams,
        settransferParams,
        sealParams,
        bidParams,
        revealParams,
        idParams,
        transferParams,
        byte,
        winAdd,
        highestBid,
        nfttoken,
        sealedDetails
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);