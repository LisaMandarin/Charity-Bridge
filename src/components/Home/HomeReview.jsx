import { StarTwoTone } from "@ant-design/icons"
import { reviewList } from "../../data/fake-review"
import { Avatar, Pagination, Space, Typography } from "antd"
import { useEffect, useState } from "react"
const { Title } = Typography

export function HomeReview() {
    const [ currentPage, setCurrentPage ] = useState(1)
    const [ itemsPerPage, setItemsPerPage ] = useState(3)
    const startIndex = (currentPage -1) * itemsPerPage
    const currentItems = reviewList.slice(startIndex, startIndex + itemsPerPage)
    const showStars = (starsNumber) => {
        return Array.from ({ length: starsNumber }, (_, index) => (
            <StarTwoTone key={index} twoToneColor="#eb2f96" />
        ))
        
    }
    return (
        <div className="flex flex-col justify-between h-full">
            <Title level={2} className="text-center pt-4">Reviews</Title>
            <Space size="large" direction="vertical" className="text-xs flex-grow">
                {currentItems.map((review, i) => (
                    <div key={i}>
                        <p><Avatar icon="U" /> {review.receiver} said,</p>
                        <p className="indent-8">Thank you, {review.donor},</p>
                        <p>I give you {showStars(review.stars)} for the donation of the {review.product.toLocaleLowerCase()}.</p>
                        <p>{review.review}</p>
                    </div>
                ))}

            </Space>
            <Pagination 
                    simple={{readOnly: true}} 
                    defaultCurrent={1} 
                    total={reviewList.length} 
                    pageSize={1}
                    current={currentPage}
                    onChange={(page) => setCurrentPage(page)}
            />
        </div>
    )
}