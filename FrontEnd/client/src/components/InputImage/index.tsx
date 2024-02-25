"use client"
import { ImagePost } from "@/models/ImagePost";
import { IImagepost } from "@/models/interfaces/IImagePost";
import {  ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
interface IInputImage{
    images: Array<IImagepost>
    setImages:(e:Array<IImagepost>) => void
}
export default function InputImage(props :IInputImage){
    const [imageState, setImageState] = useState<IImagepost>({
        description: "",
        image: "",
        Id:0
    })
    useEffect(()=>{
        console.log(props.images.length)
    },[props.images])
    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>)=>{
        const files = event.target.files;
        if(files != null){
            const file = files[0]
            const reader = new FileReader()
            reader.onload = function(e){
                const image = e.target?.result;
                if(image != null){
                    setImageState(prevState =>{
                        return {
                            ...prevState,
                            image: image.toString()
                        }
                    })
                }
            }
            reader.readAsDataURL(file);
        }
    }
    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>)=>{
        const description = e.target.value;
        if(description != null){
            setImageState(prevState=>{
                return {
                    ...prevState,
                    description: description
                }
            })
        }
    }
    const handleClose = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> ) =>{
        setImageState({
            description:"",
            image:"",
            Id:0
        })
    }
    const handleAdicionarImagem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent> ) =>{
        const image = new ImagePost();
        image.Id = props.images.length + 1;
        image.SetDescription = imageState.description;
        image.SetImage = imageState.image;
        props.images.push(image);
        props.setImages(props.images)
    }
    const handleRemoverImagem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, Id: number)=>{
        console.log("Remover")
        console.log(props.images)
        const images = props.images;
        const newArray = images.filter(x => x.Id != Id);
        newArray.map(item =>{
            images.push(item);
        })
        props.setImages(images);


    }
    const handleSubmitCardImage = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log(e)
        const card = new FormData(e.currentTarget);
        console.log(card)
    }
    return(
        <>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content container-fluid">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Adicionar Imagem</h5>
                    <button type="button" onClick={(e) => handleClose(e)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className="mb-3">
                    <input type="file" onChange={(e)=>handleImageUpload(e)} className="form-control" aria-label="file example" required/>
                    <div className="invalid-feedback">Example invalid form file feedback</div>
                </div>
                <div>
                    <img src={imageState.image} alt={""} className="img-fluid"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="validationTextarea" className="form-label">Descrição</label>
                    <textarea className="form-control" id="validationTextarea" value={imageState.description} onChange={(e)=>handleDescription(e)} placeholder="Redija uma descrição da imagem!" required></textarea>
                    <div className="invalid-feedback">
                         Please enter a message in the textarea.
                    </div>
                </div>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={(e) => handleClose(e)} className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" onClick={(e) => handleAdicionarImagem(e)} className="btn btn-primary">Adicionar Imagem</button>
                </div>
            </div>
        </div>
        </div>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Inserir Imagem
        </button>
        <div>
            {props.images != null?props.images.map(item =>{
                return(
                    <>
                    <form  className="border p-2">
                        <input value={item.Id} name="cardid" readOnly/>
                        <img src={item.image} alt="" className="img-fluid"/>
                        <p>{item.description}</p>
                        <div className="d-flex">
                            <button type="button"  className="btn btn-primary">Atualizar Imagem</button>
                            <button type="button" onClick={(e)=>handleRemoverImagem(e,item.Id)}  className="btn btn-danger">Remover Imagem</button>
                        </div>
                    </form>
                    </>
                )
            }):""}
        </div>

        </>
    )
}
