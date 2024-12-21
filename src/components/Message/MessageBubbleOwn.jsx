import { Avatar } from "antd";
import { formatTime } from "../utils/timeHandling";

export function MessageBubbleOwn({ userOwn, message }) {
  /* ***********
    data: userOwn
    ************* */
  return (
    <div className="p-2 flex flex-col">
      <div className="inline-flex flex-row-reverse gap-2">
        <Avatar src={userOwn?.prefs?.avatarUrl} className="self-end">
          {userOwn?.name[0]}
        </Avatar>
        <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-100 text-black rounded-chat-bubble-own whitespace-pre-wrap">
          {message.messageContent}
        </div>
      </div>
      <span className="text-gray-400 text-xs self-end">
        {formatTime(message.$createdAt)}
      </span>
    </div>
  );
}
