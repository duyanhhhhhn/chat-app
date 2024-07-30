import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from 'react-bootstrap'
import avarter from "../../assets/avatar.jpeg"
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLastestMessage } from "../../hooks/useFetchLatestMesages";
import moment from "moment"
const UserChat = ({chat, user}) => {
    const { recipientUser } = useFetchRecipientUser(chat, user)

    const { onlineUsers, notification, markThisUserNotificationsAsRead } = useContext(ChatContext)
    const { lastestMessage } = useFetchLastestMessage(chat)
    console.log(lastestMessage)
    const unreadNotifications = unreadNotificationsFunc(notification)
    const thisUserNotifications = unreadNotifications?.filter(
        n=> n.senderId === recipientUser?._id
    )
    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)
    const truncateText = (text) => { 
        let shortText = text.substring(0, 20);

        if (text.length > 20) {
            shortText =shortText + "..."
        }
        return shortText
    }
    return (<Stack direction="horizontal" gap={3} className="user-card align-items-center p-2 justify-content-between" role="button" onClick={() => {
        if (thisUserNotifications?.length !== 0) {
            markThisUserNotificationsAsRead(
                thisUserNotifications,
                notification
        )
    }}}>
        <div className="d-flex">
            <div className="me-2">
               <img src={avarter} alt="" style={{width:"50px",borderRadius:'20px'}} />
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">{lastestMessage?.text && (
                    <span>{ truncateText(lastestMessage?.text)}</span>
                ) }</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">
                {moment(lastestMessage?.createdAt).calendar()}
            </div>
            <div className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>{thisUserNotifications?.length > 0? thisUserNotifications.length: ""}</div>
            <div className={isOnline? "user-online": "user-offline"}></div>
        </div>
    </Stack>)
}
 
export default UserChat;