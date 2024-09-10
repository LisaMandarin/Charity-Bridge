import { useEffect } from "react"
import { useUser } from "../lib/context/user"
import { Button, Form, Input, message } from "antd"

export function Dashboard() {
    const user = useUser()
    const [ form ] = Form.useForm()

    const onFinish = (values) => {
        user.updateName(values.name)
    }
    const onFinishFailed = (error) => console.log('info: ', error)
    
    useEffect(() => {
        if (user.current) {
            form.setFieldsValue({
                id: user.current.$id,
                name: user.current.name,
                email: user.current.email
            })
        }
    }, [user])

    useEffect(() => {
        if (user.error) {
            message.error(user.error, 3)
            user.setError(null)
        }
        if (user.success) {
            message.success(user.success, 3)
            user.setSuccess(null)
        }
    })

    return (
        <div>
            <Form
                name="dashboard-form"
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
                className="w-[600px] mx-auto"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: "Please create a username"
                    },
                    {
                        whitespace: true,
                        message: "No empty username allowed"
                    },
                    {
                        min: 1,
                        max: 50,
                        message: "The username is limited to 50 characters"
                    }
                    ]}
                    hasFeedback
                >
                    <Input allowClear/>
                </Form.Item>
                <Form.Item
                    label='Email'
                    name='email'
                >
                    <Input disabled/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8
                    }}
                >
                    <Button 
                        type="primary"
                        htmlType="submit"
                    >
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}