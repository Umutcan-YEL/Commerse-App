import { Card, Col, Layout, Menu, Pagination, Row } from "antd";
import type { MenuProps } from "antd";
const { Header, Content, Sider } = Layout;
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { ProductStateModel } from "../models/State";
import { useState } from "react";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function MainLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(16);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { isLoading, productData } = useSelector(
    (state: ProductStateModel) => state.product
  );

  if (isLoading) {
    return (
      <div className="center">
        <span className="loader"></span>
      </div>
    );
  }

  const data = productData?.products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
    };
  });

  const totalCards = data.length;

  const renderCards = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentCards = data.slice(startIndex, endIndex);

    return currentCards.map((card) => (
      <Col key={card.id}>
        <br />
        <Card
          className="product-card"
          hoverable
          cover={
            <img
              className="product-img"
              src={card.thumbnail}
              alt={card.title}
            />
          }
        >
          <div>
            <p>{card.title}</p>

            <p>{card.price} $</p>
          </div>
        </Card>
        <br />
        <br />
      </Col>
    ));
  };

  const items1: MenuItem[] = [
    getItem("fragrances", "1", <PieChartOutlined />),
    getItem("skincare", "2", <DesktopOutlined />),
    getItem("groceries", "3", <FileOutlined />),
    getItem("home decoration", "4", <FileOutlined />),
    getItem("Electronics", "sub2", <TeamOutlined />, [
      getItem("smartphones", "5"),
      getItem("laptops", "laptops"),
    ]),
    getItem("groceries", "6", <FileOutlined />),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0, marginLeft: "10rem" }}
        />
      </Header>
      <Layout>
        <Sider
          collapsible
          style={{
            color: "white",
            overflow: "auto",
            minHeight: "93vh",
            left: 0,
            bottom: 0,
          }}
        >
          <Row style={{ marginLeft: "30%", marginTop: "10vh" }}>
            <div>abc</div>
          </Row>
        </Sider>
        <Content>
          <div style={{ overflow: "initial" ,minHeight:"80vh"}}>
            <Row> {renderCards()}</Row>
          </div>
            {" "}
            <Pagination
              className="product-pagination"
              current={currentPage}
              total={totalCards}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
            <br />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
