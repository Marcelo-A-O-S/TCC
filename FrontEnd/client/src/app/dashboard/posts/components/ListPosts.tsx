"use client"
import { ApiPost } from "@/api/post";
import { ApiUser } from "@/api/user";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function ListPosts(){
    const router = useRouter();
    const [posts, setPosts] = useState<any>([]);
    const api = new ApiPost();
    const apiUser = new ApiUser();
    useEffect(()=>{
        getPosts()
    },[])
    const getPosts = async () =>{
        let response: AxiosResponse
        let user;
        const userCookie = Cookies.get("user");
        if(userCookie != null){
            const userJson = JSON.parse(userCookie);
            response = await apiUser.GetEmail(userJson.email);
            if(response.status == 200){
                user = response.data;
            }
        }
        try{
            response = await api.findByUserId(user.id);
            if(response.status == 200){
                let data = response.data;
                console.log(data)
                setPosts(response.data);
            }
        }catch(error){
            console.log(error);
        }
    }
    const deletePost = async (postId: number) =>{
        let response: AxiosResponse
        try{
            response = await api.deletePostById(postId);
            if(response.status == 200){
                router.push(`/dashboard/posts?delete=${response.data}`)
            }
        }catch(error){
            console.log(error);
        }
    }
    const FormatedDate = (dateCreate: string) => {
        const date = new Date(dateCreate);
        return date.toLocaleDateString()
    }
    return(
        <>
            {posts.map((post: any, index: number) => (
                <div className="card border-dark bg-white" key={index} style={{ width: "150px;" }}>
                    <div className="d-flex justify-content-between align-items-center card-header">
                        <h5 className="card-title">{post.title}</h5>
                        <div id="actions" className="d-flex gap-2">
                            <a href={`/dashboard/create?postId=${post.id}`} className="d-flex btn btn-primary gap-1 align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                            </svg>
                                Atualizar 
                            </a>
                            <button onClick={(e)=> deletePost(post.id)} className="d-flex btn btn-danger gap-1 align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                            </svg>
                                Deletar
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>{post.description}</p>
                        <div className="d-flex gap-2 p-4">
                        {post.imagesViews.map((item:any, imageIndex:number) => (
                            <div>
                                <img key={imageIndex} src={`${item.image}`} style={{ width: "150px;", height:"300px", borderColor:"black"}} className="img-fluid img-thumbnail" alt="..." />
                                <div>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                        <p>{FormatedDate(post.dateCreate)}</p>
                        
                    </div>
                    <div className="d-flex card-footer gap-2 ">
                        <div id="interactions">
                        <div role="button" id="likes" className="d-flex gap-2 align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                        Likes
                        </div>
                        <div role="button" id="comments" className="d-flex gap-2 align-items-center pe-auto text-decoration-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                            <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"/>
                        </svg>
                        {post.commentViews.length} Comments
                        </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
