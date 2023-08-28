
import { Text, Center } from '@chakra-ui/react';
import  '../App.css';
import { generate, count } from "random-words";
import { useEffect, useState } from 'react';
import swal from 'sweetalert';


// api calls 
import { addNewUser } from '../api/UserWallet';




export default function RandomPhase(props) {

    const [wordArray, setWordArray] = useState([])
    const [userPassword, setUserPassword] = useState('')
    const colorArray = ['#ff7b00', '#ff8800', '#ff9500', '#ffa200', '#ffaa00', '#ffb700', '#ffc300', '#ffd000', '#ffdd00', '#ffea00']
    


    const generateRandomWordArray = () => {
        const random_word_array = generate(10)
        console.log("Random Word Array: ", random_word_array)
        setWordArray(random_word_array)
    }

    useEffect(() => {
        console.log(props)
        const user_password = props.value
        console.log("User Password to add to Db: ", user_password)
        setUserPassword(user_password)
        generateRandomWordArray()

        

    }, [])

    const handleContinue = () => {
        
        swal({
            title:"Success!",
            text:"You have successfully created an Account 🎆",
            icon: "success",
            button: "Log In"

        })
        .then((value) => {
            console.log(value)
            addNewUser(userPassword, wordArray)
            window.location.replace('index.html')
        })
        console.log("Hi, please work")

        
        
    }

    return (
        
        <div className='App'>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'); // font import
            </style>
            <div className='continueButton'>
                <button onClick={() => handleContinue()}>
                    <Text>Continue {'>'}</Text>
                </button>
            
            </div>
            <div className='randomSeedTitle'>
                <Text as='b'>Random Seed For Account Recovery 🌈</Text>
            </div>
            <div className='randomWords'>
                    <Center>
                    <div>
                        {wordArray.map((word ,idx) => (
                            <div key={idx} style={{border:"2px", background: colorArray[idx], padding: "2px", borderRadius: "5px", marginBottom:"5px", width:"100px"}}>
                                <Text>{idx + 1}: {word}</Text>
                            </div>
                        ))}
                    </div>
                    </Center>
                
            </div>
            <div style={{fontSize:"10px", marginTop:"8px"}}>
                <Text as='b'>*Please store this phrase in a secret and accessible place*</Text>
            </div>
            


        </div>
    )
}