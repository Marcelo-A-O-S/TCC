import ImgHome from "../assets/HomeTcc.jpg";
import Image from "next/image";
import Style from "../styles/home.module.css"

export default function Home() {
  return (
    <main className={Style.page}>
      <section className="">
        <div className={Style.conteudo}>

          <div className="">
            <h1 className="">Conecta Peças</h1>
            <p className="">Encontre informações sobre as suas peças aqui!</p>
          </div>
          <div className="">
            <Image src={ImgHome} alt="" className="rounded" />
          </div>
        </div>
      </section>
    </main>
  )
}
