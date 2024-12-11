import { useEffect, useState } from "react";
import { Avatar, Button, Card, Carousel, Image, message, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import { useProductInfo } from "../../lib/context/productInfo";
import dayjs from "dayjs";
import { getUser } from "../../lib/serverAppwrite";
import { Typography } from "antd";
import { useUserProfile } from "../../lib/context/userProfile";
import { StarOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useUser } from "../../lib/context/user";
const { Title } = Typography;

export function ProductDetail() {
  const { productId } = useParams();
  const productInfo = useProductInfo();
  const userProfile = useUserProfile();
  const user = useUser();
  const [product, setProduct] = useState(null);
  const [contributor, setContributor] = useState();
  const [profile, setProfile] = useState();

  // --------Profile Card-------
  const [open, setOpen] = useState(false);
  const [contentList, setContentList] = useState({});
  const [activeTabKey, setActiveTabKey] = useState("contact");
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  const toggleOpen = () => {
    setOpen((current) => !current);
  };
  //--------Profile Card-------

  useEffect(() => {
    if (!productId) {
      message.error("Invalid link");
      return;
    }

    async function fetchProduct(id) {
      try {
        const result = await productInfo.getDocument(id);
        if (result) {
          setProduct(result);
        } else {
          message.error("Product not found");
        }
      } catch (error) {
        console.error("Failed to fetch product: ", error.message);
        message.error("Failed to fetch product");
      }
    }

    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    async function fetchContributor() {
      if (product?.userId) {
        setReceiver(product.userId);
        const result = await getUser(product.userId);
        setContributor({
          name: result.name,
          avatarId: result.prefs?.avatarId || null,
          avatarUrl: result.prefs?.avatarUrl || null,
          profileId: result.prefs?.profileId || null,
        });
      }
    }

    fetchContributor();
  }, [product?.userId]);

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

  useEffect(() => {
    if (user?.current) {
      setSender(user.current.$id);
    }
  }, [user?.current]);

  useEffect(() => {
    if (profile) {
      setContentList({
        contact: (
          <ul className="leading-8">
            <li>
              <Icon
                icon="ic:outline-email"
                width="1.5rem"
                height="1.5rem"
                className="inline"
              />{" "}
              {profile.email ? profile.email : "N/A"}
            </li>
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
          <ul className="max-w-[360px] whitespace-normal overflow-hidden leading-8">
            <li>
              <strong>Name: </strong>
              {profile.name ? profile.name : "N/A"}
            </li>
            <li>
              <strong>Birthday: </strong>
              {profile.birthday
                ? dayjs(profile.birthday).format("MM/DD/YYYY")
                : "N/A"}
            </li>
            <li>
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
            </li>
            <li>
              <strong>Introduction: </strong>
              {profile.introduction ? profile.introduction : "N/A"}
            </li>
          </ul>
        ),
      });
    }
  }, [profile]);

  return (
    <>
      {product && (
        <div>
          <Title className="text-center pt-8">{product.product}</Title>
          <div className="flex flex-col sm:flex-row justify-center">
            <Carousel
              dotPosition="bottom"
              autoplay={true}
              className=" w-[300px] p-12"
            >
              {product.photoURL &&
                product.photoURL.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    width={200}
                    alt={`picture ${i + 1} of ${product.product}`}
                  />
                ))}
            </Carousel>
            <div className="p-8">
              <Space direction="vertical">
                <p>
                  <span className="font-extrabold">Quantity: </span>
                  {product.quantity}
                </p>
                <p>
                  <span className="font-extrabold">Condition: </span>
                  {product.condition}
                </p>
                <p>
                  <span className="font-extrabold">Category: </span>
                  <Link to={`/category/${product.category}`}>
                    {product.category}
                  </Link>
                </p>
                <p>
                  <span className="font-extrabold">Location: </span>
                  {product.location}
                </p>
                <p>
                  <span className="font-extrabold">Description: </span>
                  {product.description}
                </p>
                <p>
                  <span className="font-extrabold">Post time: </span>
                  {product?.time
                    ? dayjs(product.time).format("MM/DD/YYYY")
                    : "N/A"}
                </p>
                <p>
                  <span className="font-extrabold">Contributor: </span>
                  <Button variant="link" color="default" onClick={toggleOpen}>
                    {contributor?.avatarUrl && (
                      <Avatar src={contributor.avatarUrl} />
                    )}{" "}
                    {contributor ? contributor.name : "N/A"}
                  </Button>
                </p>
              </Space>
              {profile && open && (
                <Card
                  style={{ width: "400px" }}
                  title={
                    <div>
                      {profile.name} <StarOutlined />
                      <StarOutlined />
                      <StarOutlined />
                    </div>
                  }
                  extra={
                    <Link to={`/userProduct/${profile.userId}`}>
                      more posts
                    </Link>
                  }
                  tabList={[
                    { key: "contact", tab: "Contact" },
                    { key: "about", tab: `About ${profile.name}` },
                  ]}
                  activeTabKey={activeTabKey}
                  onTabChange={onTabChange}
                >
                  {contentList[activeTabKey]}
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
