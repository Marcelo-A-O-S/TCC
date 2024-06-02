"use client"
import { ApiPost } from "@/api/post";
import { ApiUser } from "@/api/user";
import { AxiosResponse } from "axios";
import { useEffect, useState, useContext, useRef, ChangeEvent } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { IPostsView } from "@/ViewModel/interfaces/IPostsView";
import { ICommentView } from "@/ViewModel/interfaces/ICommentView";
import { ICommentState } from "@/ViewModel/utils/ICommentState";
import { IAnswerView } from "@/ViewModel/interfaces/IAnswerView";
import { AnswerPost } from "@/models/AnswerPost";
import { CommentPost } from "@/models/CommentPost";
export default async function ListPosts(){
    const apipost = new ApiPost();
    const apiUser = new ApiUser();
    const {user} = useContext(UserContext)
    const modal = useRef<HTMLDialogElement>(null);
    const router = useRouter();
    const [ openModal , setOpenModal] = useState(false);
    const [posts, setPosts] = useState<Array<IPostsView>>([])
    const [post, setPost] = useState<IPostsView>({} as IPostsView)
    const [comment, setComment] = useState<ICommentState>({
        commentId:0,
        commentUser: "",
        answerId:0,
        user:{
            id:0,
            name:"",
            email:""
        },
        answer: false
    });
    
    useEffect(()=>{
        getPosts()
    },[])
    const ModalShow = () =>{
        modal.current?.showModal();
        setOpenModal(true);
    }
    const ModalClose = () =>{
        modal.current?.close()
        setOpenModal(false);
        getPosts()
    }
    const InsertComment = async (e : ChangeEvent<HTMLTextAreaElement>) =>{
        setComment(prevState =>{
            return {
                ...prevState,
                commentUser: e.target.value
            }
        });
    }
    const ResetStateComment = () =>{
        setComment(prevState=>{
            return{
                ...prevState,
                user:{
                    name: "",
                    email:"",
                    id:0
                },
                answerId:0,
                commentId: 0,
                answer: false,
                commentUser: ""
            }
        })
    }
    const PostComment = async () =>{
        if(comment.answer == true){
            let answerpost = new AnswerPost();
            if(comment.answerId != 0 ){
                answerpost.id = comment.answerId;
            }else{
                answerpost.id = 0;
            }
            answerpost.answer = comment.commentUser;
            answerpost.commentId = comment.commentId;
            if(user !== null){
                let responseuser = await apiUser.GetEmail(user?.email)
                if(responseuser.status == 200){
                    answerpost.userId = responseuser.data.id;
                }
            }
            console.log(answerpost)
            let response = await apipost.AddAnswer(answerpost)
            if(response.status == 200){
                ResetStateComment()
                getPostId(post.Id)
            }

        }else{
            let commentpost = new CommentPost();
            if(comment.commentId !== 0 ){
                commentpost.id = comment.commentId;
                commentpost.comment = comment.commentUser;
                commentpost.postId = post.Id;
                if(user !== null){
                    let responseuser = await apiUser.GetEmail(user?.email)
                    if(responseuser.status == 200){
                        commentpost.userId = responseuser.data.id;
                    }
                }
            }else{
                commentpost.id = 0;
                commentpost.comment = comment.commentUser;
                commentpost.postId = post.Id;
                if(user !== null){
                    let responseuser = await apiUser.GetEmail(user?.email)
                    if(responseuser.status == 200){
                        commentpost.userId = responseuser.data.id;
                    }
                }
            }
            ResetStateComment()
            console.log(commentpost)
            let response = await apipost.AddComment(commentpost);
            if(response.status == 200){
                getPostId(post.Id)
            }
        }
        
        
    }
    const ResponseComment = async (commentId: number) =>{
        let commentCurrent = post.commentViews.find(x=> x.Id == commentId)
        if(commentCurrent !== undefined){
            if(user !== null){
                let responseuser = await apiUser.GetEmail(user.email);
                if(responseuser.status === 200){
                    responseuser.data;
                    setComment(prevState=>{
                        return{
                            ...prevState,
                            commentId: commentCurrent.Id,
                            user:commentCurrent.user,
                            answer:true
        
                        }
                    })
                    
                }
            }
            
        }
       
    }
    const RemoveResponse = async () =>{
        ResetStateComment()
    }
    const getPosts = async () =>{
        let response: AxiosResponse
        let userData;
        try{
            if(user != null){
                response = await apiUser.GetEmail(user.email);
                console.log(response)
                if(response.status == 200){
                    userData = response.data;
                }
            }
            response = await apipost.findByUserId(userData.id);
            if(response.status == 200){
                let data = response.data;
                console.log(data)
                setPosts([]);
                let items: Array<IPostsView> = []
                let fetchPosts = await Promise.all(data.map( async (item:any)=>{
                    let responseuser = await apiUser.GetById(item.userId);
                    if(response.status == 200 && responseuser.status == 200){
                        let fetchComments = await Promise.all(item.commentViews.map( async(element: any) => {
                            let responseUserComment = await apiUser.GetById(element.userId);
                            if(responseUserComment.status == 200){
                                let userComment: ICommentView = {
                                    Id: element.id,
                                    user: responseUserComment.data,
                                    comment:element.comment,
                                    answers:element.answers
                                }
                                return userComment
                            }
                        }));
                        let comments = fetchComments.filter(Boolean);
                        let user = responseuser.data;
                        let postbody: IPostsView = {
                            Id:item.id,
                            title:item.title,
                            description: item.description,
                            user:user,
                            likeViews: item.likeViews,
                            commentViews: comments,
                            imagesViews: item.imagesViews,
                            dateCreate: item.dateCreate
                        }
                        return postbody
                    }
                }))
                let postsCurrent = fetchPosts.filter(Boolean)
                setPosts(postsCurrent);
                
            }
        }catch(error){
            console.log(error);
        }
    }
    const getPostId = async (postId: number) =>{
        let response: AxiosResponse
        response = await apipost.findPostById(postId)
        let dataPost = response.data;
        console.log(dataPost)
        let responseuser = await apiUser.GetById(dataPost.userId);
        if(response.status == 200 && responseuser.status == 200){
            let user = responseuser.data;
            let fetchComments = await Promise.all(dataPost.commentViews.map(async(element: any) => {
                let responseUserComment = await apiUser.GetById(element.userId);
                if(responseUserComment.status == 200){
                    let fetchAnswer = await Promise.all(element.answers.map(async (itemAnswer:any)=>{
                        
                        let responseUserAnswer = await apiUser.GetById(itemAnswer.userId)
                        if(responseUserAnswer.status == 200){
                            console.log(itemAnswer);
                            let answer: IAnswerView = {
                                Id: itemAnswer.id,
                                answer: itemAnswer.answer,
                                commentId: itemAnswer.commentId,
                                postId: itemAnswer.postId,
                                user:responseUserAnswer.data
                            }
                            
                            return answer;
                        }
                        
                    }))
                    let answers = fetchAnswer.filter(Boolean);
                    
                    let userComment: ICommentView = {
                        Id: element.id,
                        user: responseUserComment.data,
                        comment:element.comment,
                        answers: answers
                    }
                    return userComment;
                }
            }));
            let comments = fetchComments.filter(Boolean);
            let postbody: IPostsView = {
                Id:dataPost.id,
                title:dataPost.title,
                description: dataPost.description,
                user:user,
                likeViews: dataPost.likeViews,
                commentViews: comments,
                imagesViews: dataPost.imagesViews,
                dateCreate: dataPost.dateCreate
            }
            setPost(postbody)
        }
        if(openModal == false){
            ModalShow()
        }
    }
    const deletePost = async (postId: number) =>{
        let response: AxiosResponse
        try{
            response = await apipost.deletePostById(postId);
            if(response.status == 200){
                router.push(`/dashboard/posts?delete=${response.data}`)
            }
        }catch(error){
            console.log(error);
        }
    }
    const deleteComment = async (commentId: number)=>{
        let response: AxiosResponse = await apipost.DeleteCommentById(commentId)
        if(response.status == 200){
            getPostId(post.Id)
        }
    }
    const updateComment = async (comment:ICommentView)=>{
        setComment(prevstate=>{
            return{
                ...prevstate,
                commentId: comment.Id,
                commentUser: comment.comment,
                user:{
                    id: comment.user.id,
                    email: comment.user.email,
                    name:comment.user.name
                },
                answerId:0,
                answer:false
            }
        })
    }
    const updateAnswer = async( answer: IAnswerView)=>{
        console.log(answer)
        setComment(prevstate=>{
            return{
                ...prevstate,
                commentId: answer.commentId,
                commentUser: answer.answer,
                user:{
                    id: answer.user.id,
                    email: answer.user.email,
                    name:answer.user.name
                },
                answerId: answer.Id,
                answer:true
            }
        })
    }
    const deleteAnswer = async (answerId: number)=>{
        let response: AxiosResponse = await apipost.DeleteAnswerById(answerId);
        if(response.status == 200){
            getPostId(post.Id)
        }
    }
    const FormatedDate = (dateCreate: string) => {
        const date = new Date(dateCreate);
        return date.toLocaleDateString()
    }
    return(
        <><dialog className="border modal-dialog modal-xl modal-dialog-scrollable p-3 rounded-3" aria-modal="true" tabIndex={-1} ref={modal}>
        <div className="modal-content">
            <div className="modal-header d-flex row-reverse">
                
                <div className="d-flex flex-column">
                    <p>{post.user?.name}  <small className="text-muted">{post.user?.email}</small></p>
                    <h5 className="card-title">{post.title}</h5>
                    <p className="text-muted">Publicado em: {FormatedDate(post.dateCreate)}</p>
                </div>
                <button onClick={ModalClose} type="button" className="btn-close" ></button>
            </div>
            <div className="modal-body ">
                <p>{post.description}</p>
                <div className="d-flex gap-2 p-4">
                {post.imagesViews && post.imagesViews.length !== 0? post.imagesViews.map((item:any, imageIndex:number) => (
                    <div>
                        <img key={imageIndex} src={`${item.image}`} style={{ width: "150px;", height:"300px", borderColor:"black"}} className="img-fluid img-thumbnail" alt="..." />
                        <div>
                            <p>{item.description}</p>
                        </div>
                    </div>
                )):""}
                </div>
                <div>
                </div>
                <div className="card border">
                    <div className="card-body">
                        {post.commentViews && post.commentViews.length == 0?<p className="w-100 text-center">Não foi adicionado nenhum comentário até o momento! :(</p>:
                        post.commentViews?.map((item: ICommentView)=>{
                            return(
                                <div className="d-flex flex-column border rounded p-2 m-1">
                                    <label>{item.user?.name} <small className="text-muted">{item.user?.email}</small></label>
                                    <p>{item.comment}</p>
                                    <div className="d-flex gap-2">
                                        <div role="button" onClick={(e)=>ResponseComment(item.Id)}>Responder</div>
                                        {user?.email == item.user?.email ||user?.email == post.user?.email?<div onClick={(e)=> deleteComment(item.Id)} role="button">Excluir</div>:""}
                                        {user?.email == item.user?.email?<div onClick={(e)=> updateComment(item)} role="button">Editar</div>:""}
                                    </div>
                                    {item.answers && item.answers.length !== 0?
                                    item.answers.map((answer: IAnswerView)=>{
                                        return(
                                        <div>
                                            <hr/>
                                            <label>{answer.user?.name} <small className="text-muted">{answer.user?.email}</small></label>
                                            <p>{answer.answer}</p>
                                            <div className="d-flex gap-2">
                                                <div role="button" onClick={(e)=>ResponseComment(item.Id)}>Responder</div>
                                                {user?.email == answer.user?.email ||user?.email == post.user?.email?<div onClick={(e)=> deleteAnswer(answer.Id)} role="button">Excluir</div>:""}
                                                {user?.email == answer.user?.email?<div onClick={(e)=> updateAnswer(answer)} role="button">Editar</div>:""}
                                            </div>
                                        </div>)
                                    }):""}
                                </div>
                            )
                        })
                        }

                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <div className="d-flex flex-column" style={{width:"100%"}}>
                    {comment.answer == true && comment.answerId == 0?
                    <div className="d-flex gap-4">
                        <label>
                            Você está respondendo: {comment.user?.name} <small className="text-muted">{comment.user?.email}</small>
                        </label>
                        <div role="button" onClick={RemoveResponse}>Cancelar</div>
                    </div>:""}
                    {comment.commentId !== 0 && comment.commentUser !== ""?
                    <div className="d-flex gap-4">
                        <label>
                            Você está editando: 
                        </label>
                        <div role="button" onClick={RemoveResponse}>Cancelar</div>
                    </div>:""
                    }
                    <textarea onChange={(e)=>InsertComment(e)} className="form-control" id="exampleFormControlTextarea1" placeholder="Escreva um comentário" value={comment.commentUser} ></textarea>
                </div>
                {comment.commentUser !== ""?<button onClick={PostComment} className="btn btn-primary">
                Enviar
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
                </button>:
                ""}
            </div>
        </div>
    </dialog>
            {posts.map((post: IPostsView, index: number) => (
                <div className="card border-dark bg-white" key={index} style={{ width: "150px;" }}>
                    <div className="d-flex justify-content-between align-items-center card-header">
                        <h5 className="card-title">{post.title}</h5>
                        <div id="actions" className="d-flex gap-2">
                            <a href={`/dashboard/create?postId=${post.Id}`} className="d-flex btn btn-primary gap-1 align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                            </svg>
                                Atualizar 
                            </a>
                            <button onClick={(e)=> deletePost(post.Id)} className="d-flex btn btn-danger gap-1 align-items-center">
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
                        {post.likeViews.find(x=> x.userId == post.user.id)?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
                            <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1"/>
                        </svg>:
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-suit-heart-fill"  viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>}
                        {post.likeViews.length} Likes
                        </div>
                        <div role="button" id="comments" className="d-flex gap-2 align-items-center pe-auto text-decoration-none" onClick={()=> getPostId(post.Id)}>
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
