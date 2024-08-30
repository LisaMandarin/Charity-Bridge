import { Button, Flex, Form, Input, Space, Typography } from "antd"
import { useUser } from "../lib/context/user"
const { Title, Link } = Typography

export function Register() {
    const [ form ] = Form.useForm()
    const user = useUser()
    const onReset = () => {
        form.resetFields();
    }
    return (
        <>
        <Form
            form={form}
            name="userRegister"
            layout="vertical"
            style={{
                maxWidth: 400, 
                padding: "24px", 
                margin: '0 auto',
                backgroundColor: "white"
            }}
            onFinish={(values) => user.register(values.email, values.password, values.username)}
            scrollToFirstError
        >
            <Title 
                underline
                style={{textAlign: 'center'}}
            >Welcome</Title>
            <Form.Item
                label="Username"
                name="username"
                rules={[
                {
                    required: true,
                    message: "Please create a username"
                },
                {
                    whitespace: true,
                    message: 'No empty username allowed'
                }
                ]}
                hasFeedback    
            >
                <Input allowClear />
            </Form.Item>
            <Form.Item
                label="E-mail"
                name="email"
                rules={[
                {
                    type: 'email',
                    message: 'Please enter a valid E-mail'    
                },
                {
                    required: true,
                    message: "Please enter your E-mail",
                },
                ]}
                hasFeedback
                
            >
                <Input allowClear />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                validateFirst
                rules={[
                {
                    required: true,
                    message: 'Please enter your password'
                },
                {
                    min: 8,
                    max: 20,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)/,
                    whitespace: true,
                    message: "Password must be 8-20 characters, with letters and numbers."
                },
                ]}
                hasFeedback
                dependencies={['password']}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                label="Confirm Password"
                name="confirm"
                hasFeedback
                dependencies={['password']}
                rules={[
                {
                    required: true,
                    message: 'Please confirm your password'
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                        }
                        return Promise.reject(
                            new Error('Password not matched')
                        )
                    }
                })
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Flex justify="center">
                    <Space>
                        <Button type="primary" htmlType="submit">Sign Up</Button>
                        <Button onClick={onReset}>Reset</Button>
                    </Space>
                </Flex>
            </Form.Item>
        </Form>
        <div style={{maxWidth: 400, margin: '0 auto', textAlign: "center"}}>
                Already have an account? <Link href="/login">Sign in</Link>
        </div>
        </>
    )
}