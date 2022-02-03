import React, { useEffect, useState, useMemo } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import fetchData from "./fetchData";
import mapboxgl from "mapbox-gl/dist/mapbox-gl";

mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const Map = (props) => {
  let { areaData, setAreaData, proData, setProData, genData, setGenData } =
    props;
  const [viewport, setViewport] = useState({
    longitude: 77.6,
    latitude: 12.94,
    width: "35vw",
    height: "65vh",
    minZoom: 10,
    pitch: 42,
  });
  const [areas, setAreas] = useState();

  useEffect(
    () =>
      fetchData(
        "https://kyupid-api.vercel.app/api/areas",
        "https://kyupid-api.vercel.app/api/users",
        setProData,
        setGenData,
        setAreas
      ),
    [setProData, setGenData]
  );

  let mapData = props.mapType === "pro" ? proData : genData;

  function getCursor({ isHovering, isDragging }) {
    return isDragging ? "grabbing" : isHovering ? "pointer" : "default";
  }
  const selectedArea = (areaData && areaData.area_id) || "";
  const filter = useMemo(() => ["in", "area_id", selectedArea], [selectedArea]);

  const generalLayerStyle = {
    id: "area",
    type: "fill",
    paint: {
      "fill-outline-color": "rgb(52,51,50)",
      "fill-color": {
        property: "totalGeneralUsers",
        stops: [
          [90, "#E0AAFF"],
          [120, "#C77DFF"],
          [150, "#9D4EDD"],
          [180, "#7B2CBF"],
          [220, "#5A189A"],
          [250, "#3C096C"],
          [280, "#240046"],
          [300, "#10002B"],
        ],
      },
    },
  };
  const proLayerStyle = {
    id: "area",
    type: "fill",
    source: "my-data",
    paint: {
      // // "fill-opacity": 0.7,
      "fill-outline-color": "rgb(52,51,50)",
      "fill-color": {
        property: "totalProUsers",
        stops: [
          [90, "#E0AAFF"],
          [120, "#C77DFF"],
          [150, "#9D4EDD"],
          [180, "#7B2CBF"],
          [220, "#5A189A"],
          [250, "#3C096C"],
          [280, "#240046"],
          [300, "#10002B"],
        ],
      },
    },
  };
  const highlightLayerStyle = {
    id: "area_highlight",
    type: "fill-extrusion",
    paint: {
      "fill-extrusion-color":
        props.mapType === "pro"
          ? {
              property: "totalProUsers",
              stops: [
                [90, "#E0AAFF"],
                [120, "#C77DFF"],
                [150, "#9D4EDD"],
                [180, "#7B2CBF"],
                [220, "#5A189A"],
                [250, "#3C096C"],
                [280, "#240046"],
                [300, "#10002B"],
              ],
            }
          : {
              property: "totalGeneralUsers",
              stops: [
                [90, "#E0AAFF"],
                [120, "#C77DFF"],
                [150, "#9D4EDD"],
                [180, "#7B2CBF"],
                [220, "#5A189A"],
                [250, "#3C096C"],
                [280, "#240046"],
                [300, "#10002B"],
              ],
            },
      "fill-extrusion-height": 5000,
    },
  };

  return (
    <>
      <ReactMapGL
        getCursor={getCursor}
        {...viewport}
        onViewportChange={(newviewport) => setViewport(newviewport)}
        mapStyle={"mapbox://styles/mapbox/dark-v9"}
        mapboxApiAccessToken={
          "pk.eyJ1IjoiZGVwcm92NDQ3IiwiYSI6ImNrejV1ZXkxYTBwa3EyeHFmeTE1Mnhvd3MifQ.00kif_tRS2Ij8lUHI_Osdg"
        }
        onClick={(e) => {
          if (e?.features[0]?.properties?.area_id) {
            let area_id = e.features[0].properties.area_id;
            let totalAge = mapData[area_id];
            setAreaData({
              female: mapData[area_id].female,
              male: mapData[area_id].male,
              totalUsers: mapData[area_id].totalUsers,
              totalMatches: mapData[area_id].total_matches,
              areaName: e.features[0].properties.name,
              revPercentage: mapData[area_id].revPercentage,
              avgAge: mapData[area_id].totalAge / mapData[area_id].totalUsers,
              area_id: area_id,
            });
          }
        }}
      >
        {areas && (
          <Source id="my-data" type="geojson" data={areas}>
            {props.mapType === "pro" ? (
              <Layer {...proLayerStyle} />
            ) : (
              <Layer {...generalLayerStyle} />
            )}
            <Layer {...highlightLayerStyle} filter={filter} />
          </Source>
        )}
      </ReactMapGL>
    </>
  );
};

export default Map;
