import {
  Button,
  Checkbox,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Space,
  Spin,
  Typography,
} from "antd";
import Upload from "antd/es/upload/Upload";
import { categoryItems } from "../Header/HeaderCategory";
import { Icon } from "@iconify/react";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useProductStorage } from "../../lib/context/productStorage";
import { useProductInfo } from "../../lib/context/productInfo";
import { useNavigate } from "react-router-dom";
import { useUserProfile } from "../../lib/context/userProfile";
const { Title } = Typography;

export function DashboardPostAdd({ user }) {
  const now = new Date();
  const [form] = Form.useForm();
  const product = useProductStorage();
  const productInfo = useProductInfo();
  const userProfile = useUserProfile();
  const [userId, setUserId] = useState("");
  const [fileIds, setFileIds] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [uploadBtnVisible, setUploadBtnVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [profileValues, setProfileValues] = useState({});
  const navigate = useNavigate();

  const onFinish = async () => {
    if (!userId || !now) {
      console.error("User ID or time is missing.");
      return;
    }

    try {
      /*  ********** beginning of handling profile ********** */
      let profileResult;

      if (user?.current?.prefs?.profileId) {
        const documentId = user.current.prefs.profileId;
        profileResult = await userProfile.updateProfile(
          documentId,
          profileValues
        );
      } else {
        profileResult = await userProfile.createProfile(profileValues);
      }

      if (profileResult?.$id) {
        message.success(
          user?.current?.prefs?.profileId
            ? "Your profile is updated"
            : "Your profile is created"
        );
        const updateResult = await user.updatePrefs({
          profileId: profileResult.$id,
        });
        if (!updateResult) {
          console.error("Unable to update user profile ID ");
        }
      }
      /*  ********** end of handling profile ********** */

      // fileIds are the uploaded photos
      if (fileIds && fileIds.length > 0) {
        const photoURL = await getPhotoURL(fileIds);
        form.setFieldsValue({
          userId,
          time: now,
          photoURL,
        });
      }

      const updatedValues = form.getFieldsValue(true);
      delete updatedValues.openProfile;
      await productInfo.createForm(updatedValues);

      message.success("Your product is posted.", 2, () => {
        setIsSubmitted(true);
        navigate("/");
      });

      form.resetFields();
      setFileIds([]);
    } catch (error) {
      console.error("Failed onFinish: ", error.message);
      message.error("Something went wrong when submitting the form.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.error("form errorInfo: ", errorInfo);
    message.error("Failed to post form.");
  };

  const onReset = async () => {
    try {
      const result = await deleteAllFiles(fileIds);
      if (result) {
        form.resetFields();
        setFileIds([]);
        setHasChanges(false);
      }
    } catch (error) {
      console.error("Failed to reset: ", error.message);
      message.error("Failed to delete all files during reset.");
    }
  };

  const getPhotoURL = async (fileIds) => {
    if (!fileIds || fileIds.length === 0) {
      console.error("Unable to retrieve file IDs");
      return [];
    }
    try {
      const photoURL = await Promise.all(
        fileIds.map(async (id) => {
          return await product.getPreviewURL(id);
        })
      );

      return photoURL;
    } catch (error) {
      console.error("Failed to get photo URL: ", error.message);
      return [];
    }
  };

  const deleteAllFiles = async (fileIds) => {
    if (!fileIds || fileIds.length === 0) {
      console.error("File IDs are not valid");
      return;
    }
    try {
      await Promise.all(
        fileIds.map(async (id) => {
          const result = await product.deleteFile(id);

          if (!result) {
            throw new Error(`Can't delete file with ID: ${id}`);
          }
        })
      );
      return true;
    } catch (error) {
      console.error("Failed to delete all files: ", error.message);
      message.error("Failed to delete the uploaded files");
      return false;
    }
  };

  // **************** Handle select options ****************
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

  // **************** Handle imagge upload ****************
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

      options.onSuccess(
        {},
        {
          ...options.file,
          uid: result.$id,
          url: productUrl,
        }
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
    const result = await product.deleteFile(file.xhr.uid);

    if (result) {
      setFileIds((current) => current.filter((id) => id !== file.xhr.uid));
      message.success("File removed successfully.");
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      photos: fileIds,
    });
    setUploadBtnVisible(fileIds.length < 5);
  }, [fileIds]);

  useEffect(() => {
    if (user?.current?.$id) {
      setUserId(user.current.$id);
      setProfileValues({
        userId: user.current.$id,
        name: user.current.name,
        email: user.current.email,
        avatar: user.current.prefs.avatarUrl,
      });
    }
  }, [user?.current?.$id]);

  useEffect(() => {
    const handleBeforeunload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    if (!isSubmitted && (hasChanges || fileIds.length > 0)) {
      window.addEventListener("beforeunload", handleBeforeunload);
    }
    return () => {
      window.removeEventListener("beforeunload", handleBeforeunload);
    };
  }, [fileIds, isSubmitted, hasChanges]);

  return (
    <div className="flex flex-col items-center md:w-[600px] mx-auto">
      <Title className="text-center">Add Post</Title>
      <Form
        name="post-form"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onChange={() => setHasChanges(true)}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        className="w-full"
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
        <Form.Item
          name="openProfile"
          label=" "
          colon={false}
          valuePropName="checked"
          rules={[
            { required: true, message: "You must agree to show your profile" },
          ]}
        >
          <Checkbox>Show your profile</Checkbox>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
          }}
        >
          <Space>
            <Button type="primary" htmlType="submit">
              Post
            </Button>
            <Button onClick={onReset}>Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
