# truffle-boilerplate

## installation:

npm i
npx truffle init

## usage

open simulation: `npx truffle develop`  
compile: `truffle develop`, `compile`  
deploy to Ropsten: `migrate --network ropsten`  
deploy to Ganache: `migrate --network development`
`var i = await Migrations.deployed()`

# Starting migrations...

> Network name: 'ropsten'
> Network id: 3
> Block gas limit: 30000000 (0x1c9c380)

# 1_initial_migration.js

Deploying 'Migrations'

---

> transaction hash: 0x4f8bc9a907f518c63b0755fdfe32072ccc760be3a938edc959bcbe47d15b90b8
> Blocks: 1 Seconds: 12
> contract address: 0xdf4B036120Db7968181c0A60d5c954A3b247b8E2
> block number: 12358298
> block timestamp: 1654797528
> account: 0x914E8C46C5158854b2aaE332332ce2abC511D966
> balance: 0.999374614998248922
> gas used: 250154 (0x3d12a)
> gas price: 2.500000007 gwei
> value sent: 0 ETH
> total cost: 0.000625385001751078 ETH

Pausing for 2 confirmations...

---

> confirmation number: 1 (block: 12358299)
> confirmation number: 2 (block: 12358300)
> Saving migration to chain.
> Saving artifacts

---

> Total cost: 0.000625385001751078 ETH

# 2_numStore_migration.js

Deploying 'NumStore'

---

> transaction hash: 0x7eefc1b844bea9c6a57ae297a3cdf6d26072d055f6aa91a0d3dfd200f3edac36
> Blocks: 3 Seconds: 33
> contract address: 0xbA511CbB59766cc06E5FE3Ce667D54a75334d357
> block number: 12358306
> block timestamp: 1654797624
> account: 0x914E8C46C5158854b2aaE332332ce2abC511D966
> balance: 0.99889012499689235
> gas used: 147883 (0x241ab)
> gas price: 2.500000007 gwei
> value sent: 0 ETH
> total cost: 0.000369707501035181 ETH

Pausing for 2 confirmations...

---

> confirmation number: 1 (block: 12358307)
> confirmation number: 2 (block: 12358308)
> Saving migration to chain.
> Saving artifacts

---

> Total cost: 0.000369707501035181 ETH

# Summary

> Total deployments: 2
> Final cost: 0.000995092502786259 ETH
