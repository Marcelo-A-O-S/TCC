"use client"
import { IPost } from "@/models/interfaces/IPost"
import InputImage from "../InputImage"
import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react"
import { ImagePost } from "@/models/ImagePost"
import { IImagepost } from "@/models/interfaces/IImagePost"
import { Post } from "@/models/Post"
import { ApiUser } from "@/api/user"
import Cookies from "js-cookie";
import { AxiosError, AxiosResponse } from "axios"
import { ApiPost } from "@/api/post"
import { PostCreateView } from "@/ViewModel/PostCreateView"
import { ImageCreateView } from "@/ViewModel/ImageCreateView"
export default  function CreatePost(){

    const buttonPublish = useRef<HTMLButtonElement>(null)
    const apiUser = new ApiUser();
    const apiPost = new ApiPost();
    const [messageError, setMessageError ] = useState("");
    const [images, setImages] = useState<Array<IImagepost>>([] as Array<IImagepost> )
    const [postState, setPostState] = useState<IPost>({
        description: "",
        title: ""
    })
    useEffect(()=>{
        if(postState.title != "" && postState.description != ""){
            if(buttonPublish.current != null){
                buttonPublish.current.disabled = false
            }
        }
    },[postState])

    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>)=>{
        const descriptionValue = e.target.value;
        if(descriptionValue != null){
            setPostState(prevState =>{
                return{
                    ...prevState,
                    description: descriptionValue
                }
            })
        }
        console.log(postState.description)
    }
    const handleTitle = (e:ChangeEvent<HTMLInputElement>) =>{
        const titleValue = e.target.value;
        if(titleValue != null){
            setPostState(prevState =>{
                return{
                    ...prevState,
                    title: titleValue
                }
            })
        }
    }
    const HandleFormSubmit = async (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        let response: AxiosResponse<any, any>;
        const post = new PostCreateView()
        post.title = postState.title;
        post.description = postState.description;
        if(images.length > 0 ){
            images.map(item =>{
                const image = new ImageCreateView();
                image.id = item.Id;
                image.description = item.description;
                image.image = item.image;
                post.images.push(image);
            })
        }
        const userCookie = Cookies.get("user");
        if(userCookie != undefined){
            const user = JSON.parse(userCookie);

            try{
                response = await apiUser.GetEmail(user.email);
                const userData = response.data;
                console.log(userData)
                post.userId = userData.id;
            }catch(error: AxiosError | any){
                response = error.response;
                if(response.status == 401){

                }
                if(response.status == 500){
                    setMessageError("Ocorreu algum erro no salvamento, tente novamente mais tarde!");
                }
            }

        }
        console.log(post)
        try{
             await apiPost.createPost(post);
        }catch(error: AxiosError | any){
            response = error.response;
        }
    }
    return(
        <>
        <form onSubmit={(e)=>HandleFormSubmit(e)}>
        <div className="mb-3">
            {messageError !=""?<div className="alert alert-danger" role="alert">
                    {messageError}
                </div>:""}

                <label htmlFor="validationServer01" className="form-label">Titulo da publicação</label>
                    <input type="text"
                    onChange={(e)=> handleTitle(e)}
                    value={postState.title}
                    className="form-control is-valid"
                    id="validationServer01"
                    placeholder="Titulo da postagem..."
                    required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <hr/>
                <div className="mb-3">
                    <label  htmlFor="validationTextareaDescription" className="form-label">Descrição</label>
                    <textarea
                    className="form-control"
                    id="validationTextareaDescription"
                    value={postState.description}
                    onChange={(e)=>handleDescription(e)}
                    placeholder="Redija uma descrição ou duvida relacionado ao material!" required></textarea>
                    <div className="invalid-feedback">
                        Please enter a message in the textarea.
                    </div>
                </div>
                <hr/>
                <InputImage images={images} setImages={(e)=> setImages(e)}/>
                <hr/>
                <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-danger" >
                        Cancelar
                    </button>
                    <button ref={buttonPublish} type="submit" disabled={true} className="btn btn-primary" >
                        Publicar
                    </button>
                </div>
        </form>
        </>
    )
}
