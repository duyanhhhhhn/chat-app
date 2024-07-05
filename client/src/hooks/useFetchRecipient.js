import { useEffect, useMemo, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = useMemo(() => { 
        return chat?.members.find((id) => id !== user?._id);
    }, [chat, user]);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return;
            try {
                const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);
                if (response.error) {
                    setError(response.error);
                } else {
                    setRecipientUser(response);
                }
            } catch (err) {
                setError(err.message);
            }
        };

        getUser();
    }, [recipientId]);

    return { recipientUser, error, data: recipientUser };
};
