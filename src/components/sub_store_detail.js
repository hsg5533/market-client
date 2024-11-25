import React from "react";
import Modal from "./Modal";
import queryString from "query-string";
import config from "../json/config.json";
import distance from "../modules/distance";
import cartservice from "../service/cartservice";
import storeservice from "../service/storeservice";
import productservice from "../service/productservice";
import Geolocation from "@react-native-community/geolocation";
import btn_x_light from "../resource/img/icon/btn_x_light.svg";
import icon_quick_cart from "../resource/img/icon/icon_quick_cart.svg";
import icon_sub_label_discount from "../resource/img/icon/icon_sub_label_discount.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Map,
  Polyline,
  ZoomControl,
  MapTypeControl,
  CustomOverlayMap,
} from "react-kakao-maps-sdk";

class sub_store_detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storecode: queryString.parse(window.location.search).store,
      tab: 1,
      latitude: 0,
      longitude: 0,
      modal: false,
      path: [],
      store: {},
      product: [],
    };
  }

  componentDidMount() {
    storeservice.getStoreDetail(this.state.storecode).then((res) => {
      this.setState({ store: res.data });
      this.state.path[1] = { lat: res.data.latitude, lng: res.data.longitude };
    });
    productservice.getProductStore(this.state.storecode).then((res) => {
      this.setState({ product: res.data });
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
        {this.state.modal === true ? (
          <div>
            <div className="dimm"></div>
            <div className="modal">
              <div className="modal_head_wrap">
                <div className="modal_head">
                  <h2>공유하기</h2>
                  <button type="button" className="close">
                    <img
                      src={btn_x_light}
                      alt="닫기 버튼"
                      onClick={() => {
                        this.setState({ modal: !this.state.modal });
                      }}
                    ></img>
                  </button>
                </div>
              </div>
              <Modal storecode={this.state.storecode} />
            </div>
          </div>
        ) : null}
        <header>
          <div className="header_area">
            <nav id="gnb">
              <div className="gnb_sub_container">
                <div className="gnb_title"></div>
                <button
                  className="sub_store_info_close"
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
          <section>
            <div className="store_detail_wrap">
              <div className="store_detail">
                <div className="store_detail_title">
                  <h2>{this.state.store.name}</h2>
                  <p>{this.state.store.explan}</p>
                </div>
                <div className="store_contact">
                  <ul>
                    <li>
                      <a href={`tel:${this.state.store.tel}`}>
                        <i className="store_call"></i>
                        <span>전화</span>
                      </a>
                    </li>
                    <span className="store_line"></span>
                    <li>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          this.setState({ modal: !this.state.modal });
                        }}
                      >
                        <i className="store_share"></i>
                        <span>공유</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="close_btn">
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
          </section>
          <section>
            <div className="tab_wrap store_tab_wrap">
              <div className="tab_bar">
                <ul className="tab">
                  <li
                    className={this.state.tab === 1 ? "on" : ""}
                    data-tab="tab_01"
                  >
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({ tab: 1 });
                      }}
                    >
                      할인중
                    </a>
                  </li>
                  <li
                    className={this.state.tab === 2 ? "on" : ""}
                    data-tab="tab_02"
                  >
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({ tab: 2 });
                      }}
                    >
                      업소 정보
                    </a>
                  </li>
                  <li
                    className={this.state.tab === 3 ? "on" : ""}
                    data-tab="tab_03"
                  >
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.setState({ tab: 3 });
                      }}
                    >
                      판매 품목
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {this.state.tab === 1 ? (
              <div id="tab_03" className="tabcont pb_45 pt_180">
                <div className="product_list_wrap">
                  <div className="product_list">
                    {this.state.product.map((product) =>
                      product.discount === "y" ? (
                        <div className="product_item_wrap">
                          <div className="product_item">
                            <div className="product_price">
                              <div className="txt_wrap">
                                <h3>
                                  <b>{product.name}</b>
                                </h3>
                                <p className="origin">{product.origin}</p>
                              </div>
                              <div className="price_wrap">
                                <span className="unit">가격 : </span>
                                <div className="price">
                                  <span className="retail_price price_line">
                                    {product.price.replace(
                                      /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}
                                    원
                                  </span>
                                  <span className="selling_price">
                                    <em>
                                      {product.discount_price.replace(
                                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )}
                                      원
                                    </em>
                                  </span>
                                </div>
                              </div>
                              <div className="price_wrap">
                                <span className="unit">단위 : </span>
                                <div className="price">{product.amount}</div>
                              </div>
                            </div>
                            <div className="product_img">
                              <img
                                id={product.code}
                                className="prod_img"
                                src={
                                  config.host + `/getProductImg/${product.code}`
                                }
                                onError={(event) => {
                                  event.target.src = require("../resource/img/icon/no_img.png");
                                }}
                              />
                              <img
                                className="discount_icon"
                                src={icon_sub_label_discount}
                                alt="세일중 아이콘"
                              />
                              <button type="button">
                                <img
                                  className="quick_cart"
                                  src={icon_quick_cart}
                                  alt="장바구니 바로담기"
                                  onClick={() => {
                                    cartservice
                                      .cartRegist(
                                        this.state.storecode,
                                        product.code,
                                        product.regnumber,
                                        product.storename,
                                        product.name,
                                        product.amount,
                                        product.price,
                                        product.discount,
                                        product.discount_price
                                      )
                                      .then(() => {
                                        toast("장바구니에 담았습니다", {
                                          position: "bottom-center",
                                          autoClose: 1000,
                                          hideProgressBar: true,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                          type: "success",
                                          theme: "light",
                                        });
                                      });
                                  }}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : null
                    )}
                    <ToastContainer />
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.tab === 2 ? (
              <div id="tab_02" className="tabcont pb_45 pt_180">
                <div className="store_info_wrap">
                  <div className="store_info">
                    <div className="store_info_map">
                      <Map
                        center={{
                          lat: this.state.store.latitude,
                          lng: this.state.store.longitude,
                        }}
                        style={{
                          width: "100%",
                          height: "49vh",
                        }}
                        level={3}
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
                          yAnchor={1.3}
                        >
                          <div
                            style={{
                              backgroundColor: "#ffc000",
                              borderRadius: "0.3em",
                              padding: "4px 6px",
                            }}
                            className="name_tag"
                          >
                            <span>현재위치</span>
                          </div>
                        </CustomOverlayMap>
                        <CustomOverlayMap
                          position={{
                            lat: this.state.store.latitude,
                            lng: this.state.store.longitude,
                          }}
                          yAnchor={1.07}
                        >
                          <a
                            href={`https://map.kakao.com/link/map/${this.state.store.name},${this.state.store.latitude},${this.state.store.longitude}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className="name_tag">
                              <span>{this.state.store.name}</span>
                              <br />
                              {distance.getDistanceTime(
                                this.state.latitude,
                                this.state.longitude,
                                this.state.store.latitude,
                                this.state.store.longitude
                              )}
                            </div>
                          </a>
                        </CustomOverlayMap>
                        <MapTypeControl />
                        <ZoomControl />
                      </Map>
                    </div>
                    <div className="store_info_txt">
                      <div>
                        <p>운영시간</p>
                        <span>
                          {this.state.store.open} ~ {this.state.store.close}
                        </span>
                      </div>
                      <div>
                        <p>휴무일</p>
                        <span>{this.state.store.holiday || "-"}</span>
                      </div>
                      <div>
                        <p>전화번호</p>
                        <span>{this.state.store.tel}</span>
                      </div>
                      <div>
                        <p>주소</p>
                        <span>{this.state.store.address}</span>
                      </div>
                      <div>
                        <a
                          href={`	kakaomap://route?sp=${this.state.latitude},${this.state.longitude}&ep=${this.state.store.latitude},${this.state.store.longitude}&by=CAR`}
                        >
                          <span
                            style={{
                              display: "inline-block",
                            }}
                          >
                            경로보기
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {this.state.tab === 3 ? (
              <div id="tab_03" className="tabcont pb_45 pt_180">
                <div className="product_list_wrap">
                  <div className="product_list">
                    {this.state.product.map((product) =>
                      product.discount === "y" ? (
                        <div className="product_item_wrap" key={product.code}>
                          <div className="product_item">
                            <div className="product_price">
                              <div className="txt_wrap">
                                <h3>
                                  <b>{product.name}</b>
                                </h3>
                                <p className="origin">{product.origin}</p>
                              </div>
                              <div className="price_wrap">
                                <span className="unit">가격 : </span>
                                <div className="price">
                                  <span className="retail_price price_line">
                                    {product.price.replace(
                                      /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}
                                    원
                                  </span>
                                  <span className="selling_price">
                                    <em>
                                      {product.discount_price.replace(
                                        /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                        ","
                                      )}
                                      원
                                    </em>
                                  </span>
                                </div>
                              </div>
                              <div className="price_wrap">
                                <span className="unit">단위 : </span>
                                <div className="price">{product.amount}</div>
                              </div>
                            </div>
                            <div className="product_img">
                              <img
                                id={product.code}
                                className="prod_img"
                                src={
                                  config.host + `/getProductImg/${product.code}`
                                }
                                onError={(event) => {
                                  event.target.src = require("../resource/img/icon/no_img.png");
                                }}
                              />
                              <img
                                className="discount_icon"
                                src={icon_sub_label_discount}
                                alt="세일중 아이콘"
                              />
                              <button type="button">
                                <img
                                  className="quick_cart"
                                  src={icon_quick_cart}
                                  alt="장바구니 바로담기"
                                  onClick={() => {
                                    cartservice
                                      .cartRegist(
                                        this.state.storecode,
                                        product.code,
                                        product.regnumber,
                                        product.storename,
                                        product.name,
                                        product.amount,
                                        product.price,
                                        product.discount,
                                        product.discount_price
                                      )
                                      .then(() => {
                                        toast("장바구니에 담았습니다", {
                                          position: "bottom-center",
                                          autoClose: 1000,
                                          hideProgressBar: true,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                          type: "success",
                                          theme: "light",
                                        });
                                      });
                                  }}
                                />
                              </button>
                              <ToastContainer />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="product_item_wrap" key={product.code}>
                          <div className="product_item">
                            <div className="product_price">
                              <div className="txt_wrap">
                                <h3>
                                  <b>{product.name}</b>
                                </h3>
                                <p className="origin">{product.origin}</p>
                              </div>
                              <div className="price_wrap">
                                <span className="unit">가격 : </span>
                                <div className="price">
                                  <span className="selling_price">
                                    {product.price.replace(
                                      /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )}
                                    원
                                  </span>
                                </div>
                              </div>
                              <div className="price_wrap">
                                <span className="unit">단위 : </span>
                                <div className="price">{product.amount}</div>
                              </div>
                            </div>
                            <div className="product_img">
                              <img
                                className="prod_img"
                                src={
                                  config.host + `/getProductImg/${product.code}`
                                }
                                onError={(event) => {
                                  event.target.src = require("../resource/img/icon/no_img.png");
                                }}
                              />
                              <button type="button">
                                <img
                                  className="quick_cart"
                                  src={icon_quick_cart}
                                  alt="장바구니 바로담기"
                                  onClick={() => {
                                    cartservice
                                      .cartRegist(
                                        this.state.storecode,
                                        product.code,
                                        product.regnumber,
                                        product.storename,
                                        product.name,
                                        product.amount,
                                        product.price,
                                        product.discount,
                                        product.discount_price
                                      )
                                      .then(() => {
                                        toast("장바구니에 담았습니다", {
                                          position: "bottom-center",
                                          autoClose: 1000,
                                          hideProgressBar: true,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                          type: "success",
                                          theme: "light",
                                        });
                                      });
                                  }}
                                />
                              </button>
                              <ToastContainer />
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </section>
        </main>
      </div>
    );
  }
}
export default sub_store_detail;
