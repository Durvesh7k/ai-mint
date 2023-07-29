import axios from 'axios';


const URL = 'http://localhost:8000'


const client = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json"
    }
})

export const saveNewRecord = async (record) => {
    try {
        client.post('/', record).then((response) => {
            console.log("Data saved successfully")
        })
    } catch (error) {
        console.log(error)
    }
}


export const getRecord = async (account) => {
    try {
        const response = await client.get(`/${account}`)
        return response.data;
        
    } catch (error) {
        console.log(error)
    }
}