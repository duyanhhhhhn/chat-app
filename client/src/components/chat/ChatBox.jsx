import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import {
  Stack,
  Text,
  Group,
  Button,
  Box,
  Paper,
  ScrollArea,
} from "@mantine/core";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { RiMessage3Line } from "react-icons/ri";
const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (!recipientUser)
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 h-full">
        <div className="text-center">
          <div className="w-24 h-24 flex items-center justify-center mx-auto mb-4 bg-gray-200 rounded-full">
            <RiMessage3Line className="text-4xl text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chọn một cuộc trò chuyện
          </h3>
          <p className="text-gray-600">
            Chọn một người bạn hoặc nhóm để bắt đầu trò chuyện
          </p>
        </div>
      </div>
    );
  if (isMessagesLoading)
    return (
      <Text ta="center" w="100%">
        Đang tải cuộc trò chuyện...
      </Text>
    );
  return (
    <Paper shadow="sm" radius="md" p="md" withBorder style={{ height: "100%" }}>
      <Group justify="space-between" mb="sm">
        <Text fw={700} size="lg">
          {recipientUser?.name}
        </Text>
      </Group>
      <ScrollArea h="calc(100% - 140px)">
        <Stack gap="xs" className="messages">
          {messages.length > 0 ? (
            messages.map((message, index) => {
              const isSelf = message?.senderId === user?._id;
              return (
                <Group
                  key={index}
                  justify={isSelf ? "flex-end" : "flex-start"}
                  ref={scroll}
                >
                  <Box
                    p="xs"
                    px="sm"
                    style={{
                      maxWidth: 420,
                      borderRadius: 12,
                      background: isSelf
                        ? "var(--mantine-color-blue-light)"
                        : "var(--mantine-color-gray-1)",
                    }}
                  >
                    <Text>{message.text}</Text>
                    <Text
                      size="xs"
                      c="dimmed"
                      mt={4}
                      ta={isSelf ? "right" : "left"}
                    >
                      {moment(message.createdAt).calendar()}
                    </Text>
                  </Box>
                </Group>
              );
            })
          ) : (
            <Text c="dimmed" ta="center">
              Không có tin nhắn...
            </Text>
          )}
        </Stack>
      </ScrollArea>
      <Group gap="sm" mt="sm" align="center" wrap="nowrap">
        <Box style={{ flex: 1, minWidth: 0 }}>
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="nunito"
            borderColor="rgba(72,112,223,0.2)"
          />
        </Box>
        <Button
          onClick={() =>
            sendTextMessage(textMessage, user, currentChat._id, setTextMessage)
          }
          variant="filled"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </Button>
      </Group>
    </Paper>
  );
};

export default ChatBox;
