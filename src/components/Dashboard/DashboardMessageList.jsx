import { Avatar } from "antd";
import { useEffect } from "react";
import { useMessage } from "../../lib/context/messages";

export function MessageList({ user }) {
  const message = useMessage();

  return (
    <div className="flex flex-row gap-2 p-4">
      <div className="self-center">
        <Avatar>U</Avatar>
      </div>
      <div className="flex flex-col flex-grow">
        <div>Name</div>
        <div>content</div>
      </div>
      <div className="self-end">time</div>
    </div>
  );
}
