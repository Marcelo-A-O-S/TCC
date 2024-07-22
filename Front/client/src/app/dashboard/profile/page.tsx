
import { Metadata } from "next";
import userServices from "@/services/userServices";
import PostsProfile from "./components/PostsProfile";
type Props = {
  params: { email: string }
  searchParams: { email: string }
}
export async function generateMetadata({params,searchParams}: Props){
  const email = searchParams.email;
  const data = await userServices.GetByEmail(email);
  if(data != undefined){
    const metadata : Metadata ={
      title: `Profile - ${data.username}`,
      description: "Description teste"
    }
    return metadata
  }else{
    const metadata : Metadata ={
      title: `Profile - Not found`,
      description: "Description teste"
    }
    return metadata
  }
  
}
export default function ProfilePage({ params, searchParams }: Props) {
  const email = searchParams.email;
  return <PostsProfile email={email}/>
}
