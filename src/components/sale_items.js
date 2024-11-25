import React from "react";
import Dock from "./Dock";
import queryString from "query-string";
import config from "../json/config.json";
import distance from "../modules/distance";
import visitservice from "../service/visitservice";
import storeservice from "../service/storeservice";
import connectservice from "../service/connectservice";
import categoryservice from "../service/categoryservice";
import Geolocation from "@react-native-community/geolocation";
import icon_location from "../resource/img/icon/icon_location.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { isMobile } from "react-device-detect";

class sale_items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorycode: queryString.parse(window.location.search).category,
      stores: [],
      product: [],
      category: [],
      latitude: 0,
      longitude: 0,
    };
  }

  componentDidMount() {
    isMobile
      ? this.setState({ platform: "모바일" })
      : this.setState({ platform: "컴퓨터" });
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.log("현재 위치 표시 에러: " + err.message);
      }
    );
    categoryservice.getCategoryActive().then((res) => {
      this.setState({ category: res.data });
    });
    storeservice.getStoreCategory(this.state.categorycode).then((res) => {
      this.setState({ stores: res.data });
    });
  }

  render() {
    return (
      <div>
        <header>
          <div className="header_area">
            <nav id="gnb">
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
                <div className="gnb_title tx">
                  <h2>판매품목</h2>
                </div>
                <a className="search" href="#"></a>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <div className="gnb_list_category">
            <div className="gnb_list_container">
              <ul class="swiper_wrapper">
                <Swiper spaceBetween={0} slidesPerView={5}>
                  <SwiperSlide>
                    <li className={this.state.categorycode === "0" ? "on" : ""}>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          visitservice.getInfo().then((res) => {
                            connectservice
                              .connectRegist(
                                res.data.ip,
                                this.state.platform,
                                0,
                                "전체"
                              )
                              .then(() => {
                                window.location.href = `/sale_items?category=${0}`;
                              });
                          });
                        }}
                      >
                        전체
                      </a>
                    </li>
                  </SwiperSlide>
                  {this.state.category.map((category) => (
                    <SwiperSlide>
                      <li
                        className={
                          this.state.categorycode === category.code.toString()
                            ? "on"
                            : ""
                        }
                      >
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            visitservice.getInfo().then((res) => {
                              connectservice
                                .connectRegist(
                                  res.data.ip,
                                  this.state.platform,
                                  category.code,
                                  category.name
                                )
                                .then(() => {
                                  window.location.href = `/sale_items?category=${category.code}`;
                                });
                            });
                          }}
                        >
                          {category.name}
                        </a>
                      </li>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ul>
            </div>
          </div>
          <div className="sale_item_list pb_60 pt_79">
            {this.state.stores.map((store) => (
              <div className="product_wrap" key={store.code}>
                <div className="product_item">
                  <img
                    id={store.regnumber}
                    src={config.host + `/getStoreImg/${store.regnumber}`}
                    onError={(event) => {
                      event.target.src = require("../resource/img/icon/no_img.png");
                    }}
                  />
                  <a
                    className="prod_txt_wrap"
                    href={`/sub_store_detail?store=${store.code}`}
                  >
                    <div className="prod_txt">
                      <h3>{store.name}</h3>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="prod_location"
                    onClick={() => {
                      window.location.href = `/sub_map_location?store=${store.code}`;
                    }}
                  >
                    <img src={icon_location} alt="위치정보" />
                    <span>
                      {distance.getDistance(
                        this.state.latitude,
                        this.state.longitude,
                        store.latitude,
                        store.longitude
                      )}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Dock />
      </div>
    );
  }
}
export default sale_items;
