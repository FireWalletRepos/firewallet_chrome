import { Text, Center, filter } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import  '../App.css'



export default function SpecificWalletNFT (props) {

    const [nftObj, setNftObj] = useState()


    const filterDate = (date_string) => {
        let filtered_date = new Date(Date.parse(date_string))
        console.log("Filtered Date: ", filtered_date)
        const date_array = filtered_date.toString().split(' ')
        console.log("date Array: ",date_array)
        const real_date_string = `${date_array[1]} ${date_array[2]}, ${date_array[3]} ${date_array[4]} EST`
        console.log("real Date String: ", real_date_string)

        return real_date_string
    }

    useEffect(() => {
        const nft_obj = props.nft_obj
        console.log("Rel NFT Object: ", nft_obj)
        setNftObj(nft_obj)
    })

    return (

        <div className='App'>
            {nftObj === undefined?<div><Text as='b'>Loading NFT Data...</Text></div>:
            
            <div>
                <div style={{fontSize:'16px'}}>
                    <Text as='b'>{nftObj['name']}</Text>
                </div>
                {nftObj['openSea']['imageUrl'] === undefined?<div></div>:
                    <div>
                        <Center>
                            <div style={{marginTop:'10px'}}>
                                    <img src={nftObj['openSea']['imageUrl']} width={100} height={100}/>
                            </div>
                        </Center>
                        <div style={{textAlign: 'center', color:'gray', fontSize:'9px', marginTop: '5px', marginBottom:'5px'}}>
                            <Text as='b'>{nftObj['address']}</Text>
                        </div>
                    </div>
                }
                {nftObj['openSea']['description'] === undefined?<div style={{fontSize: '14px', marginBottom: '20px'}}><Text as='b'>No Description 😔</Text></div>:
                    <div className='nftDescriptionBox'>
                        <Text>{nftObj['openSea']['description']}</Text>
                    </div>
                }

                <div className='nftDataBox'>
                    <div style={{display: 'flex'}}>
                        <div style={{textAlign: 'left', color:'gray', fontSize: '16px'}}>
                            <Text as='b'>Token Type: </Text>
                        </div>
                        <div style={{marginLeft: '4px', fontSize:'14px', marginTop:'1px'}}>
                            <Text as='b'>{nftObj['tokenType']}</Text>
                        </div>
                    </div>
                    <div style={{display: 'flex', marginTop:'5px'}}>
                        <div style={{textAlign: 'left', color:'gray', fontSize:'16px'}}>
                            <Text as='b'>Total Supply: </Text>
                        </div>
                        {nftObj['totalSupply'] === undefined?<div style={{marginLeft:'4px', marginTop: '1px', fontSize: '14px'}}><Text as='b'>Not Found</Text></div>:
                        <div style={{marginLeft: '4px', fontSize:'14px', marginTop:'2px'}}>
                            <Text as='b'>{nftObj['totalSupply']}</Text>
                        </div>
                        }

                    </div>
                    <div style={{marginTop:'5px'}}>
                        <div style={{textAlign: 'left', color:'gray', fontSize:'16px'}}>
                            <Text as='b'>Col. Name </Text>
                        </div>
                        <div style={{textAlign: 'left', fontSize:'12px'}}>
                            <Text as='b'>{nftObj['openSea']['collectionName']}</Text>
                        </div>

                    </div>
                    <div style={{marginTop:'5px'}}>
                        <div style={{textAlign: 'left', color:'gray', fontSize:'16px'}}>
                            <Text as='b'>Deployer Address </Text>
                        </div>
                        <div style={{textAlign:'left', fontSize:'10px'}}>
                            <Text as='b'>{nftObj['contractDeployer']}</Text>
                        </div>

                    </div>
                    <div style={{marginTop:'5px'}}>
                        <div style={{textAlign: 'left', color:'gray', fontSize:'16px'}}>
                            <Text as='b'>Deployed Block Number </Text>
                        </div>
                        <div style={{textAlign:'left', fontSize:'12px'}}>
                            <Text as='b'>{nftObj['deployedBlockNumber']}</Text>
                        </div>

                    </div>
                    <div style={{marginTop: '5px'}}>
                        <div style={{textAlign: 'left', color:'gray', fontSize:'16px'}}>
                            <Text as='b'>Last Ingested </Text>
                        </div>
                        <div style={{textAlign: 'left', fontSize:'12px', marginTop:'2px'}}>
                            <Text as='b'>{filterDate(nftObj['openSea']['lastIngestedAt'])}</Text>
                        </div>
                    </div>
                    <div style={{marginTop: '5px'}}>
                        <div style={{textAlign: 'left', color:'gray', fontSize:'16px'}}>
                            <Text as='b'>Floor Price </Text>
                        </div>
                        {nftObj['floorPrice'] === undefined?<div style={{textAlign: 'left', fontSize:'12px', marginTop:'2px'}}><Text as='b'>Not Found</Text></div>:
                            <div style={{textAlign: 'left', fontSize:'12px', marginTop:'2px'}}>
                                <Text as='b'>{nftObj['openSea']['floorPrice']}</Text>
                            </div>
                        }

                    </div>



                    <div style={{marginTop:'5px'}}>
                        <div style={{textAlign: 'left', color:'gray', fontSize:'16px'}}>
                            <Text as='b'>Socials/Links </Text>
                        </div>
                        <div style={{display:'flex', fontSize: '12px'}}>
                            <div style={{color: '#8093f1'}}>
                                <Text as='b'>Discord: </Text>
                            </div>
                            {nftObj['openSea']['discordUrl'] === undefined?<div style={{marginLeft: '4px', fontSize:'12px'}}><Text as='b'>Not Found</Text></div>:
                            <div style={{marginLeft: '4px'}}>
                                <a href={nftObj['openSea']['discordUrl']}><Text as='u'>Link</Text></a>
                            </div>
                            }
                        </div>
                        <div style={{display:'flex', fontSize: '12px'}}>
                            <div style={{color: '#72ddf7'}}>
                                <Text as='b'>Twitter: </Text>
                            </div>
                            {nftObj['openSea']['twitterUsername'] === undefined?<div style={{marginLeft: '4px', fontSize:'12px'}}><Text as='b'>Not Found</Text></div>:
                            <div style={{marginLeft: '4px'}}>
                                <Text>{nftObj['openSea']['twitterUsername']}</Text>
                            </div>
                            }
                        </div>
                        <div style={{display:'flex', fontSize: '12px'}}>
                            <div style={{color: '#f7aef8'}}>
                                <Text as='b'>Website: </Text>
                            </div>
                            {nftObj['openSea']['externalUrl'] === undefined?<div style={{marginLeft: '4px', fontSize: '12px'}}><Text as='b'>Not Found</Text></div>:
                            <div style={{marginLeft: '4px'}}>
                                <a href={nftObj['openSea']['externalUrl']}><Text as='u'>Link</Text></a>
                            </div>
                            }
                        </div>

                    </div>
                    

                </div>

                

            </div>
            
            
            
            }
            <div style={{fontSize:'10px', color:"#8093f1", marginTop:'1px'}}>
                <Text as='b'>Data by OpenSea 🌊</Text>
            </div>
            
        </div>
    )
}