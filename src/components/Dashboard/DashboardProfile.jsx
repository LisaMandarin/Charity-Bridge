import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useUserProfile } from "../../lib/context/userProfile";
import { useEffect } from "react";
import { useUser } from "../../lib/context/user";
import { LeftArrowBar } from "../utils/ArrowBar";

const { Title } = Typography;

export function DashboardProfile() {
  const user = useUser();
  const [form] = Form.useForm();
  const userProfile = useUserProfile();

  const onFinish = async (values) => {
    try {
      let profileResult;
      if (user?.current?.prefs?.profileId) {
        const documentId = user.current.prefs.profileId;
        profileResult = await userProfile.updateProfile(documentId, values);
      } else {
        profileResult = await userProfile.createProfile(values);
      }

      if (profileResult?.$id) {
        message.success(
          user?.current?.prefs?.profileId
            ? "Your profile is updated"
            : "Your profile is created",
        );
        const updateResult = await user.updatePrefs({
          profileId: profileResult.$id,
        });
        if (!updateResult) {
          console.error("Unable to update user preference ID");
        }
      }
    } catch (error) {
      console.error(error.message);
      message.error("Error while submitting the form");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("form error: ", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (user?.current) {
      form.setFieldsValue({
        userId: user?.current?.$id,
        name: user?.current?.name,
        email: user?.current?.email,
        avatar: user?.current?.prefs.avatarUrl,
      });
    }
  }, [user]);

  useEffect(() => {
    async function fetchProfile() {
      if (user?.current?.prefs?.profileId) {
        const documentId = user.current.prefs.profileId;
        const result = await userProfile.getProfile(documentId);
        if (result) {
          form.setFieldsValue({
            birthday: dayjs(result.birthday),
            gender: result.gender,
            introduction: result.introduction,
            phone: result.phone,
            address: result.address,
          });
        }
      }
    }
    fetchProfile();
  }, [user?.current?.prefs?.profileId, userProfile]);

  return (
    <div className="relative w-full flex flex-col">
      <LeftArrowBar />
      <div className="relative flex flex-col items-center md:w-[600px] mx-auto">
        <Title className="text-center">Manage Profile</Title>
        <Form
          name="profile-form"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          className="w-full md:w-[600px] mx-auto"
        >
          <Form.Item label="userId" name="userId" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item label="name" name="name" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item label="email" name="email" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item label="avatar" name="avatar" hidden>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item label="Birthday" name="birthday">
            <DatePicker maxDate={dayjs()} />
          </Form.Item>
          <Form.Item label="Gender" name="gender">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
              <Radio value="LGBTQ">LGBTQ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Introduction" name="introduction">
            <Input.TextArea maxLength={1000} showCount autoSize />
          </Form.Item>
          <Form.Item label="phone" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="address" name="address">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Go Public
              </Button>
              <Button onClick={onReset}>Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
