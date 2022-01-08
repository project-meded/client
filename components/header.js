import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";

const StyledLink = styled.a`
  color: ${(props) => (props.selected ? "#0082a9" : "#7d8a8d")};
  font-size: 1rem;
  font-family: Avenir-Light;

  &:hover {
    color: #0082a9;
    text-decoration: underline;
  }
`;

// 768 is md

const Header = () => {
  const { pathname } = useRouter();
  return (
    <div>
      <Row>
        <Col
          xl={{ span: 3, offset: 1 }}
          sm={{ span: 8, offset: 1 }}
          xs={{ span: 10, offset: 1 }}
        >
          <a href="/">
            <img src="/logo.png" style={{ width: "100%" }} />
          </a>
        </Col>
        <Col
          xl={{ span: 3, offset: 16 }}
          sm={{ span: 8, offset: 6 }}
          xs={{ span: 10, offset: 2 }}
        >
          <Row
            style={{ height: "100%" }}
            align="middle"
            justify="end"
            gutter={{ xs: 16, sm: 24, xl: 32 }}
          >
            <Col>
              <StyledLink href="/" selected={pathname == "/"}>
                HOME
              </StyledLink>
            </Col>
            <Col>
              <StyledLink href="/launch" selected={pathname == "/launch"}>
                LAUNCH
              </StyledLink>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
