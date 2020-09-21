import web3 from "./web3";
import campaign from "../../ethereum/build/Campaign.json";

const getCampaign = (address) => new web3.eth.Contract(campaign.abi, address);

export default getCampaign;
