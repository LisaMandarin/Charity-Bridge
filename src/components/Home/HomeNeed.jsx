import { Avatar, Carousel, Modal, Spin, Typography } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useNeeds } from "../../lib/context/needs";
import { useUser } from "../../lib/context/user";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
export function HomeNeed({ allUsers }) {
  const needs = useNeeds();
  const user = useUser();
  const [combinedData, setCombinedData] = useState([]); // needs collection + helpSeeker info
  const [sender, setSender] = useState(); // person who send the message
  const [loading, setLoading] = useState(true); // loading status for carousel
  const [isOpenModals, setIsOpenModals] = useState({});
  let navigate = useNavigate();

  const showModal = (index) => {
    setIsOpenModals((current) => ({
      ...current,
      [index]: true,
    }));
  };

  const handleOk = (index) => {
    navigate(`/messageboard/${sender}/${combinedData[index].helpSeeker.$id}`);
    setIsOpenModals((current) => ({
      ...current,
      [index]: false,
    }));
  };

  const handleCandle = (index) => {
    setIsOpenModals((current) => ({
      ...current,
      [index]: false,
    }));
  };

  useEffect(() => {
    setLoading(true);

    async function fetchNeeds() {
      try {
        if (!allUsers || allUsers.length === 0) return; // Wait for allUser to load

        const result = await needs.listNeeds();

        if (!result) return;

        /* ****************************************************************** 
        To list the information of help seekers, get the non-repeated user list first.
        Then get all the users from the collection and filter the necessary users.
        ****************************************************************** */
        const userList = new Set();
        result.map((r) => userList.add(r.requestBy));

        const filteredUsers = allUsers.filter((user) => userList.has(user.$id));

        const userMap = new Map();
        filteredUsers.map((user) => userMap.set(user.$id, user)); // convert to user object

        if (result.length > 0) {
          const data = result.map((r) => ({
            ...r,
            helpSeeker: userMap.get(r.requestBy),
          }));

          setCombinedData(data);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNeeds();
  }, [allUsers]);

  useEffect(() => {
    if (user?.current) {
      setSender(user.current?.$id);
    }
  }, [user?.current?.email]);

  return (
    <div className="flex flex-col justify-start px-4 shadow-md rounded-lg mt-4">
      <Title level={2} className="text-center pt-4">
        People in Need
      </Title>
      <Spin spinning={loading}>
        <Carousel
          autoplay
          speed={1000}
          arrows={true}
          dots={true}
          className="custom-carousel lg:h-[140px]"
        >
          {combinedData &&
            combinedData.map((need, i) => (
              <div
                key={i}
                className="p-4 flex flex-col cursor-pointer"
                onClick={() => showModal(i)}
              >
                <ul>
                  <li className="text-xs">
                    <Avatar
                      src={`${need.helpSeeker.prefs.avatarUrl}`}
                      size={14}
                    >
                      {need.helpSeeker.name[0]}
                    </Avatar>
                    {need.helpSeeker.name}
                  </li>
                  <li className="text-xs">
                    <Icon
                      icon="ion:location-outline"
                      width="16"
                      height="16"
                      className="inline"
                    />
                    {need.location}
                  </li>
                </ul>
                <div className="mt-2 line-clamp-3">{need.description}</div>
              </div>
            ))}
        </Carousel>
      </Spin>

      {combinedData &&
        combinedData.map((need, i) => (
          <Modal
            key={i}
            title={`${need.helpSeeker.name} needs help`}
            open={isOpenModals[i]}
            onOk={() => handleOk(i)}
            onCancel={() => handleCandle(i)}
            okText={`Message ${need.helpSeeker.name}`}
          >
            <ul>
              <li className="text-sm">
                <Avatar src={`${need.helpSeeker.prefs.avatarUrl}`} size={20}>
                  {need.helpSeeker.name[0]}
                </Avatar>
                {need.helpSeeker.name}
              </li>
              <li className="text-sm">
                <Icon
                  icon="ion:location-outline"
                  width="16"
                  height="16"
                  className="inline"
                />
                {need.location}
              </li>
            </ul>
            <div className="mt-2 text-lg">{need.description}</div>
          </Modal>
        ))}
    </div>
  );
}
