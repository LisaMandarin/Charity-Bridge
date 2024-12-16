import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Space,
  Spin,
  Upload,
} from "antd";
import { Icon } from "@iconify/react";
import { categoryItems } from "../Header/HeaderCategory";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useProductStorage } from "../../lib/context/productStorage";

export function DashboardPostEdit({ editedPost, form }) {
  // const [ hasChanges, setHasChanges ] = false
  const product = useProductStorage();
  const [uploadBtnVisible, setUploadBtnVisible] = useState(true);
  const [fileIds, setFileIds] = useState([]);
  const [photoURL, setPhotoURL] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  // **************** Handle select options (begin) ****************
  const categoryOptions = () => {
    const options = categoryItems.map((item) => {
      return {
        value: item.text,
        label: (
          <Space>
            <Icon icon={item.icon} />
            <span>{item.text}</span>
          </Space>
        ),
      };
    });
    return options;
  };

  const onCategoryChange = (e) => {
    form.setFieldsValue({
      category: e.trim().toLowerCase(),
    });
  };
  // **************** Handle select options (end) ****************

  // **************** Handle image upload (begin) ****************
  const beforeUpload = (file, fileList) => {
    const isOver3M = file.size / 1024 / 1024 > 3;
    if (isOver3M) {
      message.error("Only 3MB or under is allowed");
      return Upload.LIST_IGNORE;
    }

    const currentFiles = form.getFieldValue("photos") || [];

    if (currentFiles.length + fileList.length > 5) {
      message.error("You can only upload up to 5 files.");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const customRequest = async (options) => {
    try {
      const result = await product.createFile(options.file);

      if (!result?.$id) {
        throw new Error("Failed to create file or missing file ID.");
      }

      const productUrl = await product.getPreviewURL(result.$id);

      setFileIds((current) => [...current, result.$id]);
      setPhotoURL((current) => [...current, productUrl]);

      options.onSuccess(
        {},
        {
          ...options.file,
          uid: result.$id,
          url: productUrl,
        },
      );
      message.success(`${options.file.name} uploaded successfully.`);
    } catch (error) {
      console.error("Failed to custom request", error.message);
      message.error(`Failed to upload ${options.file.name}.  Please try again`);
      options.onError(error, { message: "Custom upload failed." });
    }
  };

  const onPreview = async (file) => {
    try {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    } catch (error) {
      console.error("Failed to generate preview: ", error.message);
      message.error("Unable to preview this file");
    }
  };

  const getBase64 = async (file) => {
    if (!file) {
      console.error("No origin file object available for preview.");
      return Promise.reject(new Error("Invalid file object"));
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onRemove = async (file) => {
    const fileId = file?.xhr?.uid || file?.uid;
    const result = await product.deleteFile(fileId);

    if (result) {
      const indexToRemove = fileIds.indexOf(fileId);

      setFileIds((current) => current.filter((id) => id !== fileId));
      setPhotoURL((current) =>
        current.filter((_, index) => index !== indexToRemove),
      );
      message.success("File removed successfully.");
    }
  };
  // **************** Handle image upload (end) ****************

  const onFinish = async (values) => {
    return values;
  };
  const onFinishFailed = (values) => {
    return values;
  };

  useEffect(() => {
    if (editedPost) {
      console.log("editedPost: ", editedPost);
      setFileIds(editedPost.photos || []);
      setPhotoURL(editedPost.photoURL || []);

      form.setFieldsValue({
        userId: editedPost.userId,
        product: editedPost.product,
        quantity: editedPost.quantity,
        condition: editedPost.condition,
        category: editedPost.category,
        location: editedPost.location,
        description: editedPost.description,
        time: new Date(),
      });
    }
  }, [editedPost, form]);

  useEffect(() => {
    form.setFieldsValue({
      photos: fileIds,
      photoURL: photoURL,
    });
    setUploadBtnVisible(fileIds.length < 5);
  }, [fileIds, photoURL]);

  return (
    <>
      <Form
        name="Edit Post Form"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        // onChange={() => setHasChanges(true)}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        className="w-full md:w-[600px]"
      >
        <Form.Item hidden label="userId" name="userId">
          <Input />
        </Form.Item>
        <Form.Item hidden label="time" name="time">
          <Input />
        </Form.Item>
        <Form.Item hidden label="photoURL" name="photoURL">
          <Input />
        </Form.Item>
        <Form.Item
          label="Product"
          name="product"
          rules={[
            {
              required: true,
              message: "Please enter product name",
            },
          ]}
        >
          <Input allowClear showCount maxLength={40} />
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please enter a valid quantity",
            },
          ]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item label="Condition" name="condition">
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
              message: "Please choose a category",
            },
          ]}
        >
          <Select options={categoryOptions()} onChange={onCategoryChange} />
        </Form.Item>
        <Form.Item label="Location" name="location">
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter product description",
            },
          ]}
        >
          <Input.TextArea autoSize allowClear />
        </Form.Item>
        <Form.Item
          label="Photos"
          name="photos"
          valuePropName="filelist"
          rules={[
            {
              required: true,
              message: "Please upload at least one photo of the product",
            },
          ]}
        >
          <div>
            <Spin spinning={product.loading}>
              <Upload
                multiple
                listType="picture-card"
                beforeUpload={beforeUpload}
                customRequest={customRequest}
                onPreview={onPreview}
                onRemove={onRemove}
                accept="image/png, image/jpeg, image/webp"
                fileList={fileIds.map((id, index) => ({
                  uid: id,
                  name: `Photo ${index + 1}`,
                  url: photoURL[index],
                  status: "done",
                }))}
              >
                {uploadBtnVisible && (
                  <Space direction="vertical">
                    <PlusOutlined />
                    <Button>Upload</Button>
                  </Space>
                )}
              </Upload>
            </Spin>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: setPreviewOpen,
                }}
                src={previewImage}
              />
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  );
}
