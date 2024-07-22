import { Metadata } from "next";
import userServices from "@/services/userServices";
import postServices from "@/services/postServices";
import PostDetail from "./components/PostDetail";
type Props = {
    params: { postId: string }
    searchParams: { postId: number }
}
export async function generateMetadata({params,searchParams}: Props){
    const postId = searchParams.postId;
    const response = await postServices.GetPostById(postId);
    const metadata : Metadata ={
        title: response.title,
        description: response.description
    }
    return metadata
}
export default function PostPage({params,searchParams}:Props){
    const postId = searchParams.postId;
    return<PostDetail Id={postId}/>
}