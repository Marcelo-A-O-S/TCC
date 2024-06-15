import Link from "next/link"
import styles from "./btnAcessar.module.css"
export default function BtnAcessar(){
    return(
    <>
    <Link href="login" className={styles.btn_acessar}>Acessar</Link>
    </>
)
}