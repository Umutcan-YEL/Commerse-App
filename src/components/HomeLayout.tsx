import {
  Card,
  Col,
  Layout,
  Menu,
  MenuProps,
  Pagination,
  Row,
  Select,
  Input,
  Button,
  InputNumber,
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
import { useEffect, useState } from "react";
import { ProductModel } from "../models/Product";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  _icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    children,
    label,
  } as MenuItem;
}

function HomeLayout(props: { productData: ProductModel[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, _setPageSize] = useState(16);
  const [selectedKey, setSelectedKey] = useState<string[]>();

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [totalCards, setTotalCards] = useState(props.productData.length);
  const [product, setProduct] = useState<ProductModel[]>();
  const [filteredData, setFilteredData] = useState<ProductModel[]>();

  const prices = props.productData.map((item) => item.price);

  useEffect(() => {
    setProduct(props.productData);
    setMaxPrice(Math.max(...prices));
    setMinPrice(Math.min(...prices));
  }, []);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const onClick = (e: { key: string }) => {
    if (e.key !== "0") {
      const filterData = product.filter((item) => item.category === e.key);
      const prices = filterData.map((item) => item.price);

      setMaxPrice(Math.max(...prices));
      setMinPrice(Math.min(...prices));
      setFilteredData(filterData);
      setTotalCards(filterData.length);
      setCurrentPage(1);
    }
  };

  const Filter = () => {
    if (minPrice != null || maxPrice != null) {
      if (
        filteredData == null ||
        filteredData == undefined ||
        filteredData.length < 0
      ) {
        const priceFilterData = props.productData.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
        setProduct(priceFilterData);
        setMinPrice(0);
        setMaxPrice(3000);
      } else {
        const priceFilterData = props.productData.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        );
        if (filteredData.length > 0) {
          const filterprice = priceFilterData.filter((item) =>
            filteredData[0].category.includes(item.category)
          );
          setFilteredData(filterprice);
          setMaxPrice(0);
          setMinPrice(3000);
        }
      }
    }
  };

  const HandleSort = (e) => {
    switch (e) {
      case "1":
        if (
          filteredData == null ||
          filteredData == undefined ||
          filteredData.length < 0
        ) {
          const sortedData = [...props.productData].sort(
            (a, b) => b.price - a.price
          );
          setProduct(sortedData);
        } else {
          const sortedData = [...filteredData].sort(
            (a, b) => b.price - a.price
          );
          setFilteredData(sortedData);
        }

        break;
      case "2":
        if (
          filteredData == null ||
          filteredData == undefined ||
          filteredData.length < 0
        ) {
          const sortedData = [...props.productData].sort(
            (a, b) => a.price - b.price
          );
          setProduct(sortedData);
        } else {
          const sortedData = [...filteredData].sort(
            (a, b) => a.price - b.price
          );
          setFilteredData(sortedData);
        }

        break;
      case "3":
        if (
          filteredData == null ||
          filteredData == undefined ||
          filteredData.length < 0
        ) {
          const sortedData = [...props.productData].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setProduct(sortedData);
        } else {
          const sortedData = [...filteredData].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          setFilteredData(sortedData);
        }

        break;
      case "4":
        if (
          filteredData == null ||
          filteredData == undefined ||
          filteredData.length < 0
        ) {
          const sortedData = [...props.productData].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          setProduct(sortedData);
        } else {
          const sortedData = [...filteredData].sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          setFilteredData(sortedData);
        }

        break;
      case "5":
        if (
          filteredData == null ||
          filteredData == undefined ||
          filteredData.length < 0
        ) {
          const sortedData = [...props.productData].sort(
            (a, b) => Number(a.rating) - Number(b.rating)
          );
          setProduct(sortedData);
        } else {
          const sortedData = [...filteredData].sort(
            (a, b) => Number(a.rating) - Number(b.rating)
          );
          setFilteredData(sortedData);
        }

        break;
      default:
        break;
    }
  };

  const renderCards = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    let currentCards;
    if (filteredData == undefined || filteredData == null) {
      currentCards = product?.slice(startIndex, endIndex);
    } else {
      currentCards = filteredData.slice(startIndex, endIndex);
    }

    return currentCards?.map((card) => (
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
    getItem("fragrances", "fragrances", <PieChartOutlined />),
    getItem("skincare", "skincare", <DesktopOutlined />),
    getItem("groceries", "groceries", <FileOutlined />),
    getItem("home decoration", "home-decoration", <FileOutlined />),
    getItem("Electronics", "7", <TeamOutlined />, [
      getItem("smartphones", "smartphones"),
      getItem("laptops", "laptops"),
    ]),
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <ShopFilled
          onClick={() => {
            setFilteredData(null);
            setSelectedKey(["0"]);
            setMaxPrice(Math.max(...prices));
            setMinPrice(Math.min(...prices));
            setTotalCards(props.productData.length);
          }}
          style={{ fontSize: "20px", color: "white", marginLeft: "2rem" }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={selectedKey}
          onClick={onClick}
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
            <InputNumber
              placeholder={"min :"}
              onChange={(e) => setMinPrice(Number(e))}
              value={minPrice}
              style={{
                width: "8rem",
                marginRight: "1rem",
                color: "red",
                marginBottom: "1rem",
              }}
            />
            <InputNumber
              value={maxPrice}
              placeholder={"max :"}
              onChange={(e) => setMaxPrice(Number(e))}
              style={{ width: "8rem", marginRight: "1rem", color: "red" }}
            />

            <Button
              type="primary"
              onClick={Filter}
              style={{ marginTop: "1rem" }}
            >
              Filter{" "}
            </Button>
          </Row>
        </Sider>
        <Content>
          <div style={{ overflow: "initial", minHeight: "80vh" }}>
            <Select
              style={{ width: 200, marginTop: "1rem", marginLeft: "1rem" }}
              onChange={HandleSort}
              value={"Sort"}
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
