import { Query } from "appwrite";
import { useEffect, useState } from "react";
import { useProductInfo } from "../../lib/context/productInfo";
import { Card, Spin, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
const { Title } = Typography;
const { Meta } = Card;

export function ProductByCategory() {
  const { category } = useParams();
  const productInfo = useProductInfo();
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const query = [
        Query.equal("category", [category]),
        Query.equal("closed", [false]),
      ];
      const result = await productInfo.listDocumentsByQuery(Query.and(query));

      if (!result) {
        setDocuments([]);
      }

      setDocuments(result);
    }
    fetchProducts();
  }, [category]);

  return (
    <div className="p-8 text-center">
      <Spin spinning={productInfo.loading}>
        <Title>{category.toUpperCase()}</Title>
        <div className="flex flex-wrap bg-white gap-4 justify-center">
          {documents ? (
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
          ) : (
            <div>No data</div>
          )}
        </div>
      </Spin>
    </div>
  );
}
