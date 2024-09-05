import { message, Button, Flex, Form, Input, Typography, Space } from "antd";
import { useUser } from "../lib/context/user";
const { Title, Link } = Typography;

export function Login() {
  const [form] = Form.useForm();
  const user = useUser();

  const onReset = () => {
    form.resetFields();
  };
  
  const onFinish = async (values) => {
    await user.login(values.email, values.password)
    if (user.error && user.error.message) {
      message.error(user.error.message, 3);
      onReset();
      user.setError(null)
    }
    if (user.success) {
      message.success(user.success, 3)
      user.setSuccess(null)
    }
    
  }

  return (
    <>
      <Form
        form={form}
        name="userLogin"
        layout="vertical"
        className="max-w-96 my-0 mx-auto p-6 bg-white"
        onFinish={onFinish}
      >
        <Title underline className="text-center">
          Login
        </Title>
        <Form.Item label="Email" name="email">
          <Input
            className="w-full"
            placeholder="Please enter email"
            allowClear
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Please enter password" />
        </Form.Item>
        <Form.Item>
          <Flex justify="center">
            <Space>
              <Button type="primary" htmlType="submit">
                Log In
              </Button>
              <Button onClick={onReset}>Reset</Button>
            </Space>
          </Flex>
        </Form.Item>
      </Form>
      <div className="text-center">
        <span
          onClick={() => user.googleLogin()}
          className="cursor-pointer"
        >Google Login</span>
      </div>
      <div className="max-w-96 my-0 mx-auto text-center">
        Create an account? <Link href="/register">Sign up</Link> now
      </div>
    </>
  );
}
