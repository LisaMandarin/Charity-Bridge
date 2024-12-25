import { useState } from "react";
import { DashboardPostAdd } from "./DashboardPostAdd";
import { DashboardPostList } from "./DashboardPostList";
import { Segmented, Space } from "antd";
import { useUser } from "../../lib/context/user";
import { LeftArrowBar } from "../utils/ArrowBar";
const options = ["My Posts", "Add Post"];
export function DashboardPost() {
  const user = useUser();
  const [selectedOption, setSelectedOption] = useState("My Posts");
  const onChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div className="relative flex flex-col w-full">
      <LeftArrowBar />
      <Space direction="vertical" className="w-full flex items-center">
        <Segmented options={options} onChange={onChange} />
        {selectedOption === "My Posts" && <DashboardPostList user={user} />}
        {selectedOption === "Add Post" && <DashboardPostAdd user={user} />}
      </Space>
    </div>
  );
}
