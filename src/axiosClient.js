import axios from "axios";
const baseURL = 'https://api.themoviedb.org/3/';
const headers = {
    Authorization:"bearer "+process.env.NEXT_PUBLIC_TOKEN
}


const FetchApiData=async(url,params)=>{
    try{
        const {data}=await axios.get(baseURL+url,{
            headers,params,
        });
        return {
            success:true,
            error:false,
            data:data
        }
    }catch(err){
        return{
            success:false,
            error:true,
            message:err
        }
    }
}


export default FetchApiData;