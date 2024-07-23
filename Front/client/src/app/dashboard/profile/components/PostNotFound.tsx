import ImgNotFound from "../../../../assets/not-found.svg"
import Image from "next/image"
import styles from "./styles/notfoundpost.module.css"

export default function PostNotFound(){
    return(
      <div className={styles.post_notfound}>
        <div className={styles.not_found}>
          <h1 className={styles.text_notFound} >Nada encontrado!</h1>
          <Image className={styles.imageNotFound} src={ImgNotFound} alt=""/>
          <p className={styles.text_notFound} >Publique alguma coisa para começar a interagir!:)</p>
        </div>
      </div>
        
    )
}