import { Metadata } from "next";
import postServices from "@/services/postServices";
import PostDetail from "../components/PostDetail";
type Props = {
    params: { postId: number }
}
export async function generateMetadata({params}: Props){
    const postId = params.postId;
    const response = await postServices.GetPostById(postId);
    if(response != undefined){
        const metadata : Metadata ={
            title: response.title,
            description: response.description
        }
        return metadata
    }else{
        const metadata : Metadata ={
            title: "Not found",
            description: "Nada encontrado"
        }
        return metadata
    }
    
    
}
export default function PostPage({params}:Props){
    const postId = params.postId;
    return<PostDetail Id={postId}/>
}