import { useReviews } from "../../lib/context/reviews";
import { getUser } from "../../lib/serverAppwrite";
import { useProductInfo } from "../../lib/context/productInfo";
import { Avatar, Pagination, Rate, Space, Spin, Typography } from "antd";
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
  const [expandedItems, setExpandedItems] = useState({});

  const toggleContent = (i) =>
    setExpandedItems((current) => ({ ...current, [i]: !current[i] }));

  /* ***********************
     Handle items per page
  ************************ */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = reviewList.slice(startIndex, startIndex + itemsPerPage);

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

  useEffect(() => {
    console.log("expandedItems: ", expandedItems);
  }, [expandedItems]);

  return (
    <div className="flex flex-col justify-between h-full px-4">
      <Title level={2} className="text-center pt-4">
        Words of Thanks
      </Title>
      <Space size="large" direction="vertical" className="text-xs flex-grow">
        <Spin spinning={reviews.loading}>
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
                  I give you{" "}
                  <Rate
                    count={5}
                    defaultValue={review.stars}
                    disabled
                    className="text-sm"
                  />{" "}
                  for the donation of the{" "}
                  <Link
                    to={`/product/${review.productId}`}
                    className="text-blue-500"
                  >
                    {productList[i].product.toLocaleLowerCase()}
                  </Link>
                  .
                </p>
                <p className={`${!expandedItems[i] ? "truncate" : ""}`}>
                  {review.reviewContent}
                </p>
                {!expandedItems[i] && (
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => toggleContent(i)}
                  >
                    ...more
                  </span>
                )}
                {expandedItems[i] && (
                  <span
                    className="text-blue-500 cursor-pointer"
                    onClick={() => toggleContent(i)}
                  >
                    Show less
                  </span>
                )}
              </div>
            ))}
        </Spin>
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
