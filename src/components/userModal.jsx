import { Modal, Form, Input, DatePicker, InputNumber, Radio, Button, Space } from "antd"
import { useUserInfos } from "../lib/context/userInfo"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getToday, dateFormat, onBirthdayChange, onReset } from "./userFormUtil";
dayjs.extend(customParseFormat);


export function UserModal({isModalOpen, setIsModalOpen}) {
    const [ form ] = Form.useForm()
    const userInfo = useUserInfos()

    const onOK = () => {
        setIsModalOpen(false)
    }
    const onCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Modal
                title="Modify User"
                open={isModalOpen}
                onOk={onOK}
                onCancel={onCancel}
            >
                <Form
                labelCol={{span: 6}}
                form={form}
                name="modified-user"
                onFinish={form.submit}
                className="w-96 mx-auto"
                
            >
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
            </Modal>
        </>
    )
}