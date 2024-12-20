import { Avatar, Button, Form, Input } from "antd";
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
    <div className="flex flex-col max-h-[calc(100vh-6rem-3.5rem)] overflow-hidden w-4/5 md:w-[600px] lg:w-[1000px] shadow-md">
      <div className="flex-grow overflow-scroll">
        {/* other bubble */}
        <div className="p-2 flex flex-col">
          <div className="inline-flex gap-2">
            <Avatar className="self-end">U</Avatar>
            <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-900 text-white rounded-chat-bubble">
              Blah Blah Blah
            </div>
          </div>
          <span className="text-gray-400 text-xs self-start">08:55</span>
        </div>

        {/* own bubble */}
        <div className="p-2 flex flex-col">
          <div className="inline-flex flex-row-reverse gap-2">
            <Avatar className="self-end">U</Avatar>
            <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-100 text-black rounded-chat-bubble">
              Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
              Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
              Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
            </div>
          </div>
          <span className="text-gray-400 text-xs self-end">08:55</span>
        </div>

        <div className="p-2 flex flex-col">
          <div className="inline-flex flex-row-reverse gap-2">
            <Avatar className="self-end">U</Avatar>
            <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-100 text-black rounded-chat-bubble">
              Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
              Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
              Blah Blah Blah Blah Blah Blah Blah Blah Blah Blah
            </div>
          </div>
          <span className="text-gray-400 text-xs self-end">08:55</span>
        </div>

        <div className="p-2 flex flex-col">
          <div className="inline-flex gap-2">
            <Avatar className="self-end">U</Avatar>
            <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-900 text-white rounded-chat-bubble">
              Blah Blah Blah
            </div>
          </div>
          <span className="text-gray-400 text-xs self-start">08:55</span>
        </div>

        <div className="p-2 flex flex-col">
          <div className="inline-flex gap-2">
            <Avatar className="self-end">U</Avatar>
            <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-900 text-white rounded-chat-bubble">
              Blah Blah Blah
            </div>
          </div>
          <span className="text-gray-400 text-xs self-start">08:55</span>
        </div>

        <div className="p-2 flex flex-col">
          <div className="inline-flex gap-2">
            <Avatar className="self-end">U</Avatar>
            <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-900 text-white rounded-chat-bubble">
              Blah Blah Blah
            </div>
          </div>
          <span className="text-gray-400 text-xs self-start">08:55</span>
        </div>

        <div className="p-2 flex flex-col">
          <div className="inline-flex gap-2">
            <Avatar className="self-end">U</Avatar>
            <div className="min-w-[60px] max-w-[700px] px-3 py-4 mx-1 my-2 border border-1 border-solid bg-pink-900 text-white rounded-chat-bubble">
              Blah Blah Blah
            </div>
          </div>
          <span className="text-gray-400 text-xs self-start">08:55</span>
        </div>
      </div>

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
    </div>
  );
}
