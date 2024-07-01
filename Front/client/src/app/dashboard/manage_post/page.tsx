'use client'
import { ChangeEvent, FormEvent, useEffect, useState, useContext } from "react"
import { ImagePost, IImagePost } from "@/models/ImagePost";
import styles from "./new.module.css"
import { useRef } from "react";
import IcoClose from "../../../assets/closeico.svg"
import Image from "next/image";
import { Post } from "@/models/Post";
import { UserAuthentication } from "@/models/UserAuthentication";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Link from "next/link";
import { PostDTO } from "@/DTOs/PostDTO";
import { ImageDTO } from "@/DTOs/ImageDTO";
import { UserContext } from "@/contexts/UserContext";
import { useGetByEmail, GetUserByEmail } from "@/api/users";
import { CreatePost,useGetPostById } from "@/api/post";
import ImgSuccess from "../../../assets/success.svg"
import ImgFailed from "../../../assets/failed.svg"
type Props = {
    params: { edit: string }
    searchParams: { edit: string }
  }
export default function ManagerPost({searchParams}:Props){
    const { user: userContext } = useContext(UserContext)
    const email = userContext?.email;
    const {data: post, error: errorPost} = useGetPostById(parseInt(searchParams.edit))
    const { data, error } = useGetByEmail(email || "");
    const modal = useRef<HTMLDialogElement>(null)
    const [imgPost , setImgPost] = useState<IImagePost>({
        id:0,
        description:"",
        image:"",
        imageGuid:"",
        type:""
    });
    const [openModal, setOpenModal] = useState(false);
    const [modelPost, setModelPost] = useState<Post>({
        images: [],
        comments: [],
        description: "",
        Id: 0,
        title: "",
        user: {} as UserAuthentication
    } as Post);
    const [modalResponse, setModalResponse] = useState({
        status:0,
        message:""
    })
    useEffect(()=>{
        if(post !== undefined){
            console.log(post)
            console.log(post.commentViews)
            setModelPost({
                comments : post.commentViews,
                description: post.description,
                Id: post.id,
                images: post.imagesViews,
                title: post.title,
                user:{
                    email: post.userview.email,
                    id: post.userview.id,
                    username: post.userview.username,
                    token: post.userview.token
                }
            })
        }
    },[post])
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
        if(imgPost.imageGuid == ""){
            modelImage.id = imgPost.id;
            modelImage.description = imgPost.description;
            modelImage.image = imgPost.image;
            modelImage.type = imgPost.type;
            modelImage.GenerateGuid()
            modelPost.images.push(modelImage);
            setModelPost(modelPost);
        }
        if(imgPost.imageGuid != ""){
            const imageUpdate = modelPost.images.find(x=> x.imageGuid == imgPost.imageGuid);
            if(imageUpdate){
                imageUpdate.description = imgPost.description;
                imageUpdate.id = imgPost.id;
                imageUpdate.image = imgPost.image;
                imageUpdate.imageGuid = imgPost.imageGuid;
                imageUpdate.type = imgPost.type;
            }

        }
        console.log(modelPost.images)
        
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
    const RemoveCard = (imageGuid: string) =>{
        const cards = modelPost.images.filter(x => x.imageGuid != imageGuid);
        setModelPost(prevState =>{
            return {
                ...prevState,
                images: cards
            }
        }) 
        console.log(modelPost.images)
    }
    const UpdateCard = (imageGuid: string) =>{
        const cardCurrent = modelPost.images.find(x=> x.imageGuid == imageGuid);
        //const cards = modelPost.images.filter(x=> x.imageGuid != imageGuid);
        if(cardCurrent !== undefined){
            setImgPost(prevState=>{
                return{
                    description:cardCurrent.description,
                    id:cardCurrent.id,
                    image: cardCurrent.image,
                    imageGuid: cardCurrent.imageGuid,
                    type: cardCurrent.type
                }
            })
            ShowModal()
        }
    }
    async function SubmitForm(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        const postDto = new PostDTO()
        postDto.id = modelPost.Id;
        postDto.title = modelPost.title;
        postDto.description = modelPost.description;
        modelPost.images.map((image) =>{
            const imageDTO = new ImageDTO();
            imageDTO.id = image.id;
            imageDTO.description = image.description;
            imageDTO.image = image.image;
            imageDTO.type = image.type;
            imageDTO.imageGuid = image.imageGuid
            postDto.images.push(imageDTO)
        })
        if(userContext){
            if(data){
                postDto.userId = data.id
            }
        }
        try{
            const response = await CreatePost(postDto);
            if(response.status == 200){
                setModalResponse({
                    status: response.status,
                    message: response.data
                })
            }else{
                setModalResponse({
                    status: response.status,
                    message: response.data
                })
            }
            
        }catch(err){
            console.log("Falha ao criar postagem:", err)
        }
    }
    const NewRegister = () =>{
        setModalResponse({
            status:0,
            message:""
        })
        setModelPost({
            comments: [],
            description: "",
            Id:0,
            images: [],
            title: "",
            user: {} as UserAuthentication
        })
    }
    return(
        
        <main className={styles.main}>
            <div>
            {modalResponse.status !== 0?
                <dialog id="modal-alert" className={styles.modalAlert}>
                    <div className={styles.modalAlert_result}>
                        <p>{modalResponse.message}</p>
                    </div>
                    <div className={styles.modalAlert_image}>
                        {modalResponse.status == 200?
                        <Image src={ImgSuccess} alt=""/>:
                        <Image src={ImgFailed} alt=""/>}
                    </div>
                    <div className={styles.modalAlert_actions}>
                        <button onClick={()=> NewRegister()} className={styles.modalAlert_btnNew}>Novo Registro</button>
                        <Link href={`/dashboard/profile?email=${userContext?.email}`} className={styles.modalAlert_btnReturn}>Retornar</Link>
                    </div>
                </dialog>
            :
            ""}
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
                    <form onSubmit={SubmitForm} className={styles.form}>
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
                                            <button type="button" onClick={()=>UpdateCard(imageItem.imageGuid)} className={styles.cardBtn_edit}>Editar</button>
                                            <button type="button" onClick={()=> RemoveCard(imageItem.imageGuid)} className={styles.cardBtn_delete}>Deletar</button>
                                        </div>
                                    </SwiperSlide>
                                </>)
                              }))}
                            </Swiper>
                                
                            </div>
                        </div>
                        <div className={styles.form_actions}>
                            <Link  href={"/dashboard"} className={styles.form_cancel}>Cancelar</Link>
                            <button type="submit" className={styles.form_publish}>Publicar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}