import { Text, Center, filter } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Web3API from 'web3'


const web3 = new Web3API(new Web3API.providers.HttpProvider('https://polygon-mumbai.g.alchemy.com/v2/APIKEY'))
export default function SpecificTrans(props) {
    
    const [transObj, setTransObj] = useState({})
    const [txdate, settxDate] = useState('')

    useEffect(() => {
        const transprops = props.trans_obj 
        console.log("Trans Obj: ", transprops)
        setTransObj(transprops)

        const setTime = async() => {
            await fetchTxTime(transprops['blockNum'])
        }

        setTime()
    })

    const fetchTxTime = async(block_num) => {
        const result_block = Number((await web3.eth.getBlock(block_num)).timestamp)
        console.log("result block: ", result_block)
        var date = new Date(result_block*1000)
        var filtered_date = date.toUTCString()
        console.log("Filtered: ", filtered_date)
        settxDate(filtered_date)
    }

    return (
        <div>
            <div  className='txDetailsBox'>
            <div>
                <Text as='b'>Transaction Details 📊</Text>
            </div>
            <div>
                <div style={{textAlign: 'left', color:'gray', fontSize:'16px', marginTop:'5px'}}>
                    <Text as='b'>Tx Hash</Text>
                </div>
                <div style={{textAlign: 'left', fontSize:'12px'}}>
                    <Text as='b'>{transObj['hash']}</Text>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{textAlign: 'left', color:'gray', fontSize:'16px', marginTop:'10px'}}>
                                <Text as='b'>Tx Category: </Text>
                                
                    </div>
                    <div style={{fontSize:'14px', marginLeft:'5px', marginTop:'12px'}}>
                        <Text as='b'>{transObj['category']}</Text>
                    </div>
                </div>
                <div>
                <div style={{textAlign: 'left', color:'gray', fontSize:'16px', marginTop:'10px'}}>
                                <Text as='b'>Time of Tx: </Text>
                                
                    </div>
                    {txdate === ''?<div style={{fontSize:'14px', marginLeft:'5px', marginTop:'2px', textAlign: 'left'}}><Text as='b'>Loading</Text></div>:
                        <div style={{fontSize:'14px', marginLeft:'5px', marginTop:'2px', textAlign: 'left'}}>
                            <Text as='b'>{txdate}</Text>
                        </div>
                    }

                </div>
               
                <div>
                    <div style={{textAlign: 'left', color:'gray', fontSize:'16px', marginTop:'10px'}}>
                        <Text as='b'>Origin Wallet Address</Text>
                    </div>
                    <div style={{textAlign: 'left', fontSize:'12px'}}>
                        <Text as='b'>{transObj['from']}</Text>
                    </div>
                </div>
                <div>
                    <div style={{textAlign: 'left', color:'gray', fontSize:'16px', marginTop:'10px'}}>
                            <Text as='b'>Receipient Wallet Address</Text>
                            
                    </div>
                    <div style={{textAlign: 'left', fontSize:'12px'}}>
                        <Text as='b'>{transObj['to']}</Text>
                    </div>
                </div>
                <div style={{display:'flex'}}>
                    <div style={{textAlign: 'left', color:'gray', fontSize:'16px', marginTop:'10px'}}>
                            <Text as='b'>Value: </Text>
                            
                    </div>
                    <div style={{display: 'flex', marginLeft: '5px', fontSize:'14px', marginTop:'12px'}}>
                        <div>
                            <Text as='b'>{transObj['value']}</Text>
                        </div>
                        <div style={{marginLeft:'5px'}}>
                            <Text as='b'>{transObj['asset']}</Text>
                        </div>
                    </div>
                    
                </div>
                <div>

                </div>

                <div>
                    <div style={{textAlign: 'left', color:'gray', fontSize:'16px', marginTop:'10px'}}>
                        <Text as='b'>Extra Information</Text>
                    </div>
                    <div style={{display:'flex', fontSize:'14px'}}>
                        <div style={{marginRight: '5px'}}>
                            <Text as='b'>#Block: </Text>
                        </div>
                        <div style={{color: 'gray', fontSize:'14px'}}>
                            <Text as='b'>{transObj['blockNum']}</Text>
                        </div>
                    </div>
                    <div style={{display:'flex', fontSize:'14px'}}>
                        <div style={{marginRight: '5px'}}>
                            <Text as='b'>Contract Decimal: </Text>
                        </div>
                        {transObj['rawContract'] === undefined?<div style={{color: 'gray', fontSize:'14px'}}><Text as='b'>null</Text></div>:
                            <div style={{color: 'gray', fontSize:'14px'}}>
                                <Text as='b'>{transObj['rawContract']['decimal']}</Text>
                            </div>
                        }

                    </div>
                    <div style={{display:'flex', fontSize:'14px'}}>
                        <div style={{marginRight: '5px'}}>
                            <Text as='b'>Contract Amount: </Text>
                        </div>
                        {transObj['rawContract'] === undefined?<div style={{color: 'gray', fontSize:'14px'}}><Text as='b'>null</Text></div>:
                                <div style={{color: 'gray', fontSize:'14px'}}>
                                   <Text as='b'>{transObj['rawContract']['value']}</Text>
                            </div>             
                        }

                    </div>
                </div>



            </div>
            
            </div> 
        </div>
    )
}