import React, { useState } from "react";
import { Row, Col, Card, Statistic, Tabs } from "antd";
import styles from "./Dashboard.module.css";
import Map from "./Map/Map";
import ReactLoading from "react-loading";
import {
  BsGenderFemale,
  BsGenderMale,
  BsFillPeopleFill,
  BsFillHeartFill,
} from "react-icons/bs";

import { FaRegMoneyBillAlt, FaBirthdayCake } from "react-icons/fa";
import { MdPlace } from "react-icons/md";

const { TabPane } = Tabs;

const Dashboard = () => {
  const [areaData, setAreaData] = useState(null);
  const [proData, setProData] = useState();
  const [genData, setGenData] = useState();

  return (
    <div className={styles.rowStretch}>
      <Row gutter={[16, 16]} justify="center" align="middle">
        <Col xs={(24, { order: 2 })} md={12}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="General Stats" key="1">
              {genData != null ? (
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<BsGenderFemale />}
                        title="Females"
                        value={genData[0].female}
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<BsFillPeopleFill />}
                        title="Total Users"
                        value={genData[0].totalUsers}
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<BsGenderMale />}
                        title="Males"
                        value={genData[0].male}
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<FaBirthdayCake />}
                        title="Total Pro Users"
                        value={proData[0].totalUsers}
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<BsFillHeartFill />}
                        title="Total Matches"
                        value={genData[0].total_matches}
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<FaRegMoneyBillAlt />}
                        title="Contribution to revenue"
                        precision={2}
                        value={proData[0].totalRevPercentage}
                        suffix="%"
                      />
                    </Card>
                  </Col>

                  <Col span={24}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<FaRegMoneyBillAlt />}
                        title="Ratio of Pro Users to Total Users"
                        precision={2}
                        value={proData[0].totalUsers / genData[0].totalUsers}
                      />
                    </Card>
                  </Col>
                </Row>
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ReactLoading type="bubbles" color="var(--mauve)" />
                </div>
              )}
            </TabPane>
            <TabPane tab="Area Specific Stats" key="2">
              {areaData != null ? (
                <Row gutter={[16, 16]} justify="center" align="middle">
                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<BsGenderFemale />}
                        title="Females"
                        value={areaData.female}
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<BsFillPeopleFill />}
                        title="Total Users"
                        value={areaData.totalUsers}
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<BsGenderMale />}
                        title="Males"
                        value={areaData.male}
                      />
                    </Card>
                  </Col>

                  <Col span={16}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<FaBirthdayCake />}
                        title="Total Pro Users"
                        value={proData[areaData.area_id].totalUsers}
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<BsFillHeartFill />}
                        title="Total Matches"
                        value={areaData.totalMatches}
                      />
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<MdPlace />}
                        title="Location"
                        value={areaData.areaName}
                      />
                    </Card>
                  </Col>

                  <Col span={12}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<FaRegMoneyBillAlt />}
                        title="Ratio of Pro Users to Total Users"
                        precision={2}
                        value={
                          proData[areaData.area_id].totalUsers /
                          genData[areaData.area_id].totalUsers
                        }
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<FaRegMoneyBillAlt />}
                        title="Contribution to revenue"
                        precision={2}
                        value={proData[areaData.area_id].revPercentage}
                        suffix="%"
                      />
                    </Card>
                  </Col>

                  <Col span={8}>
                    <Card
                      style={{ backgroundColor: "var(--russian-violet-2" }}
                      bordered={false}
                    >
                      <Statistic
                        prefix={<FaBirthdayCake />}
                        title="Average User Age"
                        value={areaData.avgAge}
                        precision={2}
                      />
                    </Card>
                  </Col>
                </Row>
              ) : (
                <span>Click on an area from the map</span>
              )}
            </TabPane>
          </Tabs>
        </Col>
        <Col
          xs={(24, { order: 1 })}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Card
            bordered={false}
            style={{ backgroundColor: "var(--russian-violet-2" }}
          >
            <Map
              areaData={areaData}
              setAreaData={setAreaData}
              proData={proData}
              setProData={setProData}
              genData={genData}
              setGenData={setGenData}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
