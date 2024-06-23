'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { ImagePost, IImagePost } from "@/models/ImagePost";
import styles from "./new.module.css"
import { useRef } from "react";
import IcoClose from "../../../assets/closeico.svg"
import Image from "next/image";
import { Post } from "@/models/Post";
import { UserAuthentication } from "@/models/UserAuthentication";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
export default function New(){
    const modal = useRef<HTMLDialogElement>(null)
    const [imgPost , setImgPost] = useState<IImagePost>({} as IImagePost);
    const [openModal, setOpenModal] = useState(false);
    const [modelPost, setModelPost] = useState<Post>({
        images: [],
        comments: [],
        description: "",
        Id: 0,
        title: "",
        user: {} as UserAuthentication
    } as Post);

    const ShowModal = () =>{
        modal.current?.showModal()
        setOpenModal(true)
    }
    const CloseModal = () =>{
        modal.current?.close()
        setOpenModal(false)
    }
    const InsertTitle = (event: ChangeEvent<HTMLInputElement>) =>{
        const titleValue = event.target.value;
        setModelPost(prevState => {
            return{
                ...prevState,
                title: titleValue
            }
        })
    }
    const InsertDescription = (event: ChangeEvent<HTMLTextAreaElement>) =>{
        const descriptionValue = event.target.value;
        setModelPost(prevState => {
            return{
                ...prevState,
                description: descriptionValue
            }
        })
    }
    const InsertImage = (event: ChangeEvent<HTMLInputElement>) =>{
        const files = event.target.files;
        if(files != null){
            const file = files[0]
            const reader = new FileReader()
            reader.onload = function(e){
                const imageString = e.target?.result;
                if(imageString != null){
                    setImgPost(prevState =>{
                        return {
                            ...prevState,
                            image:imageString.toString(),
                            type: file.type
                        }
                    })
                }
            }
            reader.readAsDataURL(file);
        }
    }
    const InsertDescriptionImage = (event:ChangeEvent<HTMLTextAreaElement>) =>{
        const descriptionValue = event.target.value;
        setImgPost(prevState => {
            return{
                ...prevState,
                description: descriptionValue
            }
        })
    }
    const AddImage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const modelImage = new ImagePost();
        modelImage.description = imgPost.description;
        modelImage.image = imgPost.image;
        modelImage.type = imgPost.type;
        modelPost.images.push(modelImage);
        setModelPost(modelPost);
        setImgPost(prevState =>{
            return{
                description:"",
                id:0,
                image:"",
                imageGuid:"",
                type:""
            }
        })
        CloseModal()
    }
    return(
        
        <main className={styles.main}>
            <div>
            <dialog id="modal" className={openModal?styles.modal:""}>
                <div className={styles.modal_title}>
                    <h3 className={styles.modal_titleText}>Inserir imagem</h3>
                    <Image onClick={CloseModal} className={styles.btnmodal_close} src={IcoClose} alt=""/>
                </div>
                <div className={styles.modal_body}>
                    <form onSubmit={AddImage} className={styles.modal_form}> 
                        <div className={styles.modal_fieldForm}>
                            <label htmlFor="image" className={styles.modal_labelImage}>
                                Selecione a imagem
                                <Image src={imgPost.image} className={styles.modal_Image} width={100} height={100} alt=""/>
                            </label>
                            <input id="image" onChange={InsertImage} className={styles.modal_inputImage} type="file" />
                        </div>
                        <div className={styles.modal_fieldForm}>
                            <label>Descrição da imagem</label>
                            <textarea className={styles.modal_fieldDescription} value={imgPost.description} placeholder="Insira a descrição" onChange={InsertDescriptionImage}/>
                        </div>
                        <div className={styles.modal_fieldForm}>
                            <button type="submit">Adicionar imagem</button>
                            <button>Cancelar</button>
                        </div>
                    </form>
                </div>
            </dialog>
            </div>
            <section className={styles.new}>
                <div className={styles.container_new}>
                    <form className={styles.form}>
                        <div className={styles.field_form}>
                            <label className={styles.field_label}>Titulo da publicação</label>
                            <input value={modelPost?.title} onChange={InsertTitle} className={styles.field_input} type="text" placeholder="Insira o titulo..."/>
                        </div>
                        <div className={styles.field_form}>
                            <label className={styles.field_label}>Descrição</label>
                            <textarea value={modelPost.description} onChange={InsertDescription} className={styles.field_textarea} placeholder="Insira a descrição..."/>
                        </div>
                        <div className={styles.field_managerImagens}>
                            <div className={styles.field_addimagem}>
                                <button className={styles.btn_addimage} onClick={ShowModal} type="button">Adicionar imagem</button>
                            </div>
                            <div className={styles.field_imagens}>
                            <Swiper
                            modules={[Navigation, Pagination, Scrollbar, A11y]}
                            className={styles.field_images}
                            slidesPerView={1}
                            scrollbar={{ draggable: true}}
                            pagination={{clickable:true}}
                            navigation
                            >
                              {modelPost.images.length == 0?
                              <SwiperSlide>
                                <p className={styles.images_notFound}>Não foi adicionada nenhuma imagem! :(</p>
                              </SwiperSlide>
                              :modelPost.images.map((imageItem=>{
                                return(
                                <>
                                <SwiperSlide className={styles.card_image} key={imageItem.id}>
                                        <div>
                                        <Image className={styles.image} src={imageItem.image} alt="" width={100} height={100}/>
                                        </div>
                                        <div className={styles.field_description}>
                                        <p>{imageItem.description}</p>
                                        </div>
                                        <div className={styles.card_actions}>
                                            <button className={styles.cardBtn_edit}>Editar</button>
                                            <button className={styles.cardBtn_delete}>Deletar</button>
                                        </div>
                                    </SwiperSlide>
                                </>)
                              }))}
                            </Swiper>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}