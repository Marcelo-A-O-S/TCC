'use client'
import { ApiPost } from "@/api/post"
import { AxiosResponse } from "axios"
import { useState, useEffect, useRef, ChangeEvent } from "react"
import { ApiUser } from "@/api/user"
import { CommentPost } from "@/models/CommentPost"
import { Comment } from "@/ViewModel/CommentView"
export default function Timeline(){
    const modal = useRef<HTMLDialogElement>(null);
    const apipost = new ApiPost()
    const apiuser = new ApiUser()
    const [ openModal , setOpenModal] = useState(false);
    const [comment, setComment] = useState("");
    const [post, setPost] = useState<any>({
        Id:0,
        user: {},
        commentViews: [],
        imagesViews: []
    })
    const [posts, setPosts] = useState<any>([])
    useEffect(()=>{
        getPosts()
    },[])
    const InsertComment = async (e : ChangeEvent<HTMLTextAreaElement>) =>{
        setComment(e.target.value);
        console.log(post)
    }
    const PostComment = async () =>{
        let commentpost = new CommentPost();
        commentpost.id = 0;
        commentpost.comment = comment;
        commentpost.postId = post.Id;
        commentpost.userId = post.user.id;
        setComment("");
        console.log(commentpost);
        let response = await apipost.AddComment(commentpost);
        if(response.status == 200){

        }
        
    }
    const ModalShow = () =>{
        modal.current?.showModal();
        setOpenModal(true);
    }
    const ModalClose = () =>{
        
        modal.current?.close()
        setOpenModal(false);

    }
    const getPosts = async () =>{
        let response: AxiosResponse
        try{
            response = await apipost.GetAll();
            console.log(response)
            if(response.status == 200){
                setPosts(response.data)
            
            }
        }catch(err){

        }
        
    }
    const getPostId = async (postId: number) =>{
        let response: AxiosResponse
        response = await apipost.findPostById(postId)
        console.log(response)
        let data = response.data;
        let responseuser = await apiuser.GetById(data.userId);
        if(response.status == 200 && responseuser.status == 200){
            let user = responseuser.data;
            setPost({
                Id: data.id,
                title: data.title,
                description: data.description,
                imagesViews: data.imagesViews,
                commentViews: data.commentViews,
                user: user
            })
        }
        ModalShow()
    }
    const FormatedDate = (dateCreate: string) => {
        const date = new Date(dateCreate);
        return date.toLocaleDateString()
    }
    return(
        <><dialog className="border modal-dialog modal-xl modal-dialog-scrollable p-3 rounded-3" aria-modal="true" tabIndex={-1} ref={modal}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{post.title}</h5>
                        <button onClick={ModalClose} type="button" className="btn-close" ></button>
                    </div>
                    <div className="modal-body ">
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
                        <div>
                        <p>Publicado pelo usuario: {post.user.name}</p>
                        <p>Email do usuario: {post.user.email}</p>
                        </div>
                        <div className="card border">
                            <div className="card-body">
                                {post.commentViews.length == 0?<p className="w-100 text-center">Não foi adicionado nenhum comentário até o momento! :(</p>:
                                post.commentViews.map((item: any)=>{
                                    return(<p>item.comment</p>)
                                })
                                }

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="d-flex flex-column" style={{width:"100%"}}>
                            <textarea onChange={(e)=>InsertComment(e)} className="form-control" id="exampleFormControlTextarea1" placeholder="Escreva um comentário" value={comment} ></textarea>
                        </div>
                        {comment?<button onClick={PostComment} className="btn btn-primary">
                        Enviar
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
                        </button>:
                        ""}
                    </div>
                </div>
            </dialog>
            {posts.map((post: any, index: number) => (
                <div className="card border-dark bg-white" key={post.Id} style={{ width: "150px;" }}>
                    <div className="d-flex justify-content-between align-items-center card-header">
                        <h5 className="card-title">{post.title}</h5>
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
                        <div role="button" id="comments" className="d-flex gap-2 align-items-center pe-auto text-decoration-none" onClick={()=> getPostId(post.id)}>
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