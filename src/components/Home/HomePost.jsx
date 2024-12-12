import { ProductCard } from "../Product/ProductCard";
import { Space, Typography } from "antd";

const { Title } = Typography;

export function HomePost() {
  return (
    <div className="flex flex-col">
      <Title className="text-center pt-4">Latest Charities</Title>
      <ProductCard />
    </div>
  );
}
