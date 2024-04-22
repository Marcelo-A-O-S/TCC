"use client"
import { useState, useContext, useEffect } from "react"
import Link from "next/link";
import Style from "../../styles/header.module.css";
import "../../styles/header.css"
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
export default function Header(){
    const router = useRouter()
    const { user, logout } = useContext(UserContext)
    const [expand, setExpand] = useState(false);
    const [renderClientSide, setRenderClientSide] = useState(false);
    useEffect(()=>{
        setRenderClientSide(true);
    },[])
    function Logout(){
        logout();
        router.push("/login")
    }
    if (!renderClientSide) {
        return null;
      }
    return user == null?(
        <>
        <div className="dark offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Conecta Peças</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className={`nav-item ${Style.nav_header}`}>
                    <Link className="nav-link" href={"/"}>Home</Link>
                </div>
                <div className={`nav-item ${Style.nav_header}`}>
                    <Link className="nav-link" href={"/about"}>About</Link>
                </div>


            </div>
        </div>
        <nav className={`dark navbar bg-transparent`}>
            <div className={`container-fluid`}>
                <a className={`nav-link ${Style.title}`} href="/">Conecta Peças</a>
                <div className={`${Style.nav_menu} gap-2`}>
                    <button className={` btn border ${Style.text}`}>
                        <Link className={`nav-link ${Style.text}`} href={"/login"}>Log In</Link>
                    </button>
                    <button className="btn border " >
                        <Link className={`nav-link ${Style.text}`} href={"/register"}>Sign In</Link>
                    </button>
                    <button className="navbar-toggler dark"
                    type="button"
                    onClick={()=>setExpand(!expand)} data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample" aria-controls="navbarToggleExternalContent"
                    aria-expanded={expand} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

            </div>
        </nav>
        </>
    ):(
        <>
        <div className="dark offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Conecta Peças</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className={`nav-item ${Style.nav_header}`} data-bs-dismiss="offcanvas" aria-label="Close" >
                    <Link className="nav-link" href={"/dashboard"}>Home</Link>
                </div>
                <div className={`nav-item ${Style.nav_header}`} data-bs-dismiss="offcanvas" aria-label="Close">
                    <Link className="nav-link"  href={"/dashboard/posts"}>My Posts</Link>
                </div>
                <div className={`nav-item ${Style.nav_header}`} data-bs-dismiss="offcanvas" aria-label="Close" >
                    <Link className="nav-link" href={"/dashboard/profile"}>My Profile</Link>
                </div>
                <div>
                    <button onClick={Logout} className="btn btn-primary" >Logout</button>
                </div>

            </div>
        </div>
        <nav className={`dark navbar bg-transparent`}>
            <div className={`container-fluid`}>
                <a className={`nav-link ${Style.title}`} href="/">Conecta Peças</a>
                <div className={`${Style.nav_menu} gap-2`}>

                    <div className="d-flex align-items-center gap-2 p-2 m-0">

                        <div className="">
                            <p className="m-0">{user?.name}</p>
                            {/* <small className="text-muted">{user?.email}</small> */}
                        </div>
                        <Image src="" alt="perfil" className="rounded-circle"/>
                    </div>
                    <button className="navbar-toggler dark"
                    type="button"
                    onClick={()=>setExpand(!expand)} data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample" aria-controls="navbarToggleExternalContent"
                    aria-expanded={expand} aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

            </div>
        </nav>
        </>
    )
}
