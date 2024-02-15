import { useSelector } from "react-redux";
import { ProductStateModel } from "../models/State";
import {
  Card,
  Col,
  Layout,
  Menu,
  MenuProps,
  Pagination,
  Row,
  Slider,
  Select,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  ShopFilled,
  TeamOutlined,
} from "@ant-design/icons";
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
    children,
    label,
  } as MenuItem;
}

function HomeLayout() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(16);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [price, setPrice] = useState<number[]>([0, 1799]);
  const productData = useSelector(
    (state: ProductStateModel) => state.product.productData.products
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  let productdata = productData;

  switch (filter) {
    case "1":
      productdata = productdata.filter(
        (item) => item.category === "fragrances"
      );
      break;
    case "2":
      productdata = productdata.filter((item) => item.category === "skincare");
      break;
    case "3":
      productdata = productdata.filter((item) => item.category === "groceries");
      break;
    case "4":
      productdata = productdata.filter(
        (item) => item.category === "home-decoration"
      );
      break;
    case "6":
      productdata = productdata.filter(
        (item) => item.category === "smartphones"
      );
      break;
    case "7":
      productdata = productdata.filter((item) => item.category === "laptops");
      break;
    case "0":
      break;
    default:
      break;
  }

  switch (sort) {
    case "1":
      productdata = [...productdata].sort((a, b) => b.price - a.price);
      break;
    case "2":
      productdata = [...productdata].sort((a, b) => a.price - b.price);

      break;
    case "3":
      productdata = [...productdata].sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      break;
    case "4":
      productdata = [...productdata].sort((a, b) =>
        b.title.localeCompare(a.title)
      );

      break;
    case "5":
      productdata = [...productdata].sort(
        (a, b) => Number(a.rating) - Number(b.rating)
      );

      break;
    case "0":
      break;
    default:
      break;
  }

  productdata = productdata.filter(
    (item) => item.price >= price[0] && item.price <= price[1]
  );

  const data = productdata.map((product) => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category,
      brand: product.brand,
    };
  });

  const prices = data.map((item) => item.price);

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
  const onClick = (e: { key: string }) => {
    console.log(e.key);
    setFilter(e.key);
  };

  const onSort = (e: string) => {
    setSort(e);
  };


  const minprice = Math.min(...prices);
  const maxprice = Math.max(...prices);

  const items1: MenuItem[] = [
    getItem("fragrances", "1", <PieChartOutlined />),
    getItem("skincare", "2", <DesktopOutlined />),
    getItem("groceries", "3", <FileOutlined />),
    getItem("home decoration", "4", <FileOutlined />),
    getItem("Electronics", "5", <TeamOutlined />, [
      getItem("smartphones", "6"),
      getItem("laptops", "7"),
    ]),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <ShopFilled
          onClick={() => setFilter("0")}
          style={{ fontSize: "20px", color: "white", marginLeft: "2rem" }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={onClick}
          selectedKeys={[filter]}
          defaultSelectedKeys={[filter]}
          items={items1}
          style={{ flex: 1, minWidth: 0, marginLeft: "9rem" }}
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
          <Row style={{ marginLeft: "20%", marginTop: "10vh" }}>
            <h3 style={{ textAlign: "center" }}>Price Range :</h3>
            <Slider
              min={0}
              max={2000}
              style={{ width: "8rem", marginRight: "1rem", color: "red" }}
              range={true}
              onChangeComplete={(value) => setPrice(value)}
              defaultValue={[minprice, maxprice]}
            />
          </Row>
        </Sider>
        <Content>
          <div style={{ overflow: "initial", minHeight: "80vh" }}>
            <Select
              style={{ width: 200, marginTop: "1rem", marginLeft: "1rem" }}
              onChange={onSort}
              placeholder="Select to sort"
              options={[
                {
                  value: "1",
                  label: "Price : high to low",
                },
                {
                  value: "2",
                  label: "Price : low to high",
                },
                {
                  value: "3",
                  label: "A - Z",
                },
                {
                  value: "4",
                  label: "Z - A",
                },
                {
                  value: "5",
                  label: "Rating",
                },
              ]}
            />
            <Row> {renderCards()}</Row>
          </div>{" "}
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

export default HomeLayout;
