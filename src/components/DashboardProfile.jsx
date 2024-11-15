import { Button, DatePicker, Form, Input, message, Radio, Space, Typography } from "antd"
import dayjs from "dayjs"
import { useUserProfile } from "../lib/context/userProfile"
import { useEffect } from "react"

const { Title } = Typography

export function DashboardProfile({user}) {
    const [ form ] = Form.useForm()
    const userProfile = useUserProfile()
    
    const onFinish = async(values) => {
        console.log("values: ", values)
        try {
            const result = await userProfile.createProfile(values)
            
            if (result.$id){
                message.success("Your profile is created.")
                const result = await user.updatePrefs({ profileId: result.$id})
                if (!result) {
                    throw new Error("Unable to update user preference")
                }
            }
            form.resetFields()

        } catch (error) {
            console.error(error.message)
            message.error("Unable to update your profile")
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.error('form error: ', errorInfo)
    }

    const onReset = () => {
        form.resetFields()
    }

    useEffect(() => {
        if (user?.current) {
            form.setFieldsValue({
                userId: user?.current?.$id,
                name: user?.current?.name,
                email: user?.current?.email,
                avatar: user?.current?.prefs.avatarUrl
            })
        }

        async function fetchProfile() {
            if (user?.current?.prefs?.profileId) {
                const documentId = user.current.prefs.profileId
                const result = await userProfile.getProfile(documentId)
                if (result) {
                    form.setFieldsValue({
                        birthday: dayjs(result.birthday),
                        gender: result.gender,
                        introduction: result.introduction,
                        phone: result.phone,
                        address: result.address,
                    })
                }
            }
        }
        fetchProfile()

    }, [user])


    return (
        <div className="flex flex-col items-center md:w-[600px] mx-auto">
            <Title className="text-center">Manage Profile</Title>
            <Form
                name="profile-form"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                className="w-full md:w-[600px] mx-auto"
            >
                <Form.Item label="userId" name="userId" hidden><Input type="hidden"/></Form.Item>
                <Form.Item label="name" name="name" hidden><Input type="hidden"/></Form.Item>
                <Form.Item label="email" name="email" hidden><Input type="hidden"/></Form.Item>
                <Form.Item label="avatar" name="avatar" hidden><Input type="hidden"/></Form.Item>
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