import { Button, Form, Input, Space } from "antd"
import Upload from "antd/es/upload/Upload"

export function DashboardPost() {
    const [ form ] = Form.useForm()
    const onFinish = (values) => {
        console.log('form values: ', values)
    }
    const onFinishFailed = (errorInfo) => {
        console.log('form errorInfo: ', errorInfo)
    }
    const onReset = () => {
        form.resetFields()
    }
    
    return (
        <div className="md:w-[600px]">
            <Form
                name="post-form"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 16
                }}
            >
                <Form.Item
                    label="Product"
                    name="product"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter product name'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Quantity"
                    name="quantity"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Condition"
                    name="condition"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Category"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose a category'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Location"
                    name="location"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter product description'
                        }
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Photos"
                    name="photos"
                    rules={[
                        {
                            required: true,
                            message: 'Please upload at least one photo of the product'
                        }
                    ]}
                >
                    <Upload
                        listType="picture-card"
                    >
                        <Button>upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8
                    }}
                >
                    <Space>
                        <Button type="primary" htmlType="submit">Post</Button>
                        <Button onClick={onReset}>Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    )
}