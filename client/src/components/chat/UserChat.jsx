import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { Group, Stack, Text, Avatar, Box, Indicator } from '@mantine/core'
import PropTypes from 'prop-types'
import avarter from "../../assets/avatar.jpeg"
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLastestMessage } from "../../hooks/useFetchLatestMesages";
import moment from "moment"
const UserChat = ({chat, user, active = false}) => {
    const { recipientUser } = useFetchRecipientUser(chat, user)

    const { onlineUsers, notification, markThisUserNotificationsAsRead } = useContext(ChatContext)
    const { lastestMessage } = useFetchLastestMessage(chat)
    const unreadNotifications = unreadNotificationsFunc(notification)
    const thisUserNotifications = unreadNotifications?.filter(
        n=> n.senderId === recipientUser?._id
    )
    const isOnline = onlineUsers?.some((onlineUser) => onlineUser?.userId === recipientUser?._id)
    const truncateText = (text) => { 
        let shortText = text.substring(0, 20);

        if (text.length > 20) {
            shortText =shortText + "..."
        }
        return shortText
    }
    return (
    <Group gap="sm" className="user-card p-2" justify="space-between" role="button" style={{ gap: 12 }} onClick={() => {
        if (thisUserNotifications?.length !== 0) {
            markThisUserNotificationsAsRead(
                thisUserNotifications,
                notification
        )
    }}}>
        <Group gap={8}>
          <Indicator color={isOnline ? 'green' : 'gray'} position="bottom-end" offset={0} size={10} disabled={isOnline === undefined}>
            <Avatar src={avarter} alt="" radius={20} size={50} />
          </Indicator>
          <Box className="text-content">
            <Text fw={600} c={active ? 'blue' : undefined}>{recipientUser?.name}</Text>
            <Text size="sm" c={active ? 'blue' : 'dimmed'}>{lastestMessage?.text && truncateText(lastestMessage?.text)}</Text>
          </Box>
        </Group>
        <Stack gap={2} align="flex-end">
          <Text size="xs" c="dimmed">{moment(lastestMessage?.createdAt).calendar()}</Text>
          <Box className={thisUserNotifications?.length > 0 ? "this-user-notifications" : ""}>
            {thisUserNotifications?.length > 0 ? thisUserNotifications.length : ""}
          </Box>
          {/* status dot moved to Avatar Indicator */}
        </Stack>
    </Group>
    )
}

UserChat.propTypes = {
  chat: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  active: PropTypes.bool,
}
 
export default UserChat;