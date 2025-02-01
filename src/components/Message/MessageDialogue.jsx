import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useMessage } from "../../lib/context/messages";
import { MessageBubbleOwn } from "./MessageBubbleOwn";
import { MessageBubbleOther } from "./MessageBubbleOther";
import { useUser } from "../../lib/context/user";
import { useUserProfile } from "../../lib/context/userProfile";

export function MessageDialogue({ sender, receiver }) {
  const { listMessages, subscribeToMessages } = useMessage();
  const user = useUser();
  const [messageData, setMessageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userOwn, setUserOwn] = useState();
  const [userOther, setUserOther] = useState();

  /* *********************************
  Get messages from collection
  Get user names
  Set Realtime for messages collection
  ********************************* */
  const { getProfiles } = useUserProfile();

  useEffect(() => {
    async function fetchMessages() {
      setLoading(true);
      try {
        const messageResult = await listMessages(sender, receiver);
        if (messageResult) {
          setMessageData(messageResult);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();

    async function fetchUsers() {
      try {
        const result = await getProfiles();
        const ownResult = result.find((profile) => profile.userId === sender);
        const otherResult = result.find(
          (profile) => profile.userId === receiver,
        );

        setUserOwn(ownResult);
        setUserOther(otherResult);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchUsers();

    const unsubscribe = subscribeToMessages((newMessage) => {
      if (
        (newMessage.ownId === sender && newMessage.otherId === receiver) ||
        (newMessage.ownId === receiver && newMessage.otherId === sender)
      ) {
        setMessageData((current) => [...current, newMessage]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [sender, receiver]);

  return (
    <div className="flex-grow overflow-scroll">
      <Spin spinning={loading}>
        {messageData.map((msg) =>
          msg.ownId === user.current.$id ? (
            <MessageBubbleOwn userOwn={userOwn} message={msg} key={msg.$id} />
          ) : (
            <MessageBubbleOther
              userOther={userOther}
              message={msg}
              key={msg.$id}
            />
          ),
        )}
      </Spin>
    </div>
  );
}
