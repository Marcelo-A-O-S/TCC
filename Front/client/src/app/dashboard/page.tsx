

import ListPosts from "./components/ListPosts"
import styles from "./dashboard.module.css"
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Dashboard",
    description: "Veja o que está acontecendo por aqui",
};
export default function DashboardPage(){
   
    return(
        <>
        <main className={styles.main}>
            <section className={styles.dashboard}>
                <ListPosts/>
            </section>
        </main>
        </>
        )
}