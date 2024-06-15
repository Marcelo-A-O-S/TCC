'use client'
import { useGetAllPosts } from "@/api/post";
import { useEffect, useState } from "react";
import styles from "./posts.module.css"
import IcoChatBallon from "../../../assets/balaochat.svg"
import IcoHeartLike from "../../../assets/heartlike.svg"
import Image from "next/image";
import { PostView } from "@/ViewModel/PostView";

export default function ListPosts(){
    const { data, error, isValidating, isLoading } = useGetAllPosts()
    const [ posts, setPosts] = useState<Array<PostView>>([]);
    useEffect(()=>{
        console.log(data)
        setPosts(data)
    },[data])
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
        <div className={styles.field_search}>
            <input  type="text" className={styles.search}/>
        </div>
        <div className={styles.posts}>
                {posts.map((item: PostView)=>{
                    return (
                    <div className={styles.post} key={item.id}>
                        <div className={styles.profile}>
                            <h3 className={styles.username}>{item.userview.username}</h3>
                            <p className={styles.email}>{item.userview.email}</p>
                        </div>
                        <div className={styles.content}>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                        <div className={styles.field_images}>
                            {item.imagesViews.map((image)=>{
                                return(
                                <div className={styles.card_image} key={image.id}>
                                    <div>
                                    <Image className={styles.image} src={image.image} alt="" width={100} height={100}/>
                                    </div>
                                    <div className={styles.field_description}>
                                    <p>{image.description}</p>
                                    </div>
                                    
                                </div>)
                            })}
                        </div>
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
    </>
    )
}