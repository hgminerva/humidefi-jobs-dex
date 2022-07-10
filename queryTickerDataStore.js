require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
    const wsProvider = new WsProvider(process.env.CHAIN_ADDRESS);
    const api = await ApiPromise.create({ provider: wsProvider });
    const output = await api.query.dexModule.tickerDataStore();
    console.log(JSON.stringify(output.toHuman()));
}

main().catch(console.error).finally(() => process.exit());