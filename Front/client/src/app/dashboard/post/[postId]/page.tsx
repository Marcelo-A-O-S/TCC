import { Metadata } from "next";
import { GetPostById } from "@/data/post";
import PostDetail from "../components/PostDetail";
type Props = {
    params: { postId: number }
}
export async function generateMetadata({params}: Props){
    const postId = params.postId;
    const response = await GetPostById(postId);
    const metadata : Metadata ={
        title: response.title,
        description: response.description
    }
    return metadata
}
export default function PostPage({params}:Props){
    const postId = params.postId;
    return<PostDetail Id={postId}/>
}