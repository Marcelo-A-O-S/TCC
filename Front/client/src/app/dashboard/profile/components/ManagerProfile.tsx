import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "../profile.module.css"
type UserProfile={
    username:string,
    email: string
}
type ManagerProfileProps ={
    userProfile: UserProfile,
    postsQuantity: number
}
export default function ManagerProfile({userProfile,postsQuantity}: ManagerProfileProps){
    const {data:userContext} = useSession()
    return(
        <div className={styles.manager_profile}>
              <div className={styles.data_profile}>
                <div >
                    <h1>{userProfile?.username}</h1>
                    <p>{userProfile?.email}</p>
                  </div>
                  <div className={styles.data_posts}>
                    <h3 className={styles.post_number}>{postsQuantity}</h3>
                    <p className={styles.number_text}>Publicações</p>
                  </div>
              </div>
              <div>
                  {userContext?.user?.email == userProfile?.email?<Link href={`manage_post`} className={styles.btn_create}>Criar publicação</Link>:""}
              </div>
            </div>
    )
}