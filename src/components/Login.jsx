import { message, Button, Flex, Form, Input, Typography, Space } from "antd";
import { useUser } from "../lib/context/user";
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import { useCallback, useEffect } from "react";

const { Title, Link } = Typography;

export function Login() {
  const [form] = Form.useForm();
  const user = useUser();

  const onReset = useCallback(() => {
    form.resetFields();
  }, [form]);
  
  const onFinish = async (values) => {
    await user.login(values.email, values.password)
  }

  useEffect(() => {
    if (user.error) {
      message.error(user.error, 3);
      onReset();
      user.setError(null)
    }
    if (user.success) {
      message.success(user.success, 3)
      user.setSuccess(null)
    }
  }, [user, onReset])
 
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
        <div className="flex flex-col justify-center items-center">
          <span>Log in via</span>
          <div>
            <Space
              size='large'
            >
              <FaGoogle 
                size='1.5em'
                className="cursor-pointer"
                onClick={() => user.googleLogin()}
              />
              <FaFacebook 
                size='1.5em'
              />
            </Space>
          </div>
          <div>
            <Link href="/passwordforgot">Forgot Password?</Link>
          </div>
        </div>        
      </Form>

      <div className="max-w-96 my-0 mx-auto text-center">
        Create an account? <Link href="/register">Sign up</Link> now
      </div>
    </>
  );
}
