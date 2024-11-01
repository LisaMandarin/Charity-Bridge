import { Form, Input, Button, Typography, Space } from "antd"
const { Title } = Typography

export function DashboardPassword({user}) {
    const [ form ] = Form.useForm()
    const onFinish = async(values) => {
        await user.updatePassword(
            values.newPassword,
            values.oldPassword
        )
        form.resetFields()
    }

    return (
        <>
            <Space direction="vertical" className="flex items-center">
                <Title className="text-center">Change Password</Title>
                <Form
                    form={form}
                    name="dashboard-updatePassword"
                    labelCol={{
                        span: 8
                    }}
                    wrapperCol={{
                        span: 16
                    }}
                    className="w-full md:w-[600px] mx-auto"
                    onFinish={onFinish}
                >
                    <Form.Item name="username" hidden>
                        <Input type="text" autoComplete="username"/>
                    </Form.Item>
                    <Form.Item
                        label="Old Password"
                        name="oldPassword"
                    >
                        <Input type="password" allowClear autoComplete="current-password" />
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name='newPassword'
                        rules={[
                            {
                                required: true,
                                message: 'Enter new password'
                            },
                            {
                                min: 8,
                                message: 'Password must be at least 8 characters'
                            },
                            {
                                max: 20,
                                message: "Password can't exceed 20 characters"
                            },
                            {
                                whitespace: true,
                                message: "Password can't only contain whitespace"
                            },
                            {
                                pattern: /^(?=.*[A-Za-z])(?=.*\d)/,
                                message: 'Password must contain both letters and numbers'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input type="password" allowClear autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm new password'
                            },
                            ({ getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Password doesn't match"))
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <Input type="password" allowClear autoComplete="new-password" />
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
            
        </>
    )
}