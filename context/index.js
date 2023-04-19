import React, { useContext, createContext, useEffect, useState} from 'react';
// 1:56:07 / 3:33:50
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pages/pianata";
import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";

const StateContext = createContext();

const getContractData = async() => {
   const sdk = new ThirdwebSDK(Sepolia);
   const contract = await sdk.getContract("0x1CF62190fcd41cfbe0637E358caF70f57AAf3100");
   return contract;
};

export const StateContextProvider = ({ children }) => {
   const [ currentaddress, setAddress ] = useState("");
   //const [currentAccount, setCurrentAccount] = useState(""); 
   const address = useAddress();
   const connect = useMetamask();

  const [formParams, updateFormParams] = useState({ ownername: '', description: ''});
   
   const checkIfWalletIsConnected = async () => {
    // try {
    //   if(address) {
    //     alert("wallet connected!");
    //   } else {
    //     alert("Please connect to your wallet!");
    //   }
    // } catch(error){
    //   console.log("Wallet not connected",error);
    // }
    try {
      if (!address) return alert("Please connect to wallet.");
   
      if (address) {
        setAddress(address);
        //getAllTransactions();        
      } else {
        console.log("No accounts found");
      }
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
      try {
        if(address){
          const contracts = await getContractData();
          console.log("contracting", contracts);
          const add = "0x57614b7DFcBdb14907C9573f712461Ed3c983a56";
          const metadataURL = await uploadMetadataToIPFS(fileURL);
          // const data = await contracts.call("mint",[metadataURL, add]);
          const data = await contracts.call("name");       
          console.log("people", data);
        } else {
          alert("connect to you wallet, to proceed")
        }
      } catch(error) {
        console.log("failed", error);
      }
      
    }

    // const mintNft = async () => {
    //   //const contracts = createEthereumContract();
    //   try{
    //   // const { ownername, description } = formParams;
    //   // console.log("form data",formParams);
    //   console.log("contacting", await contract);
    //   const metadataURL = "await uploadMetadataToIPFS(fileURL);"
    //   const add = "0x57614b7DFcBdb14907C9573f712461Ed3c983a56";
    //  // const data = await contract.functions("balanceOf", [add])
    //   //const data = await contract.Read('name');
    //   //await data.wait()
    //   console.log("contract call success")
    //   } catch (error) {
    //     console.log("contract call failure", error)
    //   }
      
    // }

    useEffect(()=>{
      checkIfWalletIsConnected();
    }, []);
   
  
    // const publishCampaign = async (form) => {
    //   try {
    //     const data = await createCampaign([
    //       address, // owner
    //       form.title, // title
    //       form.description, // description
    //       form.target,
    //       new Date(form.deadline).getTime(), // deadline,
    //       form.image
    //     ])
  
      //   console.log("contract call success", data)
      // } catch (error) {
      //   console.log("contract call failure", error)
      // }
    // }
    // uint256 tokenId, uint256 price, uint256 durationInSeconds, uint256 revealInSeconds
    async function startAuction(fileURL) {
      const { ownername, description } = formParams;
      console.log("spooon",formParams);
      console.log("forrk",fileURL);  uploadMetadataToIPFS(fileURL)

      try {
        // if(ethereum){
          const metadataURL = await uploadMetadataToIPFS(fileURL);        
          updateMessage("Please wait.. uploading (upto 5 mins)")
        
          //let listingPrice = await transactionsContract.getListPrice()
          //listingPrice = listingPrice.toString()
          // contract.call('mint', metadataURL, address)
          let transaction = await contract.call('createAuctionListing', metadataURL, address)
          await transaction.wait()

          alert("Successfully listed your NFT!");
            
          window.location.replace("/")
        // } else { console.log("No ethereum object now"); }
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
        setAddress
        // createCampaign: publishCampaign,
      }}

    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);