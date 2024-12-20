import { useParams } from "react-router-dom";
import { MessageForm } from "./MessageForm";
import { MessageDialogue } from "./MessageDialogue";

export function MessageBoard() {
  const { sender, receiver } = useParams();

  return (
    <div className="flex flex-col h-[calc(100vh-6rem-3.5rem)] overflow-hidden w-4/5 md:w-[600px] lg:w-[1000px] shadow-md">
      <MessageDialogue sender={sender} receiver={receiver} />
      <MessageForm sender={sender} receiver={receiver} />
    </div>
  );
}
