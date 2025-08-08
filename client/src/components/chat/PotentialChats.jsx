import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { ScrollArea, Group, Indicator, Avatar, Paper, Box } from "@mantine/core";
import avatar from "../../assets/avatar.jpeg";

const PotentialChats = () => {
    const { user } = useContext(AuthContext)
    const { potentialChats ,createChat,onlineUsers} = useContext(ChatContext)
  return (
    <ScrollArea type="never" px="xs" py={4} scrollHideDelay={200}>
      <Group gap={8} wrap="nowrap">
        {potentialChats &&
          potentialChats.map((u, index) => {
            const isOnline = onlineUsers?.some((ou) => ou?.userId === u?._id);
            return (
              <Paper
                key={index}
                p={6}
                radius="xl"
                withBorder
                component="button"
                onClick={() => createChat(user._id, u._id)}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Group gap={6} wrap="nowrap">
                  <Indicator color={isOnline ? 'green' : 'gray'} position="bottom-end" offset={0} size={8}>
                    <Avatar src={avatar} radius="xl" size={24} />
                  </Indicator>
                  <Box style={{ maxWidth: 140, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {u.name}
                  </Box>
                </Group>
              </Paper>
            );
          })}
      </Group>
    </ScrollArea>
  );
}
 
export default PotentialChats;