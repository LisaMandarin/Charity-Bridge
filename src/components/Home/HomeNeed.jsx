import { Avatar, Carousel, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { useNeeds } from "../../lib/context/needs";
import { getUser } from "../../lib/serverAppwrite";
import { useUser } from "../../lib/context/user";

const { Title } = Typography;
export function HomeNeed() {
  const needs = useNeeds();
  const user = useUser();
  const [combinedData, setCombinedData] = useState([]);
  const [sender, setSender] = useState(); // person who send the message

  useEffect(() => {
    async function fetchNeeds() {
      const result = await needs.listNeeds();

      if (!result) return;

      const helpSeekers = await Promise.all(
        result.map((r) => getUser(r.requestBy)),
      );
      if (helpSeekers.length > 0) {
        const data = result.map((r, index) => ({
          ...r,
          helpSeeker: helpSeekers[index],
        }));

        setCombinedData(data);
      }
    }
    fetchNeeds();
  }, []);

  useEffect(() => {
    if (user?.current) {
      setSender(user.current?.email);
    }
  }, [user?.current?.email]);

  useEffect(() => console.log("combinedData: ", combinedData));

  return (
    <div className="flex flex-col justify-start px-4 shadow-md rounded-lg mt-4">
      <Title level={2} className="text-center pt-4">
        People in Need
      </Title>
      <Carousel
        autoplay
        speed={1000}
        arrows={true}
        dots={true}
        className="custom-carousel"
      >
        {combinedData &&
          combinedData.map((need, i) => (
            <div key={i} className="p-4 flex flex-col">
              <ul>
                <li className="text-xs">
                  <Avatar src={`${need.helpSeeker.prefs.avatarUrl}`} size={14}>
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
    </div>
  );
}
