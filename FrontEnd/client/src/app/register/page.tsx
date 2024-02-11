
import Style from "../../styles/register.module.css"
import Image from "next/image"
import Img from "../../assets/tcc2.jpg"
import FormRegister from "@/components/FormRegister"
import { Metadata } from "next"
export const metadata: Metadata ={
    title: "Register",
    description: "Registre sua conta do Conecta Peças!"
}

export default function register(){

    return(
        <main className="w-100 v-100">
            <section className="p-5">
                <div className={`${Style.section} border p-5`}>

                <div>
                <h1>Register</h1>
                <p>Registre-se para desvendar os mistérios nesse universo!</p>
                <FormRegister/>
                </div>
                    <Image src={Img} alt="teste"  className="rounded-circle img-fluid"/>
                </div>
            </section>
        </main>
    )
}
