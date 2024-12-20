import { Button, Form, Input } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMessage } from "../../lib/context/messages";

export function MessageForm({ sender, receiver }) {
  const [form] = Form.useForm();
  const message = useMessage();

  const onFinish = (values) => {
    sendMsg(values);
    form.resetFields();
  };
  const sendMsg = async (values) => {
    try {
      await message.createMessage(values);
    } catch (error) {
      console.error(error.message);
    }
  };
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
          <Input.TextArea size="large" allowClear autoSize />
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
