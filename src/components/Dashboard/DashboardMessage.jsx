import { Segmented } from "antd";
import { EditOutlined, ReadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { MessageList } from "./DashboardMessageList";
import { MessageNew } from "./DashboardMessageNew";

export function DashboardMessage() {
  const [selectedOption, setSelectedOption] = useState("Read Messages");

  const onChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <>
      <Segmented
        options={[
          {
            label: (
              <>
                <ReadOutlined /> Read Messages
              </>
            ),
            value: "Read Messages",
          },
          {
            label: (
              <>
                <EditOutlined /> Create Message
              </>
            ),
            value: "Create Messages",
          },
        ]}
        defaultValue="Read Messages"
        onChange={onChange}
        block
      />
      {selectedOption === "Read Messages" && <MessageList />}
      {selectedOption === "Create Messages" && <MessageNew />}
    </>
  );
}
