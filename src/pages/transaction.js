
import { Text, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import Web3API from 'web3'
import {GiConvergenceTarget} from 'react-icons/gi'
import { BsArrowLeft } from 'react-icons/bs';

import  '../App.css'

//page imports 
import SpecificTrans from './specificTrans';


// api imports
import { fetchTransactionHistory, createTransaction, transactionStatus, fetchAmountWallet } from '../api/etherscan';
import { createWallet, fetchWallet, fetchUserWalletId, UpdateLinks } from '../api/UserWallet';



export default function TransactionPage(props) {
     

    const [userWallet, setUserWallet] = useState()
    const [walletLinks, setWalletLinks] = useState()
    const [walletTokens, setWalletTokens] = useState()
    const [transHistory, setTransHistory] = useState([])
    const [userId, setUserId] = useState()
    const [transStatusColor, settransStatusColor] = useState('')
    const [waitingforTrans, setWaitingforTrans] = useState()
    const [curtxObject, setCurTxObject] = useState({})
    const [partitionOfTokensStatus, setPartitionOfTokensStatus] = useState(0)
    const [convergeStatus, setConvergeStatus] = useState(false)
    const [displayMessage, setDisplayMessage] = useState(false)
    const [convergeMessageStatus, setConvergeMessageStatus] = useState(false)
    const [specificTransDict, setSpecificTransDict] = useState(false)
    const [viewSpecificTransPageStatus, setviewSpecificTransPageStatus] = useState(false)


    const [receiverAddress, setReceiverAddress] = useState('')
    const [amount, setAmount] = useState('')


    const handleReceiverAddress =(e) => {
        setReceiverAddress(e.target.value)
    }

    const handleAmount = (e) => {
        setAmount(e.target.value)
    }

    

    const checkAmount = (trans_amount) => {
        const polygonAddress = '0x0000000000000000000000000000000000001010'
        const amount = walletTokens[polygonAddress][0]
        const float_amount = parseFloat(amount) / 10 ** 12
        console.log("Float Amount: ", float_amount)
        if (trans_amount > float_amount) {
            return false
        } else {
            return true
        }
    }  

    const handleTransDictClick = (trans_dict) => {
        setSpecificTransDict(trans_dict)
        setviewSpecificTransPageStatus(true)
    }


    const handleSubmit = async() => {

        if (convergeStatus === true) {
            setDisplayMessage(true)
        } else {
            console.log("Receiver Address: ", receiverAddress)
            console.log("Amount: ", amount)
            const amount_check = checkAmount(amount)
            if ( amount_check === true) {
    
                // create transaction
                const trans_result = await createTransaction(userWallet['account']['address'], userWallet['account']['privateKey'], amount, receiverAddress)
                if (typeof trans_result !== 'string') {
                    // zero gas error introduction
                    setPartitionOfTokensStatus(2)
                } 
                setCurTxObject(trans_result)
                console.log("Current Transaction Hash: ", trans_result['hash'])
                setWaitingforTrans(true)
                var trans_status = await transactionStatus(trans_result['hash'])
                
                console.log("Trans Status: ", trans_status['hash'])
                while (trans_status !== 1) {
                    settransStatusColor('#fee440')
                    trans_status =  await transactionStatus(trans_result['hash'])
                    if (trans_status === 2) {
                        settransStatusColor('#c9184a')
                        break
                    }
                }
                if (trans_status === 1) {
                    settransStatusColor('#b5e48c')
                    const result = await fetchTransactionHistory(userWallet['account']['address'])
    
                    setTimeout(function() {
                        handleSetTransHistory(result)
                    }, 5000)
                    handleSetTransHistory(false)
                    
                }
    
                const web3 = new Web3API(new Web3API.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/f0W8brg5b2cD7AFOsBxlQWdlnAoRjqij'))
                const links_array = []
                for (let i =0; i < 2; i++) {        // creating two new wallets
                    let account = web3.eth.accounts.create(web3.utils.randomHex(32))
                    let wallet = web3.eth.accounts.wallet.add(account)
                    let keystore = await wallet.encrypt(web3.utils.randomHex(32))
                    var wallet_dict= {                   
                        account: account,
                        wallet: wallet[0],
                        keystore: keystore,
                        links: []
                    }
                    console.log(wallet_dict) // for dev --> take out for prod
                    let wallet_address = account['address']
                    console.log("Wallet Address: ", wallet_address)
                    links_array.push(wallet_dict)
                    var api_result = await createWallet(userId, wallet_address, wallet_dict)
                    if (api_result === true) {
                        console.log("Created Wallet")
    
                    } else {
                        console.log("Error adding new wallets to db from for loop: ", api_result)
                    }
    
                }
    
                console.log("New Links Array: ", links_array)
                var trans_wallet_address = userWallet['account']['address']
                var cur_link_array = walletLinks
                while (cur_link_array.length > 0) {
                    
                    var idx = Math.floor(Math.random() * (cur_link_array.length - 1))
                    const cur_wallet_dict = cur_link_array[idx]
                    const cur_wallet_address = cur_wallet_dict['account']['address']
                    const api_result = await fetchWallet(userId, cur_wallet_address)
                    const rel_wallet_dict_links = api_result[cur_wallet_address]['links']
                    console.log("Wallet Chosen: ", api_result[cur_wallet_address])
                    console.log("New Wallet Links: ", rel_wallet_dict_links)
                    
                    if (rel_wallet_dict_links.length === 0) {
                        trans_wallet_address = cur_wallet_address
                        cur_link_array = rel_wallet_dict_links
                        break
                    } else {
                        cur_link_array = rel_wallet_dict_links
                    }
                        
                    
                }
    
                const update_link_result = await UpdateLinks(userId, trans_wallet_address, links_array)
                if (update_link_result === true) {
                    
                    // partition of tokens
                    const user_wallets = await fetchWallet(userId, userWallet['account']['address'])
                    const result = await sendTokens(user_wallets)
                    setWaitingforTrans(false)
                    
                } else {
                    swal({
                        title:"Error 🚫",
                        text:"Internal Error while generating Wallets",
                        icon: "error",
                        button: "Continue"
            
                    })
                } 
                
                
    
                
    
    
    
            } else {
                // error message 
                console.log("You do not have enough funds")
                
                swal({
                    title:"Error 🚫",
                    text:"You do not have enough funds 😔",
                    icon: "error",
                    button: "Continue"
        
                })
                
            }
            setDisplayMessage(false)
        }


    }


    const sendTokens = async(user_api) => {
        console.log("User accounts from SendTokens(): ", user_api)
        const num_of_nodes = Object.keys(user_api).length
        console.log("Total number of nodes: ", num_of_nodes)
        const wallet_token_amount_result = await fetchAmountWallet(userWallet['account']['address'])
        const half_nodes = num_of_nodes / 2
        const total_amount_to_transfer_each_wallet = (parseFloat(wallet_token_amount_result) / half_nodes).toPrecision(1)
        console.log("Amount to send to each: ", total_amount_to_transfer_each_wallet)
        var cur_wallet = user_api[userWallet['account']['address']]
        console.log("Top of the tree: ", cur_wallet)
        var link_array = cur_wallet['links']

        var counter = 0

        while (counter !== half_nodes) {
            const random_wallet_transaction_idx = Math.floor(Math.random() * 2)
            var random_wallet_for_trans = link_array[random_wallet_transaction_idx]
            console.log("Random Wallet Chosen for Trans: ", random_wallet_for_trans)
            /* send transaction to this wallet here */
            const trans_result = await createTransaction(userWallet['account']['adress'], userWallet['account']['privateKey'], total_amount_to_transfer_each_wallet, random_wallet_for_trans['account']['address'])
            if (typeof trans_result !== 'string') { // polygon-related error
                setTimeout(function() {
                    setPartitionOfTokensStatus(2)
                }, 5000)
                setPartitionOfTokensStatus(0)
                
                break           
            }
            //
            const random_wallet_iterate_idx = Math.floor(Math.random() * 2)
            var random_wallet_iterate = link_array[random_wallet_iterate_idx]
            console.log("Random Wallet to iterate from: ", random_wallet_iterate)
            cur_wallet = random_wallet_iterate
            
            console.log("Original Link Array: ", link_array)
            var new_random_wallet_iterate;
            if (random_wallet_iterate_idx === 0) {
                 new_random_wallet_iterate = link_array[1]
                
            } else {
                 new_random_wallet_iterate = link_array[0]
            }

            const new_link_array = user_api[new_random_wallet_iterate['account']['address']]['links']
            link_array = user_api[random_wallet_iterate['account']['address']]['links']
            if (link_array.length === 0 && new_link_array.length === 0) { // edge case 1 -> when no more links to travel to 

                console.log("Tree has reached deadend")
                console.log("Link array length: ", link_array.length)
                console.log("New Link Array: ", new_link_array.length)




                break
            }

            if (link_array.length === 0) { // edge case 2 -> if one node has deadend, travel to the next 
                
                cur_wallet = new_random_wallet_iterate
                link_array = new_link_array
                console.log("setting new random Wallet with link array: ", link_array)
            } else {
                
                console.log("Setting new link Array: ", link_array)
            }
            

            counter += 1
            
        }
        
        setTimeout(function() {
            setPartitionOfTokensStatus(1)
        }, 5000)
        setPartitionOfTokensStatus(0)

        
        
    }

    const handleConvergeMessageStatus = () => {
        setConvergeMessageStatus(true)
    }

    const handleConvergeTokens = () => {
        setConvergeStatus(true)
        setConvergeMessageStatus(false)
        const converging_result = convergeTokens(userId, userWallet['account']['address'])
        const converged_wallets = converging_result[0]
        const total_tokens_back = converging_result[1]
        
    }

    const convergeTokens = async(user_id, target_wallet_address) => {
        const user_wallets = await fetchUserWalletId(user_id)
        console.log("Target Wallet Address: ", target_wallet_address)
        console.log("User Wallets: ", user_wallets)
        const distinct_wallets = Object.keys(user_wallets)
        

        var wallets_that_converged = []
        var sum = 0

        if (distinct_wallets.length === 0) {
            console.log("No Wallet Links, converging process will skip")
        } else {
            for (let i =0; i <= distinct_wallets.length; i++) {
                const cur_wallet_address = distinct_wallets[i]
                if (cur_wallet_address === undefined) {
                    continue
                } else {
                    const token_amount = await fetchAmountWallet(cur_wallet_address)
                    
                    if (token_amount <= 0.0000000000001) {
                        continue
                    } else {
                        console.log("Token Amount for Wallet: ", token_amount)
                        const sender_priv_key = user_wallets[cur_wallet_address]['account']['privateKey']
                        var trans_converge_result;
                        
                            if (token_amount >= 0.2) {
                                 trans_converge_result = await createTransaction(cur_wallet_address, sender_priv_key, (token_amount * 50), target_wallet_address)
                            } else if (0.01 <= token_amount < 0.2) {
                                 trans_converge_result = await createTransaction(cur_wallet_address, sender_priv_key, (token_amount * 20), target_wallet_address)
                            } else {
                                 trans_converge_result = await createTransaction(cur_wallet_address, sender_priv_key, (token_amount * 5), target_wallet_address)
                            }
                            console.log("trans converge result: ", trans_converge_result)
                            if (trans_converge_result !== false) {
                                console.log("Tokens were transferred back ")
                                wallets_that_converged.push(cur_wallet_address)
                                sum += token_amount
                        } else {
                            console.log("Not enough gas")
                            continue
                        }
                        
                    }
                }
            }
        }

        console.log("Converging Process Complete")
        setConvergeStatus(false)
        return [wallets_that_converged, sum]
    }


    const handleSetTransHistory = (trans_history) => {
        const new_trans_history = []

        for (let i = 0; i<= trans_history.length; i++) {
            const cur_dict = trans_history[i]
            if (cur_dict === undefined) {
                continue
            } else {
                if (cur_dict['value'] === null) {
                    continue
                } else {
                    new_trans_history.push(cur_dict)
                }
            }
        }
        setTransHistory(new_trans_history)
    } 

    useEffect(() => {

        const wallet_obj = props.wallet_obj
        console.log("Wallet Object: ", wallet_obj)
        
        setUserWallet(wallet_obj)

        const wallet_links = wallet_obj['links']
        console.log("Wallet Links: ", wallet_links)
        setWalletLinks(wallet_links)

        const wallet_tokens = props.wallet_tokens
        console.log("Wallet Tokens: ", wallet_tokens)
        setWalletTokens(wallet_tokens)

        const user_id = props.userId
        console.log("User id: ", user_id)
        setUserId(user_id)
        
        async function handleTransactionAPI (account_address)  {
            console.log("ACcount Add: ", account_address)
            const result = await fetchTransactionHistory(account_address)
            handleSetTransHistory(result)

        }

        handleTransactionAPI(wallet_obj['account']['address'])


        //converging tokens


    }, [])

    return (
        <div>
            {viewSpecificTransPageStatus === true?
            
            <div>
                <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                        <button onClick={() => setviewSpecificTransPageStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                </div>
                <div>
                    <SpecificTrans trans_obj={specificTransDict} />
                </div>
            </div>
            
            :

            <div>
                <div className='covergeButton'>
                <button onClick={() => handleConvergeMessageStatus()}><GiConvergenceTarget /></button>
            </div>
            <div style={{marginBottom: "10px", fontSize:'16px'}}>
                <Text as='b'>Transactions </Text>
            </div>

            {convergeMessageStatus === true?
            <Center>
            <div className='convergeMessageBox'>
                <div style={{fontSize:'16px'}}>
                    <Text as='b'>Converging Wallets ⚠️</Text>
                </div>
                <div style={{fontSize: '12px', marginTop:'5px'}}>
                    <Text as='b'>There must be enough MATIC in the wallet to transfer the funds and account for the small gas fees.</Text>
                </div>
                <div style={{fontSize:'12px', marginTop:'5px'}}>
                    <Text as='b'>Any wallet that does NOT have enough funds will be skipped.</Text>
                </div>
                <Center>
                <div style={{display:'flex', position: 'absolute', bottom:'0', marginBottom:'5px'}}>
                    <div className='backButton'>
                        <button onClick={() => setConvergeMessageStatus(false)}><Text as='b'>Back</Text></button>
                    </div>
                    <div className='continueConvergeButton'>
                        <button onClick={() => handleConvergeTokens()}><Text as='b'>Continue</Text></button>
                    </div>
                </div>
                </Center>


            </div>
            </Center>
            
            :
            
            <div></div>}

            {partitionOfTokensStatus === 1?
            
            <div style={{fontSize: '12px', marginBottom: '5px', color:'#b5e48c'}}>
                <Text as='b'>
                    Partition of Tokens in Sub-Wallets is Complete
                </Text>

            </div>
            
            
            :<div></div>}

            {partitionOfTokensStatus === 2?
            
            <div style={{fontSize: '12px', marginBottom: '5px', color:'#c9184a'}}>
                <Text as='b'>
                    Partition of Tokens has not Begun
                </Text>

            </div>
            
            
            :<div></div>}


            <div style={{textAlign:'left', fontSize: '14px'}}>
                <Text as='b'>Create a Transaction 💰</Text>
            </div>

            <div style={{fontSize:'12px', color: 'gray', marginTop: '10px'}}>
                <Text as='b'>Transactions are only done in MATIC Tokens 🌴</Text>
            </div>


            <div className='receiverInput'>
                <input placeholder='Receiver Address' onChange={(e) => handleReceiverAddress(e)}></input>

            </div>
            <div className='receiverInput'>
                <input placeholder='Amount (MATIC)' onChange={(e) => handleAmount(e)}></input>
            
            </div>

            <Center>
                <div>
                {waitingforTrans === true?
                
                <div className='transStatusBox'>
                    <div style={{display: 'flex'}}>
                        <div style={{fontSize: '14px', color: 'gray', position: 'absolute', left: '0', paddingLeft: '40px'}}>
                            <Text as='b'>{curtxObject['hash'].slice(0, 10)}...</Text>
                        </div>
                        <div style={{fontSize: '14px', position: 'absolute', right:'0', paddingRight: '40px'}}>
                            <Text as='b'>{parseInt(curtxObject['value'])/ (10 ** 18).toPrecision(4)} MATIC</Text>
                        </div>
                    </div>
                    <Center>
                    <div style={{display: 'flex', marginTop: "20px", fontSize: '14px'}}>
                        <div style={{marginRight: "6px"}}>
                            <Text as='b'>Status: </Text>
                        </div>
                        <div>
                        {transStatusColor === '#fee440'?
                            <div style={{color: transStatusColor}}>
                                <Text>Pending...</Text>
                            </div>
                        :
                        <div>
                            {transStatusColor === '#c9184a'?
                            <div style={{color: transStatusColor}}>
                                <Text>Failed</Text>
                            </div>:

                            <div>
                                {transStatusColor === '#b5e48c' ? 
                                    <div style={{color: transStatusColor}}>
                                        <Text as='b'>Complete</Text>
                                    </div>:
                                    <div>
                                    </div>
                                }
                            </div>
                            }
                        </div>
                        }
                        </div>
                    </div>
                    </Center>
                </div>
                
                :

                    <div>
                        {convergeStatus === true?
                        
                        <div style={{fontSize:'10px', paddingTop:'2px'}}>
                            
                            <Text as='b'>Converging Process is Running 😄</Text> <br />
                            <Text as='b'>Please wait until the process is complete to send MATIC </Text>


                        </div>:
                            <div>
                                 <div>
                                    <Text>Amount in USD: </Text>
                                </div>
                        
                            <div className='submitTransactionButton'>
                                <button onClick={() => handleSubmit()}>
                                    <Text as='b'>
                                        Submit ✨
                                    </Text>
                                </button>
                        
                            </div>
                            </div>
                        }

                    </div>
                    
                }
                
                </div>
            </Center>

            <div>
                <div style={{textAlign: 'left', fontSize: '14px', marginTop:"10px", marginBottom: '2px'}}>
                    <Text as='b'> Recent Transactions ⏰</Text>
                </div>

                <div className='transHistory'>
                    {transHistory.length === 0?
                    
                    <div>
                        
                        <Text as='b'>No Transactions Made Yet 😔</Text>


                    </div>:
                    <div >
                        {transHistory.map((trans_dict, idx) => (
                            <button onClick={() => handleTransDictClick(trans_dict)}>
                                <div key={idx} className='transHistoryBox'>
                                    <div style={{fontSize: '14px'}}>
                                        <Text>{trans_dict['hash'].slice(0, 10)}...</Text>
                                    </div>
                                    <div style={{marginLeft: '40px', fontSize:'14px'}}>
                                        <Text>{trans_dict['value'].toFixed(4)}</Text>
                                    </div>

                                    
                                    <div style={{marginLeft:"10px", fontSize:'14px'}}>
                                        <Text>{trans_dict['asset']}</Text>
                                    </div>
                                </div>
                            </button>

                        ))}
                    </div>
                    
                    
                    }
                </div>

            </div>
            

        </div>
            
            }
        </div>

    )
}