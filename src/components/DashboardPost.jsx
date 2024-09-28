import { Button, Form, Image, Input, InputNumber, message, Radio, Select, Space } from "antd"
import Upload from "antd/es/upload/Upload"
import { categoryItems } from "./HeaderCategory"
import { Icon } from '@iconify/react';
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useProductStorage } from "../lib/context/productStorage";
import { useProductInfo } from "../lib/context/productInfo";

export function DashboardPost() {
    const [ form ] = Form.useForm()
    const product = useProductStorage()
    const productInfo = useProductInfo()
    const [ error, setError ] = useState(null)
    const [ success, setSuccess ] = useState(null)
    const [ previewImage, setPreviewImage ] = useState('')
    const [ previewOpen, setPreviewOpen ] = useState(false)
    const [ fileList, setFileList ] = useState([])
    const [ fileIds, setFileId ] = useState([])


    const onFinish = async(values) => {
        setSuccess(null)
        console.log('form values: ', values)
        const result = await productInfo.createForm(values)
        console.log('result(onFinish)', result)
        setSuccess('Your product is posted')
        form.resetFields()
    }
    const onFinishFailed = (errorInfo) => {
        setError(null)
        console.log('form errorInfo: ', errorInfo)
        setError('Failed to post')
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
    

    const onCategoryChange = (e) => {
        form.setFieldsValue({
            category: e.toLowerCase()
        })
    }

    const beforeUpload = (file) => {
        console.log('file(beforeUpload: ' , file)
        setError(null)
        const isOver3M = file.size / 1024 / 1024 > 3
        if (isOver3M) {
            setError('Only 3MB or under is allowed')
            return Upload.LIST_IGNORE;
        }
        return true
    }

    const customRequest = async(options) => {
        try {
            const result = await product.createFile(options.file)
            console.log('success: ', result)

            const productUrl = await product.getPreviewURL(result.$id)

            setFileId(current => [...current, result.$id])
            setFileList(current => [
                ...current,
                {
                    uid: result.$id,
                    name: options.file.name,
                    status: "done",
                    url: productUrl
                }
            ])
        } catch (err) {
            console.error('Failed to custom request', err.message)
        }
    }

    const onPreview = async(file) => {
        console.log('onPreivew file: ', file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }

    const onRemove = async(file) => {
        await product.deleteFile(file.uid)
        const newFileList = fileList.filter(f => f.uid !== file.uid)
        setFileList(newFileList)
    }

    const getBase64 = (file) => 
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error)
        })

    useEffect(() => {
        form.setFieldsValue({
            photos: fileIds
        })
    }, [fileIds])

    useEffect(() => {
        if (error) {
            message.error(error)
        }
        if (success) {
            message.success(success)
        }
    }, [error, success])

    useEffect(() => {
        console.log('fileList: ', fileList)
    }, [fileList])

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
                    <Select options={categoryOptions()} onChange={onCategoryChange}/>
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
                >                    
                    <Upload
                        multiple
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        customRequest={customRequest}
                        onPreview={onPreview}
                        onRemove={onRemove}
                        fileList={fileList}
                    >
                        <Space direction="vertical">
                            <PlusOutlined />
                            <Button>Upload</Button>
                        </Space>
                    </Upload>
                    {previewImage && (
                        <Image 
                            wrapperStyle={{ display: 'none'}}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible => setPreviewOpen(visible)),
                                afterOpenChange: visible => !visible && setPreviewImage('')
                            }}
                            src={previewImage}
                        />
                    )}
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