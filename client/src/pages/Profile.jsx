// import React from 'react'

// const Profile = () => {
//   return (
//     <div>Profile</div>
//   )
// }

// export default Profile


import React, {useState, useEffect} from 'react'
import { useStateContext } from '../context'
import {DisplayCampaigns} from '../components';


const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCompaigns] = useState([]);

  const {address, contract, getUserCampaigns} = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getUserCampaigns()
    setCompaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract])

  return (
    <DisplayCampaigns
    title = "All Campaigns"
    isLoading = {isLoading}
    campaigns = {campaigns}
    />
  )
}

export default Profile