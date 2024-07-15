import { fetcherGet, fetcherServerGet } from "@/services/fetchers";
import useSWR from "swr";

function useGetAllNotifications(userId: number){
    const {} = useSWR(`/api/Post/ListNotificationsByUserId?userId=${userId}`,fetcherServerGet)
}