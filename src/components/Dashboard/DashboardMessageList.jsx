import { Avatar, Spin } from "antd";
import { useEffect, useState } from "react";
import { useUser } from "../../lib/context/user";
import { useMessage } from "../../lib/context/messages";
import { formatTime } from "../utils/timeHandling";
import { useNavigate } from "react-router-dom";
import { LeftArrowBar } from "../utils/ArrowBar";
import useUserMap from "../utils/useUserMap";

export function MessageList() {
  const navigate = useNavigate();
  const handleNavigate = (senderId, receiverId) => {
    navigate(`/messageboard/${senderId}/${receiverId}`);
  };

  /* *******************************************************************
  Fetch messages that involve the current user.
  Get the names of others who have conversations with the current user.
  ********************************************************************* */
  const user = useUser();
  const { listOwnMessages } = useMessage();
  const [targetedDocs, setTargetedDocs] = useState([]);
  const ownerMap = useUserMap({ targetedDocs, attribute: "ownId" });
  const otherMap = useUserMap({ targetedDocs, attribute: "otherId" });
  const [combinedData, setCombinedData] = useState([]); // message data + owner data + other data

  useEffect(() => {
    async function fetchOwnMessages() {
      try {
        const userId = user?.current?.$id;
        const result = await listOwnMessages(userId);
        setTargetedDocs(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOwnMessages();
  }, [user?.current]);

  useEffect(() => {
    try {
      const combined = targetedDocs.map((doc) => {
        const ownId = doc.ownId;
        const otherId = doc.otherId;
        const messageContent = doc.messageContent;
        const $createdAt = doc.$createdAt;
        const own = ownerMap.get(ownId);
        const other = otherMap.get(otherId);
        return { ownId, otherId, messageContent, $createdAt, own, other };
      });
      setCombinedData(combined);
    } catch (error) {
      console.error(
        "Unable to combine message data with user data: ",
        error.message,
      );
    }
  }, [ownerMap, otherMap]);

  /* *************************************
  Group messages and keep the latest ones
  *************************************** */
  const [groupedMessages, setGroupedMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const grouped = Object.values(
      combinedData.reduce((acc, msg) => {
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
    setLoading(false);
  }, [combinedData]);

  return (
    <div className="relative h-[calc(100vh-6rem-3.5rem)] w-4/5 md:w-[600px] lg:w-[1000px] overflow-auto">
      <LeftArrowBar />
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
                  <Avatar src={otherPerson?.avatar}>U</Avatar>
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
