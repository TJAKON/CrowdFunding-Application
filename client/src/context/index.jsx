import React, {useContext, createContext} from 'react'

// basic importation to interact with the blockchain and wallet
import {useAddress, useContract, useMetamask, useContractWrite, useContractRead} from '@thirdweb-dev/react'
import { ethers } from 'ethers'
import { EditionMetadataInputOrUriSchema } from '@thirdweb-dev/sdk';

// createContext hook creates context and export and import the file
const StateContext = createContext();

export const StateContextProvider  = ({children}) => {
    // all we need to connect with smart contract 

// 1) method to connect with contract 
    const { contract } = useContract("0xCFA8f93934A85Ec955d50176880c320E55168894");

// 2) method to call smart contract function 

    const { mutateAsync : createCampaign} = useContractWrite(contract, 'createCampaign');
    const { mutateAsync: donateToCampaign} = useContractWrite(contract, "donateToCampaign")

    // store them in an contant variable
    const address = useAddress();
    const connect = useMetamask();

// 3) passing the form values in smart contract 

    const publishCampaign = async (form) => {
        // pass this funciton in try catch exception handling 
        // function objects if it is correct then return 
        // message of success and data or error

        // console.log(form)
        // var test = [address,
        //     form.title,
        //             form.description,
        //             form.target,
        //             new Date(form.deadline).getTime(),
        //             form.image
        // ];
        // console.log(test)

        try{
            const data = await createCampaign({args:[
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ]})

            // const data = await createCampaign(test)

            console.log("Contract call success", data)
        } catch(error){
            console.log("Contract Call error", error)
        }
             
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');
        
        const parsedCampaign = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.parseEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }))
        // console.log(parsedCampaign)
        return parsedCampaign;
    }
    
    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        const filteredCampaigns = allCampaigns.filter((campaign) => 
        campaign.owner === address);
        return filteredCampaigns;
    }

    const donate = async (pId, amount) => {
        const amt = ethers.utils.formatEther(amount, 18)
        // const amt2 = ethers.utils.formatUnits(amount, 18)
        // const amt3 = ethers.utils.parseEther(amount, 18)
        // console.log(amt, amt2, amt3)
        
        console.log(amt)
        // const value = amount; // Replace with the actual value you want to convert
        // const decimals = 18; // Replace with the correct number of decimal places
        // const parsedValue = ethers.utils.parseUnits(value, decimals);

        // donateToCampaign({"type":"BigNumber","hex":"0x071afd498d0000"})

        // const amt = ethers.utils.parseEther(amount)
        // console.log(amt._hex)
        // const data = await contract.call('donateToCampaign',)
        // const data = await donateToCampaign({ args: [pId, amount] });
        try {
            const data = await donateToCampaign(
                { args: [ 
                    // {pId: amt._hex}
                    // {pId,
                    // value : amt}
                    pId
                    // ()
                    // ethers.BigNumber.from(amt)
                    // ethers.utils.parseUnits(amount, 18)
                    // parsedValue
                ] });
            console.info("contract call successs", data);
          } catch (err) {
            console.error("contract call failure", err);
          }
      
        // return data;
    }

    const getDonations = async (pId) => {
        // console.log(pId)
        const donations = await contract.call('getDonators', [pId]);
        // const { donations } = contract.call(contract, "getDonators", [pId])
        const numberOfDonations = donations[0].length;

        const parseDonations = [];

        for(let i = 0; i < numberOfDonations; i++){
            parseDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parseDonations;
    }

    return(
        // ex - SomeContext.Provider 
        // Wrap your components into a context provider to specify
        //  the value of this context for all components inside:
        <StateContext.Provider
        value={
            {
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations
            }
        }
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)

