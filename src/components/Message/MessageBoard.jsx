import { useParams } from "react-router-dom";
import { MessageForm } from "./MessageForm";
import { MessageDialogue } from "./MessageDialogue";
import { WarningOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { LeftArrowBar } from "../utils/ArrowBar";

export function MessageBoard() {
  const { sender, receiver } = useParams();
  const sanitizedSender = sender?.replace(/^:/, "");
  const sanitizedReceiver = receiver?.replace(/^:/, "");
  const [isError, setIsError] = useState(false); // show error when sender equals receiver

  useEffect(() => {
    if (sanitizedSender === sanitizedReceiver) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [sanitizedSender, sanitizedReceiver]);

  return (
    <div className="relative flex flex-col h-[calc(100vh-6rem-3.5rem)] overflow-auto w-4/5 md:w-[600px] lg:w-[1000px] shadow-md">
      <LeftArrowBar />
      {isError ? (
        <div className="flex flex-col justify-center items-center h-full text-xl text-gray-400">
          <WarningOutlined className="text-3xl" />
          <p>Error: You can not message yourself.</p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <MessageDialogue
            sender={sanitizedSender}
            receiver={sanitizedReceiver}
          />
          <MessageForm sender={sanitizedSender} receiver={sanitizedReceiver} />
        </div>
      )}
    </div>
  );
}
