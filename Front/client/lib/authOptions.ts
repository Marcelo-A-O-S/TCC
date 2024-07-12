
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginPost } from "@/api/authentication";
import { Login } from "@/models/Login";
import { UserAuthentication } from "@/models/UserAuthentication";
import { setServerTokenCookie, getServerTokenCookie, getServerUserCoookie } from "@/hooks/userServerCookie";
export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
            email: {label: "Email"},
            password: {label: "Password", type: "password"},
        },
        async authorize(credentials) {
        
            if(!credentials || !credentials.email || !credentials.password){
                return null;
            }
            try{
                const login = new Login();
                login.email = credentials.email;
                login.password = credentials.password;
                const dataResponse = await loginPost(login);
                if(dataResponse){
    
                    const user = new UserAuthentication();
                    user.email = dataResponse.email;
                    user.token = dataResponse.token;
                    user.username = dataResponse.username;
                    await setServerTokenCookie(user);
                    return{
                        email: user.email,
                        name: user.username,
                        id: user.id.toString()
                    }
                }
                return null
            }catch(err){
                console.log(err)
                return null
            }
        }
    })
    ],
    pages:{
        signIn:'/login'
    },
    callbacks:{
        async session({session, newSession}) {
            
            return session
        },
        
    }
}