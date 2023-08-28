import { Text, Center, filter } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {BsArrowLeft} from 'react-icons/bs'
import  '../App.css'

// API Import

import { fetchTopNFTs } from '../api/etherscan';

// Page Import 

import NFTSpecific from './nftspecific'



export default function NFTMarketplace() {

    const [nftArray, setNFTArray] = useState([])
    const [query, setQuery] = useState('')
    const [nftId, setNftId] = useState()
    const [nftViewStatus, setnftViewStatus] = useState(false)


    const updatenftArray = (array) => {
        console.log("NFT Array: ", array)
        setNFTArray(array)
        
    }

    const handleNFTClick = (id) => {
        setNftId(id)
        setnftViewStatus(true)
    }

    const handleSearchChange = (e) => {
        setQuery(e.target.value)

    }

    useEffect(() => {
        try {
            const handleNFTAPI = async() => {
                const array_result = await fetchTopNFTs()
                updatenftArray(array_result)
            }
           
           if (nftArray.length === 0) {
                handleNFTAPI()
           }
           

        } catch (err) {
            console.log("nft skipped due to api call overload")
        }
        
    }, [])

    return (
        <div>
            {nftViewStatus === true?
            <div>
                    <div style={{position: 'absolute', top: 0, left: '0', fontSize: '20px', padding: '5px'}}>
                        <button onClick={() => setnftViewStatus(false)}><Text> {<BsArrowLeft />} </Text></button>
                    </div>
                <div>
                    <NFTSpecific id={nftId}/>
                </div>
            </div>
            :
            <div>
                <div style={{fontSize:'16px'}}>
                    <Text as='b'>Top NFTs by Volume Today 🦄</Text>
                </div>
                {nftArray === undefined?
                <div>

                
                <div>
                    <div style={{marginTop: "10px", fontSize:"14px"}}>
                        
                        
                        <Text as='b'>  There is an Error Fetching Prices 😱</Text>
                        <div style={{'marginTop': '10px'}}>
                            <Text>There are too many requests. This is currently due to the project's API Plan.</Text>
                        </div>
                        <div style={{'marginTop': '10px'}}>
                            <Text>However, you can come back in 3 - 5 mins for the prices to be displayed 🥳</Text>
                        </div>
                    
                    
                    
                    </div>

                </div>
                </div>:
                    <div>
                        <div className='searchBox'>
                            <input type='text' placeholder='Search Ethereum NFTs' onChange={(e) => handleSearchChange(e)}></input>
                        </div>
                    <div>
                        {nftArray.length === 0? <div><Text as='b'>Loading...</Text></div>
                        
                        
                        : 

                        <div>
                            {query === '' ?                          
                            <div className='nftList'>
                                {nftArray.map((nft_dict, idx) => {
                                    return (
                                    
                                    <div key={idx}>
                                        <button onClick={() => handleNFTClick(nft_dict['id'])}>
                                        <div className='nftBar'>
                                            <div style={{fontSize: '14px', textAlign: 'left'}}>
                                                <Text as='b'>{nft_dict['name'].trim()}</Text>
                                            </div>
                                            <div style={{fontSize:'10px', color:'gray'}}>
                                                <Text>{nft_dict['contract_address']}</Text>
                                            </div>
                                            
                                        </div>
                                        </button>
                                        
                                        
                                    </div>
                                    
                                    )
                                })}
                            </div>: 
                            <div className='nftdropdown'>
                                {nftArray.filter(nft_dict => {
                                    {console.log("Query: ", query)}
                                    const searchTerm = query.toLowerCase()
                                    const nft_name = nft_dict['name'].toLowerCase()
                                    const contract_address = nft_dict['contract_address']
                                    return searchTerm && nft_name.includes(searchTerm) || contract_address.includes(searchTerm)
                                }).map((nft_dict, index) => {
                                    
                                    return (
                                    
                                    <div>
                                        <button onClick={() => handleNFTClick(nft_dict['id'])}>
                                    <div className='nftBar'>
                                        <div style={{fontSize: '14px'}}>
                                            <Text as='b'>{nft_dict['name']}</Text>
                                        </div>
                                        <div style={{fontSize:'10px', color:'gray'}}>
                                            <Text>{nft_dict['contract_address']}</Text>
                                        </div>
                                    </div>
                                    </button>
                                
                                    
                                    
                                    </div>
                                    
                                    )
                                })
                                
                                
                                }
                            </div>
                            }
                            <Center>
                                <div style={{display:'flex', fontSize:'12px', bottom:'0', position: 'absolute'}}>
                                    <div>
                                        <Text as='b'>Data Powered by </Text>
                                    </div>
                                    <div style={{marginLeft:"5px", color:'#e4c1f9'}}>
                                        <Text as='b'>CoinGeckoAPI 🦄</Text>
                                    </div>
                                    
                                </div>
                            </Center>

                        </div>
                            
                            
                        }
                    </div>
                    </div>

                    

                }
            </div>
        }
            



            
            
            
        </div>
    )
}