import NotificationComponent from "../NotificationComponent"
import { useSession, signOut } from "next-auth/react"
import ImgLogo from "../../../assets/Logo.svg"
import Image from "next/image"
import { useRef, useState } from "react"
import BtnRegister from "../../../components/Buttons/BtnRegister"
import BtnAcessar from "../../../components/Buttons/BtnAcessar"
import Icoburguer from "../../../assets/burguerico.svg"
import Icoclose from "../../../assets/closeico.svg"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { removeUserCookie } from "@/hooks/userCookie"

export  default function Navbar(){
    const host = process.env.NEXT_PUBLIC_HOST
    const router = useRouter()
    const { data: userSession, status, update} = useSession()
    const MenuList = useRef<HTMLUListElement>(null)
    const [burguerOpen, setBurgueropen] = useState(false)
    function CloseBurguer(){
        if(window.innerWidth < 940){
            MenuList.current?.classList.toggle("burguerOpen")
            setBurgueropen(!burguerOpen)
        }
    }
    const SignOut = async ()=>{
        const response = await signOut({
            redirect:false
        });
        router.push("/login")
        await removeUserCookie()
    }
    return(
        <>
            <header className="header">
            <nav className="navbar">
                <div className="logo">
                    <Link href="/dashboard" className="logo-link">
                        <Image src={ImgLogo} alt="Teste" className="img-logo" />
                        <h2 className="text-logo">Conecta Peças</h2>
                    </Link>
                </div>
                {userSession? (
                    
                <div className="menu">
                    <div>
                        <NotificationComponent/>
                    </div>
                    <Image src={Icoburguer} onClick={CloseBurguer} alt="" className="burguer"/>
                    <ul ref={MenuList} className="list-menu">
                        
                        <Image onClick={CloseBurguer} src={Icoclose} alt="" className="close_burguer"/>
                        <li>
                            <Link href={`/dashboard/profile?email=${userSession.user?.email}`}>{userSession.user?.name}</Link>
                        </li>
                        <li>
                            <Link onClick={()=>SignOut()} href={``}>Log out</Link>
                        </li>
                    </ul>
                </div>
                ):(
                    <div className="menu">
                        <Image src={Icoburguer} onClick={CloseBurguer} alt="" className="burguer"/>
                        <ul ref={MenuList} className="list-menu">
                            <Image onClick={CloseBurguer} src={Icoclose} alt="" className="close_burguer"/>
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <BtnAcessar/>
                            </li>
                            <li>
                                <BtnRegister/>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
        </>
    )
    
}