import { Card } from "antd";
import { EditOutlined, ReadOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

export function DashboardMessage() {
  let navigate = useNavigate();

  return (
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
  );
}
