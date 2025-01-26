import { useReviews } from "../../lib/context/reviews";
import { useProductInfo } from "../../lib/context/productInfo";
import { Avatar, Pagination, Rate, Space, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserMap from "../utils/useUserMap";
const { Title } = Typography;

export function HomeReview() {
  const { listReviews } = useReviews();
  const { getDocument } = useProductInfo();
  const [expandedItems, setExpandedItems] = useState({}); // used to toggle review content more/less
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true); // see if there are more reviews items to be fetched
  const [targetedDocs, setTargetedDocs] = useState([]);
  const donorMap = useUserMap({
    targetedDocs,
    attribute: "donorId",
  });
  const receiverMap = useUserMap({
    targetedDocs,
    attribute: "receiverId",
  });
  const [reviewProducts, setReviewProducts] = useState([]); // fetch the product information listed in review collection
  const [combinedData, setCombinedData] = useState([]);

  const toggleContent = (i) =>
    setExpandedItems((current) => ({ ...current, [i]: !current[i] }));

  /* ***********************
     Handle items per page
  ************************ */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const currentItems = combinedData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  async function fetchReviews() {
    try {
      const result = await listReviews();
      if (!result || result.length === 0) {
        throw new Error("review documents not found");
      }
      setTargetedDocs(result);
    } catch (error) {
      console.error("Unable to fetch reviews: ", error.message);
    }
  }

  function fetchUniqueReviews(reviewArray) {
    const string = reviewArray.map((data) => JSON.stringify(data));
    const set = new Set(string);
    const array = Array.from(set);
    const parsedArray = array.map((item) => JSON.parse(item));
    return parsedArray;
  }

  // fetch reviews to store in targetedDocs
  useEffect(() => {
    if (combinedData.length === 0) fetchReviews();
  }, []);

  // fetch product information to store in reviewProducts
  useEffect(() => {
    async function fetchReviewProducts() {
      try {
        if (targetedDocs.length) {
          console.log("targetedDocs: ", targetedDocs);
          const identicalDocs = fetchUniqueReviews(targetedDocs);
          const data = await Promise.all(
            identicalDocs.map((doc) => getDocument(doc.productId)),
          );
          console.log("data before set review products: ", data);
          setReviewProducts(data);
        }
      } catch (error) {
        console.error("Unable to fetch review products: ", error.message);
      }
    }
    fetchReviewProducts();
  }, [targetedDocs]);

  // fetch data with the information of donors, receivers and products and store it in combinedData
  useEffect(() => {
    if (donorMap?.size && receiverMap?.size && reviewProducts.length) {
      setLoading(true);
      try {
        const data = targetedDocs.map((doc, i) => {
          return {
            ...doc,
            donor: donorMap.get(doc.donorId),
            receiver: receiverMap.get(doc.receiverId),
            product: reviewProducts[i],
          };
        });
        console.log("data before set combined data", data);
        setCombinedData((current) => [...current, ...data]);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [donorMap, receiverMap, reviewProducts]);

  useEffect(() => {
    console.log("combinedData: ", combinedData);
  }, [combinedData]);

  useEffect(() => {
    console.log("loading: ", loading);
  });

  return (
    <div className="flex flex-col justify-between h-full px-4">
      <Title level={2} className="text-center pt-4">
        Words of Thanks
      </Title>
      <Spin spinning={loading}>
        <Space
          size="large"
          direction="vertical"
          className="text-xs flex-grow w-full"
        >
          {currentItems.map((review, i) => (
            <div key={i}>
              <div>
                <Avatar src={review.receiver?.avatar || null} alt="avatar">
                  {review.receiver?.name[0] || "U"}
                </Avatar>
                <span>
                  <Link
                    to={`/userProduct/${review.receiverId}`}
                    className="text-blue-500"
                  >
                    {review.receiver?.name || "Unknown"}
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
                  {review.donor?.name || "Unknown"}
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
                  {review?.product?.product.toLocaleLowerCase() || "some item"}
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
        total={
          hasMore ? combinedData.length + itemsPerPage : combinedData.length
        }
        pageSize={itemsPerPage}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        align="center"
        className="mb-4"
      />
    </div>
  );
}
