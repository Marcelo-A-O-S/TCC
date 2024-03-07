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
    const [messageReturn, setMessageReturn ] = useState({
        message:"",
        status:0
    });
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
                image.type = item.type;
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
                    setMessageReturn(() =>{
                        return {
                            message:"Ocorreu algum erro no salvamento, tente novamente mais tarde!",
                            status:response.status
                        }
                    });
                }
            }

        }
        console.log(post)
        try{
            response = await apiPost.createPost(post);
            if(response.status == 200){
                setMessageReturn(() =>{
                    return {
                        message:response.data,
                        status:response.status
                    }
                });
            }
        }catch(error: AxiosError | any){
            response = error.response;
            if(response.status == 401){

            }
            if(response.status == 500){
                setMessageReturn(() =>{
                    return {
                        message:"Ocorreu algum erro no salvamento, tente novamente mais tarde!",
                        status:response.status
                    }
                });
            }
        }
    }
    return(
        <>
        <form onSubmit={(e)=>HandleFormSubmit(e)}>
        <div className="mb-3">
            {messageReturn.status == 401 || messageReturn.status == 500?
            <div className="alert alert-danger" role="alert">
                 <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                    <use xlinkHref="#exclamation-triangle-fill"/>
                </svg>
                    {messageReturn.message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>:messageReturn.status == 200?
                <div className="alert alert-success alert-dismissible" role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </symbol>
                    <use xlinkHref="#check-circle-fill"/>
                </svg>
                    {messageReturn.message}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
