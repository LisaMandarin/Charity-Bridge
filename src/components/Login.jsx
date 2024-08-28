import { Button, Flex, Form, Input, Typography } from "antd"
import { useUser } from "../lib/context/user"
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
                style={{
                    maxWidth: 400,  
                    margin: "0 auto", 
                    padding: '24px', 
                    backgroundColor: "white"
                }}
                onFinish={(values) => user.login(values.email, values.password)}
            >
                <Title underline style={{textAlign: "center"}}>Login</Title>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input style={{width: "100%"}} placeholder="Please enter email" allowClear/>
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
            <div style={{maxWidth: 400, margin: "0 auto", textAlign: "center"}}>
                Create an account?  <Link href="/register">Sign up</Link> now
            </div>
        </>
    )
}