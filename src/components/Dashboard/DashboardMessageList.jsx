import { Avatar, message, Spin } from "antd";
import { useEffect, useState } from "react";
import { useUser } from "../../lib/context/user";
import { useMessage } from "../../lib/context/messages";
import { getUser } from "../../lib/serverAppwrite";
import { formatTime } from "../utils/timeHandling";

export function MessageList() {
  const user = useUser();
  const messageContext = useMessage();
  const [ownMessages, setOwnMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = user?.current?.$id;

    async function fetchOwnMessages() {
      setLoading(true);
      try {
        const result = await messageContext.listOwnMessages(userId);

        const owns = await Promise.all(result.map((r) => getUser(r.ownId)));

        const others = await Promise.all(result.map((r) => getUser(r.otherId)));

        const data = result.map((r, i) => ({
          ...r,
          own: owns[i],
          other: others[i],
        }));
        setOwnMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchOwnMessages();
  }, [user?.current]);

  useEffect(() => {
    console.log("ownMessages: ", ownMessages[0]);
  }, [ownMessages]);

  return (
    <>
      <Spin spinning={loading}>
        {ownMessages.length > 0 && user?.current?.$id ? (
          ownMessages.map((msg, i) => {
            const isSentByYou = msg.ownId === user.current.$id;
            const otherPerson = isSentByYou ? msg.other : msg.own;

            return (
              <div key={i} className="flex flex-row gap-2 p-4 border-b-2">
                <div className="self-center">
                  <Avatar src={otherPerson?.prefs?.avatarUrl}>U</Avatar>
                </div>
                <div className="flex flex-col flex-grow">
                  <div>{otherPerson?.name}</div>
                  <div className="text-gray-400 line-clamp-1">
                    {msg.messageContent}
                  </div>
                </div>
                <div className="self-end min-w-fit text-right text-gray-400">
                  {formatTime(msg.$createdAt)}
                </div>
              </div>
            );
          })
        ) : (
          <div>No data</div>
        )}
      </Spin>
    </>
  );
}
