import { Modal, Form, Input, DatePicker, InputNumber, Radio, Button, Space } from "antd"
import { useUserInfos } from "../lib/context/userInfo"
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getToday, dateFormat, onBirthdayChange, onReset } from "./userFormUtil";
import { useEffect } from "react";
dayjs.extend(customParseFormat);


export function UserModal({isModalOpen, setIsModalOpen, modifiedUser}) {
    const [ form ] = Form.useForm()
    const userInfos = useUserInfos()

    useEffect(() => {
        if (modifiedUser) {
            form.setFieldsValue({
                documentId: modifiedUser.documentId,
                name: modifiedUser.name,
                birthday: dayjs(modifiedUser.birthday, dateFormat),
                age: modifiedUser.age,
                native: modifiedUser.native,
                address: modifiedUser.address
            })
        }
    }, [modifiedUser, form])
    const onOK = () => {
        form.submit()
        setIsModalOpen(false)
        form.validateFields()
        const values = form.getFieldsValue()
        const { documentId, ...updatedValues } = values
        userInfos.update(documentId, updatedValues)
        
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
                okText='Update'
                onCancel={onCancel}
            >
                <Form
                labelCol={{span: 6}}
                form={form}
                name="modified-user"
                className="w-96 mx-auto"
                
            >
                <Form.Item
                    name='documentId'
                    hidden
                >
                    <Input />
                </Form.Item>

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
            </Form>
            </Modal>
        </>
    )
}