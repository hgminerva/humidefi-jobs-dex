require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } =  require('@polkadot/keyring');

async function main() {
    const chain_address = process.env.CHAIN_ADDRESS;
    const wsProvider = new WsProvider(chain_address);
    const api = await ApiPromise.create({ provider: wsProvider });

    const swap_fees = process.env.SWAP_FEES;
    
    // Testnet
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    const sudo = keyring.addFromUri(process.env.SUDO);
    await api.tx.sudo.sudo(
        api.tx.dexModule.storeSwapFees(swap_fees)
    ).signAndSend(sudo);

    // Dev
    // const keyring = new Keyring({ type: 'sr25519' });
    // const alice = keyring.addFromUri(process.env.ALICE_URI);
    // await api.tx.sudo.sudo(
    //     api.tx.dexModule.storeSwapFees(swap_fees)
    // ).signAndSend(alice);
}

main().catch(console.error).finally(() => process.exit());