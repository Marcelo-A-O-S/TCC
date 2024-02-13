"use client"
import { ChangeEvent, useEffect, useState, useRef, LegacyRef, FormEventHandler, FormEvent } from "react"
import Style from "../../styles/register.module.css"
import { ApiAuthentication } from "@/api/authentication";
import { IFormRegister } from "@/models/interfaces/IFormRegister";
import { IErroRegister } from "@/models/interfaces/IErroRegister";

import { AxiosError, AxiosResponse } from "axios";
import { IMessageResponse } from "@/models/interfaces/IMessageResponse";
import Link from "next/link";
export default function FormRegister(){
    const apiAuthentication = new ApiAuthentication();
    const [responseErro, setResponseErro ] = useState<IMessageResponse>({
        status:0,
        message:""
    });
    const [disabled, setDisabled] = useState(true);
    const [formRegister, setFormRegister] = useState<IFormRegister>({
        username:"",
        email:"",
        password:"",
        passwordConfirm:""
    })
    const [erroRegister, setErroRegister] = useState<IErroRegister>({
        erroConfirmPassword: "",
        erroEmail:"",
        erroName: "",
        erroPassword:""
    })

    useEffect(()=>{
        setDisabled(true);
        if(formRegister.username == ""){
            setErroRegister((prevState)=>{
                return{
                    ...prevState,
                    erroName:"Preencha o campo acima!"
                }
            })
        }
        if(formRegister.email == ""){
            setErroRegister((prevState)=>{
                return{
                    ...prevState,
                    erroEmail:"Preencha o campo acima!"
                }
            })
        }
        if(formRegister.password == ""){
            setErroRegister((prevState)=>{
                return{
                    ...prevState,
                    erroPassword:"Preencha o campo acima!"
                }
            })
        }
        if(formRegister.passwordConfirm == ""){
            setErroRegister((prevState)=>{
                return{
                    ...prevState,
                    erroConfirmPassword:"Preencha o campo acima!"
                }
            })
        }
        if(formRegister.username != "" && formRegister.email != "" && formRegister.password != "" && formRegister.passwordConfirm != ""){
            if(erroRegister.erroName == "" && erroRegister.erroEmail == "" && erroRegister.erroPassword == "" && erroRegister.erroConfirmPassword == ""){
                setDisabled(false);
            }
        }
    },[formRegister])
    function ValidateName(e : ChangeEvent<HTMLInputElement>){
        e.target.classList.remove("is-invalid")
        e.target.classList.remove("is-valid")
        setFormRegister((prevState)=>{
            return {
                ...prevState, username: e.target.value
            }
        })

        if(e.target.value != ""){
            setErroRegister((prevState)=>{
                return{
                    ...prevState,
                    erroName:""
                }
            })
            e.target.classList.add("is-valid")
        }
        if(e.target.value == ""){
            e.target.classList.add("is-invalid")
        }

    }
    function ValidateEmail(e : ChangeEvent<HTMLInputElement>){
        e.target.classList.remove("is-invalid")
        e.target.classList.remove("is-valid")
        var strReg = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/;
        var value = e.target.value;
        var result = value.match(strReg);
        setFormRegister((prevState)=>{
            return {
                ...prevState, email: e.target.value
            }
        })
        if(e.target.value != ""){
            e.target.classList.add("is-invalid")
            setErroRegister((prevState) =>{
                return {
                    ...prevState,
                    erroEmail:"Email invalido"
                }
            })
            if(result?.[0] != undefined){
                e.target.classList.remove("is-invalid")
                e.target.classList.add("is-valid")
                setErroRegister((prevState) =>{
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
        setFormRegister((prevState)=>{
            return {
                ...prevState, password: e.target.value
            }
        })

        if(e.target.value != ""){
            setErroRegister((prevState)=>{
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
    function ValidateConfirmPassword(e: ChangeEvent<HTMLInputElement>){
        e.target.classList.remove("is-invalid")
        e.target.classList.remove("is-valid")
        setFormRegister((prevState)=>{
            return {
                ...prevState, passwordConfirm: e.target.value
            }
        })

        if(e.target.value != ""){
            e.target.classList.add("is-invalid")
            setErroRegister((prevState)=>{
                return {
                    ...prevState,
                    erroConfirmPassword: "Senhas não conferem"
                }
            })
            if(formRegister.password == e.target.value){
                e.target.classList.remove("is-invalid")
                e.target.classList.add("is-valid")
                setErroRegister((prevState)=>{
                    return {
                        ...prevState,
                        erroConfirmPassword: ""
                    }
                })
            }

        }
        if(e.target.value == ""){
            e.target.classList.add("is-invalid")
        }
    }
    async function FormSubmit(e : FormEvent<HTMLFormElement>){
        e.preventDefault();

        try{
            const response = await apiAuthentication.Register(formRegister);
            if(response.status == 200){
                setResponseErro({
                    message: response.data,
                    status:response.status
                })
            }
        }catch(erro: any){
            const error : AxiosResponse = erro.response;
            if(error.status == 400){
                setResponseErro({
                    message: error.data,
                    status: error.status
                })
            }
        }
    }
    return(
        <>
        <form onSubmit={(e)=>FormSubmit(e)}  className={`${Style.form}`}>
                    {responseErro.status == 400?(<div className="alert alert-danger" role="alert">
                        {responseErro.message}
                    </div>):""}
                    {responseErro.status == 200?(<div className="alert alert-success" role="alert">
                        {responseErro.message}, clique <Link href={"/login"}>aqui para acessar</Link>
                    </div>):""}
                    <div className={`${Style.input_list}`}>
                        <div className="col-md-6">
                            <label form="validationServer01" className="form-label">Name</label>
                            <input type="text" onChange={(e)=> ValidateName(e)} className="form-control is-invalid" id="validationServer01" value={formRegister.username} />
                            <div className="invalid-feedback">
                                {erroRegister.erroName}
                            </div>
                            <div className="valid-feedback">
                                Pode prosseguir!
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label form="validationServer02" className="form-label">Email</label>
                            <input type="text" onChange={(e)=> ValidateEmail(e)} className="form-control is-invalid" id="validationServer02" value={formRegister.email} />
                            <div className="invalid-feedback">
                                {erroRegister.erroEmail}
                            </div>
                            <div className="valid-feedback">
                                Pode prosseguir!
                            </div>
                        </div>
                    </div>
                    <div className={`${Style.input_list}`}>
                        <div className="col-md-6">
                            <label form="validationServer01" className="form-label">Password</label>
                            <input type="text" onChange={(e)=> ValidatePassword(e)}  className="form-control is-invalid" id="validationServer01" value={formRegister.password} />
                            <div className="invalid-feedback">
                                {erroRegister.erroPassword}
                            </div>
                            <div className="valid-feedback">
                                Pode prosseguir!
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label form="validationServer02" className="form-label">Confirm Password</label>
                            <input type="text" onChange={(e)=> ValidateConfirmPassword(e)} className="form-control is-invalid" id="validationServer02" value={formRegister.passwordConfirm}/>
                            <div className="invalid-feedback">
                                {erroRegister.erroConfirmPassword}
                            </div>
                            <div className="valid-feedback">
                                Pode prosseguir!
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="btn border" disabled={disabled}>
                            Registrar
                        </button>
                    </div>
                </form>
        </>

    )
}
