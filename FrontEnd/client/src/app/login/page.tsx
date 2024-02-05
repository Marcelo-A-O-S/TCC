import type { Metadata } from "next";
import FormLogin from "@/components/FormLogin";
import Image from "next/image";
import ImgLogin from "../../assets/LoginTCC.jpg"
import Style from "../../styles/login.module.css"
export const metadata: Metadata ={
    title: "Login",
    description: "Acesso a plataforma"
}


export default function Login(){
    return(
        <main>
            <section className="w-100 h-100 p-5">
                <div className="border p-5">
                    <h1>Login</h1>
                    <div className={Style.content_border}>
                        <Image src={ImgLogin} alt="" className="rounded img-fluid img-thumbnail"/>
                        <FormLogin/>
                    </div>

                </div>
            </section>
        </main>
    );
}
