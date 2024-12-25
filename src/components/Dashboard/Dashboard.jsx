import { useUser } from "../../lib/context/user";
import { DashboardName } from "./DashboardName";
import { DashboardPassword } from "./DashboardPassword";
import { DashboardAvatar } from "./DashboardAvatar";
import { DashboardEmail } from "./DashboardEmail";
import { DashboardPost } from "./DashboardPost";
import { DashboardProfile } from "./DashboardProfile";
import { DashboardReview } from "./DashboardReview";
import { DashboardMessage } from "./DashboardMessage";
import { Space, Divider, Typography } from "antd";
import { Link } from "react-router-dom";

export function Dashboard() {
  const user = useUser();
  const profileItems = [
    {
      key: "1",
      label: <p className="text-center">Edit Avatar</p>,
      children: <DashboardAvatar user={user} />,
    },
    {
      key: "2",
      label: <p className="text-center">Edit Name</p>,
      children: <DashboardName user={user} />,
    },
    {
      key: "3",
      label: <p className="text-center">Edit Password</p>,
      children: <DashboardPassword user={user} />,
    },
    {
      key: "4",
      label: <p className="text-center">Edit Profile</p>,
      children: <DashboardProfile user={user} />,
    },
  ];

  const contentItems = [
    {
      key: "1",
      label: <p className="text-center">Manage Posts</p>,
      children: <DashboardPost user={user} />,
    },
    {
      key: "2",
      label: <p className="text-center">Manage Reviews</p>,
      children: <DashboardReview />,
    },
    {
      key: "3",
      label: <p className="text-center">Manage Messages</p>,
      children: <DashboardMessage />,
    },
  ];

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
          <Link to="/">Change Avatar</Link>
          <Divider type="vertical" className=" border-gray-500" />
          <Link to="/">Change Name</Link>
          <Divider type="vertical" className="border-gray-500" />
          <Link to="/">Change Password</Link>
          <Divider type="vertical" className="border-gray-500" />
          <Link to="/">Edit Profile</Link>
        </div>

        <Divider orientation="left" orientationMargin="0">
          <Typography.Title level={3}>Content</Typography.Title>
        </Divider>
        <div className="pl-8">
          <Link to="/">Manage Posts</Link>
          <Divider type="vertical" className="border-gray-500" />
          <Link to="/">Manage Reviews</Link>
          <Divider type="vertical" className="border-gray-500" />
          <Link to="/">Manage Messages</Link>
        </div>
      </Space>
    </Space>
  );
}
