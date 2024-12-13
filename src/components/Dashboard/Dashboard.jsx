import { useUser } from "../../lib/context/user";
import { Space, Collapse } from "antd";
import { DashboardName } from "./DashboardName";
import { DashboardPassword } from "./DashboardPassword";
import { DashboardAvatar } from "./DashboardAvatar";
import { DashboardEmail } from "./DashboardEmail";
import { DashboardPost } from "./DashboardPost";
import { DashboardProfile } from "./DashboardProfile";
import { DashboardReview } from "./DashboardReview";

export function Dashboard() {
  const user = useUser();
  const items = [
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
    {
      key: "5",
      label: <p className="text-center">Manage Posts</p>,
      children: <DashboardPost user={user} />,
    },
    {
      key: "6",
      label: <p className="text-center">Manage Review</p>,
      children: <DashboardReview />,
    },
  ];

  return (
    <Space direction="vertical" className="w-full p-4 bg-white">
      <DashboardEmail user={user} />
      <Collapse
        items={items}
        accordion={true}
        className="md:w-[700px] mx-auto"
      />
    </Space>
  );
}
