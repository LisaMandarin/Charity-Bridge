import { useState } from "react";
import { DashboardPostAdd } from "./DashboardPostAdd";
import { DashboardPostList } from "./DashboardPostList";
import { Segmented, Space } from "antd";
const options = ["My Posts", "Add Post"];
export function DashboardPost({ user }) {
  const [selectedOption, setSelectedOption] = useState("My Posts");
  const onChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <Space direction="vertical" className="w-full flex items-center">
      <Segmented options={options} onChange={onChange} />
      {selectedOption === "My Posts" && <DashboardPostList user={user} />}
      {selectedOption === "Add Post" && <DashboardPostAdd user={user} />}
    </Space>
  );
}
