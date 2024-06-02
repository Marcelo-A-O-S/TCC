
import styles from "./page.module.css";
import Image from "next/image";
import ImgHero from "../assets/Imghero.svg"
import ImgIntroducao from "../assets/tcc2.svg"
export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.hero_content}>
          <h2 className={styles.hero_title}>Conectando você a sua melhor opção!</h2>
          <p className={styles.hero_text}>Encontre as melhores ferramentas para suas necessidades mecânicas com facilidade e confiança. Nossa plataforma fornece informações detalhadas, avaliações e recomendações de especialistas e aprendizes da área, para que você faça escolhas informadas e adequadas ao seu projeto.</p>
        </div>
        <div>
          <Image src={ImgHero} alt="" className={styles.img_hero}/>
        </div>
      </section>
      <section className={styles.introduction}>
        <div className={styles.introduction_content}>
          <h2 className={styles.introduction_title}>Por que escolher a melhor ferramenta?</h2>
          <p className={styles.introduction_text}>A escolha da ferramenta certa pode transformar completamente a qualidade e a eficiência do seu trabalho. Utilizar ferramentas adequadas garante precisão, segurança e durabilidade nos seus projetos mecânicos.</p>
        </div>
        <div>
          <Image src={ImgIntroducao} alt=""/>
        </div>
      </section>
      <section className={styles.essentials}>
        <div className={styles.essentials_content}>
          <h2 className={styles.essentials_title}>
          Razões essenciais para investir nas melhores ferramentas
          </h2>
          <div className={styles.card_group}>
              <div className={styles.card}>
                <h2 className={styles.card_title}>Precisão e Desempenho</h2>
                <p className={styles.card_text}>Ferramentas de alta qualidade são projetadas para proporcionar precisão e desempenho superiores, permitindo que você execute tarefas com maior eficiência e resultados impecáveis.</p>
              </div>
              <div className={styles.card}>
                <h2 className={styles.card_title}>Segurança</h2>
                <p className={styles.card_text}>Ferramentas bem construídas reduzem o risco de acidentes, protegendo você e os outros ao seu redor. A segurança deve ser sempre uma prioridade em qualquer ambiente de trabalho.</p>
              </div>
              <div className={styles.card}>
                <h2 className={styles.card_title}>Durabilidade</h2>
                <p className={styles.card_text}>Ferramentas de boa qualidade são fabricadas para durar, resistindo ao desgaste do uso constante. Isso significa menos substituições, economizando tempo e dinheiro a longo prazo.</p>
              </div>
          </div>
        </div>
      </section>
    </main>
  );
}
