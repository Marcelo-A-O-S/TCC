import styles from "./cardGroup.module.css"
interface ICard{
    title:string;
    text:string;
}
interface ICardGroup{
    cards:ICard[]
}
export default function CardGroup(props: ICardGroup){
    return(
    <>
        <div className={styles.card_group}>
            {props.cards.map(card =>{
                return (
                    <div className={styles.card+" "+ styles.primeiro}>
                        <h2 className={styles.card_title}>{card.title}</h2>
                        <p className={styles.card_text}>{card.text}</p>
                    </div>
                );
            })}
              
          </div>
    </>
    )
}