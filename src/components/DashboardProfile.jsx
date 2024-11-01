import { Button, DatePicker, Form, Input, Radio, Space, Typography } from "antd"
import dayjs from "dayjs"
import { useUserProfile } from "../lib/context/userProfile"
const { Title } = Typography

export function DashboardProfile({user}) {
    const [ form ] = Form.useForm()
    const userProfile = useUserProfile()
    
    const onFinish = async(values) => {
        await userProfile.createForm(values)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        console.error('form error: ', errorInfo)
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <div className="flex flex-col items-center md:w-[600px] mx-auto">
            <Title className="text-center">Manage Profile</Title>
            <Form
                name="profile-form"
                form={form}
                initialValues={{
                    userId: user?.current?.$id,
                    name: user?.current?.name,
                    email: user?.current?.email,
                    avatar: user?.current?.prefs.avatarId
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                className="w-full md:w-[600px] mx-auto"
            >
                <Form.Item label="Birthday" name="birthday">
                    <DatePicker maxDate={dayjs()}/>
                </Form.Item>
                <Form.Item label="Gender" name="gender">
                    <Radio.Group>
                        <Radio value='male'>Male</Radio>
                        <Radio value='female'>Female</Radio>
                        <Radio value="LGBTQ">LGBTQ</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Introduction" name="introduction">
                    <Input.TextArea autoSize />
                </Form.Item>
                <Form.Item label="phone" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="address" name="address">
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{offset: 8}}>
                    <Space>
                        <Button type="primary" htmlType="submit">Go Public</Button>
                        <Button onClick={onReset}>Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
            
        </div>
    )
}