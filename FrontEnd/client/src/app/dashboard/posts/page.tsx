import { Metadata } from "next"

export const metadata: Metadata ={
    title:"My Posts",
    description:"Todos as suas contribuições até o momento"
}
export default function posts(){
    return(
        <>
        <h1>Posts</h1>
        </>
    )
}
