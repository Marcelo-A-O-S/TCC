import { fetcherDelete, fetcherUpdate } from "./fetchers";
import { ROUTE_NOTIFICATION } from "@/utils/constants";
async function DeleteById(notificationtId: number){
    const response = await fetcherDelete(ROUTE_NOTIFICATION.DELETE_NOTIFICATION_BY_ID + notificationtId);
    return response;
}
async function MarkAsRead(notificationId:number){
    const response = await fetcherUpdate(ROUTE_NOTIFICATION.MARK_AS_READ_BY_NOTIFICATIONID + notificationId);
    return response;
}
export default {
    DeleteById,
    MarkAsRead
}