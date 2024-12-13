import { Form, Input } from "antd";

import { useEffect } from "react";

export function DashboardPostEdit({ editedPost, form }) {
  // const [ hasChanges, setHasChanges ] = false

  const onFinish = (values) => {
    console.log("EditedPost values: ", values);
  };
  const onFinishFailed = (values) => {
    console.error("EditedPost values(failed): ", values);
  };

  useEffect(() => {
    if (editedPost) {
      form.setFieldsValue({
        product: editedPost[0].product,
      });
    }
  }, [editedPost, form]);

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
      </Form>
    </>
  );
}
