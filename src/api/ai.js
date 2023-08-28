import axios from 'axios'



export const fetchNews = async () => {
    try {
        const response = await axios.get('https://firewallet-git-master-jaival.vercel.app/ai/news', {
            method: "GET",
             headers: {
                "Content-Type": "application/json"
            }
        })
    
        const result = await response
        
        return result['data']

    } catch (err) {
        console.log("Error: ", err)
        return {}
    }


}