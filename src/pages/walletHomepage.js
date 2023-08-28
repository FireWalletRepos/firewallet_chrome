
import { Text, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import  '../App.css';
import {FiSettings} from 'react-icons/fi'
import {BsChat} from 'react-icons/bs'
import {BiNavigation, BiGasPump, BiSolidCubeAlt, BiBrain} from 'react-icons/bi'
import {AiOutlineSwap, AiOutlineHome, AiOutlineShoppingCart} from 'react-icons/ai'
import {BsArrowLeft, BsNewspaper} from 'react-icons/bs'
import {ImPriceTags} from 'react-icons/im'
import {FaRegHandshake} from 'react-icons/fa'

import swal from 'sweetalert';

//API imports 
import {updateWalletInfo, getWalletNames, updateWalletName, updatePassword, deleteWallet} from '../api/UserWallet'
import { fetchNews } from '../api/ai';
import NewsPage from './newspage';
import { fetchGasOracle, fetchMarketData, fetchTokens, fetchWalletMintedNfts} from '../api/etherscan';


// Page imports
import PricePage from './pricepage';
import NFTMarketplace from './nftmarketplace';
import LearningPage from './learning';
import TransactionPage from './transaction'
import Vis from './vis'
import SpecificWalletNFT from './specificWalletNFT';








export default function WalletHomepage(props) {
    
    const [walletTokensDict, setWalletTokensDict] = useState({})
    const testWalletTokenDict = {'0x0000000000000000000000000000000000001010': ['1.00', 'ETH'], '0x00000000000000000000000000000000000011232': ['1.00', 'MATIC'],'0x00000000000000000000000000000000000011232132': ['1.00', 'MATIC'], '0x000000000000000000000000000000000000115631': ['1.00', 'MATIC']   }
    const [walletObj, setWalletObj] = useState({})
    const [userId, setuserId] = useState()
    const [emojiArray, setEmojiArray] = useState([
        '😄','😃','😀','😊', '😉','😍','😘','😚','😗','😙','😜','😝','😛','😳','😁','😔','😌','😒','😞','😣','😢','😂','😭','😪','😥','😰','😅','😓','😩','😫','😨','😱','😠','😡','😤','😖','😆','😋','😷','😎','😴','😵','😲','😟','😦','😧','😈','👿','😮','😬','😐','😕','😯','😶','😇','😏','😑','👲','👳','👮','👷','💂','👶','👦','👧','👨','👩','👴','👵','👱','👼','👸','😺','😸','😻','😽','😼','🙀','😿','😹','😾','👹','👺','🙈','🙉','🙊','💀','👽','💩','🔥','✨','🌟','💫','💥','💢','💦','💧','💤','💨','👂','👀','👃','👅','👄','👍','👎','👌','👊','✊','✌','👋','✋','👐','👆','👇','👉','👈','🙌','🙏','☝','👏','💪','🚶','🏃','💃','👫','👪','👬','👭','💏','💑','👯','🙆','🙅','💁','🙋','💆','💇','💅','👰','🙎','🙍','🙇','🎩','👑','👒','👟','👞','👡','👠','👢','👕','👔','👚','👗','🎽','👖','👘','👙','💼','👜','👝','👛','👓','🎀','🌂','💄','💛','💙','💜','💚','❤','💔','💗','💓','💕','💖','💞','💘','💌','💋','💍','💎','👤','👥','💬','👣','💭','🐶','🐺','🐱','🐭','🐹','🐰','🐸','🐯','🐨','🐻','🐷','🐽','🐮','🐗','🐵','🐒','🐴','🐑','🐘','🐼','🐧','🐦','🐤','🐥','🐣','🐔','🐍','🐢','🐛','🐝','🐜','🐞','🐌','🐙','🐚','🐠','🐟','🐬','🐳','🐋','🐄','🐏','🐀','🐃','🐅','🐇','🐉','🐎','🐐','🐓','🐕','🐖','🐁','🐂','🐲','🐡','🐊','🐫','🐪','🐆','🐈','🐩','🐾','💐','🌸','🌷','🍀','🌹','🌻','🌺','🍁','🍃','🍂','🌿','🌾','🍄','🌵','🌴','🌲','🌳','🌰','🌱','🌼','🌐','🌞','🌝','🌚','🌑','🌒','🌓','🌔','🌕','🌖','🌗','🌘','🌜','🌛','🌙','🌍','🌎','🌏','🌋','🌌','🌠','⭐','☀','⛅','☁','⚡','☔','❄','⛄','🌀','🌁','🌈','🌊','🎍','💝','🎎','🎒','🎓','🎏','🎆','🎇','🎐','🎑','🎃','👻','🎅','🎄','🎁','🎋','🎉','🎊','🎈','🎌','🔮','🎥','📷','📹','📼','💿','📀','💽','💾','💻','📱','☎','📞','📟','📠','📡','📺','📻','🔊','🔉','🔈','🔇','🔔','🔕','📢','📣','⏳','⌛','⏰','⌚','🔓','🔒','🔏','🔐','🔑','🔎','💡','🔦','🔆','🔅','🔌','🔋','🔍','🛁','🛀','🚿','🚽','🔧','🔩','🔨','🚪','🚬','💣','🔫','🔪','💊','💉','💰','💴','💵','💷','💶','💳','💸','📲','📧','📥','📤','✉','📩','📨','📯','📫','📪','📬','📭','📮','📦','📝','📄','📃','📑','📊','📈','📉','📜','📋','📅','📆','📇','📁','📂','✂','📌','📎','✒','✏','📏','📐','📕','📗','📘','📙','📓','📔','📒','📚','📖','🔖','📛','🔬','🔭','📰','🎨','🎬','🎤','🎧','🎼','🎵','🎶','🎹','🎻','🎺','🎷','🎸','👾','🎮','🃏','🎴','🀄','🎲','🎯','🏈','🏀','⚽','⚾','🎾','🎱','🏉','🎳','⛳','🚵','🚴','🏁','🏇','🏆','🎿','🏂','🏊','🏄','🎣','☕','🍵','🍶','🍼','🍺','🍻','🍸','🍹','🍷','🍴','🍕','🍔','🍟','🍗','🍖','🍝','🍛','🍤','🍱','🍣','🍥','🍙','🍘','🍚','🍜','🍲','🍢','🍡','🍳','🍞','🍩','🍮','🍦','🍨','🍧','🎂','🍰','🍪','🍫','🍬','🍭','🍯','🍎','🍏','🍊','🍋','🍒','🍇','🍉','🍓','🍑','🍈','🍌','🍐','🍍','🍠','🍆','🍅','🌽','🏠','🏡','🏫','🏢','🏣','🏥','🏦','🏪','🏩','🏨','💒','⛪','🏬','🏤','🌇','🌆','🏯','🏰','⛺','🏭','🗼','🗾','🗻','🌄','🌅','🌃','🗽','🌉','🎠','🎡','⛲','🎢','🚢','⛵','🚤','🚣','⚓','🚀','✈','💺','🚁','🚂','🚊','🚉','🚞','🚆','🚄','🚅','🚈','🚇','🚝','🚋','🚃','🚎','🚌','🚍','🚙','🚘','🚗','🚕','🚖','🚛','🚚','🚨','🚓','🚔','🚒','🚑','🚐','🚲','🚡','🚟','🚠','🚜','💈','🚏','🎫','🚦','🚥','⚠','🚧','🔰','⛽','🏮','🎰','♨','🗿','🎪','🎭','📍','🚩','⬆','⬇','⬅','➡','🔠','🔡','🔤','↗','↖','↘','↙','↔','↕','🔄','◀','▶','🔼','🔽','↩','↪','ℹ','⏪','⏩','⏫','⏬','⤵','⤴','🆗','🔀','🔁','🔂','🆕','🆙','🆒','🆓','🆖','📶','🎦','🈁','🈯','🈳','🈵','🈴','🈲','🉐','🈹','🈺','🈶','🈚','🚻','🚹','🚺','🚼','🚾','🚰','🚮','🅿','♿','🚭','🈷','🈸','🈂','Ⓜ','🛂','🛄','🛅','🛃','🉑','㊙','㊗','🆑','🆘','🆔','🚫','🔞','📵','🚯','🚱','🚳','🚷','🚸','⛔','✳','❇','❎','✅','✴','💟','🆚','📳','📴','🅰','🅱','🆎','🅾','💠','➿','♻','♈','♉','♊','♋','♌','♍','♎','♏','♐','♑','♒','♓','⛎','🔯','🏧','💹','💲','💱','©','®','™','〽','〰','🔝','🔚','🔙','🔛','🔜','❌','⭕','❗','❓','❕','❔','🔃','🕛','🕧','🕐','🕜','🕑','🕝','🕒','🕞','🕓','🕟','🕔','🕠','🕕','🕖','🕗','🕘','🕙','🕚','🕡','🕢','🕣','🕤','🕥','🕦','✖','➕','➖','➗','♠','♥','♣','♦','💮','💯','✔','☑','🔘','🔗','➰','🔱','🔲','🔳','🔺','⬜','⬛','⚫','⚪','🔴','🔵','🔻','🔶','🔷','🔸','🔹'
    ])
    
    const [walletColorArray, setColorArray] = useState(['#eae4e9', '#fff1e6', '#fde2e4', '#fad2e1', '#e2ece9', '#bee1e6', '#f0efeb', '#dfe7fd', '#cddafd', '#ffd6ff', '#e7c6ff', '#c8b6ff', '#b8c0ff', '#bbd0ff', '#ff99c8', '#fcf6bd', '#d0f4de', '#a9def9', '#e4c1f9' ])
    const [walletColor, setWalletColor] = useState()
    const [walletEmoji, setWalletEmoji] = useState()
    const [walletName, setWalletName] = useState()
    const [walletLinks, setWalletLinks] = useState()
    const [inputWalletName, setInputWalletName] = useState('')
    const [formerPassword, setFormerPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')

    const [walletNameDict, setWalletNameDict] = useState({})
    const [newsDict, setnewsDict] = useState()
    const [gasDict, setgasDict] = useState()
    const [gweiColor, setGweiColor] = useState()
    const [tokenArray, setTokenArray] = useState([])
    const [ownedNftArray, setownedNftArray] = useState([])
    const [propnftObj, setPropNftObj] = useState()
    
    //view page useStates
    const [viewSettingsStatus, setViewSettingsStatus] = useState(false)
    const [viewAIStatus, setViewAIStatus] = useState(false)
    const [viewNewsStatus, setviewNewsStatus] = useState(false)
    const [viewPriceStatus, setViewPriceStatus] = useState(false)
    const [viewNFTStatus, setViewNFTStatus] = useState(false)
    const [viewLearningStatus, setViewLearningStatus] = useState(false)
    const [viewTransactionStatus, setViewTransactionStatus] = useState(false)
    const [viewVisStatus, setViewVisStatus] = useState(false)
    const [viewWalletNFT, setViewWalletNFT] = useState(false)


    const handleSetOwnedNft = (owned_nfts) => {
        setownedNftArray(owned_nfts)
    }


    useEffect(() => {
        const propwalletTokensDict = props.tokenWallet
        const propwalletObj = props.walletObj
        const propuserId = props.user
        const propWalletName = props.walletNameDict
        const propWalletlinks = propwalletObj['links']
        setWalletLinks(propWalletlinks)
        console.log("Wallet Tokens Dict: ", propwalletTokensDict)
        setWalletTokensDict(propwalletTokensDict)
        console.log("Wallet Obj: ", propwalletObj)
        setWalletObj(propwalletObj)
        console.log("User Id from Prop: ", propuserId)
        setuserId(propuserId)
        console.log("Wallet Name Dict: ", propWalletName)
        setWalletNameDict(propWalletName)
        setWalletColor(propWalletName['color'])
        setWalletEmoji(propWalletName['emoji_unicode'])
        setWalletName(propWalletName['wallet_name'])

        async function awakenGptModel()  {
            await handleGptModel()
        }

        async function awakenEtherScanApi() {
            await handleEtherScanApi()
            
        }

        async function awakenMarketDataApi() {
            await handleFetchMarketDataApi()
        }

        async function awakenfetchWalletNftApi (wallet_address) { // need to add wallet_address
            const nfts = await fetchWalletMintedNfts(wallet_address)
            handleSetOwnedNft(nfts)

        }

        


        awakenGptModel()
        awakenEtherScanApi()
        awakenMarketDataApi()
        awakenfetchWalletNftApi (propwalletObj['account']['address'])
        
        
        
        
        
        
    },  [])

    

    const handleSettingsClick = () => {
        setViewSettingsStatus(true)
    }

    const handleViewLearningPage = (e) => {
        setViewLearningStatus(true)
    }

    const goHome = () => {
        window.location.replace('index.html')
    }

    const handleDelete = async(user_id, wallet_address) => {
        const delete_result = await deleteWallet(userId, wallet_address)
        if (delete_result === true) {
            swal({
                title:"Success ✅",
                text:"Successfully deleted wallet",
                icon: "success",
                button: "Continue"
    
            })
            goHome()

        } else {
            swal({
                title:"Error 🚫",
                text:"There was an internal server error",
                icon: "error",
                button: "Continue"
    
            })
        }

    }

    const handleGoBackHomeFromSettings = () => {
        if (walletEmoji !== undefined && walletColor !== undefined) {
            console.log("In loop")
            const result = updateWalletInfo(walletObj['account']['address'], walletColor, walletEmoji) 
            if (typeof result === 'string') {
                swal({
                    title:"Error 🚫",
                    text:"There was an internal server error",
                    icon: "error",
                    button: "Continue"
        
                })
            } 
        }
        setViewSettingsStatus(false)
    }

    const handleNameChange = (e) => {
        console.log("New Wallet Name: ", e.target.value)
        setInputWalletName(e.target.value)
    }

    const handleFormerPasswordChange = (e) => {
        console.log("Former Password: ", e.target.value)
        setFormerPassword(e.target.value)
    }

    const handleNewPasswordChange = (e) => {
        console.log("New Password: ", e.target.value)
        setnewPassword(e.target.value)
    }

    const handleChangeWalletSubmit = async () => {
        const names = await getWalletNames()
        if (typeof names === 'string') {
            swal({
                title:"Error 🚫",
                text:"There was an internal server error",
                icon: "error",
                button: "Continue"
    
            })
        } else {
            console.log("Names: ", names)
            var change_status = true
            for (let i =0; i <= names.length; i++) {
                const current_wallet_dict = names[i]
                if (current_wallet_dict === undefined) {
                    continue
                } else {
                    const wallet_name =  current_wallet_dict['wallet_name']
                    if (wallet_name === inputWalletName) {
                        change_status = false
                    } else {
                        continue
                    }
                }
            }
    
            if (change_status === false) {
                swal({
                    title:"Error 🚫",
                    text:"Another Wallet has this name",
                    icon: "error",
                    button: "Continue"
        
                })
    
            } else {
                const result = await updateWalletName(walletObj['account']['address'], inputWalletName)
                if (typeof result !== 'string') {
                    swal({
                        title:"Success ✅",
                        text:"Wallet Name Successfully Updated",
                        icon: "success",
                        button: "Continue"
            
                    })
                } else {
                    swal({
                        title:"Error 🚫",
                        text:"There was an internal server error",
                        icon: "error",
                        button: "Continue"
            
                    })
                }
                
            }

        }


    }

    const handleUpdatePassword = (former, new_password, user_id) => {
        const result = updatePassword(formerPassword, newPassword, userId)
        if (result === true) {
            swal({
                title:"Success ✅",
                text:"Successfully updated password",
                icon: "success",
                button: "Continue"
    
            })
        } else {
            swal({
                title:"Error 🚫",
                text:"There was an internal server error",
                icon: "error",
                button: "Continue"
    
            })
        }
    }

    const handleGptModel = async () => {
        const result_newsDict = await fetchNews()
        console.log("GPT Model Dict: ", result_newsDict)
        setnewsDict(result_newsDict)

    }

    const handleEtherScanApi = async () => {
        const result_gas = await fetchGasOracle()
        console.log("Resulting Gas Details")
        
        setgasDict(result_gas)
        if (Object.keys(result_gas).length > 0) {
            const string_gas = result_gas['ProposeGasPrice']
            const int_gas = parseInt(string_gas)
            console.log("int_gas: ", int_gas)
            if (int_gas <= 30) {
                setGweiColor('#b5e48c')
            } else if (int_gas > 30 && int_gas < 50) {
                setGweiColor('#fee440')
            } else if (int_gas > 50) (
                setGweiColor('#c9184a')
            )

        }


    }

    const handleFetchMarketDataApi = async() => {
        const result_array = await fetchMarketData()
        console.log("Result Token Array: ", result_array['data']['tokens'])
        setTokenArray(result_array['data']['tokens'])
    }

    



    const handleViewingNewsStatus = () => {
        setviewNewsStatus(true)
    }

    const handleViewPrices = () => {
        setViewPriceStatus(true)
    }

    const handleViewNFT = () => {
        setViewNFTStatus(true)
    }

    const handleVisView = () => {
        setViewVisStatus(true)
    }

    const launchNftPage = (nft_obj) => {
        setViewWalletNFT(true)
        setPropNftObj(nft_obj)

    }

    const handleViewWalletAddress = () => {
        console.log("clicking!")
        swal({
            title:"Current Wallet Address",
            text:`${walletObj['account']['address']}`,

            button: "Continue"

        })
    }



    return (
        <div className='App'>
            
        {viewWalletNFT === true?
        <div>
             <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                        <button onClick={() => setViewWalletNFT(false)}><Text> {<BsArrowLeft />} </Text></button>
             </div>
             <SpecificWalletNFT nft_obj={propnftObj}/>

        </div>
            
            
            
            
            :
            <div>
                {viewVisStatus === true?
            <div>
                    <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                        <button onClick={() => setViewVisStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                    </div>
                    <Vis wallet_obj={walletObj} wallet_links={walletLinks} wallet_tokens={walletTokensDict} userId={userId} wallet_color={walletColor}/>

            </div>
            
            :
            
            <div>   
                {viewTransactionStatus === true?
                    
                    <div>
                        <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                            <button onClick={() => setViewTransactionStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                        </div>
                        <TransactionPage wallet_obj={walletObj} wallet_links={walletLinks} wallet_tokens={walletTokensDict} userId={userId}/>
                    </div>
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    :


                    <div>

        {viewAIStatus === true?
                    
                    <div>

                        {viewLearningStatus===true?
                        
                        <div>
                                <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                                    <button onClick={() => setViewLearningStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                                </div>
                                <LearningPage />
                        </div>
                        
                        
                        
                        :
                        
                            <div>
                                {viewNFTStatus === true?
                                <div>
                                    <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                                        <button onClick={() => setViewNFTStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                                    </div>
                                    
                                    <div>
                                        <NFTMarketplace />
                                    </div>
                                </div>
                                
                                
                                :

                                    <div>
                                        {viewPriceStatus === true?<div>
                                    
                                        <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                                            <button onClick={() => setViewPriceStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                                        </div>
                                        <PricePage array={tokenArray}/>
                                        
                                        </div>: 
                                        <div>
                                            {viewNewsStatus === true?
                                            <div>
                                                <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                                                    <button onClick={() => setviewNewsStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                                                </div>
                                                <NewsPage news_dict={newsDict}/>
                                            </div>
                                            : 
                                            <div>
                                                <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                                                    <button onClick={() => setViewAIStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                                                </div>
                                                <div style={{fontSize:'16px'}}>
                                                    <Text as='b'>Discover</Text>
                                                </div>
                                                <div className='gridBox'>
                                                    <div className='newsBox'>
                                                        <button onClick={() => handleViewingNewsStatus()}>
                                                            <BsNewspaper />
                                                            <div className='boxheader'>
                                                                <Text as='b'>News</Text>
                                                            </div>
                                                            <div className='boxInfo'>
                                                                <Text>Fetch Your Web3 News</Text>
                                                            </div>


                                                        </button>
                                                    </div>
                                                    <div className='gasBox'>
                                                        <BiGasPump />
                                                        <div className='gasTitle'>
                                                            <Text as='b' style={{fontSize: '16px'}}>
                                                                Average Gas
                                                            </Text>
                                                        {gasDict === {}?<div><Text>?</Text></div>:
                                                            <div>
                                                            <div style={{color:gweiColor, fontSize:'20px', marginLeft:'40px', marginTop:'-25px'}}>
                                                                <Text as='b'>{gasDict['ProposeGasPrice']}</Text>
                                                                
                                                            </div>
                                                            <div style={{color: gweiColor, fontSize: '12px', marginTop:'-6px', marginLeft: '40px'}}>
                                                                <Text>Gwei</Text>
                                                            </div>
                                                            </div>
                                                        }
                                                        
                                                        
                                                        </div>
                                                    </div>
                                                    <button onClick={() => handleViewNFT()}>
                                                        <div className='blockBox'>
                                                            
                                                                <AiOutlineShoppingCart />
                                                                <div className='blockTitle'>
                                                                <Text as='b'>
                                                                    NFT Marketplace
                                                                </Text>
                                                                <div className='boxInfo'>
                                                                        <Text>Check out Recent and Popular NFTs</Text>
                                                                    </div>
                                                                
                                                                </div>
                                                            
                                                        </div>
                                                    </button>
                                                    <div className='priceBox'>
                                                        <button onClick={() => handleViewPrices()}>
                                                            <ImPriceTags />
                                                            <div className='priceTitle'>
                                                                <Text as='b'>Prices</Text>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <button onClick={(e) => handleViewLearningPage(e)}>
                                                        <div className='learningBox'>
                                                            <BiBrain />
                                                            <div className='learningTitle'>
                                                                <Text as='b'> Learning</Text>
                                                            </div>
                                                            <div className='boxInfo'>
                                                                    <Text>Grow your web3 Brain</Text>
                                                            </div>
                                                        </div>
                                                    </button>
                                                    <div className='nftBox'>
                                                        <BiSolidCubeAlt />
                                                        <div className='nftTitle'>
                                                            <Text as='b'>Recent Block #</Text>
                                                        </div>
                                                        <div style={{textAlign: 'left', fontSize: '16px'}}>
                                                            <Text as='b'>{gasDict['LastBlock']}</Text>
                                                        </div>
                                                    </div>
                                                    <div className='feeBox'>
                                                        <FaRegHandshake />
                                                        <div className='feeTitle'>
                                                            <Text as='b'>Sug. Fee</Text>
                                                        </div>
                                                        <div className='baseFeeText'>
                                                            <Text as='b'>{gasDict['suggestBaseFee'].slice(0, 4)}</Text>
                                                        </div>
                                                        <div className='gweiFeeText'>
                                                            <Text>Gwei</Text>
                                                        </div>

                                                    </div>
                                                    
                                                </div>
                                        </div>
                                    
                                    }
                                                
                                        </div>

                                        
                                    
                                    
                                        }
                                    </div>
                                
                                
                                }
                            </div>
                        
                        
                        }


                        

                        





                        


                    </div>
            
                :
                <div>
                    {viewSettingsStatus === true? 
                        
                        <div>
                            <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                                <button onClick={() => handleGoBackHomeFromSettings()}><Text> {<BsArrowLeft />} </Text></button>
                            </div>
                            <Text fontSize='20px' as='b'> Wallet Settings ⚙️</Text>
                            
                

                            <div style={{align: 'left', fontSize:'14px', color:'gray', marginTop: '10px', textAlign: 'left'}}>
                                <Text as='b'>Set Wallet Color</Text>
                                <div className='changeColorBox'>
                                    <div style={{marginTop:'5px'}}>
                                        <Text>Current Wallet Color: </Text>
                                    </div>
                                    <div className='dropdown'>
                                        <button>{walletColor === ''? 
                                        
                                        <div className='dropbtn'>
                                            <div className='colorBox'>
                                                <div style={{fontSize: "14px"}}>
                                                    <Text>{walletColor}</Text>
                                                </div>
                                                <div style={{border: "2px solid red", width: "20px", height: "20px", borderRadius: "20px", marginLeft: "5px", background:`${walletColor}`}}>

                                                </div>
                                            </div>
                                            <div className='dropdown-content'>
                                            {walletColorArray.map((hash) => (
                                                <div style={{backgroundColor: `${hash}`}}>
                                                    <button onClick={setWalletColor(hash)}>
                                                        {hash}
                                                    </button>
                                                </div>
                                            ))}
                                            </div>
                                        </div>
                                        
                                        :
                                        <div className='dropbtn'>
                                        <div className='colorBox'>
                                            <div style={{fontSize: "14px"}}>
                                                <Text>{walletColor}</Text>
                                            </div>
                                            <div style={{width: "20px", height: "20px", borderRadius: "20px", marginLeft: "5px", background: `${walletColor}`}}>

                                            </div>
                                        </div>
                                        <div className='dropdown-content'>
                                        {walletColorArray.map((hash) => (
                                            <div style={{backgroundColor: `${hash}`, width:'100px'}}>
                                                <button onClick={() => setWalletColor(hash)}>
                                                    {hash}
                                                </button>
                                            </div>
                                        ))}
                                        </div>
                                        </div>
                                        
                                        
                                        
                                        }
                                        </button>
                                    </div>
                                </div>
                            </div>

                            
                            <div style={{fontSize:'14px', color:'gray', marginTop: '10px', marginBottom: '20px', textAlign: 'left'}}>
                                <Text as='b'> Set Emoji </Text>
                                <div className='changeColorBox'>
                                    <div style={{marginTop: '10px'}}>
                                        <Text>Wallet Emoji: </Text>
                                    </div>
                                        <div className='dropdown'>
                                            <button>
                                                
                                                <div>
                                                    <div className='dropEmojibtn'>
                                                        <div className='colorBox'>
                                                            <div style={{fontSize: "14px", marginLeft:'2px'}}>
                                                                <Text>{walletEmoji}</Text>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className='dropdown-emoji-content'>
                                                    {emojiArray.map((emoji) => (
                                                        <div style={{background: `${walletColor}`, width:'200px'}}>
                                                            <button onClick={() => setWalletEmoji(emoji)}>
                                                                <Text>{emoji}</Text>
                                                            </button>
                                                        </div>
                                                    ))}
                                                    </div>
                                                </div>
                                                   

                                                
                                            </button>
                                        </div>

                                </div>
                                
                                
                                
                            </div>
                            <div style={{fontSize:'14px', color:'gray', marginTop:"10px", marginBottom: '20px'}}>
                                <Text as='b'>Edit Wallet Name</Text>
                                <div>
                                        <div>
                                            <input onChange={(e) => handleNameChange(e)}style={{border:`2px solid ${walletColor}`, padding: "5px", borderRadius:"10px", marginTop:"10px", "width": "200px"}}placeholder={walletName}></input>
                                        </div>
                                        {inputWalletName.length > 0?
                                        <Center>
                                        <div style={{marginTop: "5px", background: `${walletColor}`, color: 'gray', width: "100px", padding: '5px', borderRadius: "10px", boxShadow: `0 0 25px 2px ${walletColor}` }}>
                                            <button onClick={() => handleChangeWalletSubmit()}><Text as='b'>Change 🪄</Text></button>
                                        </div>
                                        </Center>
                                        :<div></div>}
                                </div>
                                <div>
                                </div>
                            </div>



                            <div style={{fontSize:'14px', color:'gray', marginTop:"10px"}}>
                                <Text as='b'>Reset Password</Text>
                                <div>
                                    <input onChange={(e) => handleFormerPasswordChange(e)}style={{border:`2px solid ${walletColor}`, padding: "5px", borderRadius:"10px", marginTop:"10px", "width": "200px"}}placeholder={'Former Password'} type='password'></input>
                                </div>
                                <div>
                                    <input onChange={(e) => handleNewPasswordChange(e)}style={{border:`2px solid ${walletColor}`, padding: "5px", borderRadius:"10px", marginTop:"10px", "width": "200px"}}placeholder={'New Password'} type='password'></input>
                                </div>
                                {formerPassword.length > 6 && newPassword.length > 6 && newPassword !== formerPassword?
                                        <Center>
                                        <div style={{marginTop: "5px", background: `${walletColor}`, color: 'gray', width: "100px", padding: '5px', borderRadius: "10px", boxShadow: `0 0 25px 2px ${walletColor}` }}>
                                            <button onClick={() => handleUpdatePassword(formerPassword, newPassword, userId)}><Text as='b'>Change 🪄</Text></button>
                                        </div>
                                        </Center>
                                :<div></div>}

                            </div>
                            <Center>
                            <div style={{marginTop: '20px', background: 'red', color: 'white', width:'150px', padding: '6px', borderRadius: '20px', position: 'relative', bottom:'0'}}>
                                <button onClick={() => handleDelete(userId, walletObj['account']['address'])}>Delete Wallet</button>

                            </div>
                            </Center>
                            <div style={{position: 'relative', marginTop:'2px', fontSize:'10px', color:'gray'}}>
                                <Text as='b'>Note: Deleting your Wallet with Funds will make you Lose your Funds</Text>
                            </div>
                        
                        </div>
                        
                        
                        : 
                        <div>
                            <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                                <button onClick={() => goHome()}><Text> {<AiOutlineHome />} </Text></button>
                            </div>
                            <div style={{fontSize:"14px", position:"absolute", top: '0', right:'0', 'padding':"5px", background: "white", borderRadius: "20px", marginTop: "5px", marginRight: "5px", background: `${walletColor}`}}>
                                <button onClick={() => handleViewWalletAddress()}>
                                    {walletObj['account'] === undefined?<Text>Loading...</Text>:
                                    
                                    <Text>{walletObj['account']['address'].slice(0, 10)}...</Text>
                                    
                                    
                                    }
                                </button>
                            </div>
                            <Center>
                            <div style={{background: `${walletColor}`, borderRadius:"70px", width: "70px", height: "70px", marginTop: "20px" ,boxShadow: `0 0 25px 2px ${walletColor}`}}>
                                <Center>
                                    <Text fontSize="40px" padding="7px">{walletEmoji}</Text>
                                    
                                </Center>
                            </div>

                            
                            </Center>
                            <div style={{marginTop:"15px", fontSize: '16px'}}>
                                <Text as='b'>{walletName}</Text>
                            </div>

                            <Center>
                            <div className='box'>
                                <div style={{marginLeft: '1px', background: `${walletColor}`, 'width': '55px', height: '40px', fontSize: '25px', borderRadius: '40px', padding: '5px', marginRight:"20px", boxShadow: `0 0 25px 5px ${walletColor}`}}>
                                    <button onClick={() => handleSettingsClick()}>{<FiSettings />}</button>
                                    <Text fontSize='11px'>Settings</Text>
                                    
                                </div>
                                
                                <div style={{background: `${walletColor}`, 'width': '55px', height: '40px', fontSize: '25px', borderRadius: '40px', padding: '5px', marginRight: "20px", boxShadow: `0 0 25px 2px ${walletColor}`}}>
                                    <button onClick={() => setViewAIStatus(true)}>{<BsChat />}</button>
                                    <Text fontSize='11px'>Dash</Text>
                                </div>
                                <div style={{background: `${walletColor}`, 'width': '55px', height: '40px', fontSize: '25px', borderRadius: '40px', padding: '5px', marginRight: "20px", boxShadow: `0 0 25px 2px ${walletColor}`}}>
                                    <button onClick={() => setViewTransactionStatus(true)}>{<BiNavigation />} </button>
                                    <Text fontSize='11px'>Transact</Text>
                                </div>
                                <div style={{background: `${walletColor}`, 'width': '55px', height: '40px', fontSize: '25px', borderRadius: '40px', padding: '5px', marginRight: "2s0px", boxShadow: `0 0 25px 2px ${walletColor}`}}>
                                    <button onClick={() => handleVisView()}>{<AiOutlineSwap />}</button>
                                    <Text fontSize='11px'>Vis</Text>
                                </div>

                            
                            </div>
                            </Center>
                            
                            <div className='displayWalletInfoBox'> 
                                <div style={{color: 'gray', position: 'relative', marginTop: '15px', fontSize: '16px', textAlign:'left'}}>
                                        <Text as='b'>Tokens</Text>
                                </div>
                                <div className='tokensList'>
                                    
                                    
                                    {
                                        Object.keys(walletTokensDict).map((token_address, idx) =>(
                                            <div >
                                                <div key={idx} style={{marginTop: "0px"}}>

                                                <div key={idx} className='tokenBox'>
                                                    <div style={{fontSize: '16px'}}>
                                                        <Text as='b'>{walletTokensDict[token_address][1]}:</Text>
                                                    </div>
                                                    <div style={{marginLeft: "10px", fontSize:'16px'}}>
                                                    {(walletTokensDict[token_address][0]/(10 ** 12)).toPrecision(4)}
                                                    
                                                    </div>

                                                    <div style={{color: 'gray', fontSize: "10px"}}>
                                                        <Text>{token_address}</Text>
                                                    </div>
                                                    
                                                </div>

                                                
                                                </div>
                                            </div>
                                        ))
                                    }
                                    

                                </div>

                        
                            <div style={{color: 'gray', position: 'relative', marginTop: '10px', fontSize: '16px', textAlign:'left'}}>
                                    <Text as='b'>Minted Kudos 🎉</Text>
                            </div>
                            {ownedNftArray.length === 0?
                            
                            <div style={{fontSize:'12px'}}>
                                <Text as='b'>No Kudos to Display 😔</Text>
                            </div>
                            
                            :
                            
                                <div className='tokensList'>
                                {
                                    ownedNftArray.map((nft_dict, idx) => (
                                        <div style={{textAlign: 'left'}}>
                                            <button onClick={() => launchNftPage(nft_dict['contract'])}>
                                                <div style={{textAlign: 'left', fontSize:'16px'}}>
                                                    <div>
                                                        <Text as='b'>{nft_dict['contract']['symbol']}</Text>
                                                    </div>
                                                    <div style={{color: 'gray', fontSize: "10px"}}>
                                                        <Text>{nft_dict['contract']['address']}</Text>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                        
                                    ))
                                }
                                </div>
                            }

                        </div>
                               
                        </div>
                        
                        
                        
                        }
                    </div>
                    
                    
                    }
                    </div>
            
            
            
            
            
            
            
            }
            

            </div>
            
            }
            </div>
            
            
        }


            
            

        </div>
    )


}