import Image from "next/image"
import userServices from "@/services/userServices"
import { UserContext } from "@/contexts/UserContext"
import IcoNotification from "../../../assets/bell_notification.svg"
import { useGetNotificationsByUserId } from "@/hooks/useNotification"
import { useSession } from "next-auth/react"
import { useEffect, useState, useContext } from "react"
import { Session } from "next-auth"
import notificationService from "@/services/notificationService"
import styles from "./notificationComponent.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { NotificationView } from "@/ViewModel/NotificationView"
import { useSignalR } from "@/hooks/useSignalR"
export default function NotificationComponent(){
    const {user} = useContext(UserContext);
    const {invokeGlobal} = useSignalR()
    const router = useRouter();
    const {data, error, isLoading, isValidating} = useGetNotificationsByUserId(user?.id);
    const [notifications, setNotifications] = useState<Array<NotificationView>>([]);
    const [openNotifications, setOpenNotifications] = useState(false);
    useEffect(()=>{
        if(data){
            setNotifications(data)
        }
    },[data])
    useEffect(()=>{
        if(notifications){
            console.log("Notifications:",notifications)
        }
    }, [notifications])
    const OpenNotification = () => {
        setOpenNotifications(!openNotifications)
    }
    const ViewPublication = async (postId: number, notificationId: number) =>{
        const response = await notificationService.MarkAsRead(notificationId)
        if(response.status == 200){
            router.push(`/dashboard/post/${postId}`)
            
        }
        OpenNotification()
        
    }
    const markAsRead = async(notificationId:number)=>{
        await notificationService.MarkAsRead(notificationId)
    }
    const DeleteNotification = async(notificationId: number)=>{
        await notificationService.MarkAsRead(notificationId);
    }
    return(
        <div className={styles.field_notification}>
        <dialog className={openNotifications?styles.modal_notification:""}>
            <div className={styles.notifications}>
                {notifications && notifications.map(notification =>{
                    return(
                    <div className={styles.notification} key={notification.id}>
                        <p className={notification.isRead?styles.notification_text:styles.notification_textIsRead}>O usuário <Link href={`/dashboard/profile?email=${notification.sourceuser.email}`} className={styles.user_action}>{notification.sourceuser.username}</Link> 
                        {` ${notification.notificationType == 0?"curitu":
                        notification.notificationType == 1?"comentou na":
                        "respondeu a"}`} sua publicação</p>
                        <div className={styles.actions_notification}>
                            <button onClick={()=>ViewPublication(notification.postView.id, notification.id)} className={styles.notification_view} >Ver publicação</button>
                            <button onClick={()=>DeleteNotification(notification.id)}  className={styles.notification_delete}>Excluir</button>
                            {notification.isRead?<p className={styles.isRead}>Lida ✔</p>:<button onClick={()=>markAsRead(notification.id)} className={styles.notification_read}>Marcar como lida</button>}
                            
                        </div>
                    </div>
                    )
                })}
            </div>
        </dialog>
        {!openNotifications?
        notifications && notifications.filter(x=> x.isRead == false).length > 0 ?
        <div className={styles.toggle}>{notifications.filter(x=> x.isRead == false).length}
        </div>:""
        :""}
        <Image onClick={OpenNotification} className={styles.bell} src={IcoNotification} alt="" />
        </div>
    )
}