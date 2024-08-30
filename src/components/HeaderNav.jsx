import { Row, Col, Flex } from "antd";
import { Icon } from '@iconify/react';
import '../output.css'

export function HeaderNav() {
    return (
        <Flex vertical justify="center" align="center" className="h-full">
            <Row gutter={[0, 10]}>
                <Col span={8}>
                    <Icon icon='fluent:food-16-regular' /> 
                    Food
                </Col>
                <Col span={8}>
                    <Icon icon='hugeicons:clothes' />
                    Clothing
                </Col>
                <Col span={8}>
                    <Icon icon="lucide:house-plus" />
                    Living
                </Col>
            
                <Col span={8}>
                    <Icon icon="hugeicons:car-01" />
                    Transportation
                </Col>
                <Col span={8}>
                    <Icon icon="streamline:quality-education" />
                    Education
                </Col>
                <Col span={8}>
                    <Icon icon="iconoir:gift"/>
                    Entertainment
                </Col>
            </Row>
        </Flex>
    )
}