import { useNavigate, useParams } from "react-router-dom";
import { MessageForm } from "./MessageForm";
import { MessageDialogue } from "./MessageDialogue";
import { ArrowLeftOutlined } from "@ant-design/icons";

export function MessageBoard() {
  const { sender, receiver } = useParams();
  let navigate = useNavigate();

  return (
    <div className="relative flex flex-col h-[calc(100vh-6rem-3.5rem)] overflow-auto w-4/5 md:w-[600px] lg:w-[1000px] shadow-md">
      <div className="sticky top-0 z-15 shadow-md bg-white opacity-95">
        <ArrowLeftOutlined
          className="text-xl p-4"
          onClick={() => navigate(-1)}
        />
      </div>
      <MessageDialogue sender={sender} receiver={receiver} />
      <MessageForm sender={sender} receiver={receiver} />
    </div>
  );
}
