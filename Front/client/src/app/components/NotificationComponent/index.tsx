import Image from "next/image"
import IcoNotification from "../../../assets/bell_notification.svg"
export default function NotificationComponent(){
    return(
        <>
        <div></div>
        <Image src={IcoNotification} alt="" />
        </>
    )
}