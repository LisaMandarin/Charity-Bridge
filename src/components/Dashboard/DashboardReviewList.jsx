import { useEffect, useState } from "react";
import { useProductInfo } from "../../lib/context/productInfo";
import { useUser } from "../../lib/context/user";
import { Query } from "appwrite";
import { Button, Dropdown, Spin } from "antd";
import { Typography, Table } from "antd";
import { useReviews } from "../../lib/context/reviews";
import { DownOutlined } from "@ant-design/icons";
const { Title } = Typography;

export function DashboardReviewList() {
  const user = useUser();
  const productInfo = useProductInfo();
  const review = useReviews();
  const [loading, setLoading] = useState(true);

  /* *************** beginning of handling table *************** */
  const [donations, setDonations] = useState([]); // retrieve data from productInfo collection
  const [reviews, setReviews] = useState([]); // retrieve data from reviews collection;
  const [dataSource, setDataSource] = useState([]); // retrieve data from donation for table

  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      responsive: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      title: "Description",
      dataIndex: "productDescription",
      key: "productDescription",
      responsive: ["md"],
    },
    {
      title: "Review",
      dataIndex: "productReview",
      key: "productReview",
      responsive: ["md"],
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        const items = [
          {
            key: "1",
            label: <a href="/dashboard-reviews-add">Add</a>,
            disabled: record.productReview !== null,
          },
          {
            key: "2",
            label: <a href="">Edit</a>,
            disabled: record.productReview === null,
          },
          {
            key: "3",
            label: <a href="">Delete</a>,
          },
          {
            key: "4",
            label: <a href="">View</a>,
          },
        ];

        console.log("items: ", items);
        return (
          <Dropdown menu={{ items }}>
            <Button>
              Actions
              <DownOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  useEffect(() => {
    if (donations.length > 0) {
      const data = donations.map((d) => {
        const reviewData = reviews.filter((r) => r.productId === d.$id);
        return {
          key: d.$id,
          productName: d.product,
          productDescription: d.description,
          productReview: reviewData[0].reviewContent,
        };
      });
      setDataSource(data);
    }
  }, [donations, reviews]);
  /* *************** end of handing table *************** */

  useEffect(() => {
    let isMounted = true;
    async function fetchProductsAndReviewsByReceiver() {
      try {
        setLoading(true);

        if (user?.current?.$id && isMounted) {
          const query = Query.equal("receiverId", [user.current.$id]);
          const [productResult, reviewResult] = await Promise.all([
            productInfo.listDocumentsByQuery(query),
            review.listReviewsByQuery(query),
          ]);

          if (productResult.length > 0) {
            setDonations(productResult);
          }

          if (reviewResult.length > 0) {
            setReviews(reviewResult);
          }
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProductsAndReviewsByReceiver();

    return () => {
      isMounted = false;
    };
  }, [user?.current?.$id]);
  return (
    <div className="w-full md:w-5/6 xl:w-[800px] m-auto">
      <Spin spinning={loading}>
        <Title className="text-center">
          Donations {user?.current?.name} received
        </Title>
        <Table dataSource={dataSource} columns={columns} />
      </Spin>
    </div>
  );
}
