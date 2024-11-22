import { Avatar, Button, Space, Spin, Upload, message, Typography } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAvatarStorage } from "../../lib/context/AvatarStorage";
const { Title } = Typography;

export function DashboardAvatar({ user }) {
  const avatarStorage = useAvatarStorage();
  const [fileList, setFileList] = useState([]);

  const customRequest = async (options) => {
    try {
      const avatarId = user?.current?.prefs?.avatarId;
      if (avatarId) {
        const deleteResult = await avatarStorage.deleteAvatar(avatarId);
        if (!deleteResult) {
          console.error("Failed to delete current avatar");
        }
      }

      const result = await avatarStorage.createAvatar(options.file);
      if (!result) {
        throw new Error("Failed to create avatar");
      }

      const avatarUrl = await avatarStorage.getPreviewURL(result.$id);

      const updatePrefsResult = await user.updatePrefs({
        avatarId: result.$id,
        avatarUrl: avatarUrl,
      });

      if (!updatePrefsResult) {
        throw new Error("Failed to update preferences in user");
      }

      setFileList([
        {
          uid: result.$id,
          name: options.file.name,
          url: avatarUrl,
        },
      ]);
    } catch (error) {
      console.error("Failed to upload avatar: ", error.message);
    }
  };

  const beforeUpload = (file) => {
    const isOver3M = file.size / 1024 / 1024 > 3;
    if (isOver3M) {
      message.error("Image must be smaller than 3MB");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  return (
    <div className="flex justify-center">
      <Space direction="vertical" className="flex items-center">
        <Title>Change Avatar</Title>
        <Spin spinning={avatarStorage.loading}>
          <Space direction="vertical" className="text-center">
            <Avatar
              size={64}
              icon={<UserOutlined />}
              alt={`${user.current.name || "User"}'s avatar`}
              src={user.current.prefs.avatarUrl}
            />
            <Upload
              customRequest={customRequest}
              fileList={fileList}
              showUploadList={false}
              beforeUpload={beforeUpload}
              accept=".png,.jpeg,.webp"
            >
              <Button icon={<UploadOutlined />}>upload avatar</Button>
            </Upload>
          </Space>
        </Spin>
      </Space>
    </div>
  );
}
