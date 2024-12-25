import { Card } from "antd";
import { EditOutlined, ReadOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { LeftArrowBar } from "../utils/ArrowBar";

export function DashboardMessage() {
  let navigate = useNavigate();

  return (
    <div className="relative flex flex-col w-full">
      <LeftArrowBar />
      <div className="flex flex-row gap-4 justify-center">
        <Card title="Read Messages">
          <ReadOutlined
            className="text-3xl flex justify-center hover:text-blue-400 hover:cursor-pointer"
            onClick={() => navigate("/messagelist")}
          />
        </Card>
        <Card title="Write Messages">
          <EditOutlined
            className="text-3xl flex justify-center hover:text-blue-400 hover:cursor-pointer"
            onClick={() => navigate("/messagenew")}
          />
        </Card>
      </div>
    </div>
  );
}
