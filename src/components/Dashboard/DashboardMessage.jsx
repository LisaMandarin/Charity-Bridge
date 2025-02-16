import { Card } from "antd";
import { EditOutlined, ReadOutlined } from "@ant-design/icons";
import { MessageList } from "./DashboardMessageList";
import { useNavigate } from "react-router-dom";
import { LeftArrowBar } from "../utils/ArrowBar";

export function DashboardMessage() {
  let navigate = useNavigate();

  return (
    <div className="relative flex flex-col w-full">
      <LeftArrowBar />
      <div className="flex flex-row gap-4 justify-center">
        <MessageList />
      </div>
    </div>
  );
}
