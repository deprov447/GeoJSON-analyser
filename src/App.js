import React, { useState } from "react";
import "./App.less";
import { Layout, Menu, Typography } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import "mapbox-gl/dist/mapbox-gl.css";

import Dashboard from "./Dashboard/Dashboard";
import About from "./About/About";

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;

function App() {
  let [isAbout, setIsAbout] = useState(false);

  return (
    <div className="App">
      <Layout>
        <Sider
          className="bgDark"
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
          }}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            style={{
              backgroundColor: "var(--russian-voilet)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyItems: "center",
            }}
            mode="inline"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item
              key="1"
              icon={<VideoCameraOutlined />}
              onClick={() => setIsAbout(false)}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UserOutlined />}
              onClick={() => setIsAbout(true)}
            >
              About
            </Menu.Item>
            <Menu.Item key="3" icon={<GithubOutlined />}>
              <a href="https://github.com/deprov447">Source Code</a>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="bgDark2">
          <Header className="bgDark" style={{ padding: "10px" }}>
            <Title level={2}>{!isAbout ? "Dashboard" : "About"}</Title>
          </Header>
          <Content style={{ margin: "26px" }} className="bgDark">
            <div className="bgDark">{!isAbout ? <Dashboard /> : <About />}</div>
          </Content>
          <Footer className="bgDark" style={{ textAlign: "center" }}>
            GeoJSON Analyser
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
