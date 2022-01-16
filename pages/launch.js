import React, { useState, useEffect } from "react";
import createPersistedState from 'use-persisted-state'; //local-storage
import {
  Row,
  Col,
  Button,
  Typography,
  Input,
  Divider,
  Card,
  Select,
  Checkbox,
  Pagination,
} from "antd";
import { categories } from "../components/constants";
import { useRouter } from "next/router";
import { SearchOutlined, StarOutlined, StarFilled, CaretDownFilled } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import axios from "axios";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const { Text } = Typography;
const { Option } = Select;

const ArrowRightSvg = () => (
  <svg width="50%" height="50%" fill="customColor" viewBox="-20 7 40 10" transform="translate(0 1.5)">
    <path d="M12 13h-32v-2h32V7l8 5-8 5z" fill="white" strokeWidth="0.05988212180746562" />
  </svg>
);

const ArrowRightIcon = props => <Icon component={ArrowRightSvg} {...props} />;

const useStarredState = createPersistedState('starred');

const Launch = () => {
  const router = useRouter();

  const {
    query: { category: categoryId, q, a, i, l, d, e, f, p },
  } = router;

  const [opportunities, setOpportunities] = useState([]);
  const [opportunityIndex, setOpportunityIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [_, setSelectedCategoriesLength] = useState(0);
  const [text, setText] = useState("");

  const [areas, setAreas] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [locations, setLocations] = useState([]);

  const [selectedArea, setArea] = useState();
  const [selectedInstitution, setInstitution] = useState();
  const [selectedLocation, setLocation] = useState();

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedEligibility, setSelectedEligibility] = useState([]);

  const [funding, setFunding] = useState(false);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);

  const [starred, setStarred] = useStarredState([]);

  const updateStarred = (opportunityId) => {
    starred.includes(opportunityId)
    ? setStarred(starred.filter(oid => oid != opportunityId))
    : setStarred(prev => [...prev, opportunityId]);
  };

  // renderPagination goes from line 76 to 288
  const renderPagination = () => {
    if (opportunities.length > 0) {
      return (
        <Col>
          <Pagination
            current={Number(page)}
            total={length}
            showSizeChanger={false}
            pageSize={6}
            onChange={(newPage) => {
              const params = [];

              if (selectedCategories.length > 0)
                params.push(`category=${selectedCategories.join(",")}`);
              if (text) params.push(`q=${text}`);

              if (selectedArea) params.push(`a=${selectedArea}`);
              if (selectedInstitution)
                params.push(`i=${selectedInstitution}`);
              if (selectedLocation)
                params.push(`l=${selectedLocation}`);
              if (selectedDates.length > 0)
                params.push(`d=${selectedDates.join(",")}`);
              if (selectedEligibility.length > 0)
                params.push(`e=${selectedEligibility.join(",")}`);
              if (funding) params.push(`f=${funding}`);

              location.href = `/launch?p=${newPage}${
                params.length > 0 ? "&" + params.join("&") : ""
              }`;
            }}
          />
        </Col>
        );
    } else {
      return <Col></Col>;
    }
  }

  //renderInfoCard goes from line 93 to 254
  const renderInfoCard = () => {
    if (opportunities.length > 0 && !loading) {
      return (
        <Card style={{ width: "100%", borderRadius: "15px"}}>
          <Row align="middle" gutter={[0, 16]}>
            <Col sm={16} xs={24}>
              <div>
                <div>
                  <Text style={{ color: "#7D8A8D", fontFamily: "Avenir-Medium" }}>
                    {opportunities[opportunityIndex] && !loading
                      ? opportunities[opportunityIndex].experience
                      : ""}
                  </Text>
                </div>
                <div>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {opportunities[opportunityIndex]
                      ? opportunities[opportunityIndex].name
                      : ""}
                  </Text>
                </div>
              </div>
            </Col>
            <Col 
              xl={{ offset: 2, span: 2 }} 
              sm={{ span: 6 }}
            >
              <Button
                style={{
                  borderRadius: "15px",
                  width: "45px",
                  height: "45px",
                  backgroundColor: "#e2e7e9"
                }}
                onClick={() => updateStarred(opportunities[opportunityIndex]._id)}
                icon={
                  starred.includes(opportunities[opportunityIndex]._id)
                  ? <StarFilled style={{ color: "#FF9E6D", fontSize: "210%" }} />
                  : <StarOutlined style={{ color: "#FF9E6D", fontSize: "210%" }} />
                }
              >
              </Button>
            </Col>
            <Col xl={{ offset: 0, span: 4 }} sm={{ span: 6 }}>
              <Button
                style={{
                  borderRadius: "15px",
                  width: "130px",
                  height: "45px",
                  backgroundColor: opportunities[opportunityIndex].website
                                    ? "#FF9E6D"
                                    : "#AEAEAE",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(opportunities[opportunityIndex].website, "_blank");
                  }
                }
                disabled={!opportunities[opportunityIndex].website}
              >
                <Text style={{ color: "white", fontFamily: "Avenir-Light" }}>Apply!</Text>
              </Button>
            </Col>
          </Row>

          <Row style={{ marginTop: 12 }} gutter={[0, 8]}>
            <Col md={12} sm={24} xs={24}>
              <div>
                <Text style={{ fontFamily: "Avenir-Black" }} strong>Institution</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].institution
                  : ""}
              </Text>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <div>
                <Text style={{ fontFamily: "Avenir-Black" }} strong>Location</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].location
                  : ""}
              </Text>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <div>
                <Text style={{ fontFamily: "Avenir-Black" }} strong>Application Deadline</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].deadline
                  : ""}
              </Text>
            </Col>
            <Col md={12} sm={24} xs={24}>
              <div>
                <Text strong style={{ fontFamily: "Avenir-Black" }}>Dates</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].dates
                  : ""}
              </Text>
            </Col>
          </Row>

          <hr style={{ border:"none", height: "50px", boxShadow: "0 10px 10px -10px #cccccc", margin: "-30px auto 20px" }}/>

          <Row gutter={[0, 8]}>
            <Col span={24}>
              <div>
                <Text style={{ fontFamily: "Avenir-Black" }} strong>Area of Study</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].area
                  : ""}
              </Text>
            </Col>
            <Col span={24}>
              <div>
                <Text style={{ fontFamily: "Avenir-Black" }} strong>Eligibility</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].eligibility
                  : ""}
              </Text>
            </Col>
            <Col span={24}>
              <div>
                <Text style={{ fontFamily: "Avenir-Black" }} strong>Funding</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].stipend
                  : ""}
              </Text>
            </Col>
            <Col span={24}>
              <div>
                <Text style={{ fontFamily: "Avenir-Black" }} strong>Description</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light", whiteSpace: "pre-wrap" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].description
                  : ""}
              </Text>
            </Col>
            <Col span={24}>
              <div>
                <Text style={{ fontFamily: "Avenir-Black" }} strong>Application Requirements</Text>
              </div>
              <Text style={{ fontFamily: "Avenir-Light", whiteSpace: "pre-wrap" }}>
                {opportunities[opportunityIndex]
                  ? opportunities[opportunityIndex].requirements
                  : ""}
              </Text>
            </Col>
          </Row>
        </Card>
      );
    } else if (loading) {
      return (
        <Card style={{ width: "100%", borderRadius: "15px" }}>
          <Skeleton count={10}/>
        </Card>
      );
    } else {
      return <Card style={{ width: "100%", borderRadius: "15px", borderColor: "transparent", backgroundColor: "transparent" }}></Card>
    }
  }

  //also renders loading opportunities
  const renderResultCount = () => {
    if (!loading) {
      return (
        <Col>
          <Text style={{ fontFamily:"Avenir-Light", fontSize: "15px" }}>{length} {length==1 ? "result" : "results"}</Text>
        </Col>
      );
    } else {
      return (
        <div>
          <Row style={{ marginTop:"38px" }} gutter={[150, 16]} justify="end">
            {Array.from({ length: 3 }, (_, i) =>
              <Col span={24}>
                <Card
                  style={{
                    borderRadius: "15px",
                    width: "100%",
                  }}
                >
                  <Skeleton count={5} width="100%"/>
                </Card>
              </Col>)}
          </Row>
        </div>
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, [router.isReady]);

  const fetchData = async () => {
    if (!router.isReady) return;

    //update state and params
    const params = {};
    if (categoryId) {
      setSelectedCategories(categoryId.split(","));
      params.c = categoryId;
    }
    if (q) {
      setText(q);
      params.q = q;
    }
    if (a) {
      setArea(a.split(","));
      params.a = a;
    }
    if (i) {
      setInstitution(i.split(","));
      params.i = i;
    }
    if (l) {
      setLocation(l.split(","));
      params.l = l;
    }
    if (d) {
      setSelectedDates(d.split(","));
      params.d = d;
    }
    if (e) {
      setSelectedEligibility(e.split(","));
      params.e = e;
    }
    if (f) {
      setFunding(f);
      params.f = f;
    }
    if (p) {
      setPage(p);
      params.p = p;
    }

    setLoading(true);
    const { data } = await axios.get( 
      process.env.NEXT_PUBLIC_SERVER + "/api/opportunities",
      {params: params}
    );
    setLoading(false);

    setOpportunities(data.opportunities);
    setLength(data.length);
    setAreas(data.areas);
    setInstitutions(data.institutions);
    setLocations(data.locations);
  };

  console.log(page);

  return (
    <div>
      <Row>
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
                  borderRadius: '100px', 
                  height: '100%', 
                  fontFamily: 'Avenir-Light'
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
                  disabled = { category.id == 'volunteering' && funding }
                  style={{
                    fontFamily: "Avenir-Light",
                    borderRadius: "100px",
                    height: "100%",
                    width: "100%",
                    backgroundColor:
                      selectedCategories.indexOf(category.id) != -1
                        ? "#00A4CA"
                        : "white",
                  }}
                  onClick={() => {
                    let backup = selectedCategories;
                    const existing = backup.find((item) => item == category.id);
                    if (existing)
                      backup = backup.filter((item) => item !== category.id);
                    else backup.push(category.id);
                    setSelectedCategories(backup);
                    setSelectedCategoriesLength(backup.length);
                  }}
                >
                  <Text
                    style={{
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
                  height: "36px",
                  width: "50%",
                  backgroundColor: "#00A4CA",
                }}
                onClick={() => {
                  const params = [];

                  if (selectedCategories.length > 0)
                    params.push(`category=${selectedCategories.join(",")}`);
                  if (text) params.push(`q=${text}`);

                  if (selectedArea) params.push(`a=${selectedArea}`);
                  if (selectedInstitution)
                    params.push(`i=${selectedInstitution}`);
                  if (selectedLocation) params.push(`l=${selectedLocation}`);
                  if (selectedDates.length > 0)
                    params.push(`d=${selectedDates.join(",")}`);
                  if (selectedEligibility.length > 0)
                    params.push(`e=${selectedEligibility.join(",")}`);
                  if (funding) params.push(`f=${funding}`);

                  location.href = `/launch${
                    params.length > 0 ? "?" + params.join("&") : ""
                  }`;
                }}
                icon={<ArrowRightSvg />}
              />
            </Col>
          </Row>
        </Col>
        <Col span={2} />
      </Row>

      <hr style={{ border:"none", height: "50px", boxShadow: "0 10px 10px -10px #cccccc", margin: "-30px auto 20px" }}/>

      <Row>
        <Col span={3} />
        <Col span={18}>
          <Row gutter={[{ xl: 32, md: 24, sm: 16, xs: 8 }, 16]}>
            <Col
              xl={{ span: 4 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              xs={{ span: 12 }}
            >
              <Select
                placeholder={"Area of Study"}
                style={{ width: "100%", fontFamily: "Avenir-Light" }}
                mode="multiple"
                onChange={(value) => setArea(value)}
                value={selectedArea}
                showArrow={true}
                suffixIcon={<CaretDownFilled/>}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {areas.map((area) => (
                  <Option key={area.id} value={area.id}>{area.name}</Option>
                ))}
              </Select>
            </Col>
            <Col
              xl={{ span: 4 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              xs={{ span: 12 }}
            >
              <Select
                placeholder={"Institution"}
                style={{ width: "100%", fontFamily: "Avenir-Light" }}
                onChange={(value) => setInstitution(value)}
                value={selectedInstitution}
                mode="multiple"
                showArrow={true}
                suffixIcon={<CaretDownFilled/>}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {institutions.map((institution) => (
                  <Option key={institution.id} value={institution.id}>{institution.name}</Option>
                ))}
              </Select>
            </Col>
            <Col
              xl={{ span: 4 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              xs={{ span: 12 }}
            >
              <Select
                placeholder={"Location"}
                style={{ width: "100%", fontFamily: "Avenir-Light" }}
                onChange={(value) => setLocation(value)}
                value={selectedLocation}
                mode="multiple"
                showArrow={true}
                suffixIcon={<CaretDownFilled/>}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {locations.map((location) => (
                  <Option key={location.id} value={location.id}>{location.name}</Option>
                ))}
              </Select>
            </Col>
            <Col
              xl={{ span: 4 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              xs={{ span: 12 }}
            >
              <Select
                placeholder={"Dates"}
                style={{ width: "100%", fontFamily: "Avenir-Light" }}
                mode="multiple"
                onChange={(value) => setSelectedDates(value)}
                value={selectedDates}
                showArrow={true}
                suffixIcon={<CaretDownFilled/>}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={"1"}>All Year</Option>
                <Option value={"2"}>Summer</Option>
                <Option value={"3"}>Academic Year</Option>
              </Select>
            </Col>
            <Col
              xl={{ span: 4 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              xs={{ span: 12 }}
            >
              <Select
                placeholder={"Eligibility"}
                style={{ width: "100%", fontFamily: "Avenir-Light" }}
                mode="multiple"
                onChange={(value) => setSelectedEligibility(value)}
                value={selectedEligibility}
                showArrow={true}
                suffixIcon={<CaretDownFilled/>}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value={"9"}>9th</Option>
                <Option value={"10"}>10th</Option>
                <Option value={"11"}>11th</Option>
                <Option value={"12"}>12th</Option>
                <Option value={"freshman"}>Freshman</Option>
                <Option value={"sophomore"}>Sophomore</Option>
                <Option value={"junior"}>Junior</Option>
                <Option value={"senior"}>Senior</Option>
              </Select>
            </Col>

            <Col
              xl={{ span: 4 }}
              md={{ span: 6 }}
              sm={{ span: 12 }}
              xs={{ span: 12 }}
            >
              <Button style={{ width: "100%", borderRadius: "100px" }}>
                <Checkbox
                  style={{ fontFamily: "Avenir-Light" }}
                  checked={funding}
                  disabled={ selectedCategories.includes('volunteering') }
                  onChange={(e) => setFunding(e.target.checked)}
                >
                  Funding
                </Checkbox>
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={3} />
      </Row>

      <Row style={{ marginTop: 20 }}>
        <Col sm={1} xs={1} />
        <Col sm={22} xs={22}>
          <Row gutter={[0, 32]}>
            <Col sm={{ span: 8, order: 1 }} xs={{ span: 24, order: 2 }}>
              <Row gutter={[0, 16]} justify="end">
                {renderResultCount()}
                {opportunities.map((opportunity, index) => (
                  <Col span={24} key={opportunity.id}>
                    <Card
                      style={{
                        borderRadius: "15px",
                        width: "100%",
                        borderStyle: "solid",
                        borderColor:
                          index == opportunityIndex ? "#00A4CA" : null,
                      }}
                      hoverable
                      onClick={() => setOpportunityIndex(index)}
                    >
                      <Row gutter={[0, 8]}>
                        <Col span={16}>
                          <div>
                            <Text style={{ color: "#7D8A8D", fontFamily: "Avenir-Medium" }}>
                              {opportunity.experience}
                            </Text>
                          </div>
                          <div>
                            <Text
                              style={{
                                fontFamily: "Avenir-Black",
                                color: "black",
                                fontSize: 18,
                                fontWeight: "bold"
                              }}
                            >
                              {opportunity.name}
                            </Text>
                          </div>
                        </Col>
                        <Col md={8} sm={24} xs={24}>
                          <Button
                            style={{
                              borderRadius: "15px",
                              width: "45px",
                              height: "45px",
                              marginLeft: "90%",
                              backgroundColor: "#e2e7e9",
                              position:"relative", 
                              right: "calc(30%)"
                            }}
                            onClick={() => updateStarred(opportunity._id)}
                            icon={
                              starred.includes(opportunity._id)
                              ? <StarFilled style={{ color: "#FF9E6D", fontSize: "210%" }} />
                              : <StarOutlined style={{ color: "#FF9E6D", fontSize: "210%" }} />
                            }
                          >
                          </Button>
                        </Col>

                        <Col md={12} sm={24} xs={24}>
                          <div>
                            <Text style={{ fontFamily: "Avenir-Black" }} strong>Institution</Text>
                          </div>
                          <Text style={{ fontFamily: "Avenir-Light" }}>{opportunity.institution}</Text>
                        </Col>
                        <Col md={12} sm={24} xs={24}>
                          <div>
                            <Text style={{ fontFamily: "Avenir-Black" }} strong>Location</Text>
                          </div>
                          <Text style={{ fontFamily: "Avenir-Light" }} >{opportunity.location}</Text>
                        </Col>

                      </Row>
                    </Card>
                  </Col>
                ))}
                {renderPagination()}
              </Row>
            </Col>
            <Col
              sm={{ offset: 1, span: 15, order: 2 }}
              xs={{ span: 24, order: 1 }}
            >
              {renderInfoCard()}
            </Col>
          </Row>
        </Col>
        <Col sm={1} xs={1} />
      </Row>
    </div>
  );
};

export default Launch;
