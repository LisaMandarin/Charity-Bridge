import { Button, Form, Input, message, Space } from "antd"
import { useUser } from "../lib/context/user"
import { useEffect } from "react"

export function PasswordForgot() {
    const [ form ] = Form.useForm()
    const user = useUser()

    const onFinish = async(values) => {
        await user.passwordRecovery(values.email)
        console.log('Sent')
    }
    
    const onFinishFailed = (errorInfo) => {
        console.error('Failed to send password recovery mail: ', errorInfo)
    }

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        if (user.success) {
            message.success(user.success)
        }
        if (user.error) {
            message.error(user.error)
        }
    }, [user.success, user.error])

    return (
     <Form
        labelCol={{
            span: 8
        }}
        wrapperCol={{
            span: 16
        }}
        className="mx-auto my-4 w-[600px]"
        name="send-email-for-password-recovery"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
     >
        <p className="text-lg p-4">Please enter the email you have registered and the password recovery link will be sent to you.  Check your email after you make a request.</p>
        <Form.Item
            label="Email"
            name="email"
            rules={[
                {
                    required: true,
                    message: "Please input your email"
                },
                {
                    type: "email",
                    message: "Please enter a valid email"
                }
            ]}
        >
            <Input allowClear/>
        </Form.Item>
        <Form.Item
            wrapperCol={{
                offset: 8
            }}
        >
            <Space>
                <Button type="primary" htmlType="submit">Request password recovery</Button>
                <Button onClick={onReset}>Reset</Button>
            </Space>
        </Form.Item>
     </Form>  
    )
}