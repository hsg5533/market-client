import React from "react";
import Dock from "./Dock";
import bujeonmarket from "../json/bujeonmarket.json";
import {
  Map,
  Polygon,
  ZoomControl,
  MapTypeControl,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

class dock_map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bujeonmarket: bujeonmarket.features,
      tab: 1,
      polygonArr: [],
    };
  }

  componentDidMount() {
    this.state.bujeonmarket.forEach((Feature) => {
      const geometry = Feature.geometry;
      if ("MultiPolygon" === geometry.type) {
        let points = [];
        for (var c in geometry.coordinates) {
          let multiCoordinates = geometry.coordinates[c];
          for (var z in multiCoordinates[0]) {
            points.push({
              x: multiCoordinates[0][z][1],
              y: multiCoordinates[0][z][0],
            });
            this.state.polygonArr.push({
              lat: multiCoordinates[0][z][1],
              lng: multiCoordinates[0][z][0],
            });
          }
        }
      }
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="header_area">
            <div id="gnb">
              <div className="gnb_container">
                <a
                  style={{ cursor: "pointer" }}
                  className="go_back"
                  onClick={() => {
                    window.location.href = `/?code=${sessionStorage.getItem(
                      "code"
                    )}`;
                  }}
                ></a>
                <h2>지도</h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="tab_wrap">
            <div className="tab_bar">
              <ul className="tab">
                <li
                  className={this.state.tab === 1 ? "on" : ""}
                  data-tab="menu_01"
                >
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ tab: 1 });
                    }}
                  >
                    지도
                  </a>
                </li>
                <li
                  className={this.state.tab === 2 ? "on" : ""}
                  data-tab="menu_02"
                >
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ tab: 2 });
                    }}
                  >
                    화장실
                  </a>
                </li>
                <li
                  className={this.state.tab === 3 ? "on" : ""}
                  data-tab="menu_03"
                >
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      this.setState({ tab: 3 });
                    }}
                  >
                    주차장
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </main>
        {this.state.tab === 1 ? (
          <div id="menu_01" className="tabcont on mt_73 pb_60">
            <div className="market_map">
              <div className="map_box">
                <Map
                  center={{ lat: 35.16195531792627, lng: 129.06027666678085 }}
                  style={{
                    width: "100%",
                    height: "50vh",
                  }}
                  level={4}
                >
                  <CustomOverlayMap
                    position={{
                      lat: 35.16195531792627,
                      lng: 129.06027666678085,
                    }}
                    yAnchor={1}
                  >
                    <a
                      href="https://map.kakao.com/link/map/부전시장,35.162723,129.061326"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="name_tag">
                        <span>부전마켓타운</span>
                      </div>
                    </a>
                  </CustomOverlayMap>
                  <Polygon
                    path={this.state.polygonArr}
                    strokeWeight={2}
                    strokeColor={"#b70000"}
                    strokeOpacity={0.8}
                    fillColor={"#fff"}
                    fillOpacity={0.3}
                  />
                  <MapTypeControl />
                  <ZoomControl />
                </Map>
              </div>
              <div className="map_info">
                <h3>부전시장</h3>
                <p>부산광역시 부산진구 중앙대로783번길 23</p>
              </div>
              <div className="map_txt">
                <div className="txt_wrap">
                  <h3>행복시장 번영회</h3>
                  <p>051-333-3333</p>
                </div>
                <span>전화걸기</span>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.tab === 2 ? (
          <div id="menu_02" className="tabcont mt_73 pb_60">
            <div className="market_map">
              <div className="map_box">
                <Map
                  center={{ lat: 35.162855, lng: 129.061047 }}
                  style={{
                    width: "100%",
                    height: "30vh",
                  }}
                  level={3}
                >
                  <CustomOverlayMap
                    position={{ lat: 35.162855, lng: 129.061047 }}
                    yAnchor={1}
                  >
                    <a
                      href="https://map.kakao.com/link/map/부전시장,35.163314,129.061009"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="name_tag">
                        <span>화장실1</span>
                      </div>
                    </a>
                  </CustomOverlayMap>
                  <MapTypeControl />
                  <ZoomControl />
                </Map>
              </div>
              <div className="map_info">
                <h3>화장실1</h3>
                <p>부산시 행복구 행복로33번길 3</p>
              </div>
            </div>
            <div className="market_map">
              <div className="map_box">
                <Map
                  center={{ lat: 35.162894, lng: 129.060341 }}
                  style={{
                    width: "100%",
                    height: "30vh",
                  }}
                  level={3}
                >
                  <CustomOverlayMap
                    position={{ lat: 35.162894, lng: 129.060341 }}
                    yAnchor={1}
                  >
                    <a
                      href="https://map.kakao.com/link/map/부전시장,35.163314,129.061009"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="name_tag">
                        <span>화장실2</span>
                      </div>
                    </a>
                  </CustomOverlayMap>
                  <MapTypeControl />
                  <ZoomControl />
                </Map>
              </div>
              <div className="map_info">
                <h3>화장실2</h3>
                <p>부산시 행복구 행복로33번길 3</p>
              </div>
            </div>
          </div>
        ) : null}
        {this.state.tab === 3 ? (
          <div id="menu_03" className="tabcont mt_73 pb_60">
            <div className="market_map">
              <div className="map_box">
                <Map
                  center={{ lat: 35.163539, lng: 129.061807 }}
                  style={{
                    width: "100%",
                    height: "30vh",
                  }}
                  level={3}
                >
                  <CustomOverlayMap
                    position={{ lat: 35.163539, lng: 129.061807 }}
                    yAnchor={1}
                  >
                    <a
                      href="https://map.kakao.com/link/map/부전시장,35.163314,129.061009"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="name_tag">
                        <span>주차장1</span>
                      </div>
                    </a>
                  </CustomOverlayMap>
                  <MapTypeControl />
                  <ZoomControl />
                </Map>
              </div>
              <div className="map_info">
                <h3>주차장1</h3>
                <p>부산시 행복구 행복로33번길 3</p>
              </div>
            </div>
            <div className="market_map">
              <div className="map_box">
                <Map
                  center={{ lat: 35.163793, lng: 129.060792 }}
                  style={{
                    width: "100%",
                    height: "30vh",
                  }}
                  level={3}
                >
                  <CustomOverlayMap
                    position={{ lat: 35.163793, lng: 129.060792 }}
                    yAnchor={1}
                  >
                    <a
                      href="https://map.kakao.com/link/map/부전시장,35.163314,129.061009"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="name_tag">
                        <span>주차장2</span>
                      </div>
                    </a>
                  </CustomOverlayMap>
                  <MapTypeControl />
                  <ZoomControl />
                </Map>
              </div>
              <div className="map_info">
                <h3>주차장2</h3>
                <p>부산시 행복구 행복로33번길 3</p>
              </div>
            </div>
          </div>
        ) : null}
        <Dock active="map" />
      </div>
    );
  }
}
export default dock_map;
