"use client"
import { ApiPost } from "@/api/post";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

export default function ListPosts(){
    const api = new ApiPost();
    useEffect(()=>{
        getPosts();
    },[])
    const getPosts = async () =>{
        let response: AxiosResponse
        try{
            response = await api.GetAll();
            let data = response.data;
            return(
                <>
                    <div className="card" style={{width: "18rem;"}}>

                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            {data.imagesViews.map((item:any)=>{
                                return(
                                    <img src={item.image} className="card-img-top" alt="...">
                                    </img>
                                )
                            })}
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                </>
            )
        }catch(error){

        }
    }
    return(
        <>
        {getPosts()}
        </>
    )
}
