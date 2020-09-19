
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract CampaignFactory {
    Campaign[] deployedCampaigns;
    
    function createCampaign(uint minimumContribution) public {
        Campaign newCampaign = new Campaign(minimumContribution, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getCampaigns() public view returns(Campaign[] memory){
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool isCompleted;
        uint approvalCount;
        mapping(address => bool) hasApproved;
    }
    Request[] public requests;
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
        approversCount = 0;
    }
    
    function contribute() payable public {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request memory request = Request({
            description: description,
            value: value,
            recipient: recipient,
            isCompleted: false,
            approvalCount: 0
        });
        requests.push(request);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);
        require(!request.hasApproved[msg.sender]);
        
        request.hasApproved[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];
        
        require(!request.isCompleted);
        require(request.approvalCount >= (approversCount / 2));
        
        request.recipient.transfer(request.value);
        request.isCompleted = true;
    }
}
