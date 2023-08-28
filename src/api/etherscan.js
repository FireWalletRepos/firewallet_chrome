import axios from 'axios'
import { Alchemy, Network, Utils} from "alchemy-sdk";



const config = {
    apiKey: "API_KEY",
    network: Network.MATIC_MUMBAI,
};
  const alchemy = new Alchemy(config);




export const createTransaction = async(sender_add, private_key, amount, receiever_wallet_key) => {
    try {
        const response = await axios.get(`https://firewallet-git-master-jaival.vercel.app/token/createTransaction/${private_key}/${amount}/${receiever_wallet_key}/${sender_add}`, {
            method: "GET"
        })

        const result = await response
        console.log("Transaction Object: ", result)
        if (result === false) {
            return []
        } else {
            return result['data']
        }
        

    } catch (err) {
        console.log("DB Error: ", err)
        return []
    }
}


export const fetchGasOracle = async() => {
    try {
        const response = await axios.get(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=SPETDNDAZKMU5JV1JK8S7FPANXFSFETBP2`)
        var result = await response
        console.log("etherscan result: ", result['data']['result'])
        return result['data']['result']
    } catch (err) {
        console.log("EtherScan Error: ", err)
        return {}
    }
}





export const fetchMarketData = async() => {
    try {
        const response = await axios.get('https://tokens.coingecko.com/uniswap/all.json', {
            method: "GET"
        })

        const result = await response
        console.log("CoingGecko Result: ", result)
        return result

    } catch (err) {
        console.log("Fetching local error: ", err)
    }
}

export const fetchMarketPayments = async() => {
    try {
        const response = await axios.get('https://firewallet-git-master-jaival.vercel.app/token/tokenPaymentArray', {
            method: "GET"
        })
        const result = await response
        console.log("Result from CoinGecko from API Page: ", result['data'])
        return result['data']
    } catch (err) {
        console.log("Error: ", err)
    }
}

export const fetchTopNFTs = async() => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/nfts/list?order=h24_volume_native_desc&asset_platform_id=ethereum&per_page=200&page=1', {
            method: "GET",
            
        })
        const result = await response 
        console.log("NFT List: ", result['data'])
        
        return result['data']

    } catch (err) {
        console.log(err)
        return []
    }
}   



export const fetchNFTInfo = async(nft_id) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/nfts/${nft_id}`, {
            method: "GET",
            headers: {
                'content-type': 'application/json'
            }
        })

        const result = await response
        console.log("Specific NFT Information: ", result['data'])
        return result['data']
    } catch (err) {
        console.log("Error: ", err)

    }
}

export const fetchTransactionHistory = async(account_address) => {
    try {
        const data = await alchemy.core.getAssetTransfers({
            fromBlock: "0x0",
            fromAddress: account_address,
            category: ["external", "erc20", "erc721", "erc1155"],
          });

        const result = await data
        console.log("Transaction History: ", result['transfers'])
        return result['transfers']
    } catch (err) {
        console.log("Etherscan Error: ", err)
        return []
    }
}

export const transactionStatus = async(transaction_hash) => {
    try {
        const alchemy = new Alchemy(config);

        // Getting the status of the transaction using getTransactionReceipt and logging accordingly
        const trans_status = await alchemy.core.getTransactionReceipt(transaction_hash)
        if (trans_status === null) {
            return 0
        } else if (trans_status.status === 1) {
            return 1
        } else {
            return 2
        }
    } catch (err) {
        console.log('Alchemy Error: ',err)
        return 2
    }
}


export const fetchAmountWallet = async(wallet_address) => {
    try {
        const alchemy = new Alchemy(config);

        const result = await alchemy.core.getBalance(wallet_address, 'latest')
        console.log("Did it work?: ", result)
        const rel_balance = Utils.formatEther(result)
        console.log("Rel balance: ", rel_balance)
        return rel_balance
    } catch (err) {
        console.log("Alchemy Error: ", err)
    }
}

export const fetchWalletMintedNfts = async(wallet_address) => {

const new_config_for_nft = {
    apiKey: "API_KEY",
    network: Network.ETH_MAINNET,
};
    try {
        const alchemy = new Alchemy(new_config_for_nft)
        const nfts = await alchemy.nft.getNftsForOwner(wallet_address);
        console.log("Minted NFTs: ", nfts)
        return nfts['ownedNfts']
    } catch (err) {
        console.log("Alchemy Error: ", err)
    }
}

