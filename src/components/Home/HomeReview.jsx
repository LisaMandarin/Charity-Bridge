import { useEffect, useState } from "react";
import { useReviews } from "../../lib/context/reviews";
import { useProductInfo } from "../../lib/context/productInfo";
import { Avatar, Pagination, Rate, Spin } from "antd";
import useUserMap from "../utils/useUserMap";
import { Typography } from "antd";
import { Link } from "react-router-dom";
const { Title } = Typography;

export function HomeReview() {
  /* *************************
 combine data (begin)
**************************  */
  const { listReviews } = useReviews();
  const { getDocument } = useProductInfo();
  const [targetedDocs, setTargetedDocs] = useState([]);
  const donorMap = useUserMap({ targetedDocs, attribute: "donorId" });
  const receiverMap = useUserMap({ targetedDocs, attribute: "receiverId" });
  const [productInfos, setProductInfos] = useState([]);
  const [combinedData, setCombinedData] = useState([]); // review data + donor/receiver data + product data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const result = await listReviews();
        if (!result || result.length === 0) {
          throw new Error("Review documents not found");
        }

        setTargetedDocs(result);
      } catch (error) {
        console.error("Unable to fetch reviews: ", error.message);
      }
    }
    fetchReviews();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await Promise.all(
          targetedDocs.map((doc) => getDocument(doc.productId)),
        );
        setProductInfos(result);
      } catch (error) {
        console.error("Unable to fetch products: ", error.message);
      }
    }
    fetchProducts();
  }, [targetedDocs]);

  useEffect(() => {
    function combineInfos() {
      try {
        const data = targetedDocs.map((doc) => {
          const donor = donorMap.get(doc.donorId);
          const receiver = receiverMap.get(doc.receiverId);
          const product = productInfos.find(
            (product) => product.$id === doc.productId,
          );
          return {
            ...doc,
            donor,
            receiver,
            product,
          };
        });
        setCombinedData(data);
      } catch (error) {
        console.error("Unable to combine data: ", error.message);
      } finally {
        setLoading(false);
      }
    }
    combineInfos();
  }, [donorMap, receiverMap, productInfos]);

  /* *************************
 combine data (end)
**************************  */

  /* *************************
 handle page change (begin)
**************************  */
  const [currentPage, setCurrentPage] = useState(1);
  const defaultPageSize = 2;
  const currentItems = combinedData.slice(
    (currentPage - 1) * defaultPageSize,
    currentPage * defaultPageSize,
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  /* *************************
 handle page change (end)
**************************  */

  /* *************************
 handle more text (begin)
**************************  */
  const [more, setMore] = useState({});

  const toggleMore = (index) => {
    setMore((current) => ({
      ...current,
      [index]: !current[index],
    }));
  };

  /* *************************
 handle more text (end)
**************************  */

  return (
    <div className="flex flex-col justify-start h-full px-4">
      <Title level={2} className="text-center pt-4">
        Words of Thanks
      </Title>
      <Spin spinning={loading}>
        <div className="text-xs flex flex-col flex-grow w-full gap-4">
          {currentItems.map((review, i) => (
            <div
              key={i}
              className={`${more[i] ? "" : `h-[100px] overflow-hidden`} relative`}
            >
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
                  {review?.product?.product.toLocaleLowerCase() ||
                    "unknown item"}
                </Link>
                .
              </div>
              <div className={`${more[i] ? "mb-5" : ""}`}>
                {review.reviewContent}
              </div>
              <div className="absolute bottom-0 left-0 bg-white pt-1 opacity-80 w-full text-right">
                <button onClick={() => toggleMore(i)}>
                  {more[i] ? "More" : "Less"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          align="center"
          defaultCurrent={currentPage}
          total={targetedDocs.length}
          defaultPageSize={defaultPageSize}
          onChange={onPageChange}
          className="py-4"
        />
      </Spin>
    </div>
  );
}
