import { Metadata } from "next"
import Timeline from "./components/Timeline"
export const metadata: Metadata ={
    title:"Dashboard",
    description:"Veja o que está acontecendo"
}
export default function dashboard(){
    return(
    <>
        <section className="container p-2">
            <h1>Dashboard</h1>
            <div className="d-flex flex-column">
                <Timeline/>
            </div>
        </section>
        
    </>
    )
}
