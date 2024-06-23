'use client'
import { PostView } from "@/ViewModel/PostView"
import styles from "./profile.module.css"
import { Metadata, ResolvingMetadata } from "next";
import { useGetByEmail } from "@/api/users";
import { privateApi } from "@/services/api";
import { useGetAllPosts, useGetPostByUserId } from "@/api/post";
import { useEffect, useState } from "react";
import ImgNotFound from "../../../assets/not-found.svg"
import Image from "next/image";
import IcoChatBallon from "../../../assets/balaochat.svg"
import IcoHeartLike from "../../../assets/heartlike.svg"
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Link from "next/link";

type Props = {
  params: { email: string }
  searchParams: { email: string }
}
export default function ProfilePage({ params, searchParams }: Props) {
  const {user} = useContext(UserContext)
  const { data: userProfile, error, isValidating, isLoading } = useGetByEmail(searchParams.email)
  const { data: posts, error: postsError, isValidating: postValidating, isLoading: postLoading} = useGetPostByUserId(userProfile?.id)
  const [ postsProfile, setPostsProfile] = useState<Array<PostView>>([])
  
  useEffect(()=>{
    setPostsProfile(posts)
    console.log(posts)
  },[posts])
  if(userProfile == undefined){
    return(
      <>
        <main className={styles.main}>
        <section className={styles.profile}>
          <div className={styles.container_profile}>
            <div className={styles.user_notfound}>
                <h1>Nenhum usuário encontrado!</h1>
                <Image src={ImgNotFound} alt=""/>  
              </div>
          </div>
        </section>
      </main>          
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
            <div className={styles.manager_profile}>
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
                  {user?.email == userProfile?.email?<Link href={`new`} className={styles.btn_create}>Criar publicação</Link>:""}
              </div>
            </div>
            <div>
                {postsProfile.length == 0? 
                <>
                <div className={styles.not_found}>
                  <h1>Nada encontrado!</h1>
                  <Image src={ImgNotFound} alt=""/>
                  <p>Publique alguma coisa para começar a interagir!:)</p>
                </div>
                </>:postsProfile.map((item)=>{
                  return (
                    <div className={styles.post} key={item.id}>
                        <div className={styles.profile_post}>
                            <h3 className={styles.username}>{item.userview.username}</h3>
                            <p className={styles.email}>{item.userview.email}</p>
                        </div>
                        <div className={styles.content}>
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
                            <div>
                                <Image src={IcoHeartLike} alt=""/>
                                {item.likeViews.length}
                            </div>
                            <div>
                                <Image src={IcoChatBallon} alt=""/>
                                {item.commentViews.length}
                            </div>
                            
                        </div>
                        
                    </div>)
                })}
            </div>
          </div>
        </section>
      </main>
    </>)
    
  }
  
  
}
