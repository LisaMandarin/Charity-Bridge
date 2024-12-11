import "animate.css";
import { Space, Typography } from "antd";
const { Title } = Typography;
import { UpOutlined } from "@ant-design/icons";

export function HomeHero() {
  return (
    <div className="absolute top-0 left-0 z-50 w-full min-h-[400px] bg-white flex flex-col justify-center text-center p-4 font-sans shadow-lg">
      <Space direction="vertical" flex-grow>
        <Title
          className="animate__animated animate__rubberBand"
          style={{ fontFamily: "Merriweather", fontWeight: "1000" }}
        >
          Welcome to Charity Bridge
        </Title>
        <Title
          level={3}
          className="animate__animated animate__rotateIn animate__delay-1s"
          style={{ fontFamily: "Pacifico" }}
        >
          Connect hearts, share resources, and make a difference.
        </Title>
        <Title
          level={4}
          className="animate__animated animate__rotateIn animate__delay-2s"
        >
          Discover the ways you can connect and contribute.
        </Title>
      </Space>
      <div className="flex flex-grow justify-center items-end">
        <UpOutlined className="text-3xl p-8" />
      </div>
    </div>
  );
}
