import { Button, Form, Input, message } from "antd"
import { useParams } from "react-router-dom"
import { account } from "../lib/appwrite"
import { useEffect, useState } from "react"

export function PasswordRecovery() {
    const { userId, secret } = useParams()
    const [form] = Form.useForm()
    const [ success, setSuccess ] = useState(null)
    const [ error, setError ] = useState(null)

    const onFinish = async(values) => {
        setSuccess(null)
        setError(null)
        try {
            const result = await account.updateRecovery(
                userId,
                secret,
                values.newPassword,
                values.confirmPassword
            )
            console.log('New password updated successfully', result)
            setSuccess('New password updated successfully')
        } catch (err) {
            console.error('Failed to update password', err.message)
            setError('Failed to update password')
        }
    }

    useEffect(() => {
        if (success) {
            message.success(success)
        }
        if (error) {
            message.error(error)
        }
    }, [success, error])

    return (
        <div className="p-4 bg-white w-fit mx-auto">
            <Form
                form={form}
                name="password-recovery"
                labelCol={{
                    span: 8
                }}
                className="w-full md:w-[600px] mx-auto"
                onFinish={onFinish}
            >
                <Form.Item
                    label="New Password"
                    name="newPassword"
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
                    <Input type="password" allowClear/>
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name='confirmPassword'
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
                    <Input type="password" allowClear />
                </Form.Item>
                <Form.Item
                    className="flex justify-end"
                >
                    <Button 
                        htmlType="submit"
                        type="primary"
                    >
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}