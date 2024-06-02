import ImgLogo from "../../assets/Logo.svg"
import Image from "next/image"
export default function Footer(){
    return(<>
    <footer className="footer">
        <div className="footer_content">
        <div className="logo">
            <Image src={ImgLogo} alt="Teste" className="img-logo" />
            <h2 className="text-logo">Conecta Peças</h2>
        </div>
        </div>
    </footer>
    </>)
}