import { Row, Col } from "antd";
import { Icon } from '@iconify/react';
import '../output.css'

export function HeaderNav() {
    const navItemStyle = "inline mr-2 text-xl"
    return (
        <div className="grow w-full mx-4">
            <Row>
                <Col span={8} className="p-4">
                    <Icon icon='fluent:food-16-regular' className={navItemStyle} /> 
                    Food
                </Col>
                <Col span={8} className="p-4">
                    <Icon icon='hugeicons:clothes' className={navItemStyle} />
                    Clothing
                </Col>
                <Col span={8} className="p-4">
                    <Icon icon="lucide:house-plus" className={navItemStyle} />
                    Living
                </Col>
            </Row>
            <Row>
                <Col span={8} className="p-4">
                    <Icon icon="hugeicons:car-01" className={navItemStyle} />
                    Transportation
                </Col>
                <Col span={8} className="p-4">
                    <Icon icon="streamline:quality-education" className={navItemStyle} />
                    Education
                </Col>
                <Col span={8} className="p-4">
                    <Icon icon="iconoir:gift" className={navItemStyle} />
                    Entertainment
                </Col>
            </Row>
        </div>
    )
}