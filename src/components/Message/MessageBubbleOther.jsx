import { Avatar } from "antd";

export function MessageBubbleOther({ userOther, message }) {
  /* **************
    data: userOther
  **************** */
  return (
    <div className="p-2 flex flex-col">
      <div className="inline-flex gap-2">
        <Avatar src={userOther?.prefs?.avatarUrl} className="self-end">
          {userOther?.name[0]}
        </Avatar>
        <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-900 text-white rounded-chat-bubble">
          {message.messageContent}
        </div>
      </div>
      <span className="text-gray-400 text-xs self-start">
        {message.$createdAt}
      </span>
    </div>
  );
}
