require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } =  require('@polkadot/keyring');
const axios = require('axios');


async function getPrices() {
    var ticker_json = "";
    await axios.get(process.env.API_LAYER)
        .then((res) => {
            const umi_rate = 1;
            const phpu_rate = res.data.rates.PHP;

            var tickers = {};
            var tickers_key = 'Prices';
            var ticker1 = { ticker: 'UMI', price_in_usd: umi_rate};
            var ticker2 = {ticker: 'PHPU',price_in_usd: phpu_rate};

            tickers[tickers_key] = [];
            tickers[tickers_key].push(ticker1);
            tickers[tickers_key].push(ticker2);
            ticker_json = JSON.stringify(tickers);
            
            console.log(ticker_json);
        })
        .catch((error) => {
            console.error(error);
        });
    return ticker_json;
}

async function main() {
    const chain_address = process.env.CHAIN_ADDRESS;
    const wsProvider = new WsProvider(chain_address);
    const api = await ApiPromise.create({ provider: wsProvider });
    const ticker_json = await getPrices();
    //const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    //const addressPair = keyring.addFromAddress(caller_address);
    const keyring = new Keyring({ type: 'sr25519' });
    const alice = keyring.addFromUri(process.env.ALICE_URI);
    await api.tx.dexModule.storeTickerPrice(ticker_json).signAndSend(alice);
}

main().catch(console.error).finally(() => process.exit());