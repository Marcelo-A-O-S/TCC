
import ImgLogo from "../../assets/Logo.svg"
import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"
import BtnRegister from "../Buttons/BtnRegister"
import BtnAcessar from "../Buttons/BtnAcessar"
import Icoburguer from "../../assets/burguerico.svg"
import Icoclose from "../../assets/closeico.svg"
import Link from "next/link"
import { UserContext } from "@/contexts/UserContext"
export  default function Header(){
    const {user, isAuthenticated} = useContext(UserContext)
    const MenuList = useRef<HTMLUListElement>(null)
    const [burguerOpen, setBurgueropen] = useState(false)
    useEffect(()=>{
    },[])
    function CloseBurguer(){
        if(window.innerWidth < 940){
            MenuList.current?.classList.toggle("burguerOpen")
            setBurgueropen(!burguerOpen)
        }
    }
    if(user != null){
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
                    <div className="menu">
                        <Image src={Icoburguer} onClick={CloseBurguer} alt="" className="burguer"/>
                        <ul ref={MenuList} className="list-menu">
                            
                            <Image onClick={CloseBurguer} src={Icoclose} alt="" className="close_burguer"/>
                            <li>
                                <Link href={`/dashboard/profile?email=${user.email}`}>{user.username}</Link>
                            </li>
                            <li>
                                <Link href={`/dashboard/profile/${user.email}`}>Log out</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            </>
        )
    }
    if(!user){
        return(
            <>
                <header className="header">
                    <nav className="navbar">
                        <div className="logo">
                            <Link href="/" className="logo-link">
                                <Image src={ImgLogo} alt="Teste" className="img-logo" />
                                <h2 className="text-logo">Conecta Peças</h2>
                            </Link>
                            
                        </div>
                        <div className="menu">
                            <Image src={Icoburguer} onClick={CloseBurguer} alt="" className="burguer"/>
                            <ul ref={MenuList} className="list-menu">
                                <Image onClick={CloseBurguer} src={Icoclose} alt="" className="close_burguer"/>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="about">Sobre</Link>
                                </li>
                                <li>
                                    <BtnAcessar/>
                                </li>
                                <li>
                                    <BtnRegister/>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            </>)
    }
    
}