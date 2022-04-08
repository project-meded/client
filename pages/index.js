import React, { useState } from "react";
import { Row, Col, Typography, Button, Input } from "antd";
import { categories } from "../components/constants";
import { SearchOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons";

const { Text } = Typography;

import styled from "styled-components";

const Banner = ({ className }) => (
  <Text className={className} strong>
    <div style={{ color: "#FF9E6D" }}>Launch</div> into your passions.
  </Text>
);

const StyledBanner = styled(Banner)`
  color: white;
  font-size: 2rem;
  font-family: Avenir-Heavy;

  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
`;

const ArrowRightSvg = () => (
  <svg width="50%" height="50%" fill="white" viewBox="-20 7 40 10">
    <path d="M12 13h-32v-2h32V7l8 5-8 5z" fill="customColor" strokeWidth="0.05988212180746562" />
  </svg>
);

const ArrowRightIcon = props => <Icon component={ArrowRightSvg} {...props} />;

const Index = () => {
  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [_, setSelectedCategoriesLength] = useState(0);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <img
          src="/main-1.jpg"
          style={{
            width: "100%",
            height: 600,
            objectFit: "cover",
            objectPosition: "50% 50%",
            opacity: 0.7,
          }}
        />
        <div style={{ fontFamily: "Avenir-Light" }}>"Human embryonic stem cells only A", derivative work by Nissim Benvenisty, licensed under CC BY 2.5</div>

        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            width: "100%",
          }}
        >
          <Row>
            <Col
              xl={{ span: 4, offset: 2 }}
              sm={{ span: 10, offset: 2 }}
              xs={{ span: 16, offset: 2 }}
            >
              <div style={{ width: "100%" }}>
                <StyledBanner />
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: 20 }}>
            <Col span={2} />
            <Col span={20}>
              <Row gutter={[{ xl: 32, md: 24, sm: 16, xs: 8 }, 16]}>
                <Col
                  xl={{ span: 5 }}
                  md={{ span: 12 }}
                  sm={{ span: 12 }}
                  xs={{ span: 24 }}
                >
                  <Input
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    style={{
                      borderRadius: "100px", 
                      height: "100%", 
                      fontFamily: "Avenir-Light",
                    }}
                  />
                </Col>
                {categories.map((category) => (
                  <Col
                    xl={{ span: 4 }}
                    md={{ span: 4 }}
                    sm={{ span: 12 }}
                    xs={{ span: 12 }}
                    key={category.id}
                  >
                    <Button
                      style={{
                        borderRadius: "100px",
                        width: "100%",
                        height: "100%",
                        backgroundColor:
                          selectedCategories.indexOf(category.id) != -1
                            ? "#00A4CA"
                            : "white",
                      }}
                      onClick={() => {
                        let backup = selectedCategories;
                        const existing = backup.find(
                          (item) => item == category.id
                        );
                        if (existing)
                          backup = backup.filter(
                            (item) => item !== category.id
                          );
                        else backup.push(category.id);
                        setSelectedCategories(backup);
                        setSelectedCategoriesLength(backup.length);
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Avenir-Light",
                          color:
                            selectedCategories.indexOf(category.id) != -1
                              ? "white"
                              : "#00A4CA",
                        }}
                        strong
                      >
                        {category.name}
                      </Text>
                    </Button>
                  </Col>
                ))}
                <Col
                  xl={{ span: 3 }}
                  md={{ span: 6 }}
                  sm={{ span: 12 }}
                  xs={{ span: 12 }}
                >
                  <Button
                    style={{
                      borderRadius: "100px",
                      width: "50%",
                      height: "36px",
                      backgroundColor: "#ff9e6c",
                    }}
                    onClick={() => {
                      const params = [];

                      if (selectedCategories.length > 0)
                        params.push(`category=${selectedCategories.join(",")}`);
                      if (text) params.push(`q=${text}`);

                      location.href = `/launch${
                        params.length > 0 ? "?" + params.join("&") : ""
                      }`;
                    }}
                    icon={<ArrowRightIcon />}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={2} />
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Index;
