import type { Metadata } from "next";
import FormLogin from "@/components/FormLogin";

export const metadata: Metadata ={
    title: "Login",
    description: "Acesso a plataforma"
}


export default function Login(){
    return(
        <main>
            <section className="w-100 vh-100 p-5">
                <div className="border p-5">
                    <h1>Login</h1>
                    <FormLogin/>
                </div>
            </section>
        </main>
    );
}
