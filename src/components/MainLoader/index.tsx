import { Card, Col, Flex, Row, Skeleton } from "antd";

export const MainLoader = () => {
  return (
    <Flex justify="center" role="loading-skeleton">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card className="ant-card-skeleton">
            <Skeleton loading active />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="ant-card-skeleton">
            <Skeleton loading active />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="ant-card-skeleton">
            <Skeleton loading active />
          </Card>
        </Col>
      </Row>
    </Flex>
  );
};
