import { Avatar, Spin } from "antd";
import { useEffect, useState } from "react";
import { useUser } from "../../lib/context/user";
import { useMessage } from "../../lib/context/messages";
import { getUser } from "../../lib/serverAppwrite";
import { formatTime } from "../utils/timeHandling";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

export function MessageList() {
  const user = useUser();
  const messageContext = useMessage();
  const [ownMessages, setOwnMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleNavigate = (senderId, receiverId) => {
    navigate(`/messageboard/${senderId}/${receiverId}`);
  };

  /* *******************************************************************
  Fetch messages that involve the current user.
  Get the names of others who have conversations with the current user.
  ********************************************************************* */
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

  /* *************************************
  Group messages and keep the latest ones
  *************************************** */
  useEffect(() => {
    const grouped = Object.values(
      ownMessages.reduce((acc, msg) => {
        const isSentByYou = msg.ownId === user?.current?.$id;
        const otherPersonId = isSentByYou ? msg.otherId : msg.ownId;

        if (
          !acc[otherPersonId] ||
          new Date(msg.$createdAt) > new Date(acc[otherPersonId].$createdAt)
        ) {
          acc[otherPersonId] = msg;
        }
        return acc;
      }, {}),
    );

    setGroupedMessages(grouped);
  }, [ownMessages, user?.current?.$id]);

  return (
    <div className="relative h-[calc(100vh-6rem-3.5rem)] overflow-auto">
      <div className="sticky top-0 z-10 shadow-md bg-white opacity-95">
        <ArrowLeftOutlined
          className="text-xl p-4"
          onClick={() => navigate(-1)}
        />
      </div>
      <Spin spinning={loading}>
        {groupedMessages.length > 0 && user?.current?.$id ? (
          groupedMessages.map((msg, i) => {
            const isSentByYou = msg.ownId === user.current.$id;
            const otherPerson = isSentByYou ? msg.other : msg.own;

            return (
              <div
                key={i}
                className="flex flex-row gap-2 p-4 border-b-2 cursor-pointer"
                onClick={() => handleNavigate(msg.ownId, msg.otherId)}
              >
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
    </div>
  );
}
