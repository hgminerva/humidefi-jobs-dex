require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
    const wsProvider = new WsProvider(process.env.CHAIN_ADDRESS);
    const api = await ApiPromise.create({ provider: wsProvider });
    const output1 = await api.query.dexModule.tickerDataStore();
    const output2 = await api.query.dexModule.dexDataStore();

    console.log(JSON.stringify(output1.toHuman()));
    console.log(JSON.stringify(output2.toHuman()));
}

main().catch(console.error).finally(() => process.exit());