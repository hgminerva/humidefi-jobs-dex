require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
    const wsProvider = new WsProvider(process.env.CHAIN_ADDRESS);
    const api = await ApiPromise.create({ provider: wsProvider });
    const output1 = await api.query.dexModule.tickerDataStore();
    const output2 = await api.query.dexModule.dexDataStore();
    const output3 = await api.query.dexModule.phpuDataStore();
    const output4 = await api.query.dexModule.umiLiquidityDataStore();
    const output5 = await api.query.dexModule.phpuLiquidityDataStore();

    console.log(JSON.stringify(output1.toHuman()));
    console.log(JSON.stringify(output2.toHuman()));
    console.log(JSON.stringify(output3.toHuman()));
    console.log(JSON.stringify(output4.toHuman()));
    console.log(JSON.stringify(output5.toHuman()));
}

main().catch(console.error).finally(() => process.exit());