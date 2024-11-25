import React from "react";
import Dock from "./Dock";
import queryString from "query-string";
import config from "../json/config.json";
import distance from "../modules/distance";
import visitservice from "../service/visitservice";
import searchservice from "../service/searchservice";
import productservice from "../service/productservice";
import icon_location from "../resource/img/icon/icon_location.svg";
import { isMobile } from "react-device-detect";

class search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: queryString.parse(window.location.search).word,
      platform: "",
      result: [],
      store: {},
      latitude: 0,
      longitude: 0,
    };
  }

  componentDidMount() {
    isMobile
      ? this.setState({ platform: "모바일" })
      : this.setState({ platform: "컴퓨터" });
    productservice.searchProduct(this.state.word).then((res) => {
      console.log(res.data);
      this.setState({ result: res.data });
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
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
    } else {
      console.log("지원하지 않음.");
    }
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
                <div className="gnb_title">
                  <h2>찾아보기</h2>
                </div>
              </div>
            </nav>
          </div>
        </header>
        <main>
          <section id="search_box">
            <div className="container search_box">
              <form id="form" className="keyword_search" target="iframe">
                <input
                  type="text"
                  id="word"
                  className="frm_search"
                  value={this.state.word}
                  placeholder="상품 또는 상호를 찾아보세요"
                  style={{ fontsize: "16px", border: "none" }}
                  required
                  onChange={(event) => {
                    this.setState({ word: event.target.value });
                  }}
                />
                <input
                  type="submit"
                  className="search_submit"
                  value="&nbsp;"
                  style={{ fontsize: "16px", border: "none" }}
                  onClick={() => {
                    if (document.getElementById("word").value !== "") {
                      visitservice.getInfo().then((res) => {
                        searchservice
                          .searchRegist(
                            res.data.ip,
                            this.state.platform,
                            this.state.word
                          )
                          .then(() => {
                            window.location.href = `/search?word=${this.state.word}`;
                          });
                      });
                    }
                  }}
                />
              </form>
              <iframe name="iframe" style={{ display: "none" }}></iframe>
            </div>
          </section>
          <div className="search_list pb_60">
            {this.state.result.map((result, index) => (
              <div className="product_wrap" key={index}>
                <div className="product_item">
                  <img
                    src={config.host + `/getProductImg/${result.productcode}`}
                    onError={(event) => {
                      event.target.src = require("../resource/img/icon/no_img.png");
                    }}
                  />
                  <a
                    className="prod_txt_wrap"
                    href={`/sub_store_detail?store=${result.storecode}`}
                  >
                    <div className="prod_txt">
                      <h3>{result.productname}</h3>
                      <p>{result.storename}</p>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="prod_location"
                    onClick={() => {
                      window.location.href = `/sub_map_location?store=${result.storecode}`;
                    }}
                  >
                    <img src={icon_location} alt="위치정보" />
                    <span>
                      {distance.getDistance(
                        this.state.latitude,
                        this.state.longitude,
                        result.latitude,
                        result.longitude
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
export default search;
