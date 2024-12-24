import { useEffect, useState } from "react";
import { Avatar, Button, Carousel, Image, message, Space } from "antd";
import { Link, useParams } from "react-router-dom";
import { useProductInfo } from "../../lib/context/productInfo";
import { getUser } from "../../lib/serverAppwrite";

import { Typography } from "antd";
import dayjs from "dayjs";

import { ProfileCard } from "./ProfileCard";
const { Title } = Typography;

export function ProductDetail() {
  const { productId } = useParams();
  const productInfo = useProductInfo();
  const [product, setProduct] = useState(null);
  const [contributor, setContributor] = useState(); // person who donates the product; contributor.id === receiver
  const [receiver, setReceiver] = useState(); // person who receives the message; receiver === contributor.id
  const [isOpen, setIsOpen] = useState(false); // toggle profile card

  const toggleProfileCard = () => {
    setIsOpen((current) => !current);
  };

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

  /* ********************************************** 
  set contributor and handle product closed status
  ************************************************* */
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
          id: result.$id || null,
        });
      }
    }

    fetchContributor();
  }, [product?.userId]);

  return (
    <>
      {product && (
        <div className={`${product?.closed ? "opacity-25" : ""}`}>
          <Title className="text-center pt-8">{product.product}</Title>
          {product?.closed && <div className="text-center mt-0">(Closed)</div>}
          <div className="flex flex-col sm:flex-row justify-center">
            <Carousel
              dotPosition="bottom"
              autoplay={!product?.closed}
              className=" w-[300px] p-12"
            >
              {product.photoURL &&
                product.photoURL.map((url, i) => (
                  <Image
                    key={i}
                    src={url}
                    width={200}
                    alt={`picture ${i + 1} of ${product.product}`}
                    preview={!product?.closed}
                  />
                ))}
            </Carousel>
            <div className="p-8 w-[400px]">
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
                  <Button
                    disabled={product?.closed}
                    variant="link"
                    color="blue"
                    onClick={toggleProfileCard}
                  >
                    {contributor?.avatarUrl && (
                      <Avatar src={contributor.avatarUrl} />
                    )}{" "}
                    {contributor ? contributor.name : "N/A"}
                  </Button>
                </p>
              </Space>

              <ProfileCard
                contributor={contributor}
                isOpen={isOpen}
                receiver={receiver}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
