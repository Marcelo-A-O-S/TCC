'use client'
import { useGetPostByUserId } from "@/hooks/usePost";
import postServices from "@/services/postServices";
import likeServices from "@/services/likeServices";
import { useGetByEmail } from "@/hooks/useUser";
import userServices from "@/services/userServices";
import { UserContext } from "@/contexts/UserContext";
import { LikeDTO } from "@/DTOs/LikeDTO";
import { PostView } from "@/ViewModel/PostView";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import ImgNotFound from "../../../../assets/not-found.svg"
import IcoChatBallon from "../../../../assets/balaochat.svg"
import IcoHeartLike from "../../../../assets/heartlike.svg"
import ImgHeartSelected from "../../../../assets/heartSelected.svg"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "next/image";
import ManagerProfile from "./ManagerProfile";
import NotFoundUser from "../components/NotFoundUser";
import Link from "next/link";
import styles from "../profile.module.css"
import { useSession } from "next-auth/react";
import { useSignalR } from "@/hooks/useSignalR";
import PostNotFound from "./PostNotFound";
import PostDetailProfile from "./PostDetailProfile";
type Props = {
    email: any
}
export default function PostsProfile({email}:Props){
  const {data: userContext} = useSession()
  const { invokeGlobal} = useSignalR()
  const { data: userProfile, error, isValidating, isLoading } = useGetByEmail(email)
  const {data: userCurrent} = useGetByEmail(userContext?.user?.email as string);
  const { data: posts, error: postsError, isValidating: postValidating, isLoading: postLoading, mutate: MutatePost} = useGetPostByUserId(userProfile?.id as number)
  const [ postsProfile, setPostsProfile] = useState<Array<PostView>>([])
  const router = useRouter()
  useEffect(()=>{
    if(posts != undefined){
      setPostsProfile(posts)
    }
  },[posts])
  const EditPost = async (postId: number) =>{
    router.push(`/dashboard/manage_post?edit=${postId}`)
  }
  const DeletePost = async(postId: number) =>{
    await postServices.DeletePostById(postId);
    await MutatePost()
  }
  const LikePost = async(postId: number) =>{
    const postCurrent = postsProfile.find(x=> x.id == postId);
    if(postCurrent != undefined){
        if(userContext){
            const userCurrent = await userServices.GetByEmail(userContext.user?.email as string);
            const likeCurrent = postCurrent.likeViews.find((x:any )=> x.userId == userCurrent?.id);
            if(likeCurrent !== undefined){
                await likeServices.RemoveLike(likeCurrent.id);
                MutatePost();
                invokeGlobal("RemoveLike",postCurrent.id,postCurrent.userview.id)
            }else{
                const likeDTO = new LikeDTO();
                likeDTO.postId = postCurrent.id;
                likeDTO.userId = userCurrent?.id as number;
                likeDTO.generatedGuid()
                try{
                    const response = await likeServices.AddLike(likeDTO);
                    MutatePost()
                    invokeGlobal("AddLike",postCurrent.id,postCurrent.userview.id)
                }catch(err){
                    console.log("Erro ao adicionar o like:", err)
                } 
            }
        }
    }
}
const ViewPost = async (postId: number) =>{
  router.push(`/dashboard/post?postId=${postId}`);
}
  if(userProfile == undefined){
    return(
      <>
        <NotFoundUser/>        
      </>)
  }
  if(!postsProfile){
    return (<>
      <main className={styles.main}>
        <section className={styles.profile}>
          <h1>Carregando dados ...</h1>
        </section>
      </main>
    </>)
  }else{
    return (<>
      <main className={styles.main}>
        <section className={styles.profile}>
          <div className={styles.container_profile}>
            <ManagerProfile
            userProfile={{
              email: userProfile.email,
              username: userProfile.username
            }}
            postsQuantity={postsProfile.length}
            />
            {/* <div className={styles.manager_profile}>
              <div className={styles.data_profile}>
                <div >
                    <h1>{userProfile?.username}</h1>
                    <p>{userProfile?.email}</p>
                  </div>
                  <div className={styles.data_posts}>
                    <h3 className={styles.post_number}>{postsProfile.length}</h3>
                    <p className={styles.number_text}>Publicações</p>
                  </div>
              </div>
              <div>
                  {userContext?.user?.email == userProfile?.email?<Link href={`manage_post`} className={styles.btn_create}>Criar publicação</Link>:""}
              </div>
            </div> */}
            <div className={styles.posts}>
                {postsProfile.length == 0? 
                <>
                  <div className={styles.post} >
                    <PostNotFound/>
                  </div>
                </>:postsProfile.map((item)=>{
                  return (
                    <PostDetailProfile
                    post={item}
                    DeletePost={DeletePost}
                    EditPost={EditPost}
                    LikePost={LikePost}
                    ViewPost={ViewPost}
                    userCurrent={userCurrent}
                    />
                    /* <div className={styles.post} key={item.id}>
                        <div className={styles.manager_post}>
                          <div className={styles.profile_post}>
                              <h3 className={styles.username}>{item.userview.username}</h3>
                              <p className={styles.email}>{item.userview.email}</p>
                          </div>
                          {userContext?.user?.email == item.userview.email?<div className={styles.post_actions}>
                            <button onClick={()=>EditPost(item.id)} className={styles.post_edit} >Edit</button>
                            <button onClick={()=>DeletePost(item.id)} className={styles.post_delete}>Delete</button>
                          </div>:""}
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
                            <div className={styles.like} onClick={()=>LikePost(item.id)}>
                                {item.likeViews.find(x=> x.userId == userCurrent?.id )?
                                  <Image className={styles.likeSelected} src={ImgHeartSelected} alt=""/>
                                  :
                                  <Image src={IcoHeartLike} alt=""/>
                                  }
                                {item.likeViews.length}
                            </div>
                            <div  className={styles.comment}>
                                <Image src={IcoChatBallon} alt=""/>
                                {item.commentViews.length}
                            </div>
                            
                        </div>
                        
                    </div> */)
                })}
            </div>
          </div>
        </section>
      </main>
    </>)
  }
}