import nextAuth, { NextAuthOptions} from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import Credentials from "next-auth/providers/credentials";

export const nextOptions: NextAuthOptions = {
    pages: {
        signIn: '/login', //(4) custom signin page path
    },
    providers:[
        Credentials({
            name:"Credentials",
            credentials: {
                email: { label: "email", type: "email", },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials){
                console.log(credentials)
                return null
            }
        })
    ]
}