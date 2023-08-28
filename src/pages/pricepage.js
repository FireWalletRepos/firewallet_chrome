import { Text, Center, filter } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import  '../App.css'
import {BsArrowLeft} from 'react-icons/bs'

// API Imports
import { fetchMarketPayments } from '../api/etherscan';



export default function PricePage(props) {

    const [tokenArray, setTokenArray] = useState([])
    const [SpecificTokenDict, setSpecificTokenDict] = useState({})
    const [viewExtraInfoStatus, setViewExtraInfoStatus] = useState(false)
    const [query, setQuery] = useState('')


    const handlesettokenarray =  (token_array) => {
        console.log("TOken Array: ", token_array)
        setTokenArray(token_array)
    }

    useEffect(() => {
        
        async function handleFetchMarketPaymet() {
            const result = await fetchMarketPayments()
            
            handlesettokenarray(result)
            
        }
        try { // test to control function calls
            handleFetchMarketPaymet()
        } catch (err) {
            // nothing
        }
        
        
       

        


    }, [])

    const percentageColour = (percentage) => {
        if (percentage < 0) {
            return '#c9184a'
        } else if (percentage === 0) {
            return '#fee440'
        } else {
            return '#b5e48c'
        }
    }

    const handleViewMoreInfoOfToken = (tokenDict) => {
        console.log("Token Dict to set: ", tokenDict)
        setSpecificTokenDict(tokenDict)
        setViewExtraInfoStatus(true)
    }

    const handleSearchChange = (e) => {
        setQuery(e.target.value)
    }

    

    return (
        <div>

            {viewExtraInfoStatus === true?
            <div>
                <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                        <button onClick={() => setViewExtraInfoStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                 </div>
                <div>
                    <Text as='b'>Token Data: {SpecificTokenDict['symbol']}</Text>
                </div>
                <div>
                    <Center>
                    <div style={{marginTop:"10px"}}>
                        <img src={SpecificTokenDict['image']} height={100} width={100}/>
                        
                    
                    </div>
                    
                    </Center>
                    <Center>
                    <div className='gradientTitle'>
                            <Text as='b'>{SpecificTokenDict['name']} | #{SpecificTokenDict['market_cap_rank']}</Text>
                    </div>
                    </Center>
                    
                    <div className='tokenInfoBox'>
                        <div style={{textAlign: 'left', color: 'gray', fontSize:'16px'}}>
                            <Text as='b'>Prices</Text>
                        </div>
                        <div className='pricesSection'>
                            
                            <div>
                                <Text as='b'>Price: ${SpecificTokenDict['current_price'].toPrecision(4)} USD</Text>
                            </div>

                            <div>
                                <Text as='b'>Price (Lowest in 24hr): ${SpecificTokenDict['low_24h'].toPrecision(4)} USD</Text>
                            </div>

                            <div>
                                <Text as='b'>Price (Highest in 24hr): ${SpecificTokenDict['high_24h']} USD</Text>
                            </div>
                            
                            <div style={{fontSize:'12px', display: 'flex'}}>
                                <Text as='b'>Change in 24hr: </Text>
                                <div style={{marginLeft:'2px', color: percentageColour(SpecificTokenDict['price_change_24h'].toFixed(5))}}>
                                    <Text as='b'>${SpecificTokenDict['price_change_24h'].toPrecision(4)} USD</Text>
                                </div>
                            </div>
                            
                            
                            <div style={{fontSize:'12px', display: 'flex'}}>
                                <Text as='b'>Change in 24hr (%): </Text>
                                <div style={{marginLeft:'2px', color: percentageColour(SpecificTokenDict['price_change_percentage_24h'].toFixed(5))}}>
                                    <Text as='b'>{SpecificTokenDict['price_change_percentage_24h'].toPrecision(4)}%</Text>
                                </div>
                            </div>
                           
                            

                        </div>

                        <div style={{textAlign: 'left', color: 'gray', marginTop:'5px', fontSize:'16px'}}>
                            <Text as='b'>Supply</Text>
                        </div>
                        <div className='pricesSection'>
                           
                            <div>
                                <Text as='b'>Circulating Supply: {SpecificTokenDict['circulating_supply'].toFixed(0)}</Text>
                            </div>
                            <div>
                                <Text as='b'>Total Supply: {SpecificTokenDict['total_supply'].toFixed(0)}</Text>
                            </div>
                            <div>
                                <Text as='b'>Total Volume: {SpecificTokenDict['total_volume']}</Text>
                            </div>
                        </div>

                        <div style={{textAlign: 'left', color: 'gray', marginTop:'5px', fontSize:'16px'}}>
                            <Text as='b'>Market Cap</Text>
                        </div>
                        <div className='pricesSection'>
                            <div>
                                <Text as='b'>Market Cap: {SpecificTokenDict['market_cap']}</Text>
                            </div>
                            <div>
                                <Text as='b'>Market Cap Rank: #{SpecificTokenDict['market_cap_rank']}</Text>
                            </div>
                            <div style={{fontSize:'12px', display: 'flex'}}>
                                <Text as='b'>Change in 24hr: </Text>
                                <div style={{marginLeft:'2px', color: percentageColour(SpecificTokenDict['market_cap_change_24h'])}}>
                                    <Text as='b'>{SpecificTokenDict['market_cap_change_24h']}</Text>
                                </div>
                            </div>
                            <div style={{fontSize:'12px', display: 'flex'}}>
                                <Text as='b'>Change in 24hr (%): </Text>
                                <div style={{marginLeft:'2px', color: percentageColour(SpecificTokenDict['market_cap_change_percentage_24h'])}}>
                                    <Text as='b'>{SpecificTokenDict['market_cap_change_percentage_24h'].toPrecision(4)}%</Text>
                                </div>
                            </div>
                        </div>


                    </div>
                    


                </div>
            </div>
            
            :
                <div>      
                    <div style={{fontSize: '16px'}}>      
                        <Text as='b'>Top Token Prices</Text>
                    </div>
                {tokenArray === undefined?
                <div style={{marginTop: "10px", fontSize:"14px"}}>
                    
                    
                    <Text as='b'>  There is an Error Fetching Prices 😱</Text>
                    <div style={{'marginTop': '10px'}}>
                        <Text>There are too many requests. This is currently due to the project's API Plan.</Text>
                    </div>
                    <div style={{'marginTop': '10px'}}>
                        <Text>However, you can come back in 3 - 5 mins for the prices to be displayed 🥳</Text>
                    </div>
                
                
                
                </div> : 
                <div>
                    
                    

                    {tokenArray.length === 0? <div><Text as='b'>Loading...</Text></div>:

                    <div>
                    <div className='searchBox'>
                        <input type='text' placeholder='Search Ethereum' onChange={(e) => handleSearchChange(e)}></input>
                    </div>

                    {query === ''?
                        <div className='tokenList'>
                            {tokenArray.map((tokenDict, idx) => (
                                <div key={idx} className='tokenBlock'>
                                <button onClick={() => handleViewMoreInfoOfToken(tokenDict)}>
                                <div style={{display:'flex', paddingTop:'10px', paddingBottom:'10px'}}>
                                    <div style={{marginRight: "12px"}}>
                                        <img src={tokenDict['image']} alt="Token Image" height={30} width={30} />
                                    </div>
                                    <div style={{fontSize:'16px', marginTop: '1px'}}>
                                        <Text as='b'>{tokenDict['symbol']}</Text>
                                    </div>
                                    
    
                                    <div className='tokenPrice'>
                                        <Text as='b'>${tokenDict['current_price']} USD  |</Text>
                                    </div>
                                    <div style={{color: percentageColour(tokenDict['price_change_percentage_24h']), fontSize: "10px", marginTop:"7px", marginLeft:"5px"}}>
                                        {tokenDict['price_change_percentage_24h'] < 0?<Text as='b'>{tokenDict['price_change_percentage_24h']}%</Text>:
                                        <Text as='b'>+{tokenDict['price_change_percentage_24h']}%</Text>
                                        
                                        }
                                        
                                    </div>
    
                                </div>
                                </button>
                                
                                </div>
                            ))}
                        </div>
                    
                    
                    
                    
                    :
                        <div className='pagedropdown'>
                            {tokenArray.filter(token_dict => {
                                {console.log("Query: ", query)}
                                const searchTerm = query.toLowerCase()
                                const token_name = token_dict['name'].toLowerCase()
                                const token_symbol = token_dict['symbol'].toLowerCase()
                                return searchTerm && token_name.includes(searchTerm) || token_symbol.includes(searchTerm)
                            }).map((token_dict, index) => {
                                {console.log("Token Dict from query: ", token_dict)}
                               return (
                                <div key={index} className='tokenBlock'>
                                    <button onClick={() => handleViewMoreInfoOfToken(token_dict)}>
                                    <div style={{display:'flex', paddingTop:'10px', paddingBottom:'10px'}}>
                                        <div style={{marginRight: "12px"}}>
                                            <img src={token_dict['image']} alt="Token Image" height={30} width={30} />
                                        </div>
                                        <div>
                                            <Text as='b'>{token_dict['symbol']}</Text>
                                        </div>
                                        
        
                                        <div className='tokenPrice'>
                                            <Text as='b'>${token_dict['current_price']} USD  |</Text>
                                        </div>
                                        <div style={{color: percentageColour(token_dict['price_change_percentage_24h']), fontSize: "10px", marginTop:"7px", marginLeft:"5px"}}>
                                            {token_dict['price_change_percentage_24h'] < 0?<Text as='b'>{token_dict['price_change_percentage_24h']}%</Text>:
                                            <Text as='b'>+{token_dict['price_change_percentage_24h']}%</Text>
                                            
                                            }
                                            
                                        </div>
        
                                    </div>
                                    </button>
                                
                                </div>
                               )
                               
                                

                            })
                            
                            }
                        </div>
                    }



                    </div>


                    }
                </div>
                    
                }
                
            </div>

    }
            
            <Center>
                <div style={{display:'flex', fontSize:'12px', bottom: '0', position: 'absolute'}}>
                    <div>
                        <Text as='b'>Data Powered by </Text>
                    </div>
                    <div style={{marginLeft:"5px", color:'#e4c1f9'}}>
                        <Text as='b'>CoinGeckoAPI 🦄</Text>
                    </div>
                    
                </div>
            </Center>

        </div>
    )
}