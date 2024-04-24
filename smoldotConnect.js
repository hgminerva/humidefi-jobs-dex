require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');

// Define the URL of the Smoldot RPC node
//const nodeUrl = 'ws://testrpcnodea01.xode.net/aRoyklGrhl9m2LlhX8NP/rpc';
const nodeUrl = 'ws://192.168.5.52:9944'; // Change this to your RPC node URL

// Create a provider for the node
const provider = new WsProvider(nodeUrl);

async function main() {
  // Create an API instance using the provider
  const api = await ApiPromise.create({ provider });

// Retrieve the chain name
const chain = await api.rpc.system.chain();

// Retrieve the latest header
const lastHeader = await api.rpc.chain.getHeader();

// Log the information
console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
}