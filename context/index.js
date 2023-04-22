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
   //const [currentAccount, setCurrentAccount] = useState(""); 
   const address = useAddress();
   const connect = useMetamask();

  const [formParams, updateFormParams] = useState({ ownername: '', description: ''});
   
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
              console.log("meta dts", meta);
              let item = {
                //tokenId: i.tokenId.toNumber(),
                image: meta.image,
                ownername: meta.ownername,
                description: meta.description,
              }
              console.log("support to her", item);
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
      //uint256 price, uint256 tokenId, uint256 durationInSeconds, uint256 revealInSeconds
      let price = ethers.utils.parseEther("0.01");
      let val = 1;
      let tokenId = val.toString();
      let durationInSeconds = ethers.utils.parseEther("200");
      let revealInSeconds = ethers.utils.parseEther("200");
      try {
        if(address){     
          const contracts = await getContractData();
         // updateMessage("Please wait.. uploading (upto 5 mins)")     
          //let startingPrice = await contracts.getListPrice()
          let startingPrice = ethers.utils.parseEther("0.01");
          let transaction = await contracts.call('startAuctionListing', [price, 1, durationInSeconds, revealInSeconds],{ value: startingPrice });
         // alert("Auction started!");
         console.log("success", transaction);
            
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
          //Pull the deployed contract instance
          let transaction = await contracts.call('getMyNFTs');
          console.log("support to her", transaction);
          const items = await Promise.all(transaction.map(async i => {
              const tokenURI = await contracts.call('tokenURI', [i.tokenId]);
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
      let value = ethers.utils.parseEther("0.01");
      let passcode = "pass";
      try {
        if(address){     
          const contracts = await getContractData();
          let transaction = await contracts.call('sealBid', [value, passcode]);
          //alert("Success"); 
          console.log("success", transaction);           
        } else { console.log("No wallet is connected"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    useEffect(()=>{
      checkIfWalletIsConnected();
      //getNFTData();
    }, []);
    
    async function bid(listingId, sealedBid) {
      try {
        if(address){    
          //let price = ethers.utils.parseEther("0.01");
          let val =  sealedBid.toString();
          let listId = listingId.toString(); 
          const contracts = await getContractData();
          let transaction = await contracts.call('bid', [listId, val]);
          console.log("success", transaction);
          //alert("Success");            
        } else { console.log("No wallet is connected"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }
    
    async function reveal(listingId, value, passcode) {
      try {
        if(address){   
          let val = ethers.utils.parseEther(value);
          let listId = listingId.toString();   
          const contracts = await getContractData();
          let transaction = await contracts.call('reveal', [listId, val, passcode]);
          alert("Success");            
        } else { console.log("No wallet is connected"); }
      }
      catch(e) {
          alert( "Upload error"+e )
      }
    }

    async function completeAuction(listingId) {
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

    async function transferFund(to, amount){
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

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


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
        getMyNfts
        // createCampaign: publishCampaign,
      }}

    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);