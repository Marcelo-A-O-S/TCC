"use client"
import { ApiPost } from "@/api/post";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export default function ListPosts(){
    const [posts, setPosts] = useState<any>([]);
    const api = new ApiPost();
    useEffect(()=>{
        getPosts()
    },[])
    const getPosts = async () =>{
        let response: AxiosResponse
        try{
            response = await api.GetAll();
            let data = response.data;
            setPosts(response.data);
            console.log(data)

        }catch(error){

        }
    }
    return(
        <>
            {posts.map((post: any, index: number) => (
                <div className="card" key={index} style={{ width: "150px;" }}>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p>{post.description}</p>
                        <div className="p-4">
                        {post.imagesViews.map((item:any, imageIndex:number) => (
                            <img key={imageIndex} src={`data:${item.type};base64, ${item.image}`} style={{ width: "150px;"}} className="img-fluid" alt="..." />
                        ))}
                        </div>

                        <p className="card-text">{post.content}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            ))}
        </>
    )
}
