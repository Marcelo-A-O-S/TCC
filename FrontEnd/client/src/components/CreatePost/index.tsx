"use client"
import { IPost } from "@/models/interfaces/IPost"
import InputImage from "../InputImage"
import { ChangeEvent, useState } from "react"
import { ImagePost } from "@/models/ImagePost"
import { IImagepost } from "@/models/interfaces/IImagePost"
export default function CreatePost(){
    const [images, setImages] = useState<Array<IImagepost>>([] as Array<IImagepost> )
    const [postState, setPostState] = useState<IPost>({
        description: "",
        title: ""
    })
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
    return(
        <>
        <form>
        <div className="col-md-4">
                <label htmlFor="validationServer01" className="form-label">Titulo da publicação</label>
                    <input type="text" onChange={(e)=> handleTitle(e)} value={postState.title} className="form-control is-valid" id="validationServer01" required/>
                    <div className="valid-feedback">
                        Looks good!
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="validationTextarea" className="form-label">Descrição</label>
                    <textarea className="form-control" onChange={(e)=> handleDescription(e)} value={postState.description} id="validationTextarea" placeholder="Redija uma descrição da sua duvida relacionada ao material da publicação!" required></textarea>
                    <div className="invalid-feedback">
                        Please enter a message in the textarea.
                    </div>
                </div>
                <InputImage images={images} setImages={(e)=> setImages(e)}/>
        </form>
        </>
    )
}
