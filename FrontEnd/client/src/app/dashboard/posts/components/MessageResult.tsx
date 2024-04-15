'use client'
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation";
export default function MessageResult(){
    const router = useRouter()
    const param = useSearchParams();
    let messageSucess = param.get('success'); 
    let messageDelete = param.get('delete')

    return(
        <>
        {messageSucess?<div className="alert alert-success alert-dismissible" role="alert">
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:">
                    <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </symbol>
                    <use xlinkHref="#check-circle-fill"/>
                </svg>
                    {messageSucess}
                    <a href="" type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                </div>:""}
                {messageDelete?<div className="alert alert-danger" role="alert">
                 <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </symbol>
                <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                    <use xlinkHref="#exclamation-triangle-fill"/>
                </svg>
                    {messageDelete}
                    <a href="" type="button"  className="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
                </div>:""}
        </>
    )
}