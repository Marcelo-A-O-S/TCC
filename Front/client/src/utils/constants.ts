const ROUTE_COMMENT ={
    SAVE_COMMENT:"/api/Comment/AddComment",
    DELETE_COMMENT_BY_COMMENTID:"/api/Comment/DeleteCommentById?commentId="
}

const ROUTE_LIKE = {
    ADD_LIKE:"/api/Like/Add",
    DELETE_LIKE_BY_ID:"/api/Like/DeleteById?likeId=",
    
}

const ROUTE_POST ={
    LIST:"/api/Post/List",
    FIND_BY_ID:"/api/Post/FindById?id=",
    FIND_BY_USERID:"/api/Post/FindByUserId?userId=",
    DELETE_BY_ID:"/api/Post/DeleteById?postId=",
    CREATE_POST:"/api/Post/Create",
}
const ROUTE_ANSWER={
    SAVE_ANSWER:"/api/Post/AddAnswer",
    DELETE_ANSWER_BY_ID:"/api/Post/DeleteAnswerById?answerId="
}
const ROUTE_NOTIFICATION ={
    LIST_BY_USERID:"/api/Notification/ListByUserId?userId=",
    ADD_NOTIFICATION:"",
    DELETE_NOTIFICATION:"",
    DELETE_NOTIFICATION_BY_ID:"/api/Notification/DeleteById?Id=",
    MARK_AS_READ_BY_NOTIFICATIONID:"/api/Notification/MarkAsRead?notificationId="
}
const ROUTE_USERS = {
    GET_BY_EMAIL:"/api/User/GetByEmail?email=",
    GET_BY_ID:"/api/User/GetById?id=",

}
export { 
    ROUTE_ANSWER,
    ROUTE_COMMENT,
    ROUTE_LIKE,
    ROUTE_POST,
    ROUTE_NOTIFICATION,
    ROUTE_USERS
}