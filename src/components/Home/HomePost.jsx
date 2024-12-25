import { ProductCard } from "../Product/ProductCard";
import { Typography } from "antd";

const { Title } = Typography;

export function HomePost() {
  return (
    <div className="flex flex-col h-full flex-grow">
      <Title className="text-center pt-4">Available Donations</Title>
      <ProductCard />
    </div>
  );
}
