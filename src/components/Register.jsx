import { message, Button, Flex, Form, Input, Space, Typography, Spin } from "antd"
import { useUser } from "../lib/context/user"
import { useEffect } from "react"
const { Title } = Typography
import { Link } from "react-router-dom"

export function Register() {
    const [ form ] = Form.useForm()
    const user = useUser()
    const onReset = () => {
        form.resetFields();
    }

    useEffect(() => {
        if (user.error) {
            message.error(user.error, 3)
            onReset()
            user.setError(null)
        }
        if (user.success) {
            message.success(user.success, 3)
            user.setSuccess(null)
        }
    }, [user.error, user.success, user.setError, user.setSuccess])

    if (user.loading) {
        return (
            <Spin size="large" spinning={user.loading} fullscreen />
        )
    }

    return (
        <>
        <Form
            form={form}
            name="userRegister"
            layout="vertical"
            className="w-96 p-6 my-0 mx-auto bg-white"
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
                },
                {
                    min: 1,
                    max: 50,
                    message: 'The username is limited to 50 characters'
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
                Already have an account? <Link to="/login">Sign in</Link>
        </div>
        </>
    )
}