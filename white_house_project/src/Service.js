import axios from 'axios';

const baseUrl = 'http://localhost:8081/';


export const doGet = async(url = '' ) => {
   let response = await axios.get(baseUrl + url).then((res) => res.data).then((data) => data)
   return response;
}

export const doPost = async(url = '',params = {} ) => {
    let response = await axios.post(baseUrl + url , params).then((res) => res.data).then((data) => data)
    return response;
 }