import BootstrapClient from "../BootstrapClient"
import Header from "../Header"
import  ThemeProvider  from "@/context/ThemeContext"
import Footer from "../Footer"
import TagsScripts from "../TagsScripts"
import { UserProvider } from "@/context/UserContext"
export const metadata = {

}
export default function Container({
    children,
  }: {
    children: React.ReactNode
  }){
    return(
       <>
       <UserProvider>
       <ThemeProvider>
        <body className="main">
          <Header/>
          {children}
          <Footer/>
          <TagsScripts/>
        </body>
        </ThemeProvider>
        </UserProvider>
       </>
    )
}
