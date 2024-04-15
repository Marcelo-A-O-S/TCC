import { Metadata } from "next"
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import ListPosts from "./components/ListPosts";
import { URLSearchParams } from "url";
import MessageResult from "./components/MessageResult";
export const metadata: Metadata ={
    title:"My Posts",
    description:"Todos as suas contribuições até o momento"
}
export default function posts(){
    return(
        <>
        <section className="container p-4">
            <div className="d-flex flex-column border rounded-3 p-4 gap-3">
                <h1>My Posts</h1>
                <MessageResult/>
                <button className={` btn border `}>
                        <Link className={`nav-link`} href={"/dashboard/create"}>Criar Postagem</Link>
                </button>
                <div className="d-flex flex-column p-2 border-top gap-2">
                    <ListPosts/>
                </div>
                
            </div>
        </section>

        </>
    )
}
