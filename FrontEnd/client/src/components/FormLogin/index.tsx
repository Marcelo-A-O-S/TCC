"use client"
import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react";
import { IFormLogin } from "@/models/interfaces/IFormLogin";
import { IErroLogin } from "@/models/interfaces/IErroLogin";

import { IMessageResponse } from "@/models/interfaces/IMessageResponse";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import { User } from "@/models/User";
import { useRouter } from "next/navigation";
import { ApiAuthentication } from "@/api/authentication";
export default function FormLogin(){
    const apiAuthentication = new ApiAuthentication();
    const router = useRouter();
    const { user,login } = useContext(UserContext)
    const [messageResponse, setMessageResponse ]= useState<IMessageResponse>({
        status: 0,
        message: ""
    })
    const [ disabled, setDisabled] = useState(true);
    const [formLogin, setFormLogin] = useState<IFormLogin>({
        email:"",
        password:""
    })
    const [erroLogin, setErroLogin] = useState<IErroLogin>({
        erroEmail:"",
        erroPassword:""
    })
    useEffect(()=>{
        if(formLogin.email == ""){
            setErroLogin((prevState)=>{
                return{
                    ...prevState,
                    erroEmail:"Preencha o campo acima!"
                }
            })
        }
        if(formLogin.password == ""){
            setErroLogin((prevState)=>{
                return{
                    ...prevState,
                    erroPassword:"Preencha o campo acima!"
                }
            })
        }
        if(formLogin.email != "" && formLogin.password != ""){
            if(erroLogin.erroEmail == "" && erroLogin.erroPassword == ""){
                setDisabled(false);
            }
        }
    },[formLogin])
    function ValidateEmail(e : ChangeEvent<HTMLInputElement>){
        e.target.classList.remove("is-invalid")
        e.target.classList.remove("is-valid")
        var strReg = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/;
        var value = e.target.value;
        var result = value.match(strReg);
        setFormLogin((prevState)=>{
            return {
                ...prevState, email: e.target.value
            }
        })
        if(e.target.value != ""){
            e.target.classList.add("is-invalid")
            setErroLogin((prevState) =>{
                return {
                    ...prevState,
                    erroEmail:"Email invalido"
                }
            })
            if(result?.[0] != undefined){
                e.target.classList.remove("is-invalid")
                e.target.classList.add("is-valid")
                setErroLogin((prevState) =>{
                    return {
                        ...prevState,
                        erroEmail:""
                    }
                })
            }
        }
        if(e.target.value == ""){
            e.target.classList.add("is-invalid");
        }
    }
    function ValidatePassword(e : ChangeEvent<HTMLInputElement>){
        e.target.classList.remove("is-invalid")
        e.target.classList.remove("is-valid")
        setFormLogin((prevState)=>{
            return {
                ...prevState, password: e.target.value
            }
        })

        if(e.target.value != ""){
            setErroLogin((prevState)=>{
                return{
                    ...prevState,
                    erroPassword:""
                }
            })
            e.target.classList.add("is-valid")
        }
        if(e.target.value == ""){
            e.target.classList.add("is-invalid")
        }
    }
    async function HandleLogin(e : FormEvent<HTMLFormElement>){
        e.preventDefault();
        try{
            const response = await apiAuthentication.Login(formLogin);
            if(response.status == 200){
                const user: User = response.data;
                await login(user)
                router.push("/dashboard")
            }
        }catch(err: any){
            const responseErro : AxiosResponse = err.response;
            if(responseErro.status == 400){
                setMessageResponse({
                    message: responseErro.data,
                    status: responseErro.status
                })
            }
        }
    }
    return(
        <>
        <form onSubmit={HandleLogin} className="p-2">
                {messageResponse.status == 400?(<div className="alert alert-danger" role="alert">
                        {messageResponse.message}
                    </div>):""}
            <div className="form-floating mb-3">
                <input type="email" onChange={(e)=> ValidateEmail(e)} className="form-control  is-invalid" id="floatingInput" placeholder="name@example.com"/>
                <label form="floatingInput">Email address</label>
                <div className="invalid-feedback">
                    {erroLogin.erroEmail}
                </div>
                <div className="valid-feedback">
                    Pode prosseguir!
                </div>
            </div>
            <div className="form-floating w-100">
                <input type="password" onChange={(e)=> ValidatePassword(e)} className="form-control w-auto is-invalid" id="floatingPassword" placeholder="Password"/>
                <label form="floatingPassword">Password</label>
                <div className="invalid-feedback">
                    {erroLogin.erroPassword}
                </div>
                <div className="valid-feedback">
                    Pode prosseguir!
                </div>
            </div>
            <div>
                <button type="submit" className="btn border" disabled={disabled}>
                    Acessar
                </button>
            </div>
        </form>
        </>
    )
}
