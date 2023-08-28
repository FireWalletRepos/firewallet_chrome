
import { Text, Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import  './App.css';
import FireImage from './Picture';
import RandomPhase from './pages/random';
import ChooseWalletPage from './pages/chooseWallet'

//importing API endpoint
import { validateUser } from './api/UserWallet';

function App(props) {
  
  const [password, setPassword] = useState('')
  const [createAccountStatus, setCreateAccountStatus] = useState(false)
  const [signUpPassword, setSignUpPassword] = useState('')
  const [SignUpStatus, setSignUpStatus] = useState(false)
  const [signInStatus, setSignInStatus] = useState(undefined)
  

  const handleChange = event => {
    
    const user_password = event.target.value
    console.log("User password: ", user_password) //for dev --> remove for prod
    
    setPassword(user_password)
    event.preventDefault()
    
  }

  const handleSignUpChange = event => {
    const user_temp_password = event.target.value
    console.log("User password: ", user_temp_password)
    event.preventDefault()
    setSignUpPassword(user_temp_password)
    setSignInStatus(undefined)
    
  }


  const handleKeyClick = (e) => {
    console.log("User key: ", e.key)
    if (e.key === 'Enter') {
      alert(password)
    }
  }

  
  const handleCreateAccountClick = (e) => {
    setCreateAccountStatus(true)
  }

  const handleSignUpClick = (e) => {
    setSignUpStatus(true)
  }

  const handleSignIn = async (e) => {
    console.log("The password typed is: ", password)
    const signInresult = await validateUser(password)
    console.log("Sign in Result: ", signInresult)
    setSignInStatus(signInresult)
    
    
  }

  
 
  

  

  return (
    <div className='App'>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap'); // font import
      </style>
      
      {signInStatus === true? <ChooseWalletPage value={password} />: 
      
      
      <div>

      {SignUpStatus === true? 
      
      
      <RandomPhase value={signUpPassword}/>
      : 

      <div>
      <Center>
        <FireImage />
      </Center>
      <div className='title'>
        <Text as='b'>FireWallet</Text>
      </div>
      
    
      {createAccountStatus === true? 
      <div>
        <div style={{fontSize: "20px", marginTop: "10px"}}>
          <Text> Create Your Account 🎒</Text>
        </div>
        <div className="passwordSignUpInput">
          <form>
            <div className='passwordInput'>
              <input type='password' placeholder='Password' min='6' onChange={(e) => handleSignUpChange(e)}></input>
            </div>
          </form>
          {signUpPassword.length > 6 ? <div style={{fontSize: "12px", marginTop: "10px", padding: "5px"}}>
          <button className='CreateAccountButton' onClick={(e) => handleSignUpClick(e)}>
            <Text as='b'>Create your Account</Text>
          </button>
          </div>: 
            <div>
            <div style={{fontSize: "12px", marginTop: "10px", padding: "5px"}}>
              <Text>End-To-End Encrypted 🔐</Text>
            </div>
            <div className="warningMessage">
              <Text>Password Must be Above 6 Characters.</Text>
              <Text>Current Length: {signUpPassword.length}</Text>
            </div>
            </div>
          }
          
          
          
        </div>

      </div> :
      <div>
        <div className='subTitle'>
          <Text>Your Wallet with a Firewall</Text>
        </div>



        <div className="signUpButton">
          <form>
            <div className='passwordInput'>
              <input type='password' placeholder='Password' onKeyPress={(e) => handleKeyClick(e)} onChange={(e) => handleChange(e)} min="6"></input>
              
            </div>
              {signInStatus === false? <div style={{color: 'red', fontSize:'12px', marginBottom:'2px'}}>

                <Text>There is no account with this password 😔</Text>

                </div>: 

              <div></div>}
          </form>
        </div>

        <div className="alreadyButton">
          <button onClick={(e) => handleCreateAccountClick(e)}><Text as='b'>Don't have an Account? Sign Up</Text></button>
        </div>

        {password.length > 6 ? 
          <Center><div className='signInButton'>
          <button onClick={(e) => handleSignIn(e)}><Text as='b'>Sign In</Text></button>
          

        </div></Center>: 
          <div className="warningMessage">
            <Text>Password Must be Above 6 Characters.</Text>
            <Text > Current Length: {password.length}</Text>
          
          </div>}


        
        <Center>
        <div className="footer">
      
              <Text> Made by Jaival Patel :0</Text>
            
        </div>
        </Center>
      </div>  
      
      }
      </div>



      
      }
        
        
        
      </div>}
      




      

    </div>
  );
}

export default App;
