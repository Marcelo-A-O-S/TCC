"use client"
import { ChangeEvent, useEffect, useState, useRef, LegacyRef } from "react"
import Style from "../../styles/register.module.css"
import { register } from "module";
interface FormRegister{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}
interface ErroRegister{
    erroName:string;
    erroEmail:string;
    erroPassword:string;
    erroConfirmPassword:string;
}
export default function FormRegister(){

    const [disabled, setDisabled] = useState(true);
    const [formRegister, setFormRegister] = useState<FormRegister>({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const [erroRegister, setErroRegister] = useState<ErroRegister>({
        erroConfirmPassword: "",
        erroEmail:"",
        erroName: "",
        erroPassword:""
    })

    useEffect(()=>{
        setDisabled(true);
        if(formRegister.name == ""){
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
        if(formRegister.confirmPassword == ""){
            setErroRegister((prevState)=>{
                return{
                    ...prevState,
                    erroConfirmPassword:"Preencha o campo acima!"
                }
            })
        }
        if(formRegister.name != "" && formRegister.email != "" && formRegister.password != "" && formRegister.confirmPassword != ""){
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
                ...prevState, name: e.target.value
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
                ...prevState, confirmPassword: e.target.value
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
    return(
        <>
        <form className={`${Style.form}`}>
                    <div className={`${Style.input_list}`}>
                        <div className="col-md-6">
                            <label form="validationServer01" className="form-label">Name</label>
                            <input type="text" onChange={(e)=> ValidateName(e)} className="form-control is-invalid" id="validationServer01" value={formRegister.name} required/>
                            <div className="invalid-feedback">
                                {erroRegister.erroName}
                            </div>
                            <div className="valid-feedback">
                                Pode prosseguir!
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label form="validationServer02" className="form-label">Email</label>
                            <input type="text" onChange={(e)=> ValidateEmail(e)} className="form-control is-invalid" id="validationServer02" value={formRegister.email} required/>
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
                            <input type="text" onChange={(e)=> ValidatePassword(e)}  className="form-control is-invalid" id="validationServer01" value={formRegister.password} required/>
                            <div className="invalid-feedback">
                                {erroRegister.erroPassword}
                            </div>
                            <div className="valid-feedback">
                                Pode prosseguir!
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label form="validationServer02" className="form-label">Confirm Password</label>
                            <input type="text" onChange={(e)=> ValidateConfirmPassword(e)} className="form-control is-invalid" id="validationServer02" value={formRegister.confirmPassword} required/>
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
