export default function MainContent() {
    return (
      <div className="w-full lg:w-[60%] bg-white mt-8 lg:mt-32 ml-0 lg:ml-[10%] p-8"> {/* Responsive width and margin */}
        <div className="flex flex-col gap-6">
          {/* Breadcrumb */}
          <div className="flex gap-1 text-sm">
            <div className="text-[#a7b2c0]">Cryptocurrencies</div>
            <div className="text-[#a7b2c0]">&gt;</div>
            <div className="text-[#a7b2c0]">Bitcoin</div>
            <div className="text-[#a7b2c0]">&gt;</div>
            <div className="text-[#02234d]">News</div>
          </div>
          {/* Article Title */}
          <div className="text-[#02234d] text-3xl font-bold leading-[39px]">
            The Scalability Solution: Understanding Layer One vs. Layer Two Blockchains
          </div>
          {/* Article Metadata */}
          <div className="text-[#4f729f] text-sm">20 Sep 2023, 8:00pm</div>
          <div className="text-[#02234d] text-base font-medium">by Alex House</div>
          {/* Article Image */}
          <div className="w-full h-[446px]">
            <img src="https://placehold.co/670x446" alt="News Image" className="w-full h-full object-cover" />
          </div>
          {/* Article Content */}
          <div className="text-[#02234d] text-base leading-tight">
            Layer one or L1 refers to a base blockchain protocol like Bitcoin or Ethereum. These networks operate on a decentralized ledger secured by <span className="underline">proof-of-work (PoW) mining or proof-of-stake (PoS) staking</span>. L1 chains such as Bitcoin and Ethereum offer unparalleled security. However, during peak times, both of these chains grapple with sluggish transaction speeds and steep fees.
            <br /><br />
            Developers from several L1 networks are working to improve layer one scaling through methods like <span className="underline">increasing</span> block size, <span className="underline">sharding</span>, and <span className="underline">introducing</span> proof-of-stake consensus. However, substantial layer one upgrades require coordination among node operators and can take years to implement. Some blockchains intend to use L2 protocols as either a temporary or long-term solution.
            <br /><br />
            Bitcoin’s <span className="underline">Lightning Network</span> (LN) is a second-layer scaling solution designed to facilitate faster, low-cost transactions on the Bitcoin blockchain (L1). It operates on top of Bitcoin’s base layer, allowing for instant payments by circumventing the need for block confirmations.
            <br /><br />
            Transactions on the Lightning Network occur off-chain in payment channels between users. Only channel open and close transactions are recorded on the Bitcoin blockchain. Participants can transact multiple times within these channels, reducing congestion and fees on L1.
            <br /><br />
            Critics target LN for its prevalent use of custodial wallets, as these demand users place trust in third parties to handle their money. Moreover, the off-chain method poses a risk: if nodes lack proper backup, it could trigger an irrevocable loss of funds.
            <br /><br />
            Loopring uses zero-knowledge rollups (<span className="underline">ZK-rollups</span>) to batch hundreds of transactions off-chain and generate a cryptographic proof verifying their validity. This proof is submitted to layer one (Ethereum), avoiding the need to process each transaction on-chain.
            <br /><br />
            Polygon ZKEVM also uses ZK-rollup technology to offer high throughput Ethereum transactions with lower fees. On the risk side, some believe that relying heavily on ZK-rollups can introduce <span className="underline">centralization risks</span> as validators and sequencers become key to the system.
          </div>
        </div>
      </div>
    );
  }