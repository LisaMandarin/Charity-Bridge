import { Button, Form, Input } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMessage } from "../../lib/context/messages";
import { useUserProfile } from "../../lib/context/userProfile";
import { useEffect, useState } from "react";

export function MessageForm({ sender, receiver }) {
  const [form] = Form.useForm();
  const { createMessage } = useMessage();
  const { getProfiles } = useUserProfile();
  const [receiverName, setReceiverName] = useState();

  const onFinish = (values) => {
    sendMsg(values);
    form.resetFields();
  };
  const sendMsg = async (values) => {
    try {
      await createMessage(values);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    async function fetchName() {
      const result = await getProfiles();
      const name = result.find((profile) => profile.userId === receiver);
      console.log("name: ", name);
      setReceiverName(name);
    }

    fetchName();
  }, [receiver]);
  return (
    <div>
      <Form
        className="flex flex-row gap-2 w-full p-2"
        name="messageForm"
        form={form}
        onFinish={onFinish}
        initialValues={{
          ownId: sender,
          otherId: receiver,
        }}
      >
        <Form.Item hidden name="ownId">
          <Input />
        </Form.Item>
        <Form.Item hidden name="otherId">
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-grow mb-0"
          label={null}
          name="messageContent"
          rules={[
            {
              required: true,
              message: "Say something!!",
            },
          ]}
        >
          <Input.TextArea
            size="large"
            allowClear
            autoSize
            placeholder={`Say something to ${receiverName?.name}`}
          />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            htmlType="submit"
            className="h-10 border-0"
            icon={<Icon icon="iconoir:send-solid" width={30} />}
          ></Button>
        </Form.Item>
      </Form>
    </div>
  );
}
