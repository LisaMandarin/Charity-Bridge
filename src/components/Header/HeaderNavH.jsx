import { Icon } from "@iconify/react";
import { Space } from "antd";
import { Link } from "react-router-dom";

export function HeaderNavH({ items }) {
  return (
    <div className="grid grid-cols-3 h-20 md:gap-x-12">
      {items.map((item) => (
        <Space key={item.key}>
          <Icon icon={item.icon} />
          <Link to={item.path}>{item.text}</Link>
        </Space>
      ))}
    </div>
  );
}
