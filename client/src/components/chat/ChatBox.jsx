import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import inputEmoji from "react-input-emoji";
const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textmessage, settextMessage] = useState("");
    console.log(messages)
    if (!recipientUser) return (
        <p style={{ textAlign: "center", width: "100%" }}>
            Không có cuộc đối thoại nào...
        </p>
    );
    if (isMessagesLoading) return (
        <p style={{ textAlign: "center", width: "100%" }}>
            Đang tải cuộc trò chuyện... 
        </p>
    );
   return (
    <Stack gap={4} className="chat-box">
        <div className="chat-header">
            <strong>{recipientUser?.name}</strong>
        </div>
        <Stack gap={3} className="messages">
            {messages.length > 0 ? (
                messages.map((message, index) => (
                    <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0": " message align-self-start flex-grow-0"}`}>
                        <span>
                        {message.text}
                        </span>
                         <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                    </Stack>
                ))
            ) : (
                <p>Không có tin nhắn...</p>
            )}
           </Stack>
           <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
               {/* <inputEmoji/> */}
           </Stack>
    </Stack>
);

};

export default ChatBox;
