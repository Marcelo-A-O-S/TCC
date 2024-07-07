
import { Metadata, ResolvingMetadata } from "next";
import { GetUserByEmail, useGetByEmail } from "@/api/users";
import PostsProfile from "./components/PostsProfile";
type Props = {
  params: { email: string }
  searchParams: { email: string }
}
export async function generateMetadata({params,searchParams}: Props){
  const email = searchParams.email;
  const data = await GetUserByEmail(email);
  
  const metadata : Metadata ={
      title: `Profile - ${data.username}`,
      description: "Description teste"
  }
  return metadata
}
export default function ProfilePage({ params, searchParams }: Props) {
  return <PostsProfile email={searchParams.email}/>
}
