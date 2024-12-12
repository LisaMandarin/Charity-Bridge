import "animate.css";
import { Space, Typography } from "antd";
const { Title } = Typography;
import { UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export function HomeHero() {
  const [isShown, setIsShown] = useState(false);

  const handleIsShown = () => {
    setIsShown(false);
  };

  useEffect(() => {
    const isVisited = localStorage.getItem("isVisited");

    if (!isVisited) {
      localStorage.setItem("isVisited", "true");
      setIsShown(true);
    }
  }, []);

  if (!isShown) {
    return null;
  }

  return (
    <div
      className={`absolute top-0 left-0 z-50 w-full ${isShown ? "max-h-[400px] p-4" : "max-h-0 p-0"} bg-pink-200 flex flex-col justify-center text-center font-sans shadow-lg transition-all duration-1000 overflow-hidden`}
    >
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
        <UpOutlined className="text-3xl p-8" onClick={handleIsShown} />
      </div>
    </div>
  );
}
