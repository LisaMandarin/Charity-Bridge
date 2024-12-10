import { Button, Form, Input } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router-dom";
import { useMessage } from "../../lib/context/messages";

export function MessageBoard() {
  const [form] = Form.useForm();
  const { sender, receiver } = useParams();
  const message = useMessage();

  const onFinish = (values) => {
    console.log("values: ", values);
    sendMsg(values);
    form.resetFields();
  };

  const sendMsg = async (values) => {
    await message.createMessage(values);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem-3.5rem)] w-4/5 md:w-[600px] lg:w-[1000px] shadow-md">
      <div className="flex-grow">message</div>
      <div>
        <Form
          className="flex flex-row gap-2 w-full p-2"
          name="messageForm"
          form={form}
          onFinish={onFinish}
          initialValues={{
            senderId: sender,
            receiverId: receiver,
            read: false,
          }}
        >
          <Form.Item hidden name="senderId">
            <Input />
          </Form.Item>
          <Form.Item hidden name="receiverId">
            <Input />
          </Form.Item>
          <Form.Item hidden name="read">
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
    </div>
  );
}
