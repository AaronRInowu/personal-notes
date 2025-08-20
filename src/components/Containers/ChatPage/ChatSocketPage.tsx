import { generalRetriveFetch } from "@/services/general.services";
import { ChatPage } from "./ChatPage";
import { ItestChat } from "@/global/interfaces/test.interfaces";

export default async function ChatPageContainer() {
  const tryChats = async () => {
    try {
      return await generalRetriveFetch<ItestChat>("chats");
    } catch (error) {
      console.error(error);
      return;
    }
  };
  const chatRes = await tryChats();

  return <ChatPage chats={chatRes} />;
}
