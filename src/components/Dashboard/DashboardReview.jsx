import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

export function DashboardReview() {
  const [form] = useForm();
  const onFinish = (values) => {
    console.log("onFinish: ", values);
  };
  return (
    <div>
      <Form
        name="Review form"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        className="w-full md:w-[600px] mx-auto"
        onFinish={onFinish}
      >
        <Form.Item
          label="Donor"
          name="donor"
          rules={[
            {
              required: true,
              message: "Donor field is required.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Receiver"
          name="receiver"
          rules={[
            {
              required: true,
              message: "Donor field is required.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product"
          name="product"
          rules={[
            {
              required: true,
              message: "Donor field is required.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Stars"
          name="stars"
          rules={[
            {
              required: true,
              message: "Donor field is required.",
            },
            {
              min: 1,
              max: 5,
              message: "Please rate between 1 and 5.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Review"
          name="review"
          rules={[
            {
              required: true,
              message: "Donor field is required.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}
