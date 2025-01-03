import { useEffect, useState } from "react";
import { useProductInfo } from "../../lib/context/productInfo";
import { useProductStorage } from "../../lib/context/productStorage";
import { DashboardPostEdit } from "./DashboardPostEdit";
import { Query } from "appwrite";
import dayjs from "dayjs";
import { Button, message, Modal, Space, Spin, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
const { Title } = Typography;

export function DashboardPostList({ user }) {
  const productInfo = useProductInfo();
  const productStorage = useProductStorage();
  const [userId, setUserId] = useState();
  const [posts, setPosts] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [form] = useForm(); // used in Modal

  /* *********** beginning of Modal *********** */
  const [isModalOpen, setIsModalOpen] = useState(false); // open dialogue box when edit post is clicked
  const [editedPost, setEditedPost] = useState(null); // used in Modal
  /* *********** end of Modal *********** */

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space direction="horizontal" size="middle">
          <Button onClick={() => editPost(record)}>Edit</Button>
          <Button onClick={() => deletePost(record)}>Delete</Button>
          <Button onClick={() => viewPost(record)}>View</Button>
        </Space>
      ),
    },
  ];

  const editPost = (record) => {
    if (!record) {
      console.error("Record is missing.");
      return;
    }

    setEditedPost(record);
  };

  const deletePost = async (record) => {
    try {
      if (!record) {
        console.error("Record is missing.");
      }

      const documentResult = await productInfo.deleteForm(record.key);
      if (!documentResult) {
        console.error("Failed to delete document");
        return;
      }
      const fileResult = await Promise.all(
        record.photos.map(
          async (photo) => await productStorage.deleteFile(photo),
        ),
      );

      const allFilesDeleted = fileResult.every((result) => result === true);
      if (!allFilesDeleted) {
        console.error("Failed to delete some photos");
        message.error("Failed to delete some photos");
        return;
      }

      message.success("The post is deleted");
      setPosts((current) => current.filter((post) => post.$id !== record.key));
    } catch (error) {
      console.error(
        "An error occurred while deleting the post: ",
        error.message,
      );
      message.error("An error occurred while deleting the post");
    }
  };

  const viewPost = (record) => {
    if (!record || !record.id) {
      console.error("Invalid record: ID missing");
      return;
    }

    const url = `/product/${record.id}`;
    window.open(url, "_blank");
  };
  /* *********** beginning of Modal *********** */
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);

    form
      .validateFields()
      .then(async (values) => {
        const result = await productInfo.updateDocument(editedPost.id, values);

        setPosts((current) =>
          current.map((post) =>
            post.$id === result.$id ? { ...post, ...result } : post,
          ),
        );
      })
      .catch((errorInfo) => console.error("Form errors: ", errorInfo));

    setEditedPost(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditedPost(null);
  };

  useEffect(() => {
    if (editedPost) {
      showModal();
    }
  }, [editedPost]);
  /* *********** end of Modal *********** */

  useEffect(() => {
    if (user?.current?.$id) {
      setUserId(user.current.$id);
    }
  }, [user?.current?.$id]);

  useEffect(() => {
    async function fetchPosts() {
      // fetch posts belonging to this user ID
      const query = Query.equal("userId", [userId]);
      const result = await productInfo.listDocumentsByQuery(query);
      if (!result) return;
      setPosts(result);
    }
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  useEffect(() => {
    if (posts) {
      const data = posts.map((post) => ({
        key: post.$id,
        product: post.product,
        time: dayjs(post.time).format("MM/DD/YYYY"),
        id: post.$id,
        category: post.category,
        condition: post.condition,
        description: post.description,
        location: post.location,
        photoURL: post.photoURL,
        photos: post.photos,
        quantity: post.quantity,
        userId: post.userId,
      }));
      setDataSource(data);
    }
  }, [posts]);
  /* *********** end of Modal *********** */

  return (
    <>
      <Spin spinning={productInfo.loading}>
        <Title className="text-center">
          {user?.current?.name ? `${user.current.name}'s` : "My"} Posts
        </Title>
        <Table dataSource={dataSource} columns={columns} />
      </Spin>
      {editedPost && (
        /* *********** beginning of Modal *********** */
        <Modal
          title="Edit Post"
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        >
          <DashboardPostEdit editedPost={editedPost} form={form} />
        </Modal>
        /* *********** end of Modal *********** */
      )}
    </>
  );
}
