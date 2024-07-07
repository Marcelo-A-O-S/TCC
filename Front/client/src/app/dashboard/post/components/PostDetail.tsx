'use client'
import { ChangeEvent, useContext, useEffect, useState } from "react"
import IcoChatBallon from "../../../../assets/balaochat.svg"
import IcoHeartLike from "../../../../assets/heartlike.svg"
import ImgHeartSelected from "../../../../assets/heartSelected.svg"
import { PostAddLike, PostRemoveLike, useGetPostById } from "@/api/post"
import styles from "../post.module.css"
import { Post } from "@/models/Post"
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { UserAuthentication } from "@/models/UserAuthentication"
import { LikeDTO } from "@/DTOs/LikeDTO"
import { GetUserByEmail, useGetByEmail } from "@/api/users"
import { UserContext } from "@/contexts/UserContext"
type Props = {
    Id: number
}
export default function PostDetail({Id}:Props){
    const { user:userContext } = useContext(UserContext);
    const { data: user} = useGetByEmail(userContext?.email || "");
    const {data,error,isLoading,isValidating,mutate} = useGetPostById(Id)
    const [postDetail, setPostDetail] = useState<Post>({
        likes:[],
        comments: [],
        description:"",
        images: [],
        Id:0,
        title:"",
        user: new UserAuthentication()
    })
    useEffect(()=>{
        console.log(data)
        if(data){
            setPostDetail({
                Id: data.id,
                description: data.description,
                title: data.title,
                user: {
                    email: data.userview.email,
                    id: data.userview.id,
                    username: data.userview.username,
                    token: data.userview.token
                },
                comments: data.commentViews,
                images: data.imagesViews,
                likes: data.likeViews
            })
        }
    },[data])
    const LikePost = async(postId: number) =>{
        if(postDetail != undefined){
            if(userContext){
                const userCurrent = await GetUserByEmail(userContext.email);
                const likeCurrent = postDetail.likes.find(x=> x.userId == user?.id);
                if(likeCurrent !== undefined){
                    await PostRemoveLike(likeCurrent.id);
                    mutate();
                }else{
                    const likeDTO = new LikeDTO();
                    likeDTO.postId = postDetail.Id;
                    likeDTO.userId = userCurrent?.id as number;
                    likeDTO.generatedGuid()
                    try{
                        const response = await PostAddLike(likeDTO);
                        mutate()
                    }catch(err){
                        console.log("Erro ao adicionar o like:", err)
                    } 
                }
            }
        }
    }
    const InsertComment = async(event: ChangeEvent<HTMLTextAreaElement>)=>{

    }
    if(!postDetail){
        <main className={styles.main}>
            <section className={styles.pagePost}>
                <h1>Carregando informações...</h1>
            </section>
        </main>
    }else{
        return(
            <main className={styles.main}>
                <section className={styles.pagePost}>
                    <div className={styles.post}>
                        <div className={styles.user_post}>
                            <h3 className={styles.username}>{postDetail.user.username}</h3>
                            <p className={styles.email}>{postDetail.user.email}</p>
                        </div>
                        <div className={styles.post_content}>
                            <h1 className={styles.post_title}>{postDetail.title}</h1>
                            <p className={styles.post_description}>{postDetail.description}</p>
                        </div>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            className={styles.field_images}
                            slidesPerView={1}
                            scrollbar={{ draggable: true}}
                            pagination={{clickable:true}}
                            navigation
                            >
                                {postDetail.images.map((image)=>{
                                    return(
                                    <SwiperSlide className={styles.card_image} key={image.id}>
                                        <div>
                                        <Image className={styles.image} src={image.image} alt="" width={100} height={100}/>
                                        </div>
                                        <div className={styles.field_description}>
                                        <p>{image.description}</p>
                                        </div>
                                    </SwiperSlide>)
                                })}
                            </Swiper>
                        <div className={styles.actions}>
                        <div className={styles.like} onClick={()=> LikePost(postDetail.Id)}>
                                {postDetail.likes.find(x=> x.userId == user?.id )?
                                <Image className={styles.likeSelected} src={ImgHeartSelected} alt=""/>
                                :
                                <Image src={IcoHeartLike} alt=""/>
                                }
                                {postDetail.likes.length}
                            </div>
                            <div className={styles.comment}>
                                <Image src={IcoChatBallon} alt=""/>
                                {postDetail.comments.length}
                            </div>
                        </div>
                        <div className={styles.comments}>
                            <textarea onChange={(e)=> InsertComment(e)} className={styles.input_comment}></textarea>

                            <div className={styles.comments_users}>
                                {postDetail.comments.length == 0?<p className={styles.comments_notfound}>Nada foi comentado até o momento!:(</p>:""}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        )
    }
    
}