'use client'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"
import styles from "./login.module.css"
import { ILogin, Login } from "@/models/Login"
import Link from "next/link"
import authenticationService from "@/services/authenticationService"
import { setUserCookie } from "@/hooks/userCookie"
import { redirect, useRouter } from "next/navigation";
import { UserContext } from "@/contexts/UserContext"
import { UserAuthentication } from "@/models/UserAuthentication"
import { signIn } from "next-auth/react"

export default function LoginPage(){
    const {login} = useContext(UserContext)
    const router = useRouter();
    const [ formLogin, setFormLogin ] = useState<ILogin>({
        email:"",
        password:""
    })
    const [ formValidate, setFormValidate] = useState({
        validateEmail:{
            status:0,
            message:""
        },
        validatePassword:{
            status:0,
            message:""
        }
    })
    useEffect(()=>{
        ValidateForm()
    },[])
    useEffect(()=>{
        ValidateForm()
    },[formLogin])
    function onChangeEmail(changeEvent:ChangeEvent<HTMLInputElement>){
        let value = changeEvent.target.value;
        setFormLogin(prevState =>{
            return {
                ...prevState,
                email: value
            }
        })
    }
    function onChangePassword(changeEvent:ChangeEvent<HTMLInputElement>){
        let value = changeEvent.target.value;
        setFormLogin(prevState =>{
            return {
                ...prevState,
                password: value
            }
        })
    }
    function ValidateForm(){
        if(formLogin.email == ""){
            setFormValidate(prevState =>{
                return {
                    ...prevState,
                    validateEmail:{
                        status:1,
                        message:"Preencha o campo!"
                    }
                }
            })
        }else{
            var strReg = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/;
            var resultMatchEmail = formLogin.email.match(strReg);
            if(resultMatchEmail == null){
                setFormValidate(prevState =>{
                    return {
                        ...prevState,
                        validateEmail:{
                            status:2,
                            message:"Email Inválido!"
                        }
                    }
                })
            }else{
                setFormValidate(prevState =>{
                    return {
                        ...prevState,
                        validateEmail:{
                            status:0,
                            message:"Prossiga..."
                        }
                    }
                })
            }
        }
        if(formLogin.password == ""){
            setFormValidate(prevState =>{
                return {
                    ...prevState,
                    validatePassword:{
                        status:1,
                        message:"Preencha o campo!"
                    }
                }
            })
        }else{
            setFormValidate(prevState =>{
                return {
                    ...prevState,
                    validatePassword:{
                        status:0,
                        message:"Prossiga..."
                    }
                }
            })
        }
    }
    async function SubmitForm(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        if( formValidate.validateEmail.status == 0 ||
            formValidate.validatePassword.status == 0
        ){
            const response = await signIn("credentials",{
                email: formLogin.email,
                password: formLogin.password,
                redirect:false,
                callbackUrl:'/dashboard'
            })
            if(response?.ok){
                router.push("/dashboard")
            }
            
            /* try {
                const dataResponse = await loginPost(dataLogin)
                const user = new UserAuthentication()
                user.email = dataResponse.email;
                user.token = dataResponse.token;
                user.username = dataResponse.username;
                signIn("credentials",{
                    ...user,
                    callbackUrl: '/dashboard"'
                })
                login(user)
                setUserCookie(dataResponse)
                router.push("/dashboard")
            } catch (error) {
                console.log(error)
            } */
        }
    }
    return(
    <>
    <main className={styles.main}>
        <section className={styles.login}>
            <div className={styles.content_title}>
                <h2 className={styles.title}>Comece agora a conhecer e a conectar as suas melhores opções!</h2>
            </div>
            <div className={styles.form_content}>
                <form onSubmit={SubmitForm} className={styles.form} >
                    <h2 className={styles.form_title}>Acesse agora:</h2>
                    <div className={styles.form_field}>
                         
                        <input id="email" onChange={onChangeEmail} placeholder="Email..."  className={styles.form_input} name="email"  type="email" />
                        <span className={`${styles.form_span} ${formValidate.validateEmail.status == 1 || 
                            formValidate.validateEmail.status == 2? styles.error: styles.success}`} >
                            {formValidate.validateEmail.message != ""?formValidate.validateEmail.message:""}
                        </span>
                        
                    </div >
                    <div className={styles.form_field}>
                        
                        <input id="password" onChange={onChangePassword} placeholder="Senha..." className={styles.form_input} name="password"  type="password" />
                        <span className={`${styles.form_span} ${formValidate.validatePassword.status == 1? styles.error: styles.success}`} >
                            {formValidate.validatePassword.message != ""?formValidate.validatePassword.message:""}
                        </span>
                    </div>
                    <div className={styles.form_actions}>
                        <button  className={styles.form_acessar}>Acessar</button>
                        <p className={styles.form_textactions}>Não tem registro? Crie agora!</p>
                        <Link href="register" className={styles.form_registrar}>Registrar</Link>
                    </div>
                </form>
            </div>
        </section>
    </main>
    </>
    )
}