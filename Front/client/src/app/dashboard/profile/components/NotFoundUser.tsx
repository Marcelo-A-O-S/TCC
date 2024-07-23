import styles from "../components/styles/notfounduser.module.css"
import Image from "next/image";
import ImgNotFound from "../../../../assets/not-found.svg"
export default function NotFoundUser(){
    return(
        <>
          <div className={styles.container_profile}>
                <div className={styles.user_notfound}>
                    <h1 className={styles.text_notFound}>Nenhum usuário encontrado!</h1>
                    <Image className={styles.imageNotFound} src={ImgNotFound} alt=""/>  
                </div>
            </div>  
        </>
    )
}