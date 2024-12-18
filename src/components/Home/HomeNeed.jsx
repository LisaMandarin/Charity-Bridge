import { Avatar, Carousel, Space, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { needList } from "../../data/fake-need";
import { Icon } from "@iconify/react/dist/iconify.js";

const { Title } = Typography;
export function HomeNeed() {
  return (
    <div className="flex flex-col justify-start px-4 shadow-md rounded-lg mt-4">
      <Title level={2} className="text-center pt-4">
        People in Need
      </Title>
      <Carousel autoplay draggable dots={false} speed={1000}>
        {needList.map((need, i) => (
          <div key={i} className="p-4">
            <Space>
              <Avatar icon={<UserOutlined />} />
              <a href={`mailto:${need.email}`}>{need.requestBy}</a>
            </Space>
            <p>
              <Icon
                icon="ion:location-outline"
                width="16"
                height="16"
                className="inline"
              />
              {need.location}
            </p>
            <p>{need.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
