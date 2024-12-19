import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useProductInfo } from "../../lib/context/productInfo";
import { Card, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../lib/serverAppwrite";
const { Title } = Typography;
const { Meta } = Card;

export function ProductByUser() {
  const { userId } = useParams();

  const productInfo = useProductInfo();
  const [documents, setDocuments] = useState([]);
  const [userName, setUserName] = useState();

  useEffect(() => {
    async function fetchUser() {
      const result = await getUser(userId);
      if (result.name) {
        setUserName(result.name);
      }
    }
    fetchUser();
  }, [userId]);

  useEffect(() => {
    async function fetchProducts() {
      const query = Query.equal("userId", [userId]);

      if (!query) return;

      const result = await productInfo.listDocumentsByQuery(query);
      if (!result) {
        console.error(`User ID ${userId} did not post anything`);
      }

      setDocuments(result);
    }
    fetchProducts();
  }, [userName]);

  return (
    <div className="p-8 text-center">
      <Title>{userName}</Title>
      <div className="flex flex-wrap bg-white gap-4 justify-center">
        {documents === undefined || documents === null ? (
          <div>No posts</div>
        ) : (
          documents.map((d) => (
            <Link to={`/product/${d.$id}`} key={d.$id}>
              <Card
                className="w-full md:w-[360px]"
                hoverable
                cover={
                  <div className="w-full aspect-square">
                    <img
                      alt={`{d.product}'s photo`}
                      src={d.photoURL[0]}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                }
              >
                <Meta title={<div className="text-wrap">{d.product}</div>} />
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
