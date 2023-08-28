import axios from 'axios'


export const addNewUser = async (userPassword, randomPhase) => {

    const response = await axios.post('https://firewallet-git-master-jaival.vercel.app/createUser', {
        method: "POST",
        body: JSON.stringify({
            password: userPassword,
            random_phase: randomPhase
        }),
        headers: {
            "Content-Type": "application/json"
        }}
        )
        
        const responseMessage = response.json()
        console.log("Respone Message From Post: ", responseMessage)
        
    
    
}

export const validateUser = async (userPassword) => {
    var verification_status = false

    try {
        const response = await axios.get(`https://firewallet-git-master-jaival.vercel.app/user/validate/${userPassword}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        var result = await response
        console.log("Verification Status changed to True")
        verification_status = true
        console.log(result)

    } catch (err) {
        console.log("Verification status stayed at false due to password not found")
        verification_status = false
    }

    return verification_status


    
}

export const fetchUserWallets = async (userPassword) => {
    try {
        const response = await axios.get(`https://firewallet-git-master-jaival.vercel.app/user/fetchWallet/${userPassword}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        var result = await response
        console.log("Result from fetchUserWallet Query: ", result)
        var resulting_user_id = result['data']['id']
        var resulting_wallets = result['data']['user_wallets']
        console.log("Resulting Wallets: ", resulting_wallets)
        return [resulting_wallets, resulting_user_id]
    } catch (err) {
        return "There was an error fetching wallets"

    }
}

export const fetchUserWalletId = async(user_id) => {
    try {
        const response = await axios.get(`https://firewallet-git-master-jaival.vercel.app/user/fetchWalletsById/${user_id}`)

        const result = await response

        return result['data']
    } catch (err) {
        console.log("DB error: ", err)
        return false
    }
}


export const createWallet = async (userId, walletString, walletObj) => {
    try {
        const response = await axios.put(`https://firewallet-git-master-jaival.vercel.app/user/addWallet/${userId}`, {
            method: "PUT",
            body: JSON.stringify({
                wallet_string: walletString,
                wallet_obj: walletObj
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        var result = await response
        console.log("Result from Creating Wallet Query: ", result)
        return true
    } catch (err) {
        return "There was an error creating a wallet"
    }
}

export const fetchWalletNames = async () => {
    const response = await axios.get(`https://firewallet-git-master-jaival.vercel.app/wallets/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    var result = await response
    console.log("Response from Fetching Wallet Names: ", response)
    const response_data = await result['data']
    console.log("resonse data for wallet names: ", response_data)
    const formatted_dict = {}
    
    for (let i = 0; i <= response_data.length; i++) {
        const current_wallet = response_data[i]
        if (current_wallet === undefined) {
            continue
        } else {
            const current_wallet_address = current_wallet['wallet_address']
            const current_wallet_name = current_wallet['wallet_name']
            const current_emoji_unicode = current_wallet['emoji_unicode']
            const current_color = current_wallet['color']
            formatted_dict[current_wallet_address] = {'wallet_name': current_wallet_name, 'emoji_unicode': current_emoji_unicode, 'color': current_color}
        }
    }

    return formatted_dict
    

}

export const updateWalletInfo = async (wallet_address, new_color, new_emoji) => {
    try {
        const response = await axios.put(`https://firewallet-git-master-jaival.vercel.app/wallets/update/${wallet_address}`, { 
            method: "PUT",
            body: JSON.stringify({
                color: new_color,
                emoji: new_emoji    
            }),
            headers: {
                "Content-Type": "application/json"
            }
            })
        
            const result = await response
            return true

    } catch (err) {
        return 'string error'
    }

}

export const getWalletNames = async () => {
    try {
        const response = await axios.get('https://firewallet-git-master-jaival.vercel.app/wallets/walletnames', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const result = await response
        console.log("Result for Wallet Names: ", result)
        const data_result = result['data']
        return data_result
    } catch (err) {
        return 'string error'
    }
}

export const updateWalletName = async (wallet_address, new_wallet_name) => {
    try {
        const response = await axios.put(`https://firewallet-git-master-jaival.vercel.app/wallets/updateName/${wallet_address}`, {
            method: "GET",
            body: JSON.stringify({
                wallet_name: new_wallet_name
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })

        var result = await response
        return result
    } catch (err) {
        return 'string error'
    }
}

export const UpdateLinks = async(id, wallet_address, links) => {
    try {
        const response = await axios.put(`https://firewallet-git-master-jaival.vercel.app/user/updateWalletLinks/${id}`, {
            method: "GET",
            body:JSON.stringify({
                wallet_address: wallet_address,
                link_array: links
            })
        })

        const result = await response
        console.log("Result from Backend: ", result)
        return true

    } catch (err) {
        console.log("Error: ", err)
        return false
    }

}

export const fetchWallet = async(id, wallet_address) => {
    try {
        const response = await axios.get(`https://firewallet-git-master-jaival.vercel.app/user/fetchWallet/${id}/${wallet_address}`, {
            method: "GET"
        })

        const result = await response['data']
        const user_wallet_json_string = result[0]['user_wallets']
        const user_wallet_dict = JSON.parse(user_wallet_json_string)
        console.log("User Wallet Dict: ", user_wallet_dict)
        return user_wallet_dict
    } catch (err) {
        console.log("Error: ", err)
    }
}

export const updatePassword = async(old_password, new_password, user_id) => {
    try {
        const response = await axios.get(`https://firewallet-git-master-jaival.vercel.app/user/updatePassword/${old_password}/${new_password}/${user_id}`, {
            method :"GET"
        })

        const result = await response['data']
        console.log("Updating Password Result: ", result)
        if (typeof result === 'string') {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log("DB Error: ", err)
        return []
    }
}

export const deleteWallet = async(user_id, wallet_hash) => {
    try {
        const response = await axios.get(`https://firewallet-git-master-jaival.vercel.app/user/deleteWallet/${user_id}/${wallet_hash}`, 
            {
                method: "GET"
            }
        )

        const data = await response['data']

        console.log("Deleting Status: ", data)
        if (typeof data === 'string') {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log("Error: ", err)
    }
}