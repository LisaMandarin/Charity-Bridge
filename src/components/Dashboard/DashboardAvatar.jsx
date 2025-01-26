import { Avatar, Button, Space, Spin, Upload, message, Typography } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAvatarStorage } from "../../lib/context/AvatarStorage";
import { useUser } from "../../lib/context/user";
import { LeftArrowBar } from "../utils/ArrowBar";
import { useUserProfile } from "../../lib/context/userProfile";

const { Title } = Typography;

export function DashboardAvatar() {
  const { createAvatar, deleteAvatar, getPreviewURL, loading } =
    useAvatarStorage();
  const [fileList, setFileList] = useState([]);
  const user = useUser();
  const { updateProfile } = useUserProfile();

  const customRequest = async (options) => {
    try {
      const avatarId = user?.current?.prefs?.avatarId;
      if (avatarId) {
        const deleteResult = await deleteAvatar(avatarId);
        if (!deleteResult) {
          console.error("Failed to delete current avatar");
        }
      }

      const result = await createAvatar(options.file);
      if (!result) {
        throw new Error("Failed to create avatar");
      }

      const avatarUrl = await getPreviewURL(result.$id);

      const [updatePrefsResult, updateProfileResult] = await Promise.all([
        user.updatePrefs({
          avatarId: result.$id,
          avatarUrl: avatarUrl,
        }),
        updateProfile(user?.current?.prefs?.profileId, { avatar: avatarUrl }),
      ]);

      if (updatePrefsResult === null || updatePrefsResult === undefined) {
        throw new Error("Failed to update user preference");
      }

      if (updateProfileResult === null || updateProfileResult === undefined) {
        throw new Error("Failed to update user profile");
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
    <div className="relative flex flex-col w-full justify-center">
      <LeftArrowBar />
      <Space direction="vertical" className="flex items-center">
        <Title>Change Avatar</Title>
        <Spin spinning={loading}>
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
