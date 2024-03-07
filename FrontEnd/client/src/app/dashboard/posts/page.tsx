import { Metadata } from "next"
import Link from "next/link"

import ListPosts from "./components/ListPosts";

export const metadata: Metadata ={
    title:"My Posts",
    description:"Todos as suas contribuições até o momento"
}
export default function posts(){

    return(
        <>
        <section className="w-100 vh-100">
            <div className="">
                <h1>Posts</h1>
                <button className={` btn border `}>
                        <Link className={`nav-link`} href={"/dashboard/create"}>Create Post</Link>
                </button>
                <ListPosts/>
            </div>
        </section>

        </>
    )
}
