import web3 from "./web3";
import campaignFactory from "../../ethereum/build/CampaignFactory.json";

const instance = new web3.eth.Contract(campaignFactory.abi, process.env.CONTRACT_ADDRESS);

export default instance;
