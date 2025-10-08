"use client";

import { io, Socket } from "socket.io-client";
import { LabelInput } from "@/components/Inputs/LabelInput/LabelInput";
import { ArrowLeft2 } from "iconsax-react";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/services/axiosConf";
import { toast } from "react-toastify";
import { ItestChat } from "@/global/interfaces/test.interfaces";

interface socketChatResponse {
  id: number;
  sender: number;
  chat: number;
  content: string;
  updatedAt: string;
  createdAt: string;
}

type IonlineUsers = {
  userId: number;
  socketId: string;
};

export const ChatPage = ({ chats }: { chats?: ItestChat }) => {
  const [selectedChat, setSelectedChat] = useState(0);
  const [trampa, setTrampa] = useState(false);
  const [messages, setMessages] = useState<
    { author: string | number; text: string }[]
  >([]);
  const [connectedUsers, setConnectedUsers] = useState<IonlineUsers[]>([]);
  const [tempUser, setTempUser] = useState("");
  const [tempMsg, setTempMsg] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const [socketUser, setSocketUser] = useState("");
  const [error, setError] = useState("");

  const validUser = socketUser !== "";
  const validChat = chats?.data.find((f) => f.id === selectedChat);
  const privateTitle = validChat?.members.find(
    (f) => f.id.toString() !== socketUser
  );
  const socket = socketRef?.current;

  useEffect(() => {
    console.log(socket);
    if (!!socket) {
      console.log(socket.connected);
      if (!socket.connected) {
        socket.connect();
      } else {
        socket.emit("register");
        socket.on("new-user", (data: IonlineUsers[]) => {
          console.log("newsus");
          setConnectedUsers(data);
        });
        socket.on("new-message", (data: socketChatResponse) => {
          setMessages((prev) => [
            { author: data.sender, text: data.content },
            ...prev,
          ]);
        });
        socket.on("no-access", () => {
          console.log("?!");
          setSelectedChat(0);
          toast.error("No tienes acceso a este chat");
        });
      }
    } else {
      socketRef.current = io("http://localhost:3002", {
        auth: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiY29sbGVjdGlvbiI6InVzZXJzIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsInNpZCI6IjNkMzY2MjkyLWQ1YjktNDgyOC04NmEzLTU0NWUzOGJlMzc1MyIsImlhdCI6MTc1NTc5OTMwNCwiZXhwIjoxNzU1ODA2NTA0fQ.vg3lDpSdEkKhVbnD_pQAM_Q602NtgigbP_u3HXoFYys",
        },
        path: "/socket.io",
        reconnectionAttempts: 5,
        transports: ["websocket"],
      });
    }
  }, [socket, selectedChat]);

  const handleMessages = async () => {
    if (!validUser) {
      if (tempUser === "") {
        setError("Ingrese un usuario para comenzar");
        return;
      }
      setTempUser("");
      setError("");
      setSocketUser(tempUser);
      if (!!socket) {
        console.log("!");
      }
    } else {
      try {
        const temp = {
          sender: parseInt(socketUser),
          chat: 1,
          content: tempMsg,
        };
        await axiosInstance.post("/chat-messages", temp);
        setTempMsg("");
      } catch (error) {
        console.error(error);
        toast.error("Error");
      }
    }
  };

  const getChatMessages = (chat: ItestChat["data"][0]) => {
    socket?.emit("join-chat", { chatId: chat.id });
    setSelectedChat(chat.id);
    setMessages(
      chat.messages.docs.map((m) => ({ author: m.sender, text: m.content }))
    );
  };

  const handleReturn = () => {
    if (socketUser !== "") {
      setSocketUser("");
    } else {
      if (selectedChat !== 0) {
        socket?.emit("close-chat", { chatId: selectedChat });
        setSelectedChat(0);
      } else {
        socket?.disconnect();
      }
    }
  };

  return (
    <div className="p-6 flex flex-col h-full gap-3">
      <button onClick={handleReturn} className="shrink-0 bg-danger p-1">
        <ArrowLeft2 size={20} color="#fff" />
      </button>
      {selectedChat !== 0 ? (
        <>
          <div
            className={`flex grow gap-3 ${
              !validUser ? "justify-center items-center" : "flex-col"
            }`}
          >
            {!validUser ? (
              <LabelInput
                containerClass="min-w-[300px]"
                label="Nombre de usuario"
                onChange={(e) => setTempUser(e.target.value)}
                value={tempUser}
                error={error}
              />
            ) : (
              <>
                <div className="flex-center-3">
                  <h2 className="font-bold text-2xl">
                    Hablando como:{" "}
                    <i>
                      {validChat?.members.find(
                        (f) => f.id.toString() === socketUser
                      )?.firstName ?? socketUser}
                    </i>
                  </h2>
                </div>
                <div className="grow border border-black max-h-full overflow-auto flex flex-col gap-3 p-3">
                  <div className="border-b border-black">
                    <p>
                      {validChat?.title ??
                        privateTitle?.firstName ??
                        "Chat sin nombre"}
                    </p>
                    {validChat?.type === "private" && (
                      <p>
                        {connectedUsers.some(
                          (f) => f.userId === privateTitle?.id
                        )
                          ? "Online"
                          : "Offline"}
                      </p>
                    )}
                  </div>
                  {messages.map((m, i) => {
                    return (
                      <p
                        className={`regular-btn-padding w-fit rounded-xl ${
                          m.author.toString() === socketUser.toString()
                            ? "ml-auto bg-neutral-300"
                            : "bg-accent"
                        }`}
                        key={`${m.author}-message-${i}`}
                      >
                        {m.text}
                      </p>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className="flex-center-3">
            {validUser && (
              <LabelInput
                containerClass="grow "
                placeholder="Escribe un mensaje"
                onChange={(e) => setTempMsg(e.target.value)}
                value={tempMsg}
              />
            )}
            <button
              type="button"
              disabled={validUser && tempMsg === ""}
              onClick={handleMessages}
              className={`regular-btn-padding bg-success ${
                validUser ? "" : "grow"
              }`}
            >
              {validUser ? `Enviar` : "Confirmar"}
            </button>
          </div>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => {
              setTrampa(!trampa);
            }}
          >
            Trampa
          </button>
          <h2 className="font-bold text-2xl">Selecciona chat</h2>
          {chats && chats.data.length > 0 ? (
            chats.data.map((m) => {
              return (
                <button
                  key={m.id}
                  className="regular-btn-padding bg-secondary rounded-xl"
                  onClick={() => getChatMessages(m)}
                >
                  {m.id}
                </button>
              );
            })
          ) : (
            <p>no hay</p>
          )}
        </>
      )}
    </div>
  );
};
