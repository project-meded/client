import React, { Component } from "react";
import { InstagramFilled, LinkedinFilled } from "@ant-design/icons";
import { Row, Col, Typography, Divider } from "antd";

const { Text } = Typography;

class Footer extends Component {
  render() {
    return (
      <div>
        <Divider />

        <Row justify="center" gutter={16} style={{ width: "100%" }}>
          <Col>
            <a href="https://www.instagram.com/projectmeded/" target="_blank">
              <InstagramFilled style={{ fontSize: 20, color: "#7d8a8d" }} />
            </a>
          </Col>
          <Col>
            <a
              href="https://www.linkedin.com/company/project-meded/about/"
              target="_blank"
            >
              <LinkedinFilled style={{ fontSize: 20, color: "#7d8a8d" }} />
            </a>
          </Col>
        </Row>

        <Row
          justify="center"
          gutter={16}
          style={{ marginTop: 20, paddingBottom: 20, width: "100%" }}
        >
          <Col>
            <Text style={{ fontFamily: "Avenir-Roman" }}>
              Made by{" "}
              <span style={{ fontWeight: "bold", color: "#0082a9" }}>
                Med
              </span>
            </Text>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Footer;
