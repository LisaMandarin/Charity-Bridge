import { Button, Form, Input, InputNumber, Radio, Select, Space } from "antd"
import Upload from "antd/es/upload/Upload"
import { categoryItems } from "./HeaderCategory"
import { Icon } from '@iconify/react';
import { PlusOutlined } from "@ant-design/icons";

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

    const categoryOptions = () => {
        const options = categoryItems.map(item => {
          return { value: item.text, label: (
            <Space>
                <Icon icon={item.icon}/>
                <span>{item.text}</span>
            </Space>
          )}
        })
        return options
      }
    
    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
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
                    <Input allowClear showCount maxLength={40}/>
                </Form.Item>
                <Form.Item
                    label="Quantity"
                    name="quantity"
                >
                    <InputNumber min={1}/>
                </Form.Item>
                <Form.Item
                    label="Condition"
                    name="condition"
                >
                    <Radio.Group>
                        <Radio value="new">New</Radio>
                        <Radio value="used">Used</Radio>
                    </Radio.Group>
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
                    <Select options={categoryOptions()}/>
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
                    <Input.TextArea autoSize allowClear />
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
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        listType="picture-card"
                        action='/upload.do'
                    >
                        <Space direction="vertical">
                            <PlusOutlined />
                            <Button className="border-0 bg-transparent shadow-none">upload</Button>
                        </Space>
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