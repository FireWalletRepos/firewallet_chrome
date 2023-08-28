
import { Text, Center, filter } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import  '../App.css';


export default function NewsPage(props) {
    
    const [newsDict, setNewsDict] = useState()

    const filterNewsDict = (news_dict) => {
        console.log("News Dict: ", news_dict)
        const key_array = Object.keys(news_dict)
        for (let key_idx = 0; key_idx <= key_array.length; key_idx++) {
            const current_key = key_array[key_idx]
            if (current_key === undefined) {
                continue
            } else {
                if (news_dict[current_key]['header'].length > 3) {
                   delete news_dict[current_key]
                } else {
                    continue
                }
            }
        }
        console.log(
            "Updated News Dict: ", news_dict
        )
        setNewsDict(news_dict)
    }


    useEffect(() => {
        const news_dict = props.news_dict
        console.log("News Dictionary: ", news_dict)
        filterNewsDict(news_dict)
    })

    return (
        <div>
            <div style={{fontSize:'16px'}}>
                <Text as='b'>News 📰</Text>
            </div>
            
                {newsDict === undefined? <div><Text>Loading...</Text></div>:
                <div className='articleDisplay'>
                    {Object.keys(newsDict).map((link, idx) => (
                        <a href={link} id={idx}>
                        <div className='articleBox'>
                            <div className='articleTitle'>
                                <Text as='b'>{newsDict[link]['header'][0]}</Text>
                            </div>
                            <div className='articleDate'>
                                <Text as='b'>{newsDict[link]['header'][1]} | {newsDict[link]['header'][2]}</Text>
                            </div>
                            <div className='articleDetails'>
                                <Text>{newsDict[link]['content']}...</Text>
                            </div>

                            
                        </div>
                        </a>
                    ))}
                </div>
                }
            <Center>
            <div className='articleFooter'>
                <Text>Recent News from <div style={{color:'green'}}><a href={'https://techcrunch.com/category/cryptocurrency/'}>techcrunch crypto 👍</a></div> </Text>
            </div>
            </Center>
                
       

        </div>
    )
}