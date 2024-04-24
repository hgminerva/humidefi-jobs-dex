require('dotenv').config();

const { ApiPromise, WsProvider } = require('@polkadot/api');
const { Keyring } =  require('@polkadot/keyring');

async function main () {
  	// Test connection
    const smoldot_rpc = process.env.SMOLDOT_RPC;
	const provider = new WsProvider(smoldot_rpc);
	const api = await ApiPromise.create({ provider });

  	const [chain, nodeName, nodeVersion] = await Promise.all([
    		api.rpc.system.chain(),
    		api.rpc.system.name(),
    		api.rpc.system.version()
  	]);

  	console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

  	// Query the balance
	const lastHdr = await api.rpc.chain.getHeader();
	const apiAt = await api.at(lastHdr.hash);
	const ADDR = '5DGBcmzEFv9kLPAun5L3nQXC3hk5grzJbXi4wMZSdtEq5xw1';
	//const { data: { free } } = await apiAt.query.system.account(ADDR);

	//console.log(`${now}: balance of ${balance.free} and a nonce of ${nonce}`);

	// Transfer
	const keyring = new Keyring({ type: 'sr25519' });
	const alice = keyring.addFromUri('//Alice');
	const unsub = await api.tx.balances.transfer(ADDR, 12345)
  		.signAndSend(alice, (result) => {
    			console.log(`Current status is ${result.status}`);
    			if (result.status.isInBlock) {
      				console.log(`Transaction included at blockHash ${result.status.asInBlock}`);
    			} else if (result.status.isFinalized) {
      				console.log(`Transaction finalized at blockHash ${result.status.asFinalized}`);
      			unsub();
    			}
  	});

}

main().catch(console.error).finally(() => process.exit());
