import { useUser } from "../../lib/context/user";
import { DashboardName } from "./DashboardName";
import { DashboardPassword } from "./DashboardPassword";
import { DashboardAvatar } from "./DashboardAvatar";
import { DashboardEmail } from "./DashboardEmail";
import { DashboardPost } from "./DashboardPost";
import { DashboardProfile } from "./DashboardProfile";
import { DashboardReview } from "./DashboardReview";
import { DashboardMessage } from "./DashboardMessage";
import { Space, Collapse, Tabs } from "antd";
const { TabPane } = Tabs;

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
    <Space direction="vertical" className="w-full p-4 bg-white">
      <DashboardEmail user={user} />
      <Tabs defaultActiveKey="1" className="md:w-[700px] mx-auto">
        <TabPane tab={<span className="text-lg">Profile</span>} key="1">
          <Collapse
            items={profileItems}
            accordion={true}
            className="md:w-[700px] mx-auto"
          />
        </TabPane>
        <TabPane tab={<span className="text-lg">Content</span>} key="2">
          <Collapse
            items={contentItems}
            accordion={true}
            className="md:w-[700px] mx-auto"
          />
        </TabPane>
      </Tabs>
    </Space>
  );
}
