'use client'
import { useGetAllPosts, PostRemoveLike, PostAddLike } from "@/api/post";
import { useGetByEmail ,GetUserByEmail} from "@/api/users";
import { useEffect, useState, useContext} from "react";
import styles from "./posts.module.css"
import IcoChatBallon from "../../../assets/balaochat.svg"
import IcoHeartLike from "../../../assets/heartlike.svg"
import Image from "next/image";
import { PostView } from "@/ViewModel/PostView";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Link from "next/link";
import ImgHeartSelected from "../../../assets/heartSelected.svg"
import { UserContext } from "@/contexts/UserContext";
import { LikeDTO } from "@/DTOs/LikeDTO";
import { useRouter } from "next/navigation";
export default function ListPosts(){
    const router = useRouter()
    const {user:userContext} = useContext(UserContext)
    const { data, error, isValidating, isLoading,mutate } = useGetAllPosts()
    const [ posts, setPosts] = useState<Array<PostView>>([]);
    const { data: user} = useGetByEmail(userContext?.email || "");
    useEffect(()=>{
        setPosts(data)
    },[data])
    const LikePost = async(postId: number) =>{
        const postCurrent = posts.find(x=> x.id == postId);
        if(postCurrent != undefined){
            if(userContext){
                const userCurrent = await GetUserByEmail(userContext.email);
                const likeCurrent = postCurrent.likeViews.find(x=> x.userId == user?.id);
                if(likeCurrent !== undefined){
                    await PostRemoveLike(likeCurrent.id);
                    mutate();
                }else{
                    const likeDTO = new LikeDTO();
                    likeDTO.postId = postCurrent.id;
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
    const ViewPost = (postId: number) =>{
        router.push(`/dashboard/post?postId=${postId}`);
    }
    if (error) {
        return <h1>Erro ao carregar dados: {error.message}</h1>;
    }
    if(!posts){
        return(
            <>
                <div className={styles.container_posts}>
                    <div className={styles.field_search}>
                        <input  type="text" className={styles.search}/>
                    </div>
                    <h1 className={styles.loading}>Carregando as novidades de hoje ....</h1>
                </div>
            </>
            )
        }
    return(
    <>
    <div className={styles.container_posts}>
        <div className={styles.posts}>
                {posts.map((item: PostView)=>{
                    return (
                    <div className={styles.post} key={item.id} >
                        <div className={styles.profile} >
                            <h3 className={styles.username}>{item.userview.username}</h3>
                            <Link href={`/dashboard/profile?email=${item.userview.email}`}  className={styles.email}>{item.userview.email}</Link>
                        </div>
                        <div className={styles.content} onClick={()=>ViewPost(item.id)}>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                        <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            className={styles.field_images}
                            slidesPerView={1}
                            scrollbar={{ draggable: true}}
                            pagination={{clickable:true}}
                            navigation
                            >
                                {item.imagesViews.map((image)=>{
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
                            <div className={styles.like} onClick={()=> LikePost(item.id)}>
                                {item.likeViews.find(x=> x.userId == user?.id )?
                                <Image className={styles.likeSelected} src={ImgHeartSelected} alt=""/>
                                :
                                <Image src={IcoHeartLike} alt=""/>
                                }
                                {item.likeViews.length}
                            </div>
                            <div className={styles.comment}>
                                <Image src={IcoChatBallon} alt=""/>
                                {item.commentViews.length}
                            </div>
                        </div>
                        
                    </div>)
                })}
        </div>
    </div>
    </>
    )
}