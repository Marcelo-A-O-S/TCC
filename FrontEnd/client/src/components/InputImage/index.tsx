"use client"
import { ImagePost } from "@/models/ImagePost";
import { IImagepost } from "@/models/interfaces/IImagePost";
import {  ChangeEvent, FormEvent, LegacyRef, MouseEvent, useEffect, useRef, useState } from "react";

interface IInputImage{
    images: Array<IImagepost>
    setImages:(e:Array<IImagepost>) => void
}
export default function InputImage(props :IInputImage){
    const modal = useRef<HTMLDialogElement>(null);
    const [ openModal , setOpenModal] = useState(false);
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [imageState, setImageState] = useState<IImagepost>({
        description: "",
        image: "",
        type:"",
        imageGuid: "",
        Id:0
    })
    const ModalShow = () =>{
        modal.current?.showModal();
        setOpenModal(true);
    }
    const ModalClose = () =>{
        setImageState({
            description:"",
            image:"",
            type:"",
            imageGuid:"",
            Id:0
        })
        modal.current?.close()
        setOpenModal(false);

    }
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
                            image: image.toString(),
                            type: file.type
                        }
                    })
                }
            }
            reader.readAsDataURL(file);
        }
    }
    const handleDescriptionImage = (e: ChangeEvent<HTMLTextAreaElement>)=>{
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
    const handleAdicionarImagem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, Id: number) =>{
        setIsLoadingImages(true);
        if(Id == 0 ){
            const image = new ImagePost();
            image.Id = props.images.length + 1;
            image.description = imageState.description;
            image.image = imageState.image;
            image.type = imageState.type;
            image.GenerateGuid();
            props.images.push(image);
            props.setImages(props.images)
            setImageState({
                description:"",
                image:"",
                type:"",
                imageGuid:"",
                Id:0
            })

        }else{
            const image = props.images.find(x=> x.Id === Id)
            if(image != undefined){
                image.Id = imageState.Id;
                image.description = imageState.description;
                image.image = imageState.image;
                image.imageGuid = imageState.imageGuid;
                const updatedImages = props.images.map(item => (item.Id === image.Id ? image : item));
                console.log(updatedImages)
                props.setImages(updatedImages);
            }
        }
        ModalClose()
        setIsLoadingImages(false);

    }
    const handleRemoverImagem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, Guid: string)=>{
        console.log("Remover")
        setIsLoadingImages(true);
        const newImages = props.images.filter(x=> x.imageGuid !== Guid);
        if(newImages != undefined){
            props.setImages(newImages)
        }
        setIsLoadingImages(false);


    }
    const handleAtualizarImagem = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, Guid: string) =>{
        const image = props.images.find(x=> x.imageGuid == Guid)
        if(image != undefined){
            setImageState({
                description: image.description,
                image: image.image,
                type:image.type,
                imageGuid: image.imageGuid,
                Id: image.Id
            })
        }
        modal.current?.showModal();
        setOpenModal(true);

    }
    return(
        <>
        <dialog className="w-75 h-75 position-absolute  top-50 start-50 translate-middle border modal-dialog modal-dialog-scrollable p-3 rounded-3" tabIndex={-1} ref={modal}>
            <div className="modal-content position-relative">
            <div className="modal-header">
                <h5 className="modal-title" >Adicionar Imagem</h5>
                <button onClick={ModalClose} type="button" className="btn-close" ></button>
            </div>
            <hr/>
            <div className="modal-body ">
                <div className="mb-3 ">
                    <input name="file" type="file"  onChange={(e)=>handleImageUpload(e)} className="form-control" aria-label="file example" />
                    <div className="invalid-feedback">Example invalid form file feedback</div>
                </div>
                <div className="h-100 modal-dialog-scrollable">
                    <img src={imageState.image} alt={""} className="img-fluid h-100 rounded"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="validationTextareaImage" className="form-label">Descrição</label>
                    <textarea className="form-control" name="image" id="validationTextareaImage" value={imageState.description} onChange={(e)=>handleDescriptionImage(e)} placeholder="Redija uma descrição da imagem!"></textarea>
                    <div className="invalid-feedback">
                         Please enter a message in the textarea.
                    </div>
                </div>
            </div>
            <hr/>
            <div className="modal-footer w-100 position-relative top-100 end-0">
                <button type="button" onClick={ModalClose} className="btn btn-danger" >Cancelar</button>
                <button type="button" className="btn btn-primary" onClick={(e) => handleAdicionarImagem(e, imageState.Id)} >Adicionar</button>
            </div>
            </div>
        </dialog>
        <div className="border rounded-2 p-2">
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-primary" onClick={ModalShow}>
                    Adicionar Imagem
                </button>
            </div>
            <hr/>
            <div className="row row-cols-1 row-cols-md-3 p-1 gap-1">
                {isLoadingImages? <p>Loading...</p>:
                props.images.length > 0?props.images.map(item =>{
                    return(
                        <>
                        <div key={item.Id} className="col" style={{width:"20rem"}}>
                            <div className="card p-2 h-100">
                            <img src={item.image} className="card-img-top img-fluid" style={{height:"300px"}} alt="..."/>
                            <div className="card-body w-100" >
                                <p className="card-text" >{item.description}</p>
                            </div>
                            <div className="card-footer d-flex gap-2">
                                <button type="button" onClick={(e)=>handleAtualizarImagem(e,item.imageGuid)}  className="btn btn-primary">Atualizar</button>
                                <button type="button" onClick={(e)=>handleRemoverImagem(e,item.imageGuid)} className="btn btn-danger">Remover</button>
                            </div>
                            </div>
                        </div>
                        </>
                    )
                }):<p className="w-100 text-center">Não foi adicionada nenhuma imagem! :(</p>}
            </div>
        </div>
        </>
    )
}
