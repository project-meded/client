import React from "react";
import { Row, Col, Dropdown, Menu, Button } from "antd";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";
import useStarred from "./starred";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";

const StyledButton = styled.button`
  color: white;
  font-size: 1rem;
  font-family: Avenir-Light;
  border-radius: 30px;
  border-color: transparent;
  background: #FF9E6D;

  &:hover {
    color: white;
    text-decoration: underline;
    text-decoration-color: #0082a9;
  }
`;

var starredData, setStarredData;

async function updateStarredData(starred) {
  //arr 1 is the array of opportunity objects that we currently have, arr2 is an array of strings represending the current opportunity ids
  //the goal is to update the data that we currently have according to the array of strings stored in the localstorage (arr2)
  const arr1 = starredData;
  const arr2 = starred;
  
  const data = [];
  const needToFetch = []; //opportunities that need to be fetched

  //convert arr1 (array of opportunity objects) to an object (keys are oppotunity ids)
  const obj1 = {};
  for (const o of arr1) {
    obj1[o._id] = o;
  }
  // push opportunity objects to data
  arr2.forEach(opportunityId => {
    if (Object.keys(obj1).includes(opportunityId)) { //if we already have the data
      data.push(obj1[opportunityId])
    } else {
      needToFetch.push(opportunityId)
    }
  })
  // fetch needed data
  if (needToFetch.length > 0) {
    const response = await axios.get( 
      process.env.NEXT_PUBLIC_SERVER + "/api/opportunities?o=" + needToFetch.join(",")
    )
    data.push(...response.data.opportunities);
  }
  setStarredData(data);
}

const handleCrossIconClick = (opportunityId, starred, updateStarred) => {
  updateStarred(opportunityId);
  var index = starred.indexOf(opportunityId);
  if (index !== -1) {
    starred.splice(index, 1);
    starredData.splice(index, 1);
  }
  setStarredData(starredData);
}

const menu = (starred, updateStarred) => {
  if (starred.length) {
    return (
      <Menu style={{ borderRadius:10, marginRight:10 }}>
        {starredData.map((opportunity, index) => (
          <Menu.Item
            key={index.toString()}
          >
            <Col
              style={{ marginRight:15 }}
              onClick={(e) => {
                window.open('/launch?o='+opportunity._id, "_blank");
                }
              }
                >{opportunity.name}</Col>
            <div 
              onClick={ (e) => {
                e.stopPropagation();
                handleCrossIconClick(opportunity._id, starred, updateStarred);
              }}>
                <CloseOutlined style={{ marginRight:10, color:"grey" }}/>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    )
  } else {
    return (
      <Menu style={{ borderRadius:10, marginRight:10 }}>
        <Menu.Item  disabled>You have not starred any opportunities.</Menu.Item>
      </Menu>
    )
  }
}
// 768 is md
const Header = () => {
  const { pathname } = useRouter();
  const { starred, updateStarred } = useStarred();

  [starredData, setStarredData] = useState([]); //array of opportunity objects

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
            <Col sm={12}>
              <StyledButton onClick={(e) => {
                  e.preventDefault();
                  window.open("/", "_self");
                  }}>
                MEDLaunch
              </StyledButton>
            </Col>
            <Col sm={12}>
              <Dropdown 
                overlay={menu(starred, updateStarred)} 
                placement="bottomCenter"
                trigger={['click']}
                onClick={ e => updateStarredData(starred)}
                >
                <Button 
                  style={{ 
                    fontSize:"1rem", 
                    fontFamily:"Avenir-Light",
                    borderColor: "transparent"
                  }}
                >
                  My List
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
