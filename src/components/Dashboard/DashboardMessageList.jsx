import { Avatar } from "antd";

export function MessageList() {
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
