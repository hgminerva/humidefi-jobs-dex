require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main() {
    const wsProvider = new WsProvider(process.env.CHAIN_ADDRESS);
    const api = await ApiPromise.create({ provider: wsProvider });
    
    const output1 = await api.query.dexModule.tickerDataStore();
    
    const output2 = await api.query.dexModule.dexAccountDataStore();
    const output3 = await api.query.dexModule.umiLiquidityAccountDataStore();
    const output4 = await api.query.dexModule.phpuLiquidityAccountDataStore();

    const output5 = await api.query.dexModule.phpuDataStore();
    const output6 = await api.query.dexModule.umiLiquidityDataStore();
    const output7 = await api.query.dexModule.phpuLiquidityDataStore();

    const output8 = await api.query.dexModule.swapFeesDataStore();

    console.log("1. Ticker: " + JSON.stringify(output1.toHuman()));
    
    console.log("2. Dex Account: " + JSON.stringify(output2.toHuman()));
    console.log("3. UMI Liquidity Account: " + JSON.stringify(output3.toHuman()));
    console.log("4. PHPU Liquidity Account: " + JSON.stringify(output4.toHuman()));

    console.log("5. PHPU Contract: " + JSON.stringify(output5.toHuman()));
    console.log("6. UMI Liquidity Contract: " + JSON.stringify(output6.toHuman()));
    console.log("7. PHPU Liquidity Contract: " + JSON.stringify(output7.toHuman()));

    console.log("8. Swap Fees: " + JSON.stringify(output8.toHuman()));
}

main().catch(console.error).finally(() => process.exit());