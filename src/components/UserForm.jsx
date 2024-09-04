import { Button, DatePicker, Form, Input, InputNumber, Radio, Space, Typography } from "antd"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useUser } from "../lib/context/user";
import { useUserInfos } from "../lib/context/userInfo";
import { getToday, dateFormat, onBirthdayChange, onReset } from "./userFormUtil";
dayjs.extend(customParseFormat);
const { Title } = Typography


export function UserForm() {
    const user = useUser();
    const userInfo = useUserInfos()
    const [form] = Form.useForm()
    
    
    return (
        <div>
            <Form
                labelCol={{span: 6}}
                wrapperCol={{span: 14}}
                className="w-96 bg-white m-auto p-4"
                form={form}
                name="user-form"
                onFinish={(values) => {
                    userInfo.add({
                        userID: user.current.$id, ...values
                    })
                    onReset(form)
                }}
                onFinishFailed={(errorInfo) => console.log('Failed: ', errorInfo)}
            >
                <Title underline className="text-center">User Form</Title>
                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {required: true, message: "Please enter Name"}
                    ]}
                >
                    <Input placeholder="Please enter name"/>
                </Form.Item>
                <Form.Item
                    label="birthday"
                    name="birthday"
                    rules={[
                        { required: true, message: 'Please select birthday' },
                    ]}
                >
                    <DatePicker
                        maxDate={dayjs(getToday(), dateFormat)}
                        onChange={(date) => onBirthdayChange(date, form)}
                    />
                </Form.Item>
                <Form.Item
                    label="age"
                    name="age"
                >
                    <InputNumber disabled />
                </Form.Item>
                <Form.Item
                    label="native"
                    name="native"
                    rules={[
                        {required: true, message: "Please choose native or non-native"}
                    ]}
                >
                    <Radio.Group>
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    label="address"
                    name="address"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{offset: 6}}
                >
                    <Space>
                        <Button type="primary" htmlType="submit">Submit</Button>
                        <Button onClick={() => onReset(form)}>Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}