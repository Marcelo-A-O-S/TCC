import { PostView } from '@/ViewModel/PostView'
import React from 'react'
import styles from "../profile.module.css"
import { useSession } from 'next-auth/react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import Image from 'next/image';
import { UserAuthentication } from '@/models/UserAuthentication';
import IcoChatBallon from "../../../../assets/balaochat.svg"
import IcoHeartLike from "../../../../assets/heartlike.svg"
import ImgHeartSelected from "../../../../assets/heartSelected.svg"
type PostDetailProfileProps = {
    post: PostView,
    DeletePost: (id: number) => Promise<void>,
    EditPost: (id: number) => Promise<void>,
    ViewPost: (id: number) => Promise<void>,
    LikePost: (id: number) => Promise<void>,
    userCurrent: UserAuthentication | undefined
}
export default function PostDetailProfile({ post, DeletePost, EditPost, ViewPost, LikePost, userCurrent }: PostDetailProfileProps) {
    const { data: userContext } = useSession()
    return (
        <div className={styles.post} key={post.id}>
            <div className={styles.manager_post}>
                <div className={styles.profile_post}>
                    <h3 className={styles.username}>{post.userview.username}</h3>
                    <p className={styles.email}>{post.userview.email}</p>
                </div>
                {userContext?.user?.email == post.userview.email ? <div className={styles.post_actions}>
                    <button onClick={() => EditPost(post.id)} className={styles.post_edit} >Edit</button>
                    <button onClick={() => DeletePost(post.id)} className={styles.post_delete}>Delete</button>
                </div> : ""}
            </div>
            <div className={styles.content} onClick={() => ViewPost(post.id)}>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
            </div>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                className={styles.field_images}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                pagination={{ clickable: true }}
                navigation
            >
                {post.imagesViews.map((image) => {
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
                <div className={styles.like} onClick={() => LikePost(post.id)}>
                    {post.likeViews.find(x => x.userId == userCurrent?.id) ?
                        <Image className={styles.likeSelected} src={ImgHeartSelected} alt="" />
                        :
                        <Image src={IcoHeartLike} alt="" />
                    }
                    {post.likeViews.length}
                </div>
                <div className={styles.comment}>
                    <Image src={IcoChatBallon} alt="" />
                    {post.commentViews.length}
                </div>
            </div>
        </div>
    )
}
