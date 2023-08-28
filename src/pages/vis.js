

import { Text, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ForceGraph2D} from 'react-force-graph';

import  '../App.css'

// api imports

import { fetchWallet } from '../api/UserWallet';


export default function Vis(props) {

   


    const [graphDict, setGraphDict] = useState({nodes: [{ 
        "id": "id1",
        "name": "Wallet Visualizer",
        "val": 1 
      },
      ], links: []})

    const [nodeFColor, setNodeColor] = useState('')
    const [chosenNodeAddress, setChosenNodeAddress] = useState()
    const [display, setDisplay] = useState(false)
    const [apiResult, setApiResult] = useState()

    const createNodeArray = (wallet_dict) => {
        const wallet_dict_nodes = Object.keys(wallet_dict)
        console.log("Wallet Dict Nodes: ", wallet_dict_nodes)
        const nodes = []
        
        for (let i = 0; i<= wallet_dict_nodes.length; i++) {
            const cur_wallet_add = wallet_dict_nodes[i]
            if (cur_wallet_add === undefined) {
                continue
            } else {
                const node_id = cur_wallet_add
                const name = cur_wallet_add
                const val = i
                const dict = {"id": node_id, "name": name, "val": val, "nodeColor": nodeFColor}
                nodes.push(dict)
            }
        }
        console.log("Node Array: ", nodes)
        return nodes
    }

    const createLinkArray = (wallet_user_dict) => {
        const wallet_addresses = Object.keys(wallet_user_dict)
        const links = [] 

        for (let i =0; i<= wallet_addresses.length; i++) {
            const wallet_address = wallet_addresses[i]
            if (wallet_address === undefined) {
                continue
            } else {
                const wallet_dict = wallet_user_dict[wallet_address]
                const wallet_links = wallet_dict['links']
                if (wallet_links.length ===0) {
                    continue
                } else {

                    for (let link_idx = 0; link_idx <= wallet_links.length; link_idx++) {
                        const cur_wallet_obj_link = wallet_links[link_idx]
                        console.log("Cur Wallet Obj Link: ", cur_wallet_obj_link)
                        if (cur_wallet_obj_link === undefined) {
                            continue
                        } else {
                            const link_wallet_add = cur_wallet_obj_link['account']['address']
                            const link_dict = {"source": wallet_address, "target":link_wallet_add}
                            links.push(link_dict)

                        }
                        

                    }

                }
            }
        }

        console.log("Link Array: ", links)
        return links
    }

    const handleSetGraphDict = (graph_dict) => {
        console.log("Graph Dict to set: ", graph_dict)
        setGraphDict(graph_dict)
    }

    const handleSetApiResult = (api_result) => {
        setApiResult(api_result)
    }

    const handleClick = (node) => {
        console.log("node: ", node)
        console.log("Api result: ", apiResult)
        setChosenNodeAddress(node.name)
        setDisplay(true)
        
    }


    useEffect(() => {
        const wallet_obj = props.wallet_obj
        const user_id = props.userId
        const wallet_color = props.wallet_color
        console.log("Wallet Object: ", wallet_obj)
        console.log("user id: ", user_id)
        console.log("Wallet Color: ", wallet_color)
        setNodeColor(wallet_color)



        async function handleFetchWalletDictApi(user_id, wallet_obj) {
            const wallet_address = wallet_obj['account']['address']
            const api_result = await fetchWallet(user_id, wallet_address)
            console.log("Wallet Object from DB: ", api_result)
            const node_array = createNodeArray(api_result)
            const link_array = createLinkArray(api_result)
            const new_graph_dict = {nodes: node_array, links: link_array}
            handleSetGraphDict(new_graph_dict)
            handleSetApiResult(api_result)
            
            
        }

        handleFetchWalletDictApi(user_id, wallet_obj)
        
        
    }, [])


    return (
        <div>
            <div style={{fontSize:'16px'}}>
                <Text as='b'>Wallet Visualizer 👀</Text>
            </div>
            {nodeFColor === ''?<div><Text>Loading...</Text></div>:
                    <div>
                        <ForceGraph2D height={350} nodeRelSize={2} nodeOpacity={0.60} width={280} onNodeClick={(node) => handleClick(node)} graphData={graphDict} nodeColor={node => typeof(node.id) === 'string'? nodeFColor: 'blue'}/>
                    </div>
            }

            {display === true?
            <div>
                <div style={{fontSize:'12px', textAlign: 'left'}}>
                    <Text as='b'>Address</Text>
                </div>
                <div style={{textAlign: 'left', fontSize:'10px', marginTop:'2px', color:'gray'}}>
                    <Text as='b'>{chosenNodeAddress}</Text>
                </div>
                <div style={{textAlign: 'left', fontSize: '12px', marginTop: '2px'}}>
                    <Text as='b'>Wallet Links</Text>
                    {apiResult[chosenNodeAddress]['links'].length === 0?
                    
                    <div style={{textAlign: 'center'}}>
                        <Text as='b'>No Links</Text>
                    </div>
                    
                    
                    :
                    <div>
                        {apiResult[chosenNodeAddress]['links'].map((wallet_dict, idx) => {
                            return (
                            <div key={idx} style={{display: 'flex'}}>
                                <div style={{marginRight: '2px', fontSize:'12px'}}>
                                    <Text as='b'>{idx + 1}: </Text>
                                </div>
                                <div style={{fontSize:'10px', color:'gray', marginTop:'2px'}}>
                                    <Text as='b'>{wallet_dict['account']['address']}</Text>
                                </div>
                            </div>
                            )
                            
                        })}
                    </div>
                    
                    }

                    
                </div>
            </div>:
            <div></div>
            }


        </div>
    )
}