import { useEffect, useState } from "react";
import { useProductInfo } from "../../lib/context/productInfo";
import { useProductStorage } from "../../lib/context/productStorage";
import { DashboardPostEdit } from "./DashboardPostEdit";
import { DashboardPostListOpen } from "./DashboardPostListOpen";
import { Query } from "appwrite";
import dayjs from "dayjs";
import { Modal, Spin, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useUserProfile } from "../../lib/context/userProfile";

const { Title } = Typography;

export function DashboardPostList({ user }) {
  const productInfo = useProductInfo();
  const productStorage = useProductStorage();
  const userProfile = useUserProfile();
  const [posts, setPosts] = useState([]); // fetch posts belonging to this user ID
  const [userMap, setUserMap] = useState({}); // collect profiles of applicants
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
    async function fetchPostsAndProfiles() {
      try {
        // Fetch posts belonging to this user ID
        const query = Query.equal("userId", [user?.current?.$id]);
        const postResult = await productInfo.listDocumentsByQuery(query);

        if (!postResult || !Array.isArray(postResult)) return;
        setPosts(postResult);

        // Extract all unique applicant IDs
        const applicants = postResult.reduce((acc, cur) => {
          cur.applicants.forEach((applicant) => {
            if (!acc.includes(applicant)) {
              acc.push(applicant);
            }
          });
          return acc;
        }, []);

        // fetch profiles
        const profileResult = await Promise.all(
          applicants.map(async (id) => {
            const query = Query.equal("userId", id);
            const profile = await userProfile.getProfileByQuery(query);
            return profile[0];
          }),
        );

        // convert profile to the format of "ID: profiles data"
        const data = profileResult.reduce((acc, cur) => {
          acc[cur.userId] = cur;
          return acc;
        }, {});
        setUserMap(data);
      } catch (error) {
        console.error("Unable to fetch post and profiles: ", error.message);
      }
    }

    fetchPostsAndProfiles();
  }, [user?.current?.$id]);

  useEffect(() => {
    if (posts) {
      const openPosts = posts.filter((post) => post.closed === false);
      const closedPosts = posts.filter((post) => post.closed === true);
      const openData = openPosts.map((post) => {
        const applicantsProfiles = post.applicants.map((a) => {
          return userMap[a];
        });
        return {
          ...post,
          key: post.$id,
          time: dayjs(post.time).format("MM/DD/YYYY"),
          applicantsProfiles: applicantsProfiles,
        };
      });
      setDataSourceOpen(openData);
      const closedData = closedPosts.map((post) => ({
        ...post,
        key: post.$id,
        time: dayjs(post.time).format("MM/DD/YYYY"),
      }));
      setDatasourceClosed(closedData);
    }
  }, [userMap]);

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
