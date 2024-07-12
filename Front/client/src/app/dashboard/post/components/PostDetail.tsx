'use client'
import { ChangeEvent, useEffect, useState } from "react"
import IcoChatBallon from "../../../../assets/balaochat.svg"
import IcoHeartLike from "../../../../assets/heartlike.svg"
import ImgHeartSelected from "../../../../assets/heartSelected.svg"
import { PostAddLike, PostRemoveLike, useGetPostById, PostAddComment, PostAddAnswer, PostDeleteCommentById, DeletePostById, PostDeleteAnswerById } from "@/api/post"
import styles from "../post.module.css"
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { UserAuthentication } from "@/models/UserAuthentication"
import { LikeDTO } from "@/DTOs/LikeDTO"
import { GetUserByEmail, useGetByEmail, GetUserById } from "@/api/users"
import { ICommentState } from "./utils/ICommentState"
import { CommentDTO } from "@/DTOs/CommentDTO"
import { AnswerDTO } from "@/DTOs/AnswerDTO"
import { IPostView, PostView } from "@/ViewModel/PostView"
import { ICommentView } from "@/ViewModel/CommentView"
import { AnswerView, IAnswerView } from "@/ViewModel/AnswerView"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"
type Props = {
    Id: number
}
export default function PostDetail({ Id }: Props) {
    const { data: userSession } = useSession();
    const { data: userData } = useGetByEmail(userSession?.user?.email || "");
    const { data, error, isLoading, isValidating, mutate } = useGetPostById(Id)
    const router = useRouter()
    const [answerState, setAnswerState] = useState({
        answerId:0,
        answer:"",
        commentId:0,
        user: new UserAuthentication()
    })
    const [commentState, setCommentState] = useState<ICommentState>({
        commentId: 0,
        commentUser: "",
        answerId: 0,
        user: {
            id: 0,
            username: "",
            email: "",
            token: ""
        },
        answer: false
    })
    const [postDetail, setPostDetail] = useState<PostView>({
        likeViews: [],
        commentViews: [],
        description: "",
        imagesViews: [],
        id: 0,
        title: "",
        userview: new UserAuthentication(),
        dateCreate: ""
    })
    useEffect(() => {
        if (data) {
            LoadingPost(data);
        }
    }, [data])
    const LoadingPost = async (data: any) => {
        let fetchComments = await Promise.all(data.commentViews.map(async (element: any) => {
            let responseUserComment = await GetUserById(element.userId);
            if (responseUserComment) {
                let fetchAnswer = await Promise.all(element.answers.map(async (itemAnswer: any) => {
                    let responseUserAnswer = await GetUserById(itemAnswer.userId)
                    if (responseUserAnswer) {
                        console.log(itemAnswer);
                        let answer: IAnswerView = {
                            id: itemAnswer.id,
                            answer: itemAnswer.answer,
                            commentId: itemAnswer.commentId,
                            user: responseUserAnswer,
                            answerGuid: "",
                            userId: responseUserAnswer
                        }

                        return answer;
                    }

                }))
                let answers = fetchAnswer.filter(Boolean);

                let userComment: ICommentView = {
                    id: element.id,
                    user: responseUserComment,
                    comment: element.comment,
                    answers: answers,
                    commentGuid: "",
                    postId: element.postId,
                    userId: responseUserComment.id
                }
                return userComment;
            }
        }));
        let comments = fetchComments.filter(Boolean);
        let postbody: IPostView = {
            id: data.id,
            title: data.title,
            description: data.description,
            userview: {
                email: data.userview.email,
                id: data.userview.id,
                username: data.userview.username,
                token: data.userview.token
            },
            likeViews: data.likeViews,
            commentViews: comments,
            imagesViews: data.imagesViews,
            dateCreate: data.dateCreate
        }
        setPostDetail(postbody);
    }
    const LikePost = async (postId: number) => {
        if (postDetail != undefined) {
            if (userSession) {
                const userCurrent = await GetUserByEmail(userSession.user?.email as string);
                const likeCurrent = postDetail.likeViews.find(x => x.userId == userCurrent?.id);
                if (likeCurrent !== undefined) {
                    await PostRemoveLike(likeCurrent.id);
                    mutate();
                } else {
                    const likeDTO = new LikeDTO();
                    likeDTO.postId = postDetail.id;
                    likeDTO.userId = userCurrent?.id as number;
                    likeDTO.generatedGuid()
                    try {
                        const response = await PostAddLike(likeDTO);
                        mutate()
                    } catch (err) {
                        console.log("Erro ao adicionar o like:", err)
                    }
                }
            }
        }
    }
    const InsertComment = async (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setCommentState(prevState => {
            return {
                ...prevState,
                commentUser: value
            }
        });
    }
    const ResetStateComment = () => {
        setCommentState(prevState => {
            return {
                ...prevState,
                user: new UserAuthentication(),
                answerId: 0,
                commentId: 0,
                answer: false,
                commentUser: ""
            }
        })
    }
    const ResetStateAnswer = () =>{
        setAnswerState({
            answer:"",
            answerId: 0,
            commentId: 0,
            user: new UserAuthentication()
        })
    }
    const PostComment = async () => {
        if (commentState.answer == true) {
            const answerDTO = new AnswerDTO()
            if (answerState.answerId !== 0) {
                answerDTO.id = answerState.answerId;
                answerDTO.commentId = answerState.commentId;
                answerDTO.answer = answerState.answer;
                if (userData !== undefined) {
                    answerDTO.userId = userData.id
                }
            } else {
                answerDTO.id = 0;
                answerDTO.commentId = answerState.commentId;
                answerDTO.answer = answerState.answer;
                if (userData !== undefined) {
                    answerDTO.userId = userData.id
                }
            }
            const response = await PostAddAnswer(answerDTO);
            if (response.status === 200) {
                mutate()
                CancelResponse()
            }
        } else {
            const commentDto = new CommentDTO()
            if (commentState.commentId !== 0) {
                commentDto.id = commentState.commentId;
                commentDto.comment = answerState.answer;
                commentDto.postId = postDetail.id;
                if (userData !== undefined) {
                    commentDto.userId = userData.id;
                }
            } else {
                commentDto.id = 0;
                commentDto.comment = commentState.commentUser;
                commentDto.postId = postDetail.id;
                if (userData !== undefined) {
                    commentDto.userId = userData.id;
                }
            }
            const response = await PostAddComment(commentDto);
            if (response.status == 200) {
                mutate()
                CancelResponse()
            }
        }
    }
    const DeleteComment = async (commentId: number) => {
        const response = await PostDeleteCommentById(commentId)
        if(response.status === 200){
            mutate()
        }
    }
    const ResponseComment = async(commentId: number) =>{
        const commentCurrent = postDetail.commentViews.find(x=> x.id === commentId);
        if(commentCurrent !== undefined){
            if(userData != undefined){
                const userCurrent = await GetUserByEmail(userData?.email);
                setCommentState(prevState=>{
                    return{
                        ...prevState,
                        commentId: commentCurrent.id,
                        user:commentCurrent.user,
                        answer:true
                    }
                })
                setAnswerState(prevState=>{
                    return{
                        ...prevState,
                        commentId: commentId
                    }
                })
            }
        }
    }
    const UpdateComment = async(commentId: number) =>{
        const commentCurrent = postDetail.commentViews.find(x=> x.id === commentId);
        if(commentCurrent !== undefined){
            if(userData != undefined){
                const userCurrent = await GetUserByEmail(userData?.email);
                setCommentState(prevState=>{
                    return{
                        ...prevState,
                        commentId: commentCurrent.id,
                        user:commentCurrent.user,
                        answer:false
                    }
                })
                setAnswerState(prevState=>{
                    return{
                        ...prevState,
                        commentId: commentId,
                        answer:commentCurrent.comment
                    }
                })
            }
        }
    }
    const InsertResponse = async (event: ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value;
        setAnswerState(prevState => {
            return {
                ...prevState,
                answer: value
            }
        });
    }
    const CancelResponse = async()=>{
        ResetStateAnswer()
        ResetStateComment()
    }
    const ResponseAnswer = async (answer: AnswerView) =>{
        const commentCurrent = postDetail.commentViews.find(x=> x.id == answer.commentId);
        const answerCurrent = commentCurrent?.answers.find(x=> x.id === answer.id);
        if(commentCurrent!== undefined){
            if(answerCurrent != undefined){
                if(userData != undefined){
                    const userCurrent = await GetUserByEmail(userData?.email);
                    setCommentState(prevState=>{
                        return{
                            ...prevState,
                            commentId: commentCurrent.id,
                            user:commentCurrent.user,
                            answer:true
                        }
                    })
                    setAnswerState(prevState=>{
                        return{
                            ...prevState,
                            commentId: commentCurrent.id,
                            answerId: answer.id,
                            user: userCurrent
                        }
                    })
                }
            }
        }
    }
    const UpdateResponse = async (answer: AnswerView)=>{
        const commentCurrent = postDetail.commentViews.find(x=> x.id == answer.commentId);
        const answerCurrent = commentCurrent?.answers.find(x=> x.id === answer.id);
        if(commentCurrent!== undefined){
            if(answerCurrent != undefined){
                if(userData != undefined){
                    const userCurrent = await GetUserByEmail(userData?.email);
                    setCommentState(prevState=>{
                        return{
                            ...prevState,
                            commentId: 0,
                            user:commentCurrent.user,
                            answer:true
                        }
                    })
                    setAnswerState(prevState=>{
                        return{
                            ...prevState,
                            commentId: commentCurrent.id,
                            answerId: answer.id,
                            answer: answer.answer,
                            user: userCurrent
                        }
                    })
                }
            }
        }
    }
    const DeleteAnswer= async(answerId:number)=>{
        const response = await PostDeleteAnswerById(answerId);
        if(response.status === 200){
            mutate()
        }
    }
    const EditPost = (postId: number) =>{
        router.push(`/dashboard/manage_post?edit=${postId}`)
    }
    const DeletePost = async(postId: number) =>{
        await DeletePostById(postId);
        await mutate()
        router.push(`/dashboard/profile?email=${userData?.email}`)
    }
    if (!postDetail) {
        <main className={styles.main}>
            <section className={styles.pagePost}>
                <h1>Carregando informações...</h1>
            </section>
        </main>
    } else {
        return (
            <main className={styles.main}>
                <section className={styles.pagePost}>
                    <div className={styles.post}>
                        <div className={styles.manager_post}>
                            <div className={styles.user_post}>
                                <h3 className={styles.username}>{postDetail.userview.username}</h3>
                                <Link href={`/dashboard/profile?email=${postDetail.userview.email}`} className={styles.email}>{postDetail.userview.email}</Link>
                            </div>
                            {userSession?.user?.email == postDetail.userview.email?<div className={styles.post_actions}>
                                <button onClick={()=>EditPost(postDetail.id)} className={styles.post_edit} >Edit</button>
                                <button onClick={()=>DeletePost(postDetail.id)} className={styles.post_delete}>Delete</button>
                            </div>:""}
                        </div>
                        <div className={styles.post_content}>
                            <h1 className={styles.post_title}>{postDetail.title}</h1>
                            <p className={styles.post_description}>{postDetail.description}</p>
                        </div>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            className={styles.field_images}
                            slidesPerView={1}
                            scrollbar={{ draggable: true }}
                            pagination={{ clickable: true }}
                            navigation
                        >
                            {postDetail.imagesViews.map((image) => {
                                return (
                                    <SwiperSlide className={styles.card_image} key={image.id}>
                                        <div>
                                            <Image className={styles.image} src={image.image} alt="" width={100} height={100} />
                                        </div>
                                        <div className={styles.field_description}>
                                            <p>{image.description}</p>
                                        </div>
                                    </SwiperSlide>)
                            })}
                        </Swiper>
                        <div className={styles.actions}>
                            <div className={styles.like} onClick={() => LikePost(postDetail.id)}>
                                {postDetail.likeViews.find(x => x.userId == userData?.id) ?
                                    <Image className={styles.likeSelected} src={ImgHeartSelected} alt="" />
                                    :
                                    <Image src={IcoHeartLike} alt="" />
                                }
                                {postDetail.likeViews.length}
                            </div>
                            <div className={styles.comment}>
                                <Image src={IcoChatBallon} alt="" />
                                {postDetail.commentViews.length}
                            </div>
                        </div>
                        <div className={styles.comments}>
                            <textarea onChange={(e) => InsertComment(e)} value={commentState.commentUser} className={styles.input_comment}></textarea>
                            <div className={styles.actions_input}>
                                {commentState.commentUser !== "" ? <button type="button" onClick={PostComment} className={styles.btn_send}>Send</button> : ""}
                            </div>
                            <div className={styles.comments_users}>
                                {postDetail.commentViews.length == 0 ?
                                    <p className={styles.comments_notfound}>Nada foi comentado até o momento!:(</p> :
                                    /// Renderização dos comentários
                                    postDetail.commentViews.map(comment => {
                                        return (
                                            <div className={styles.commentPost}>
                                                <div className={styles.userComment}>
                                                    <p className={styles.username_comment}>{comment.user.username}</p>
                                                    <Link href={`/dashboard/profile?email=${postDetail.userview.email}`} className={styles.email_comment}>{comment.user.email}</Link>
                                                </div>
                                                <div className={styles.comment_comment}>
                                                    <p>{comment.comment}</p>
                                                </div>
                                                <div className={styles.comment_actions}>
                                                    <button type="button" onClick={()=> ResponseComment(comment.id)} className={styles.btn_response}>Responder</button>
                                                    {userData?.email === comment.user.email ? <button onClick={()=>UpdateComment(comment.id)} className={styles.btn_update}>Editar</button> : ""}
                                                    {userData?.email === comment.user.email || userData?.email === postDetail.userview.email? <button type="button" onClick={() => DeleteComment(comment.id)} className={styles.btn_delete}>Excluir</button> : ""}
                                                </div>
                                                {/* Esse codigo inseri um novo comentario caso o commentState tenha setado um id igual ao comentário corrente já que a resposta
                                                será alinhada ao comentário sendo que toda resposta se inicia a partir de um comentário, além de ter definido 
                                                no commentState que o mesmo é uma pergunta mudando a propriedade answer para true, e que o o identificador não 
                                                tenha sido passado definindo assim a primeira resposta do comentário realizado.
                                                */}
                                                {commentState.commentId == comment.id && commentState.answer === true && answerState.answerId === 0?
                                                <>
                                                    <p>Você está respondendo: {commentState.user.username}</p>
                                                    <textarea onChange={(e) => InsertResponse(e)} value={answerState.answer} className={styles.input_comment}></textarea>
                                                        <div>
                                                            {commentState.commentId == comment.id && commentState.answer === true && answerState.answerId === 0 && answerState.answer !== ""?
                                                            <button type="button" onClick={PostComment}>Publicar</button>
                                                            :""}
                                                            <button type="button" onClick={CancelResponse}>Cancelar</button>
                                                        </div>
                                                </>
                                                :
                                                ""}
                                                {/* Esse codigo atualiza caso o commentState tenha setado um id igual ao comentário corrente, já que a partir disso,
                                                será utilizado o identificador para realizar a atualização, além de ter definido a propriedade answer como false, 
                                                já que se trata de uma atualização de comentário e não a criação de uma resposta de uma pergunta levando a considerar
                                                que o id da pergunta será zero já que não existira uma perguntapara ser retornada
                                                 */ }
                                                {commentState.commentId == comment.id && commentState.answer === false && answerState.answerId === 0?
                                                <>
                                                    <p>Editando mensagem:</p>
                                                    <textarea onChange={(e) => InsertResponse(e)} value={answerState.answer} className={styles.input_comment}></textarea>
                                                        <div>
                                                            {commentState.commentId == comment.id && commentState.answer === false && answerState.answerId === 0 && answerState.answer !== ""?
                                                            <button type="button" onClick={PostComment}>Publicar</button>
                                                            :""}
                                                            <button type="button" onClick={CancelResponse}>Cancelar</button>
                                                        </div>
                                                </>
                                                :
                                                ""}
                                                {comment.answers.length == 0?
                                                "":
                                                /// Renderização das respostas dos comentários caso for diferente de um array zerado
                                                comment.answers.map(answer =>{
                                                    return(
                                                    <>
                                                    <div className={styles.answer_post}>
                                                        <div className={styles.userComment}>
                                                            <p className={styles.username_comment}>{answer.user.username}</p>
                                                            <Link href={`/dashboard/profile?email=${postDetail.userview.email}`} className={styles.email_comment}>{answer.user.email}</Link>
                                                        </div>
                                                        <div>
                                                            {answer.answer}
                                                        </div>
                                                        <div className={styles.answer_actions}>
                                                            
                                                            {userData?.email === answer.user.email ? <button onClick={()=> UpdateResponse(answer)} className={styles.btn_update}>Editar</button> : ""}
                                                            {userData?.email === answer.user.email || userData?.email === postDetail.userview.email ? <button type="button" onClick={() => DeleteAnswer(comment.id)} className={styles.btn_delete}>Excluir</button> : ""}
                                                        </div>
                                                    </div>
                                                    {commentState.commentId == comment.id && commentState.answer == true && answerState.answerId === answer.id?
                                                    <>
                                                    <p>Você está respondendo: {commentState.user.username}</p>
                                                    <textarea onChange={(e) => InsertResponse(e)} value={answerState.answer} className={styles.input_comment}></textarea>
                                                    <div>
                                                        {commentState.commentId == comment.id && commentState.answer === true && answerState.answer !== ""?
                                                        <button type="button" onClick={PostComment}>Publicar</button>
                                                        :""}
                                                        <button type="button" onClick={CancelResponse}>Cancelar</button>
                                                    </div>
                                                    </>
                                                    :
                                                    ""}
                                                    {commentState.commentId == 0 && commentState.answer == true && answerState.answerId === answer.id && answerState.answer !== ""?
                                                    <>
                                                    <p>Editando resposta: {commentState.user.username}</p>
                                                    <textarea onChange={(e) => InsertResponse(e)} value={answerState.answer} className={styles.input_comment}></textarea>
                                                    <div>
                                                        {commentState.commentId == 0 && commentState.answer === true && answerState.answer !== ""?
                                                        <button type="button" onClick={PostComment}>Publicar</button>
                                                        :""}
                                                        <button type="button" onClick={CancelResponse}>Cancelar</button>
                                                    </div>
                                                    </>
                                                    :
                                                    ""}
                                                    
                                                    </>)
                                                })}
                                            </div>)
                                    })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }

}