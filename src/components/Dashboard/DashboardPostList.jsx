import { useEffect, useState } from "react";
import { useProductInfo } from "../../lib/context/productInfo";
import { useProductStorage } from "../../lib/context/productStorage";
import { DashboardPostEdit } from "./DashboardPostEdit";
import { DashboardPostListOpen } from "./DashboardPostListOpen";
import { Query } from "appwrite";
import dayjs from "dayjs";
import { Modal, Spin, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

const { Title } = Typography;

export function DashboardPostList({ user }) {
  const productInfo = useProductInfo();
  const productStorage = useProductStorage();
  const [posts, setPosts] = useState([]); // fetch posts belonging to this user ID
  const [dataSourceOpen, setDataSourceOpen] = useState([]); // collect necessary information to render in open table
  const [dataSourceClosed, setDatasourceClosed] = useState([]); // collect necessary information to render in closed table
  const [form] = useForm(); // used in Modal

  /* *********** beginning of Modal (states) *********** */
  const [isModalOpen, setIsModalOpen] = useState(false); // open dialogue box when edit post is clicked
  const [editedPost, setEditedPost] = useState(null); // used in Modal
  /* *********** end of Modal *********** */

  /* *********** beginning of Modal (functions) *********** */
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);

    form
      .validateFields()
      .then(async (values) => {
        const result = await productInfo.updateDocument(editedPost.$id, values);

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
    async function fetchPosts() {
      // fetch posts belonging to this user ID
      const query = Query.equal("userId", [user?.current?.$id]);
      const result = await productInfo.listDocumentsByQuery(query);
      if (!result) return;
      setPosts(result);
    }
    if (user?.current?.$id) {
      fetchPosts();
    }
  }, [user?.current?.$id]);

  useEffect(() => {
    if (posts) {
      const openPosts = posts.filter((post) => post.closed === false);
      const closedPosts = posts.filter((post) => post.closed === true);
      const openData = openPosts.map((post) => ({
        ...post,
        key: post.$id,
        time: dayjs(post.time).format("MM/DD/YYYY"),
      }));
      setDataSourceOpen(openData);
      const closedData = closedPosts.map((post) => ({
        ...post,
        key: post.$id,
        time: dayjs(post.time).format("MM/DD/YYYY"),
      }));
      setDatasourceClosed(closedData);
    }
  }, [posts]);

  return (
    <>
      <Spin spinning={productInfo.loading}>
        <Title className="text-center">
          {user?.current?.name ? `${user.current.name}'s` : "My"} Posts
        </Title>
        <DashboardPostListOpen
          productInfo={productInfo}
          setEditedPost={setEditedPost}
          productStorage={productStorage}
          setPosts={setPosts}
          dataSourceOpen={dataSourceOpen}
        />
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
