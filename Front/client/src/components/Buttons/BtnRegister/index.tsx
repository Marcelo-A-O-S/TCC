import Link from "next/link"
import styles from "./btnRegister.module.css"
export default function BtnRegister(){
    return(
    <>
    <Link href="register" className={styles.btn_register}>Registre-se</Link>
    </>
)
}