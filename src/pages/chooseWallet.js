import { Text, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import  '../App.css';
import swal from 'sweetalert';
import Web3API from 'web3'
import { Network, Alchemy } from 'alchemy-sdk';
import {BsArrowLeft, BsNewspaper} from 'react-icons/bs'
//fetching React Components
import WalletHomepage from './walletHomepage'

//fetching API Endpoints

import {fetchUserWallets, createWallet, fetchWalletNames} from '../api/UserWallet'

const settings = {
    apiKey: "API_KEY", // must be in an .env file before prod
    network: Network.MATIC_MUMBAI,              // real polygon for prod
};

const alchemy = new Alchemy(settings)


export default function ChooseWalletPage(props) {

    const [errorMessageStatus, seterrorMessageStatus] = useState(false)
    const [UserWalletDict, setUserWalletDict] = useState({})
    const [userId, setUserId] = useState(0)
    const [walletTokenDict, setWalletTokenDict] = useState({})
    const [walletChosenStatus, setWalletChosenStatus] = useState(false)
    const [walletNameInfo, setWalletNameInfo] = useState({})
    const [relativePropWalletNameInfo, setPropWalletNameInfo] = useState()


    // prop amount
    const [tokenInWalletProp, setTokenInWalletProp] = useState()
    const [relativeWalletObjProp, setRelativeWalletObjProp] = useState()
    

    const fetchWallets = async (user_password) => {
        const result = await fetchUserWallets(user_password)
        try {
            console.log(result[0])
            const wallet_dict = JSON.parse(result[0])
            console.log("User Wallet Dictionary: ", wallet_dict)
            console.log("User Id: ", result[1])
            setUserWalletDict(wallet_dict)
            
            
            setUserId(result[1])
            return wallet_dict

        } catch (err) {
            seterrorMessageStatus(true)
        }
        
        
    }

    const fetchPolygonAmount = async (current_wallet_address, polygonMumbaiContract) => {
        const mumbai_result = await alchemy.core.getTokenBalances(current_wallet_address, [polygonMumbaiContract])
        const mumbai_amount_hash = mumbai_result['tokenBalances'][0]['tokenBalance']
        const mumbai_amount_float = (parseInt(mumbai_amount_hash) / 10 ** 6).toFixed(2)
        
        const mumbai_metadata = await alchemy.core.getTokenMetadata(polygonMumbaiContract)
        const mumbai_symbol = await mumbai_metadata['symbol']
        return [mumbai_amount_float, mumbai_symbol]

    }

    const createWalletTokenBalance = async (wallet_dict) => {
        const wallet_addresses_array = Object.keys(wallet_dict)
       
        const polygonMumbaiContract= '0x0000000000000000000000000000000000001010'

        const wallet_token_dict = {}

        console.log("Wallet Address Array: ", wallet_addresses_array)
        for (let i =0; i <= wallet_addresses_array.length; i++) {
            var tokens = {}
            const current_wallet_address = wallet_addresses_array[i]
            if (current_wallet_address === undefined || current_wallet_address === 'links') {
                continue
            } else {
                
                
                const result = await alchemy.core.getTokenBalances(current_wallet_address)
                const tokens_array = result['tokenBalances']
                
                if (tokens_array.length === 0) {                                                          // new Wallets
                    const add_mumbai_result = await fetchPolygonAmount(current_wallet_address, polygonMumbaiContract)
                   // console.log("Mumbai in Float: ", mumbai_amount_float, mumbai_symbol)
                    tokens[polygonMumbaiContract] = [add_mumbai_result[0], add_mumbai_result[1]]

                } else {
                    for (let token_idx = 0; token_idx <= tokens_array.length; token_idx++) {            // existing wallets
                        const current_token_dict = tokens_array[token_idx]
                        if (current_token_dict === undefined) {
                            continue
                        } else {
                            const current_token_address = current_token_dict['contractAddress']
                            const current_token_amount_hash = current_token_dict['tokenBalance']
                            const current_token_amount_float = (parseInt(current_token_amount_hash) / 10 ** 6).toFixed(2)
                            const contract_metadata = await alchemy.core.getTokenMetadata(current_token_address)
                            const contract_symbol = await contract_metadata['symbol']
                            //console.log("Contract Amount: ", current_token_amount_float, contract_symbol)
                            tokens[current_token_address] = [current_token_amount_float, contract_symbol]
                        }
                    }
                }

                // double check for polygon MATIC for wallets that have been imported
                const tokens_keys = Object.keys(tokens)
                if (tokens_keys.includes(polygonMumbaiContract) === false) {
                    
                    const polygon_amount = await fetchPolygonAmount(current_wallet_address, polygonMumbaiContract)
                    tokens[polygonMumbaiContract] = [polygon_amount[0], polygon_amount[1]]
                }
 
                wallet_token_dict[current_wallet_address] = tokens
               
                

                
            }
            
            
            



        }
        console.log("Wallet Dict: ", wallet_token_dict)
        return wallet_token_dict
        

    }

    const filterWalletAmount = (wallet_amount) => {
        const wallet_amount_float = parseFloat(wallet_amount)
        return (wallet_amount_float / (10**12))
    }

    const generateWallet = async () => {
        console.log("Generating Wallet")
        const web3 = new Web3API(new Web3API.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/f0W8brg5b2cD7AFOsBxlQWdlnAoRjqij'))
        let account = web3.eth.accounts.create(web3.utils.randomHex(32))
        let wallet = web3.eth.accounts.wallet.add(account)
        let keystore = wallet.encrypt(web3.utils.randomHex(32))
        var wallet_dict= {                   
            account: account,
            wallet: wallet,
            keystore: keystore,
            links: []
        }
        console.log(wallet_dict) // for dev --> take out for prod
        let wallet_address = account['address']
        console.log("Wallet Address: ", wallet_address)
        
        var api_result = await createWallet(userId, wallet_address, wallet_dict)
        if (api_result === true) {
            swal({
                title:"Success!",
                text:"You have successfully created a Wallet 🎆",
                icon: "success",
                button: "Cool!"
    
            })
        } else {
            swal({
                title:"Error 🚫",
                text:"There was an Error creating your account",
                icon: "error",
                button: "Continue"
    
            })
        }


    }

    const handleWalletClick = (wallet_address) => {
        console.log("The user wants to interact with Wallet: ", wallet_address)
        const tokens_in_wallet = walletTokenDict[wallet_address]
        const rel_wallet_obj = UserWalletDict[wallet_address]
        console.log("Relative Wallet Obj: ", rel_wallet_obj)
        setWalletChosenStatus(true)
        setTokenInWalletProp(tokens_in_wallet) 
        setRelativeWalletObjProp(rel_wallet_obj)
        const relative_wallet_dict = walletNameInfo[wallet_address]
        setPropWalletNameInfo(relative_wallet_dict)


    }

    const fetchWalletNamesfromApi = async () => {
        const result = await fetchWalletNames()
        while (result === undefined) {
            continue
        }    
        
        setWalletNameInfo(result)
    }

    useEffect(() => {
        const user_password = props.value
        console.log("User Password from Props: ", user_password) // for dev --> take out for prod
        
        async function fetchWalletDict() {
            const resulting_wallet_dict = await fetchWallets(user_password)
            console.log("resulting wallet dict: ", resulting_wallet_dict)
            return resulting_wallet_dict
        }

        async function fetchWalletTokenDict() {
             var resulting_dict = await fetchWalletDict()
             const wallet_token_dict_result = await createWalletTokenBalance(resulting_dict)
             console.log("Wallet TOken Dict Result: ", wallet_token_dict_result)
             setWalletTokenDict(wallet_token_dict_result)
        } 

        
        fetchWalletTokenDict()
        fetchWalletNamesfromApi()
       
        

        
        
        

        
        
    }, [])


    return (
        <div className='App'>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'); // font import
            </style>

            {console.log("user id: ", userId)}
            {walletChosenStatus === true?
            <div> 
               
             <div>
            <WalletHomepage walletNameDict={relativePropWalletNameInfo} user={userId} tokenWallet={tokenInWalletProp} walletObj={relativeWalletObjProp}/> 
            </div>
            </div>
            : 
            
            <div>
            <div style={{fontSize: "25px", marginBottom:"20px"}}>
                <Text as='b'> Choose your Wallet 🤔</Text>
            </div>

            {errorMessageStatus === true? 
            <div style={{marginTop: "50px"}}>
                <Text>😱 There was an Error Loading your Wallets...</Text>
            </div>:
            <Center>
            <div>
                
                {Object.keys(UserWalletDict).length === 0? 
                    <div style={{fontSize: "16px", marginTop: "130px"}}>
                        <Text as='b'>You have no FireWallets yet 🚨</Text>
                        <div style={{padding: "3px", fontSize: "14px", marginTop: "5px"}}>
                            <Text> Please create a Wallet to get Started Interacting with the Polygon Chain 🌴</Text>
                        </div>
                    </div>


            
                :
                <div className='walletBox'>
                    
                    {
                        
                    
                    Object.keys(UserWalletDict).map((wallet_address, idx) => (
                        
                        <div>
                            {wallet_address === 'links'?<div></div>:
                                
                                <div className='walletButton' key={idx}>
                                    {walletNameInfo[wallet_address]=== undefined?<div></div>:
                                        <button onClick={() => handleWalletClick(wallet_address)}>
                                            {walletNameInfo[wallet_address]['wallet_name'].length > 15?<Text as= 'b'>🔥   {walletNameInfo[wallet_address]['wallet_name'].slice(0, 15)}...</Text>:<Text as= 'b'>🔥   {walletNameInfo[wallet_address]['wallet_name']}...</Text>}
                                            
                                            <div style={{fontSize: '10px'}}>
                                                {walletTokenDict[wallet_address] === undefined?<div>Amount: Loading...</div>:<Text>Amount: {filterWalletAmount(walletTokenDict[wallet_address]['0x0000000000000000000000000000000000001010'])}</Text>}
                                                
                                            </div>
                                        </button>
                                    
                                    }

                                </div>
                            
                            
                            }

                        </div>
                    ))}
                </div>
                
                
                }
                <Center>
                <div className='createWalletButton'>
                    <button onClick={async () => {await generateWallet()}}>
                        <Text as='b'>Create a Wallet 🌈</Text>
                
                    </button>
                </div>
                </Center>

            </div>
            </Center>
        
                }
            

        </div>
            
    }




        </div>
    )
}