
import { Text, Center, filter } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import  '../App.css'


export default function LearningPage() {


    return (
        <div>
            <div style={{fontSize:'16px'}}>
                <Text as='b'>Learn 🧠</Text>
            </div>
            <div style={{fontSize:'14px', marginTop:'10px', color:'gray', marginBottom: '10px'}}>
                <Text>Sources to help expand knowledge in different domains of the web3 world 🌎 </Text>
            </div>
            
            <div style={{textAlign: 'left', marginBottom: '20px'}}>
                <Text as='b'>Dev 👾</Text>
                <div style={{display:'flex', flexWrap:'wrap', width:'250px',  marginTop: '5px'}}>
                    <div style={{backgroundColor:'#eae4e9', padding:'5px', borderRadius:'10px', fontSize:'16px'}}>
                        <a href='https://university.alchemy.com/'><Text as='b'>Alchemy University</Text></a>
                    </div>
                    <div style={{position:'absolute', right:'0', marginRight:'50px', fontSize:'16px', backgroundColor:'#eae4e9', padding:'5px', borderRadius:'10px'}}>
                        <a href='https://moralis.io/web3-programming-how-to-learn-web3-programming/'><Text as='b'>Moralis</Text></a>
                    </div>
                    <div style={{marginTop: '10px', backgroundColor:'#eae4e9', fontSize:'16px', padding:'5px', borderRadius:'10px'}}>
                        <a href='https://www.freecodecamp.org/news/full-stack-ethereum-development/'><Text as='b'>FreeCodeCamp</Text></a>
                    </div>
                
                </div>
            </div>
            <div style={{textAlign: 'left', marginBottom: '20px'}}>
                

                <div className='securityBox'>
                <Text as='b'>Security 🔐</Text>
                    <div style={{marginTop:'10px', borderBottom:'1px solid gray'}}>
                        <div style={{fontSize:'14px'}}>
                            <a href='https://www.moonpay.com/learn/cryptocurrency/crypto-security-basics'><Text as='b'>Crypto Security Basics</Text></a>
                        </div>
                        <div style={{display:'flex', fontSize:'12px', color:'gray'}}>
                            <Text>Author: </Text>
                            <div style={{marginLeft:'5px'}}>
                                <Text as='b'>Moonpay</Text>
                            </div>
                        </div>
                    </div>


                    <div className='linkBox'>
                        <div style={{fontSize:'14px'}}>
                            <a href='https://opensea.io/learn/how-to-stay-protected-in-web3'><Text as='b'>How to Stay Protected in Web3</Text></a>
                        </div>
                        <div style={{display:'flex', fontSize:'12px', color:'gray'}}>
                            <Text>Author: </Text>
                            <div style={{marginLeft:'5px'}}>
                                <Text as='b'>OpenSea</Text>
                            </div>
                        </div>
                    </div>

                    <div className='linkBox'>
                        <div style={{fontSize:'14px'}}>
                            <a href='https://support.metamask.io/hc/en-us/sections/11294597751963-Staying-Safe-in-Web3'><Text as='b'>Staying Safe in Web3</Text></a>
                        </div>
                        <div style={{display:'flex', fontSize:'12px', color:'gray'}}>
                            <Text>Author: </Text>
                            <div style={{marginLeft:'5px'}}>
                                <Text as='b'>Metmask </Text>
                            </div>
                        </div>
                    </div>
                </div>

                
                 
                
            </div>
            <div style={{textAlign: 'left'}}>
            <div className='generalBox'>
                <Text as='b'>General Info 🌈</Text>
                    <div style={{marginTop:'10px', borderBottom:'1px solid gray'}}>
                        <div style={{fontSize:'14px'}}>
                            <a href='https://ethereum.org/en/learn/'><Text as='b'>Ethereum Learn Hub</Text></a>
                        </div>
                        <div style={{display:'flex', fontSize:'12px', color:'gray'}}>
                            <Text>Author: </Text>
                            <div style={{marginLeft:'5px'}}>
                                <Text as='b'>Ethereum</Text>
                            </div>
                        </div>
                    </div>


                    <div className='linkBox'>
                        <div style={{fontSize:'14px'}}>
                            <a href='https://www.coinbase.com/learn'><Text as='b'>Coinbase | Learn</Text></a>
                        </div>
                        <div style={{display:'flex', fontSize:'12px', color:'gray'}}>
                            <Text>Author: </Text>
                            <div style={{marginLeft:'5px'}}>
                                <Text as='b'>Coinbase</Text>
                            </div>
                        </div>
                    </div>

                    
                </div>
                </div>



            <Center>
                <div style={{position: 'absolute', bottom: '0', fontSize:'11px', color:'gray'}}>
                    <Text as='b'>Sources and Content are Updated Regularly 🪄</Text>
                </div>
            </Center>
        </div>
    )

}