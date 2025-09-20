import { useContext } from "react";
import {
  Flex,
  Stack,
  Box,
  Text,
  Paper,
  ScrollArea,
  Divider,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import UserChat from "../components/chat/UserChat";
import PotentialChats from "../components/chat/PotentialChats";
import ChatBox from "../components/chat/ChatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat, currentChat } =
    useContext(ChatContext);
  const isMobile = useMediaQuery('(max-width: 48em)');
  return (
    <Box px={isMobile ? 8 : 'md'} py={isMobile ? 8 : 'sm'} style={{ minHeight: 'calc(100vh - 60px)' }}>
      <div style={{ marginBottom: "10px", marginTop: "10px" }}>
        <PotentialChats />
      </div>
      {userChats?.length < 1 ? null : (
        <Flex gap="md" align="stretch" direction={isMobile ? 'column' : 'row'} style={{ height: 'calc(100vh - 140px)' }}>
          <Paper
            shadow="sm"
            radius="md"
            p="sm"
            withBorder
            style={{ width: isMobile ? '100%' : 320, height: '100%' }}
          >
            <Text fw={600} mb="xs">
              Chats
            </Text>
            <TextInput placeholder="Tìm kiếm..." mb="sm" radius="md" />
            <Divider mb="sm" />
            <ScrollArea h='calc(100% - 120px)'>
              <Stack gap="xs">
                {isUserChatsLoading && <Text>Loading chats..</Text>}
                {userChats?.map((chat, index) => {
                  const isActive = currentChat?._id === chat._id;
                  return (
                    <Box key={index} onClick={() => updateCurrentChat(chat)}>
                      <UserChat chat={chat} user={user} active={isActive} />
                    </Box>
                  );
                })}
              </Stack>
            </ScrollArea>
          </Paper>
          <Box style={{ flex: 1 }}>
            <ChatBox />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Chat;
