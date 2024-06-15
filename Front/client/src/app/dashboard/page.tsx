'use client'

import ListPosts from "./components/ListPosts"
import styles from "./dashboard.module.css"
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