import { ProductCard } from "./ProductCard"
import { Space, Typography } from "antd"

const { Title } = Typography

export function HomePost() {

    return (
        <>
            <Space direction="vertical" className="bg-white">
                <Title className="text-center pt-4">Latest Items Giving Away</Title>
                <ProductCard />
            </Space>
        </>
    )
}