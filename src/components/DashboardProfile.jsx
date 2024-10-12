import { Button, DatePicker, Form, Input, Radio, Space } from "antd"
import { useUser } from "../lib/context/user" 
import { useEffect } from "react"
import dayjs from "dayjs"
import { useUserProfile } from "../lib/context/userProfile"

export function DashboardProfile() {
    const [ form ] = Form.useForm()
    const { current } = useUser()
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

    useEffect(() => {
        if (current && current.$id) {
            form.setFieldsValue({
                userId: current.$id,
                name: current.name,
                email: current.email,
                avatar: current.prefs.avatarId
            })
        }
    }, [current, form])
    return (
        <div>
            <Form
                name="profile-form"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                className="w-[600px] bg-white"
            >
                <Form.Item label="ID" name="userId" hidden> <Input /> </Form.Item>
                <Form.Item label="Name" name="name" hidden> <Input /> </Form.Item>
                <Form.Item label="Email" name="email" hidden> <Input /> </Form.Item>
                <Form.Item label="Avatar" name="avatar" hidden> <Input /> </Form.Item>
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
                    <Input.TextArea autoSize></Input.TextArea>
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