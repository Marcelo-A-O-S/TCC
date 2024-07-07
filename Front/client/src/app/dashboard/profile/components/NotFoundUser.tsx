import styles from "../components/styles/notfounduser.module.css"
import Image from "next/image";
import ImgNotFound from "../../../../assets/not-found.svg"
export default function NotFoundUser(){
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
        </>
    )
}