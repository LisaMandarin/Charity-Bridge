import { useEffect, useState } from "react";
import { useProductInfo } from "../../lib/context/productInfo";
import { useUser } from "../../lib/context/user";
import { Query } from "appwrite";
import { Spin } from "antd";
import { Typography, Table } from "antd";
import { useReviews } from "../../lib/context/reviews";
const { Title, Text } = Typography;

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
      responsive: ["xs", "sm", "md", "lg", "xl"],
      render: (text, record) => (
        <Text editable={{ onChange: (value) => saveReview(record.key, value) }}>
          {text}
        </Text>
      ),
    },
  ];

  useEffect(() => {
    if (donations.length > 0) {
      const data = donations.map((d) => {
        const reviewData = reviews.find((r) => r.productId === d.$id);

        return {
          key: d.$id,
          productName: d.product,
          productDescription: d.description,
          productReview: reviewData?.reviewContent || null,
          reviewId: reviewData?.$id || null,
        };
      });
      setDataSource(data);
    }
  }, [donations, reviews, setDataSource]);
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

  const saveReview = async (key, value) => {
    try {
      const target = dataSource.find((item) => item.key === key);

      if (!target) {
        throw new Error("target not found for provided key");
      }
      if (!target.reviewId) {
        await review.createReview(value);
      } else {
        await review.updateReview(target.reviewId, { reviewContent: value });

        setDataSource((current) => {
          return current.map((item) =>
            item.key === key ? { ...item, productReview: value } : item,
          );
        });
      }
    } catch (error) {
      console.error("Failed to update review: ", error.message);
    }
  };
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
