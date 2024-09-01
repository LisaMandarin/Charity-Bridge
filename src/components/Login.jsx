import { Button, Flex, Form, Input, Typography } from "antd"
import { useUser } from "../lib/context/user"
import '../output.css'
const { Title, Link } = Typography


export function Login() {
    const [ form ] = Form.useForm()
    const user = useUser()
    return (
        <>
            <Form
                form={form}
                name="userLogin"
                layout="vertical"
                className="max-w-96 my-0 mx-auto p-6 bg-white"
                onFinish={(values) => user.login(values.email, values.password)}
            >
                <Title underline className="text-center">Login</Title>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input className="w-full" placeholder="Please enter email" allowClear/>
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                >
                    <Input.Password placeholder="Please enter password"/>
                </Form.Item>
                <Form.Item>
                    <Flex justify="center">
                        <Button type="primary" htmlType="submit">Log In</Button>
                    </Flex>
                </Form.Item>
            </Form>
            <div 
                className="max-w-96 my-0 mx-auto text-center"
            >
                Create an account?  <Link href="/register">Sign up</Link> now
            </div>
        </>
    )
}