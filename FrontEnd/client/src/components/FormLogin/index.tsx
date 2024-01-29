"use client"
import { ChangeEvent, useEffect, useState } from "react";

interface FormLogin{
    email: string;
    password:string;
}
interface ErroLogin{
    erroEmail:string;
    erroPassword:string;
}
export default function FormLogin(){
    const [ disabled, setDisabled] = useState(true);
    const [formLogin, setFormLogin] = useState<FormLogin>({
        email:"",
        password:""
    })
    const [erroLogin, setErroLogin] = useState<ErroLogin>({
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
    return(
        <>
        <form className="p-5">
            <div className="form-floating mb-3">
                <input type="email" onChange={(e)=> ValidateEmail(e)} className="form-control is-invalid" id="floatingInput" placeholder="name@example.com"/>
                <label form="floatingInput">Email address</label>
                <div className="invalid-feedback">
                    {erroLogin.erroEmail}
                </div>
                <div className="valid-feedback">
                    Pode prosseguir!
                </div>
            </div>
            <div className="form-floating">
                <input type="password" onChange={(e)=> ValidatePassword(e)} className="form-control is-invalid" id="floatingPassword" placeholder="Password"/>
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
