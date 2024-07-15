'use client'
import styles from "./register.module.css"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IRegister, Register } from "@/models/Register"
import Link from "next/link"
import { register } from "@/data/authentication"
import IcoClose from "../../assets/closeico.svg"
import Image from "next/image"
export default function RegisterPage(){
    const [ returnResponse, setReturnResponse ] = useState({
        status: 0,
        message:""
    });
    const [ formRegister, setFormRegister] = useState<IRegister>({
        username: "",
        email:"",
        passwordConfirm:"",
        password:""
    })
    const [ formValidate, setFormValidate] = useState({
        validateUsername:{
            status: 0,
            message:""
        },
        validateEmail:{
            status:0,
            message:""
        },
        validatePassword:{
            status:0,
            message:""
        },
        validatePasswordConfirm:{
            status:0,
            message:""
        }
    })
    useEffect(()=>{
        ValidateForm()
    },[])
    useEffect(()=>{
        ValidateForm()
    },[formRegister])
    function onChangeUsername(changeEvent:ChangeEvent<HTMLInputElement>){
        let value = changeEvent.target.value;
        setFormRegister(prevState =>{
            return {
                ...prevState,
                username: value
            }
        })
        
    }
    
    function onChangeEmail(changeEvent:ChangeEvent<HTMLInputElement>){
        let value = changeEvent.target.value;
        setFormRegister(prevState =>{
            return {
                ...prevState,
                email: value
            }
        })
    }
    function onChangePassword(changeEvent:ChangeEvent<HTMLInputElement>){
        let value = changeEvent.target.value;
        setFormRegister(prevState =>{
            return {
                ...prevState,
                password: value
            }
        })
    }
    function onChangePasswordConfirm(changeEvent:ChangeEvent<HTMLInputElement>){
        let value = changeEvent.target.value;
        setFormRegister(prevState =>{
            return {
                ...prevState,
                passwordConfirm: value
            }
        })
    }
    function ValidateForm(){
        console.log(formRegister.passwordConfirm)
        if(formRegister.username == ""){
            setFormValidate(prevState =>{
                return {
                    ...prevState,
                    validateUsername:{
                        status:1,
                        message:"Preencha o campo!"
                    }
                }
            })
        }else{
            setFormValidate(prevState =>{
                return {
                    ...prevState,
                    validateUsername:{
                        status:0,
                        message:"Prossiga..."
                    }
                }
            })
        }
        if(formRegister.email == ""){
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
            var resultMatchEmail = formRegister.email.match(strReg);
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
        if(formRegister.password == ""){
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
        if(formRegister.passwordConfirm == ""){
            setFormValidate(prevState =>{
                return {
                    ...prevState,
                    validatePasswordConfirm:{
                        status:1,
                        message:"Preencha o campo!"
                    }
                }
            })
        }else{
            if(formRegister.passwordConfirm != formRegister.password){
                setFormValidate(prevState =>{
                    return {
                        ...prevState,
                        validatePasswordConfirm:{
                            status:2,
                            message:"Senhas não conferem!"
                        }
                    }
                })
            }else{
                setFormValidate(prevState =>{
                    return {
                        ...prevState,
                        validatePasswordConfirm:{
                            status:0,
                            message:"Prossiga..."
                        }
                    }
                })
            }
        }
    }
    async function SubmitForm(e:FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(formValidate.validateUsername.status == 0 &&
            formValidate.validateEmail.status == 0 &&
            formValidate.validatePassword.status == 0 &&
            formValidate.validatePasswordConfirm.status == 0
        ){
            const dataRegister = new Register()
            dataRegister.username = formRegister.username;
            dataRegister.email = formRegister.email;
            dataRegister.password = formRegister.password;
            dataRegister.passwordConfirm = formRegister.passwordConfirm;
            try {
                const dataResponse = await register(dataRegister);
                setReturnResponse({
                    status:0,
                    message:dataResponse
                })
            } catch (error: any) {
                setReturnResponse({
                    status:1,
                    message: error.data
                })
            }
        }else{
            console.log("Dados inválidos")
            setReturnResponse({
                status:1,
                message: "Campos inválidos, preencha corretamente"
            })
        }
    }
    function CloseResponse(){
        setReturnResponse({
            status:0,
            message:""
        })
    }
    return(
    <>
    <main className={styles.main}>
        <section className={styles.register}>
            <div className={styles.content_title}>
                <h2 className={styles.title}>Comece agora a conhecer e a conectar as suas melhores opções!</h2>
            </div>
            <div className={styles.form_content}>
                <form onSubmit={SubmitForm} className={styles.form}>
                    <h2 className={styles.form_title}>Registre-se agora:</h2>
                    <span className={`${styles.form_response} ${returnResponse.message != ""? 
                        returnResponse.status == 0? styles.statusOk :styles.statusError : ""}`}>
                        <p>{returnResponse.message}</p>
                        <Image src={IcoClose} alt="" onClick={CloseResponse} className={styles.close}/>
                        
                    </span>
                    <div className={styles.form_field}>
                        <input id="username" onChange={onChangeUsername} placeholder="Nome do usuário..." className={styles.form_input}  type="text" required/>
                        <span className={`${styles.form_span} ${formValidate.validateUsername.status == 1? styles.error: styles.success}`} >
                            {formValidate.validateUsername.message != ""?formValidate.validateUsername.message:""}
                        </span>
                    </div>
                    <div className={styles.form_field}> 
                        <input id="email" onChange={onChangeEmail} placeholder="Email..."  className={styles.form_input}  type="email" required/>
                        <span className={`${styles.form_span} ${formValidate.validateEmail.status == 1 || 
                            formValidate.validateEmail.status == 2? styles.error: styles.success}`} >
                            {formValidate.validateEmail.message != ""?formValidate.validateEmail.message:""}
                        </span>
                        
                    </div >
                    <div className={styles.form_field}>
                        
                        <input id="password" onChange={onChangePassword} placeholder="Senha..." className={styles.form_input}  type="password" required/>
                        <span className={`${styles.form_span} ${formValidate.validatePassword.status == 1? styles.error: styles.success}`} >
                            {formValidate.validatePassword.message != ""?formValidate.validatePassword.message:""}
                        </span>
                        
                    </div>
                    <div className={styles.form_field}>
                        
                        <input id="passwordConfirm" onChange={onChangePasswordConfirm} placeholder="Confirmar senha..."  className={styles.form_input} type="password" required/>
                        <span className={`${styles.form_span} ${formValidate.validatePasswordConfirm.status == 1 ||
                            formValidate.validatePasswordConfirm.status == 2? styles.error: styles.success}`} >
                            {formValidate.validatePasswordConfirm.message != ""?formValidate.validatePasswordConfirm.message:""}
                        </span>
                    </div>
                    <div className={styles.form_actions}>
                        <button className={styles.form_registrar}>Registrar</button>
                        <p className={styles.form_textactions}>Tem registro? Acesse sua conta agora!</p>
                        <Link href="login" className={styles.form_acessar}>Acessar</Link>
                    </div>
                </form>
            </div>
        </section>
    </main>
    </>
    )
}