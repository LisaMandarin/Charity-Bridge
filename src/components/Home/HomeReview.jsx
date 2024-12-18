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
  const [combinedData, setCombinedData] = useState([]);
  const [expandedItems, setExpandedItems] = useState({}); // used to toggle review content more/less
  const [loading, setLoading] = useState(true);

  const toggleContent = (i) =>
    setExpandedItems((current) => ({ ...current, [i]: !current[i] }));

  /* ***********************
     Handle items per page
  ************************ */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = combinedData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* ******************************
  Fetch reviews data and convert ids to names in initial render
  ****************************** */
  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      setLoading(true);

      try {
        const reviewsResult = await reviews.listReviews();

        if (!isMounted) return;

        const donors = await Promise.all(
          reviewsResult.map((review) => getUser(review.donorId)),
        );
        const receivers = await Promise.all(
          reviewsResult.map((review) => getUser(review.receiverId)),
        );
        const products = await Promise.all(
          reviewsResult.map((review) =>
            productInfo.getDocument(review.productId),
          ),
        );

        if (isMounted) {
          const data = reviewsResult.map((review, index) => ({
            ...review,
            donor: donors[index],
            receiver: receivers[index],
            product: products[index],
          }));

          setCombinedData(data);
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col justify-between h-full px-4">
      <Title level={2} className="text-center pt-4">
        Words of Thanks
      </Title>
      <Spin spinning={loading}>
        <Space size="large" direction="vertical" className="text-xs flex-grow">
          {currentItems.map((review, i) => (
            <div key={i}>
              <div>
                <Avatar icon="U" />{" "}
                <span>
                  <Link
                    to={`/userProduct/${review.receiverId}`}
                    className="text-blue-500"
                  >
                    {review.receiver?.name}
                  </Link>{" "}
                  said
                </span>
                ,
              </div>
              <div className="indent-8">
                Thank you,{" "}
                <Link
                  to={`/userProduct/${review.donorId}`}
                  className="text-blue-500"
                >
                  {review.donor?.name}
                </Link>
                ,
              </div>
              <div>
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
                  {review.product?.product.toLocaleLowerCase()}
                </Link>
                .
              </div>
              <div className={`${!expandedItems[i] ? "truncate" : ""}`}>
                {review.reviewContent}
              </div>
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
        </Space>
      </Spin>
      <Pagination
        simple={{ readOnly: true }}
        defaultCurrent={1}
        total={combinedData.length}
        pageSize={itemsPerPage}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        align="center"
        className="mb-4"
      />
    </div>
  );
}
