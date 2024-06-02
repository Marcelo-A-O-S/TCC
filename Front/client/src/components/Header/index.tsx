import ImgLogo from "../../assets/Logo.svg"
import Image from "next/image"
import BtnRegister from "../Buttons/BtnRegister"
import BtnAcessar from "../Buttons/BtnAcessar"
export default function Header(){
    return(
    <>
        <header className="header">
            <nav className="navbar">
                <div className="logo">
                    <Image src={ImgLogo} alt="Teste" className="img-logo" />
                    <h2 className="text-logo">Conecta Peças</h2>
                </div>
                <div className="menu">
                    <ul className="list-menu">
                        <li>
                            <a href="">Home</a>
                        </li>
                        <li>
                            <a href="">Sobre</a>
                        </li>
                        <li>
                            <a href="">Contato</a>
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