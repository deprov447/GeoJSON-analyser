import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const About = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "70vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      Made by
      <Title>
        <a href="https://deprov447.tech">deprov447</a>
      </Title>
      Uses AntDesign, React.js, Mapbox
    </div>
  );
};

export default About;
