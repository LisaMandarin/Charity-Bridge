import { Button, Form, Image, Input, InputNumber, message, Radio, Select, Space } from "antd"
import Upload from "antd/es/upload/Upload"
import { categoryItems } from "./HeaderCategory"
import { Icon } from '@iconify/react';
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useProductStorage } from "../lib/context/productStorage";
import { useProductInfo } from "../lib/context/productInfo";
import { useNavigate } from "react-router-dom";

export function DashboardPost({user}) {
    const now = new Date()
    const [ form ] = Form.useForm()
    const product = useProductStorage()
    const productInfo = useProductInfo()
    const [ userId, setUserId ] = useState('')
    const [ fileIds, setFileIds ] = useState([])
    const [ previewImage, setPreviewImage ] = useState('')
    const [ previewOpen, setPreviewOpen ] = useState(false)
    const [ uploadBtnVisible, setUploadBtnVisible ] = useState(true)
    const navigate = useNavigate()

    const onFinish = async() => {
        if (!userId || !now) {
            console.error("User ID or time is missing.")
            return
        }

        try {
            form.setFieldsValue({
                userId,
                time: now,
            })

            const updatedValues = form.getFieldsValue(true)
            await productInfo.createForm(updatedValues)

            message.success("Your product is posted.", 2, ()=> {
                navigate("/")
            })

            form.resetFields()
            setFileIds([])

        } catch (error) {
            console.error("Failed onFinish: ", error.message)
            message.error("Something went wrong when submitting the form.")
        }
        
    }

    const onFinishFailed = (errorInfo) => {
        console.error('form errorInfo: ', errorInfo)
        message.error("Failed to post form.")
    }

    const onReset = () => {
        form.resetFields()
        setFileList([])
        setFileIds([])
    }

// **************** Handle select options ****************
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
            category: e.trim().toLowerCase()
        })
    }

// **************** Handle imagge upload ****************
    const beforeUpload = (file, fileList) => {
        const isOver3M = file.size / 1024 / 1024 > 3
        if (isOver3M) {
            message.error('Only 3MB or under is allowed')
            return Upload.LIST_IGNORE;
        }

        const currentFiles = form.getFieldValue('photos') || []
        
        if (currentFiles.length + fileList.length > 5) {
            message.error("You can only upload up to 5 files.")
            return Upload.LIST_IGNORE;
        }
        return true
    }

    const customRequest = async(options) => {
        try {
            const result = await product.createFile(options.file)
    
            if (!result?.$id) {
                throw new Error("Failed to create file or missing file ID.")
            }

            const productUrl = await product.getPreviewURL(result.$id)

            setFileIds(current => [...current, result.$id])
            
            options.onSuccess({}, {
                ...options.file, 
                uid: result.$id, 
                url: productUrl
            })
            message.success(`${options.file.name} uploaded successfully.`)

        } catch (error) {
            console.error('Failed to custom request', error.message)
            message.error(`Failed to upload ${options.file.name}.  Please try again`)
            options.onError(error, {message: "Custom upload failed."})
        }
    }

    const onPreview = async(file) => {
        try {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj)
            }
            setPreviewImage(file.url || file.preview)
            setPreviewOpen(true)

        } catch (error) {
            console.error("Failed to generate preview: ", error.message)
            message.error("Unable to preview this file")
        }
    }

    const getBase64 = async (file) => {
        if (!file) {
            console.error("No origin file object available for preview.")
            return Promise.reject(new Error("Invalid file object"))
        }
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error)
        })
    }

    const onRemove = async(file) => {
        const result = await product.deleteFile(file.xhr.uid)
        
        if (result) {
            setFileIds(current => [
                current.filter(id => {
                    id !== file.uid
                })
            ])
            message.success("File removed successfully.")
        }
    }

    useEffect(() => {
        form.setFieldsValue({
            photos: fileIds
        })
        setUploadBtnVisible(fileIds.length < 5)
    }, [fileIds])

    useEffect(() => {
        if (user?.current?.$id) {
            setUserId(user.current.$id)
        }
    }, [user?.current?.$id])

    return (
        <div className="md:w-[600px]">
            <Form
                name="post-form"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
            >
                <Form.Item hidden label="userId" name="userId">
                    <Input />
                </Form.Item>
                <Form.Item hidden label="time" name="time">
                    <Input />
                </Form.Item>
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
                    rules={[
                        {
                            required: true,
                            message: "Please enter a valid quantity"
                        }
                    ]}
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
                    valuePropName="fileList"
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
                        accept=".png,.jpeg,.webp"
                    >
                        {uploadBtnVisible && (
                            <Space direction="vertical">
                                <PlusOutlined />
                                <Button>Upload</Button>
                            </Space>
                        )}
                    </Upload>
                    {previewImage && (
                        <Image 
                            wrapperStyle={{ display: 'none'}}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: setPreviewOpen,
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