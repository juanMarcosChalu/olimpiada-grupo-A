import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data,setData] = useState(null);
    const [loading,setLoading]= useState(true);
    const [error,setErorr]= useState(null);
    useEffect(()=>{
        setLoading(true);
        fetch(url)
        .then((response)=>response.json())
        .then((data)=>setData(data))
        .catch((error)=>setErorr(error))
        .finally(()=>setLoading(false));
    },[])
    return {data,loading,error};
}
