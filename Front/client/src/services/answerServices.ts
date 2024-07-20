import { AnswerDTO } from "@/DTOs/AnswerDTO";
import { fetcherDelete, fetcherPost } from "./fetchers";
import { ROUTE_ANSWER } from "@/utils/constants";
async function AddAnswer(answerDTO: AnswerDTO){
    const response = await fetcherPost(ROUTE_ANSWER.SAVE_ANSWER,answerDTO);
    return response;
}
async function DeleteAnswerById(answerId: number){
    const response = await fetcherDelete(ROUTE_ANSWER.DELETE_ANSWER_BY_ID + answerId);
    return response
}
export default {
    AddAnswer,
    DeleteAnswerById
}