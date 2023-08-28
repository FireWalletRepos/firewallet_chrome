

import { Text, Center, filter } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import  '../App.css'

// api import 

import { fetchNFTInfo } from '../api/etherscan';


export default function NFTSpecific(props) {
    
    const [nftInfoDict, setNftInfoDict] = useState({})

    
    const handleSetNFTInfoDict = (dict) => {
        setNftInfoDict(dict)
    }

    const percentageColour = (percentage) => {
        if (percentage < 0) {
            return '#c9184a'
        } else if (percentage === 0) {
            return '#fee440'
        } else {
            return '#b5e48c'
        }
    }



    useEffect(() => {
        const nft_id = props.id
        console.log("NFT Id: ", nft_id)

        async function handleNFTInfoAPI (nft_id) {
            const result = await fetchNFTInfo(nft_id)
            handleSetNFTInfoDict(result)
        }

        handleNFTInfoAPI(nft_id)


    }, [])

    return (
        <div>
            {Object.keys(nftInfoDict).length === 0?<div><Text as='b'>Loading...</Text></div>:
            <div>
                <div>
                    <Text as='b'>NFT: {nftInfoDict['name']}</Text>
                </div>
                <div>
                    <Center>
                        <div style={{marginTop:'10px'}}>
                            <img src={nftInfoDict['image']['small']} width={80} height={80}/>
                        </div >
                    </Center>
                    <div style={{color:'gray', fontSize:'8px', marginTop: '5px'}}>
                        <Text as='b'>{nftInfoDict['contract_address']}</Text>
                    </div>

                    <Center>
                    <div className='nftlinkBox'>
                    
                        {nftInfoDict['links'].length === 0?<div></div>:
                        Object.keys(nftInfoDict['links']).map((link_name, idx) => {
                            return (
                            <div key={idx} style={{padding: '3px'}}>
                                <a href={nftInfoDict['links'][link_name]}> 
                                    <Text as='b'>{link_name}</Text>
                                </a>
                            </div>
                            )
                        })
                        
                        
                        }
                  


                        
                    </div>
                    </Center>
                    
                    {nftInfoDict['description'] === ''?<div style={{fontSize: '14px', marginBottom: '20px'}}><Text as='b'>No Description 😔</Text></div>:
                    <div className='nftDescriptionBox'>
                        
                        <Text>{nftInfoDict['description']}</Text>
                    </div>
                    }
                    

                    <div className='nftInfoBox'>
                        <div style={{display: 'flex'}}>
                            <div style={{textAlign: 'left', color:'gray', marginTop: '5px'}}>
                                    <Text as='b'>Explorers: </Text>
                            </div>

                            <div style={{marginTop:'4px'}}>
                                {Object.keys(nftInfoDict['explorers']).length === 0?<div></div>:
                                <div style={{display: 'flex'}}>
                                    {Object.keys(nftInfoDict['explorers']).map((explorer_name ,idx) => {
                                        return (<div key={idx} style={{marginLeft: '5px'}}>
                                                <a href={nftInfoDict['explorers'][explorer_name]['link']}>
                                                <div style={{fontSize:'14px', marginTop: '3px'}}>
                                                    <Text as='u'>{nftInfoDict['explorers'][explorer_name]['name']} </Text>
                                                </div>
                                                </a>
                                                
                                        </div>
                                        )
                                    })}
                                </div>


                                }
                            </div>
                        </div>



                        <div style={{textAlign: 'left', color:'gray', marginTop: '10px'}}>
                            <Text as='b'>Pillar Info</Text>
                        </div>
                        <div style={{textAlign: 'left', fontSize:'14px'}}>
                            <Text>Native Currency: {nftInfoDict['native_currency']}</Text>
                            <Text>Total Supply: {nftInfoDict['total_supply']}</Text>
                            <Text>No. Unique Addresses: {nftInfoDict['number_of_unique_addresses']}</Text>
                            <div style={{display: 'flex'}}>
                                <Text as='b'>Daily Addresses Change: </Text>
                                <div style={{color: percentageColour(nftInfoDict['number_of_unique_addresses_24h_percentage_change']), marginLeft:'4px'}}>
                                    <Text as='b'>{nftInfoDict['number_of_unique_addresses_24h_percentage_change'].toPrecision(4)}%</Text>
                                </div>
                            </div>
                            
                        </div>

                        <div style={{textAlign: 'left', color:'gray', marginTop: '10px'}}>
                            <Text as='b'>Volume Info</Text>
                        </div>
                        <div style={{textAlign: 'left', fontSize:'14px'}}>
                            <Text>Vol. (24hr) (ETH): {nftInfoDict['volume_24h']['native_currency']}</Text>
                            {Object.keys(nftInfoDict['volume_24h_percentage_change']).length === 0?<div></div>:
                            <div style={{display: 'flex'}}>
                                <div>
                                    <Text as='b'>Daily Vol. % Change (ETH): </Text>
                                </div>
                                <div style={{color: percentageColour(nftInfoDict['volume_24h_percentage_change']['native_currency'].toPrecision(4)), marginLeft: '4px'}}>
                                    <Text as='b'>{nftInfoDict['volume_24h_percentage_change']['native_currency'].toPrecision(4)}%</Text>
                                </div>
                            </div>
                            
                            }
                            
                            
                        </div>


                        <div style={{textAlign: 'left', color:'gray', marginTop: '10px'}}>
                            <Text as='b'>Market Info</Text>
                        </div>
                        <div style={{textAlign: 'left', fontSize:'14px'}}>
                            <Text>Cap (ETH): {nftInfoDict['market_cap']['native_currency']}</Text>
                            {Object.keys(nftInfoDict['market_cap_24h_percentage_change']).length === 0?<div></div>:
                                <div style={{display: 'flex'}}>
                                    <div style={{fontSize:'12px'}}>
                                        <Text as='b'>Change Cap %: </Text>
                                    </div>
                                    <div style={{color: percentageColour(nftInfoDict['market_cap_24h_percentage_change']['native_currency']), marginLeft: '4px'}}>
                                        <Text as='b'>{nftInfoDict['market_cap_24h_percentage_change']['native_currency'].toPrecision(4)}%</Text>
                                    </div>
                                </div>
                            }

                        </div>

                        <div style={{textAlign: 'left', color:'gray', marginTop: '10px'}}>
                            <Text as='b'> Floor Price (USD | ETH)</Text>
                        </div>

                        <div style={{textAlign: 'left', fontSize:'14px'}}>
                            <Text>Price: ${nftInfoDict['floor_price']['usd']}  | {nftInfoDict['floor_price']['native_currency']}</Text>
                            {Object.keys(nftInfoDict['floor_price_24h_percentage_change']).length === 0?<div></div>:
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight: '4px'}}>
                                        <Text as='b'>Daily % Change: </Text>
                                    </div>
                                    <div style={{display: 'flex'}}>
                                        <div style={{color: percentageColour(nftInfoDict['floor_price_24h_percentage_change']['usd']), marginRight: '2px'}}>
                                            <Text as='b'>{nftInfoDict['floor_price_24h_percentage_change']['usd'].toPrecision(4)}%</Text>
                                        </div>
                                        <Text>|</Text>
                                        <div style={{color:percentageColour(nftInfoDict['floor_price_24h_percentage_change']['native_currency']), marginLeft:'2px'}}>
                                            <Text as='b'>{nftInfoDict['floor_price_24h_percentage_change']['native_currency'].toPrecision(4)}%</Text>
                                        </div>
                                    </div>
                                </div>
                            }

                            {Object.keys(nftInfoDict['floor_price_7d_percentage_change']).length === 0?<div></div>:
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight:'4px'}}>
                                        <Text as='b'>Weekly % Change: </Text>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <div style={{color:percentageColour(nftInfoDict['floor_price_7d_percentage_change']['usd'].toPrecision(4)), marginRight:'2px'}}>
                                            <Text as='b'>{nftInfoDict['floor_price_7d_percentage_change']['usd'].toPrecision(4)}%</Text>
                                        </div>
                                        
                                        <Text>|</Text>
    
                                        <div style={{color:percentageColour(nftInfoDict['floor_price_7d_percentage_change']['native_currency']), marginLeft: '2px'}}>
                                            <Text as='b'>{nftInfoDict['floor_price_7d_percentage_change']['native_currency'].toPrecision(4)}%</Text>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            }

                            {Object.keys(nftInfoDict['floor_price_30d_percentage_change']).length === 0?<div></div>:
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight:'4px'}}>
                                        <Text as='b'>Monthly % Change: </Text>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <div style={{color:percentageColour(nftInfoDict['floor_price_30d_percentage_change']['usd'].toPrecision(4)), marginRight:'2px'}}>
                                            <Text as='b'>{nftInfoDict['floor_price_30d_percentage_change']['usd'].toPrecision(4)}%</Text>
                                        </div>
                                        
                                        <Text>|</Text>
    
                                        <div style={{color:percentageColour(nftInfoDict['floor_price_30d_percentage_change']['native_currency']), marginLeft: '2px'}}>
                                            <Text as='b'>{nftInfoDict['floor_price_30d_percentage_change']['native_currency'].toPrecision(4)}%</Text>
                                        </div>
                                        
                                        
                                    </div>
                                </div> 
                            }


                            {Object.keys(nftInfoDict['floor_price_1y_percentage_change']).length === 0?<div></div>:
                                <div style={{display: 'flex'}}>
                                    <div style={{marginRight:'4px'}}>
                                        <Text as='b'>Weekly % Change: </Text>
                                    </div>
                                    <div style={{display:'flex'}}>
                                        <div style={{color:percentageColour(nftInfoDict['floor_price_1y_percentage_change']['usd'].toPrecision(4)), marginRight:'2px'}}>
                                            <Text as='b'>{nftInfoDict['floor_price_1y_percentage_change']['usd'].toPrecision(4)}%</Text>
                                        </div>
                                        
                                        <Text>|</Text>
    
                                        <div style={{color:percentageColour(nftInfoDict['floor_price_1y_percentage_change']['native_currency']), marginLeft: '2px'}}>
                                            <Text as='b'>{nftInfoDict['floor_price_1y_percentage_change']['native_currency'].toPrecision(4)}%</Text>
                                        </div>
                                        
                                        
                                    </div>
                                </div>
                            }

                        </div>


                        


                        
                    </div>
                   



                </div>
                
            </div>
            
            
            }
            
            
        </div>
    )
}