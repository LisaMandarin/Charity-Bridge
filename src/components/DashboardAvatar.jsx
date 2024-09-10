import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export function DashboardAvatar() {

    return (
        <div className="text-center">
            <Avatar size={64} icon={<UserOutlined />} />
        </div>
    )
}