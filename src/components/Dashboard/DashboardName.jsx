import { Form, Button, Input, Space, Typography } from "antd"
import { useEffect } from "react"
const { Title } = Typography

export function DashboardName({user}) {
    const [ form ] = Form.useForm()
    const onFinish = async(values) => {
        await user.updateName(values.name)
    }

    useEffect(() => {
        if (user.current) {
            form.setFieldsValue({
                name: user.current.name,
            })
        }
    }, [user])

    return (
        <div>
            <Space direction="vertical" className="flex items-center">
                <Title>Change Name</Title>
                <Form
                    name="dashboard-updateName"
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    className="w-full md:w-[600px] mx-auto"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: "Please enter a username"
                        },
                        {
                            whitespace: true,
                            message: "No empty username allowed"
                        },
                        {
                            max: 50,
                            message: "The username is limited to 50 characters"
                        }
                        ]}
                        hasFeedback
                    >
                        <Input allowClear/>
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
            </Space>
            
        </div>
    )
}