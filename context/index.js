import React, { useContext, createContext, useEffect} from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pianata";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xBC75331a300D98668433529DDbaa2eFEe5Bd5F67');
   useEffect(()=>{
    console.log("contract", contract);
   })
 
  const { mutateAsync: mint } = useContractWrite(contract, 'mint');
 
  const address = useAddress();
  const connect = useMetamask();

  const [formParams, updateFormParams] = useState({ ownername: '', description: ''});

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
        const metadataURL = await uploadMetadataToIPFS(fileURL);
        const data = await mint([
          metadataURL,
          address, // owner
        ])
        console.log("Minting nft successful", data)
      } catch (error) {
        console.log("Minting nft failed", error)
      }
    }

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
        mint: mintNft,
        // createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);