import { useUser } from "../../lib/context/user";
import { DashboardEmail } from "./DashboardEmail";
import { Space, Divider, Typography } from "antd";
import { Link } from "react-router-dom";

export function Dashboard() {
  const user = useUser();

  return (
    <Space
      direction="vertical"
      className="w-full p-4 flex flex-col items-center"
    >
      <DashboardEmail user={user} />
      <Space direction="vertical" className="w-[600px]">
        <Divider orientation="left" orientationMargin="0">
          <Typography.Title level={3}>Profile</Typography.Title>
        </Divider>
        <div className="pl-8">
          <Link to="/dashboard-avatar" className="hover:underline">
            Change Avatar
          </Link>
          <Divider type="vertical" className=" border-gray-500" />
          <Link to="/dashboard-name" className="hover:underline">
            Change Name
          </Link>
          <Divider type="vertical" className="border-gray-500" />
          <Link to="/dashboard-password" className="hover:underline">
            Change Password
          </Link>
          <Divider type="vertical" className="border-gray-500" />
          <Link to="/dashboard-profile" className="hover:underline">
            Edit Profile
          </Link>
        </div>

        <Divider orientation="left" orientationMargin="0">
          <Typography.Title level={3}>Content</Typography.Title>
        </Divider>
        <div className="pl-8">
          <Link to="/dashboard-posts" className="hover:underline">
            Manage Posts
          </Link>
          <Divider type="vertical" className="border-gray-500" />
          <Link to="/dashboard-reviews" className="hover:underline">
            Manage Reviews
          </Link>
          <Divider type="vertical" className="border-gray-500" />
          <Link to="/dashboard-messages" className="hover:underline">
            Manage Messages
          </Link>
        </div>
      </Space>
    </Space>
  );
}
