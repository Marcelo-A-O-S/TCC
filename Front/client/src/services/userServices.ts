import { fetcherGet, fetcherServerGet } from "./fetchers";

async function GetByEmail(email:string){
    const data = await fetcherServerGet(`/api/User/GetByEmail?email=${email}`)
    return data
}

async function GetById(userId: number){
    const data = await fetcherGet(`/api/User/GetById?id=${userId}`);
    return data;
}

export default {
    GetByEmail,
    GetById
}