require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } =  require('@polkadot/keyring');

async function main() {
    const chain_address = process.env.CHAIN_ADDRESS;
    const wsProvider = new WsProvider(chain_address);
    const api = await ApiPromise.create({ provider: wsProvider });

    const keyring_of_dex_account = new Keyring({ type: 'sr25519', ss58Format: 0 });
    const dexAccount = keyring_of_dex_account.addFromAddress(process.env.DEX_ACCOUNT);
    
    // Testnet
    const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    const sudo = keyring.addFromUri(process.env.SUDO);
    await api.tx.sudo.sudo(
        api.tx.dexModule.storeDexAccount(dexAccount.address)
    ).signAndSend(sudo);

    // Dev
    // const keyring = new Keyring({ type: 'sr25519' });
    // const alice = keyring.addFromUri(process.env.ALICE_URI);
    // await api.tx.sudo.sudo(
    //     api.tx.dexModule.storeDexAccount(dexAccount.address)
    // ).signAndSend(alice);
}

main().catch(console.error).finally(() => process.exit());