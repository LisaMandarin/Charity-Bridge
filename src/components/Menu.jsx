import { Col, Row } from "antd";

export function Menu() {
    const menuStyle = {
        width: '100%',
        margin: '16px'
    }
    return (
        <div style={menuStyle}>
            <Row style={{margin: '8px'}}>
                <Col span={8}>Food</Col>
                <Col span={8}>Clothing</Col>
                <Col span={8}>Housing</Col>
            </Row>
            <Row style={{margin: '8px'}}>
                <Col span={8}>Transportation</Col>
                <Col span={8}>Education</Col>
                <Col span={8}>Entertainment</Col>
            </Row>
        </div>
    )
}