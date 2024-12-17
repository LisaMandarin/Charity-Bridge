import { StarTwoTone } from "@ant-design/icons";
import { useReviews } from "../../lib/context/reviews";
import { getUser } from "../../lib/serverAppwrite";
import { useProductInfo } from "../../lib/context/productInfo";
import { Avatar, Pagination, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const { Title } = Typography;

export function HomeReview() {
  const reviews = useReviews();
  const productInfo = useProductInfo();
  const [reviewList, setReviewList] = useState([]);
  const [donorList, setDonorList] = useState([]);
  const [receiverList, setReceiverList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = reviewList.slice(startIndex, startIndex + itemsPerPage);
  const showStars = (starsNumber) => {
    return Array.from({ length: starsNumber }, (_, index) => (
      <StarTwoTone key={index} twoToneColor="#eb2f96" />
    ));
  };

  /* ******************************
  Fetch reviews in initial render
  ****************************** */
  useEffect(() => {
    let isMounted = true;
    async function fetchReviews() {
      try {
        const result = await reviews.listReviews();
        if (result && isMounted) {
          setReviewList(result);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ********************************************
  Store donors', receivers', and products' names
  *********************************************** */
  useEffect(() => {
    async function fetchNames() {
      if (currentItems.length > 0) {
        const donors = await Promise.all(
          currentItems.map((review) => getUser(review.donorId)),
        );

        const receivers = await Promise.all(
          currentItems.map((review) => getUser(review.receiverId)),
        );

        const products = await Promise.all(
          currentItems.map((review) =>
            productInfo.getDocument(review.productId),
          ),
        );

        setDonorList(donors);
        setReceiverList(receivers);
        setProductList(products);
      }
    }

    fetchNames();
  }, [currentItems]);

  return (
    <div className="flex flex-col justify-between h-full px-4">
      <Title level={2} className="text-center pt-4">
        Words of Thanks
      </Title>
      <Space size="large" direction="vertical" className="text-xs flex-grow">
        {donorList.length > 0 &&
          receiverList.length > 0 &&
          productList.length > 0 &&
          currentItems.map((review, i) => (
            <div key={i}>
              <p>
                <Avatar icon="U" />{" "}
                <span>
                  <Link
                    to={`/userProduct/${review.receiverId}`}
                    className="text-blue-500"
                  >
                    {receiverList[i].name}
                  </Link>{" "}
                  said
                </span>
                ,
              </p>
              <p className="indent-8">
                Thank you,{" "}
                <Link
                  to={`/userProduct/${review.donorId}`}
                  className="text-blue-500"
                >
                  {donorList[i].name}
                </Link>
                ,
              </p>
              <p>
                I give you {showStars(review.stars)} for the donation of the{" "}
                <Link
                  to={`/product/${review.productId}`}
                  className="text-blue-500"
                >
                  {productList[i].product.toLocaleLowerCase()}
                </Link>
                .
              </p>
              <p>{review.reviewContent}</p>
            </div>
          ))}
      </Space>
      <Pagination
        simple={{ readOnly: true }}
        defaultCurrent={1}
        total={reviewList.length}
        pageSize={3}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        align="center"
        className="mb-4"
      />
    </div>
  );
}
