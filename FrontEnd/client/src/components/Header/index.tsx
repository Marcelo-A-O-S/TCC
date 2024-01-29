"use client"
import { useState } from "react"
import Link from "next/link";
import Style from "../../styles/header.module.css";
import "../../styles/header.css"
export default function Header(){
    const [expand, setExpand] = useState(false);
    return(
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
    )
}
