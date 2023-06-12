// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Crowdfunding {
    // this is our campaign content which are held on real time
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donationamount;
    }
    // we have to map the campaign for every single time
    mapping (uint256 => Campaign) public campaigns;

    // by default the numberOfCampaigns is zero
    uint256 public numberOfCampaigns = 0;

    // function that creates a campaigns
    // function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns(uint256) {
    //     // when new campaigns triggers then new campaign stors in an array
    //     Campaign storage campaign = campaigns[numberOfCampaigns];

    //     // is everything okay if the dedline is matched with the required time 
    //     require(campaign.deadline < block.timestamp, "the deadline should be a date in the future.");

    //     campaign.owner = _owner;
    //     campaign.title = _title;
    //     campaign.description = _description;
    //     campaign.target = _target;
    //     campaign.deadline = _deadline;
    //     campaign.amountCollected = 0;
    //     campaign.image = _image;

    //     numberOfCampaigns++;
        
    //     return numberOfCampaigns - 1;

    // }

      function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    // this function collect the donation amount and send to the owner
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donationamount.push(amount);
        
        (bool sent,) = payable(campaign.owner).call{value : amount}("");

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }


    // this function to return donators and donationamount 
    function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donationamount);
    }

    function getCampaigns() public view returns(Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i < numberOfCampaigns; i++){
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }

}