import { useEffect, useState } from "react";
import { useUserProfile } from "../../lib/context/userProfile";
import { useUser } from "../../lib/context/user";
import { getUser } from "../../lib/serverAppwrite";
import { useProductInfo } from "../../lib/context/productInfo";
import { message, Card, Avatar, Rate, Spin } from "antd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useReviews } from "../../lib/context/reviews";
import { Query } from "appwrite";

export function ProfileCard({ contributor, isOpen, receiver }) {
  const userProfile = useUserProfile();
  const productInfo = useProductInfo();
  const user = useUser();
  const reviews = useReviews();
  const [profile, setProfile] = useState();
  const [combinedData, setCombinedData] = useState([]); // combine review collection with donor name, receiver name, and product name
  const [contentList, setContentList] = useState({}); // profile card content
  const [activeTabKey, setActiveTabKey] = useState("contact"); // profile card tabs
  const [sender, setSender] = useState(); // person who sends the message
  const [reviewLoading, setReviewLoading] = useState(true);
  const [areExpandedTabs, setAreExpandedTabs] = useState({
    about: false,
    reviews: false,
  }); // keep track of expanded states of tabs

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const toggleExpand = (key) => {
    setAreExpandedTabs((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        if (contributor?.profileId) {
          const result = await userProfile.getProfile(contributor.profileId);
          setProfile(result);
        }
      } catch (error) {
        console.error("Failed to fetch the user's profile: ", error.message);
        message.error("Failed to fetch the user's profile: ");
      }
    }
    fetchProfile();
  }, [contributor?.profileId]);

  /* ****************************
  Handle Reviews in profile card
  **************************** */
  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      if (!contributor?.id) {
        return;
      }

      setReviewLoading(true);

      try {
        const query = Query.equal("donorId", [contributor?.id]);
        const reviewResult = await reviews.listReviewsByQuery(query);

        if (!isMounted) return;

        if (reviewResult) {
          const donors = await Promise.all(
            reviewResult.map((review) => getUser(review.donorId)),
          );
          const receivers = await Promise.all(
            reviewResult.map((review) => getUser(review.receiverId)),
          );
          const products = await Promise.all(
            reviewResult.map((review) =>
              productInfo.getDocument(review.productId),
            ),
          );

          if (
            isMounted &&
            donors.length > 0 &&
            receivers.length > 0 &&
            products.length > 0
          ) {
            const data = reviewResult.map((review, index) => ({
              ...review,
              donor: donors[index],
              receiver: receivers[index],
              product: products[index],
            }));
            setCombinedData(data);
          }
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        if (isMounted) {
          setReviewLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, [contributor?.id]);

  useEffect(() => {
    if (user?.current) {
      setSender(user.current.$id);
    }
  }, [user?.current]);

  /* *************************
  Handle profile card content
  **************************** */
  useEffect(() => {
    if (profile) {
      setContentList({
        contact: (
          <ul className="max-w-[360px] max-h-[250px] leading-8 flex flex-col items-start">
            <li>
              <Icon
                icon="ic:outline-phone"
                width="1.5rem"
                height="1.5rem"
                className="inline"
              />{" "}
              {profile.phone ? profile.phone : "N/A"}
            </li>
            <li>
              <Icon
                icon="lsicon:house-outline"
                width="1.5rem"
                height="1.5rem"
                className="inline"
              />{" "}
              {profile.address ? profile.address : "N/A"}
            </li>
            <li>
              <Icon
                icon="eva:message-circle-outline"
                width="1.5rem"
                height="1.5rem"
                className="inline"
              />
              {sender && receiver ? (
                <Link to={`/messageboard/:${sender}/:${receiver}`}>
                  Talk to me on Charity Bridge
                </Link>
              ) : (
                <Link
                  to={`/SessionFailure`}
                  state={{ from: window.location.pathname }}
                >
                  Talk to me on Charity Bridge
                </Link>
              )}
            </li>
          </ul>
        ),
        about: (
          <div
            className={`max-w-[360px] ${areExpandedTabs.about ? "max-h-full" : "max-h-[250px]"}  leading-8 flex flex-col items-start`}
          >
            <div>
              <strong>Birthday: </strong>
              {profile.birthday
                ? dayjs(profile.birthday).format("MM/DD/YYYY")
                : "N/A"}
            </div>
            <div>
              <strong>Gender: </strong>
              {profile.gender ? (
                <>
                  {profile.gender === "male" && (
                    <Icon
                      icon="tabler:gender-male"
                      width="1.5rem"
                      height="1.5rem"
                      className="inline"
                    />
                  )}
                  {profile.gender === "female" && (
                    <Icon
                      icon="tabler:gender-female"
                      width="1.5rem"
                      height="1.5rem"
                      className="inline"
                    />
                  )}
                  {profile.gender === "LGBTQ" && (
                    <Icon
                      icon="tabler:gender-bigender"
                      width="1.5rem"
                      height="1.5rem"
                      className="inline"
                    />
                  )}
                </>
              ) : (
                "N/A"
              )}
            </div>
            <div className="text-left text-ellipsis overflow-hidden">
              <strong>Introduction: </strong>
              {profile.introduction ? profile.introduction : "N/A"}
            </div>
            <button
              onClick={() => toggleExpand("about")}
              className="text-blue-500 cursor-pointer mt-2"
            >
              {areExpandedTabs.about ? "Less" : "More"}
            </button>
          </div>
        ),
        reviews: (
          <div>
            <div
              className={`max-w-[360px] ${areExpandedTabs.reviews ? "max-h-full" : "max-h-[200px]"} overflow-hidden`}
            >
              <Spin spinning={reviewLoading}>
                {combinedData?.length > 0 ? (
                  combinedData.map((review, index) => (
                    <div key={index} className="flex flex-col gap-4 py-2">
                      <div className="flex flex-row gap-2">
                        <div className="flex items-center">
                          <Avatar
                            src={review.receiver?.prefs?.avatarUrl}
                            alt="avatar"
                          >
                            {review.receiver?.name[0] || "U"}
                          </Avatar>
                        </div>
                        <div>
                          <ul className="text-left">
                            <li className="text-xs">{review.receiver?.name}</li>
                            <li className="text-xs">
                              <Rate
                                defaultValue={review.stars}
                                count={5}
                                disabled
                              />
                            </li>
                            <li className="text-xs text-gray-400">
                              {dayjs(review.$createdAt).format("YYYY-MM-DD")} |{" "}
                              {review.product?.product}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="text-left">{review.reviewContent}</div>
                      <hr />
                    </div>
                  ))
                ) : (
                  <div>No reviews available</div>
                )}
              </Spin>
            </div>
            <button
              onClick={() => toggleExpand("reviews")}
              className="text-blue-500 mt-2"
            >
              {areExpandedTabs.reviews ? "Less" : "More"}
            </button>
          </div>
        ),
      });
    }
  }, [profile, combinedData, receiver, sender, reviewLoading, areExpandedTabs]);

  return (
    profile &&
    isOpen && (
      <Card
        style={{ width: "400px" }}
        title={<div className="text-left">{profile.name}</div>}
        extra={<Link to={`/userProduct/${profile.userId}`}>more posts</Link>}
        tabList={[
          { key: "contact", tab: "Contact" },
          { key: "about", tab: `About ${profile.name}` },
          { key: "reviews", tab: "Reviews" },
        ]}
        activeTabKey={activeTabKey}
        onTabChange={onTabChange}
      >
        {contentList[activeTabKey]}
      </Card>
    )
  );
}
