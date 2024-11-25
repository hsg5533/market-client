import React from "react";
import queryString from "query-string";
import storeservice from "../service/storeservice";
import Geolocation from "@react-native-community/geolocation";
import btn_x_light from "../resource/img/icon/btn_x_light.svg";
import { Map, Polyline, CustomOverlayMap } from "react-kakao-maps-sdk";

class sub_map_location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storecode: queryString.parse(window.location.search).store,
      lat: 0,
      lng: 0,
      latitude: 0,
      longitude: 0,
      path: [],
      storeinfo: {},
    };
  }

  componentDidMount() {
    storeservice.getStoreDetail(this.state.storecode).then((res) => {
      this.setState({
        storeinfo: res.data,
        lat: res.data.latitude,
        lng: res.data.longitude,
      });
      this.state.path[1] = { lat: res.data.latitude, lng: res.data.longitude };
    });
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.state.path[0] = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      },
      (err) => {
        console.log("현재 위치 표시 에러: " + err.message);
      }
    );
  }

  render() {
    return (
      <div>
        <header>
          <div class="header_area">
            <nav id="gnb">
              <div class="gnb_sub_container">
                <div class="gnb_title"></div>
                <button
                  class="sub_store_info_close"
                  type="button"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  <img src={btn_x_light} alt="닫기 버튼" />
                </button>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <div class="map_location_wrap">
            <div class="map_location">
              <div class="map_store_wrap">
                <div class="map_store_title">
                  <h2>{this.state.storeinfo.name}</h2>
                  <p>
                    {this.state.storeinfo.address}
                    {this.state.storeinfo.address_datail}
                  </p>
                  <a
                    href={`https://map.kakao.com/link/map/${this.state.storeinfo.name},${this.state.storeinfo.latitude},${this.state.storeinfo.longitude}`}
                  >
                    <span>해당 업소 찾기</span>
                  </a>
                </div>
              </div>
              <div class="store_map">
                <Map
                  center={{
                    lat: this.state.lat,
                    lng: this.state.lng,
                  }}
                  style={{
                    marginTop: "11vh",
                    width: "100%",
                    height: "78vh",
                  }}
                  level={5}
                >
                  <Polyline
                    path={[this.state.path]}
                    strokeWeight={3}
                    strokeColor={"#db4040"}
                    strokeOpacity={1}
                    strokeStyle={"solid"}
                  />
                  <CustomOverlayMap
                    position={{
                      lat: this.state.latitude,
                      lng: this.state.longitude,
                    }}
                  >
                    <div className="tag_wrap">
                      <div className="name_tag">
                        <span>현재위치</span>
                      </div>
                    </div>
                  </CustomOverlayMap>
                  <CustomOverlayMap
                    position={{
                      lat: this.state.storeinfo.latitude,
                      lng: this.state.storeinfo.longitude,
                    }}
                  >
                    <div className="tag_wrap_store">
                      <div className="name_tag">
                        <span>{this.state.storeinfo.name}</span>
                      </div>
                    </div>
                  </CustomOverlayMap>
                </Map>
                <button
                  type="button"
                  onClick={() => {
                    this.props.history.goBack();
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
export default sub_map_location;
