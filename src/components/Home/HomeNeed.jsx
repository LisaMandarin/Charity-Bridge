import { Avatar, Carousel, Modal, Spin, Typography } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useNeeds } from "../../lib/context/needs";
import { useUser } from "../../lib/context/user";
import { useNavigate } from "react-router-dom";
import useUserMap from "../utils/useUserMap";
const { Title } = Typography;

export function HomeNeed() {
  const { listNeeds } = useNeeds();
  const user = useUser();
  const [targetedDocs, setTargetedDocs] = useState([]);
  const userMap = useUserMap({
    targetedDocs,
    attribute: "requestBy",
  });
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
    navigate(
      `/messageboard/${sender}/${combinedData[index].helpSeeker.userId}`,
    );
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
    async function fetchNeeds() {
      try {
        const result = await listNeeds();
        if (result.length > 0) {
          setTargetedDocs(result);
        }
      } catch (error) {
        console.error("Failed to fetch needs documents: ", error.message);
      }
    }
    fetchNeeds();
  }, []);

  useEffect(() => {
    if (user?.current) {
      setSender(user.current?.$id);
    }
  }, [user?.current?.$id]);

  useEffect(() => {
    if (targetedDocs.length > 0) {
      const data = targetedDocs.map((doc) => {
        return {
          ...doc,
          helpSeeker: userMap.get(doc.requestBy),
        };
      });

      if (data) {
        setCombinedData(data);
        setLoading(false);
      }
    }
  }, [userMap]);

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
                      src={`${need?.helpSeeker?.avatar}` || null}
                      size={14}
                    >
                      {need?.helpSeeker?.name[0] || "U"}
                    </Avatar>
                    {need?.helpSeeker?.name || "Unknown"}
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
            title={`${need?.helpSeeker?.name || "Unknown"} needs help`}
            open={isOpenModals[i]}
            onOk={() => handleOk(i)}
            onCancel={() => handleCandle(i)}
            okText={`Message ${need?.helpSeeker?.name || "Unknown"}`}
          >
            <ul>
              <li className="text-sm">
                <Avatar src={`${need?.helpSeeker?.avatar || null}`} size={20}>
                  {need?.helpSeeker?.name[0] || "U"}
                </Avatar>
                {need?.helpSeeker?.name || "Unknown"}
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
