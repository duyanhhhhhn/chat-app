import { useContext, useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";
import { ChatContext } from "../context/ChatContext";

export const useFetchLastestMessage = (chat) => {
    const {newMessage, notification } = useContext(ChatContext)
   const [lastestMessage, setLastestMessage] = useState(null);
   useEffect(() => {
        const getMessages = async () => {
                const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);
                if (response.error) {
                   return console.log("Error getting messages ...", error)
                }
                const lastestMessage = response[response?.length - 1];
                setLastestMessage(lastestMessage)
        };
        getMessages();
    }, [newMessage,notification]);
return {lastestMessage}
};
