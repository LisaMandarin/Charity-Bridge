import { Button, DatePicker, Form, Input, InputNumber, Radio, Typography } from "antd"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useUser } from "../lib/context/user";
import { useUserInfos } from "../lib/context/userInfo";
import { UserList } from "./UserList";

dayjs.extend(customParseFormat);
const { Title } = Typography


export function UserForm() {
    const user = useUser();
    const userInfo = useUserInfos()
    const [form] = Form.useForm()
    const onReset = () => form.resetFields()
    const getToday = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth()+1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        const formattedToday = `${year}-${month}-${date}`
        return formattedToday
    }
    
    const getAge = (birthday) => {
        const newBirthday = new Date(birthday)
        const today = new Date()
      
        const yearDiff = today.getFullYear() - newBirthday.getFullYear()
        const notYetBday = () => {
          if (today.getMonth() < newBirthday.getMonth()) {
            return 1
          } else if (today.getMonth() === newBirthday.getMonth() && today.getDate() < newBirthday.getDate()) {
            return 1
          } else {
            return 0
          } 
        }
      
        const age = yearDiff - notYetBday()
        return age
      }
      

    const dateFormat = 'YYYY-MM-DD'

    const onBirthdayChange = (date) => {
        if (date) {
            const age = getAge(date.format(dateFormat))
            form.setFieldsValue({age})
        } else {
            form.setFieldsValue({age: 0})
        }
    }

    return (
        <>
        <Form
            labelCol={{span: 6}}
            wrapperCol={{span: 14}}
            className="w-96 bg-white m-auto p-4"
            form={form}
            name="user-form"
            onFinish={(values) => userInfo.add({
                userID: user.current.$id, ...values
            })}
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
                    onChange={onBirthdayChange}
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
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button onClick={onReset}>Reset</Button>
            </Form.Item>
        </Form>
        <UserList />
        </>
    )
}