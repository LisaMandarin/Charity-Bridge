import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useProductInfo } from "../../lib/context/productInfo";
import { ProfileCard } from "./ProfileCard";
import { Card, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { LeftArrowBar } from "../utils/ArrowBar";
import useGetUser from "../utils/useGetUser";
const { Title } = Typography;
const { Meta } = Card;

export function ProductByUser() {
  const { userId } = useParams();
  const productInfo = useProductInfo();
  const userData = useGetUser(userId);
  const [documents, setDocuments] = useState([]);
  const [userName, setUserName] = useState();
  const [contributor, setContributor] = useState();
  const [receiver, setReceiver] = useState();
  const [isOpen, setIsOpen] = useState(false); //

  const toggleProfileCard = () => {
    setIsOpen((current) => !current);
  };

  /* *************************************************
  Retrieve the name of the person who posts donations
  Set contributor and receiver for profile card
  ************************************************* */
  useEffect(() => {
    async function fetchUser() {
      if (userId) {
        setReceiver(userId);
        if (userData.name) {
          setUserName(userData.name);
          setContributor({
            name: userData?.name,
            avatarUrl: userData?.avatar || null,
            profileId: userData.prefs?.profileId || null,
            id: userData.userId,
          });
        }
      }
    }
    fetchUser();
  }, [userId, userData]);

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
    <div className="relative flex flex-col w-full">
      <LeftArrowBar />
      <div className="p-8 text-center">
        <Title
          onClick={toggleProfileCard}
          className="hover:text-blue-500 hover:underline cursor-pointer"
        >
          {userName}
        </Title>
        <div className="flex justify-center">
          <ProfileCard
            contributor={contributor}
            isOpen={isOpen}
            receiver={receiver}
          />
        </div>
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
    </div>
  );
}
