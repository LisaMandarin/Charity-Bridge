import { Button, Form, Input, Space } from "antd"
import Upload from "antd/es/upload/Upload"

export function DashboardPost() {
    const [ form ] = Form.useForm()
    const onFinish = () => {

    }
    const onFinishFailed = () => {

    }
    const onReset = () => {

    }
    
    return (
        <>
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
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Photos"
                    name="photos"
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
                        <Button type="primary">Post</Button>
                        <Button onClick={onReset}>Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    )
}