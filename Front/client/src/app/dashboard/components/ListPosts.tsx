'use client'
import { useGetAllPosts } from "@/hooks/usePost";
import LikeServices from "@/services/likeServices"
import { useGetByEmail } from "@/hooks/useUser";
import userServices from "@/services/userServices";
import { useContext, useEffect, useState} from "react";
import styles from "./posts.module.css"
import IcoChatBallon from "../../../assets/balaochat.svg"
import IcoHeartLike from "../../../assets/heartlike.svg"
import Image from "next/image";
import { PostView } from "@/ViewModel/PostView";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Link from "next/link";
import ImgHeartSelected from "../../../assets/heartSelected.svg"
import { LikeDTO } from "@/DTOs/LikeDTO";
import { useRouter } from "next/navigation";
import { useSignalR } from "@/hooks/useSignalR";
import { useSession } from "next-auth/react";
import PostNotFound from "../profile/components/PostNotFound";
import { UserContext } from "@/contexts/UserContext";
import { UserAuthentication } from "@/models/UserAuthentication";
export default function ListPosts(){
    const router = useRouter()
    const {invokeGlobal} = useSignalR()
    const {data:userContext} = useSession()
    const {user } = useContext(UserContext)
    const { data, error, isValidating, isLoading,mutate } = useGetAllPosts()
    const [ posts, setPosts] = useState<Array<PostView>>([]);
    const [ userAuthentication, setUserAuthentication ] = useState<UserAuthentication>({} as UserAuthentication);
    useEffect(()=>{
        if(data != undefined){
            console.log("Posts:", data)
            setPosts(data)
        }
    },[data])
    useEffect(()=>{
        if(user){
            setUserAuthentication(user)
        }
    }, [user])
    const LikePost = async(postId: number) =>{
        console.log("Clicado")
        const postCurrent = posts.find(x=> x.id == postId);
        if(postCurrent != undefined){
            if(userAuthentication){
                const userCurrent = await userServices.GetByEmail(userAuthentication.email);
                const likeCurrent = postCurrent.likeViews.find(x=> x.userId == userAuthentication.id);
                if(likeCurrent !== undefined){
                    await LikeServices.RemoveLike(likeCurrent.id);
                    mutate();
                    invokeGlobal("RemoveLike",postCurrent.id,postCurrent.userview.id)
                }else{
                    const likeDTO = new LikeDTO();
                    likeDTO.postId = postCurrent.id;
                    likeDTO.userId = userCurrent?.id as number;
                    likeDTO.generatedGuid()
                    try{
                        const response = await LikeServices.AddLike(likeDTO);
                        mutate()
                        invokeGlobal("AddLike",postCurrent.id,postCurrent.userview.id)
                    }catch(err){
                        console.log("Erro ao adicionar o like:", err)
                    } 
                }
            }
        }
    }
    const ViewPost = (postId: number) =>{
        router.push(`/dashboard/post/${postId}`);
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
    if(posts.length == 0){
        return(
            <div className={styles.container_posts}>
                <div className={styles.posts}>
                    <div className={styles.post}>
                        <PostNotFound/>
                    </div>
                </div>
            </div>
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