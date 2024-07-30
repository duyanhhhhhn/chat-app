import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notification, setNotification] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    // Initial socket
    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    // Add online users
    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });
        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket]);

    // Send message
    useEffect(() => {
        if (socket === null || !newMessage) return;
        const recipientId = currentChat?.members.find((id) => id !== user?._id);
        socket.emit("sendMessage", { ...newMessage, recipientId });
    }, [newMessage]);

    // Receive message and notification
    useEffect(() => {
        if (socket === null) return;
        socket.on("getMessage", (res) => {
            if (currentChat?._id !== res.chatId) return;
            setMessages((prev) => [...prev, res]);
        });
        socket.on("getNotification", (res) => {
            console.log("Notification received:", res); // Kiểm tra để xác nhận bạn nhận được thông báo
            // Cập nhật state notification tại đây
            const isChatOpen = currentChat?.members.some((id) => id === res.senderId);
            if (isChatOpen) {
                setNotification((prev) => [{ ...res, isRead: true }, ...prev]);
            } else {
                setNotification((prev) => [res, ...prev]);
            }
        });
        return () => {
            socket.off("getMessage");
            socket.off("getNotification");
        };
    }, [socket, currentChat]);

    // Fetch users for potential chats
    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);
            if (response.error) {
                console.log("Error fetching users", response);
                return;
            }
            const pChats = response.filter((u) => {
                let isChatCreated = false;
                if (user?._id === u._id) return false;
                if (userChats) {
                    isChatCreated = userChats.some((chat) => {
                        return chat.members.includes(u._id);
                    });
                }
                return !isChatCreated;
            });
            setPotentialChats(pChats);
            setAllUsers(response);
        };
        getUsers();
    }, [userChats, user]);

    // Fetch user chats
    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);
                const response = await getRequest(`${baseUrl}/chats/${user._id}`);
                setIsUserChatsLoading(false);
                if (response.error) {
                    setUserChatsError(response);
                    return;
                }
                setUserChats(response);
            }
        };
        getUserChats();
    }, [user,notification]);

    // Fetch messages for current chat
    useEffect(() => {
        const getMessages = async () => {
            if (currentChat?._id) {
                setIsMessagesLoading(true);
                setMessagesError(null);
                const response = await getRequest(`${baseUrl}/messages/${currentChat._id}`);
                setIsMessagesLoading(false);
                if (response.error) {
                    setMessagesError(response);
                    return;
                }
                setMessages(response);
            }
        };
        getMessages();
    }, [currentChat]);

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) {
            alert("Bạn phải có tin nhắn...");
            return;
        }

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage,
        }));
        if (response.error) {
            setSendTextMessageError(response);
            return;
        }
        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage("");
    }, []);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({ firstId, secondId }));
        if (response.error) {
            console.log("Error creating chat", response);
            return;
        }
        setUserChats((prev) => [...prev, response]);
    }, []);
    const markAllNotificationAsRead = useCallback((notification) => {
        const mNotifications = notification.map(n => {
            return { ...n, isRead: true };
        });
        setNotification(mNotifications)
    },[])
    const markNotificationAsRead = useCallback((n,userChats,user,notification) => {
        // find chat to open 
        const desiredChat = userChats.find(chat => {
            const chatMembers = [user._id, n.senderId]
            const isDesiredChat = chat?.members.every(member => {
                return chatMembers.includes(member);
            });

            return isDesiredChat
        });
        /// mark notification as read 
        const mNotifications = notification.map(el => {
            if (n.senderId === el.senderId) {
                return{...n, isRead: true}
            } else { 
                return el
            }
        })
        updateCurrentChat(desiredChat)
        setNotification(mNotifications)
    }, [])
    const markThisUserNotificationsAsRead = useCallback((thisUserNotifications, notification) => {
        /// mark notification as read 
        const mNotifications = notifications.map(el => {
            let notification;
            thisUserNotifications.forEach(n => {if (n.senderId === el.senderId) {
                notification = {...n,isRead: true}
            } else {
                notification = el
            }
            })
            


            return notification
        })
        setNotification(mNotifications)
    })
    return (
        <ChatContext.Provider value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            currentChat,
            messages,
            isMessagesLoading,
            messagesError,
            sendTextMessage,
            onlineUsers,
            notification,
            allUsers,
            markAllNotificationAsRead, markNotificationAsRead,
            markThisUserNotificationsAsRead
        }}>
            {children}
        </ChatContext.Provider>
    );
};
