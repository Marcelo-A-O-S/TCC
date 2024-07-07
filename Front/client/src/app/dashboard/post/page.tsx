import { Metadata } from "next";
import { getServerTokenCookie } from "@/hooks/userServerCookie";
import { GetPostById } from "@/api/post";
import styles from "./post.module.css"
import PostDetail from "./components/PostDetail";
type Props = {
    params: { postId: string }
    searchParams: { postId: number }
}
export async function generateMetadata({params,searchParams}: Props){
    const postId = searchParams.postId;
    const response = await GetPostById(postId);
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