import React from "react";
import Dock from "./Dock";
import queryString from "query-string";
import config from "../json/config.json";
import productservice from "../service/productservice";
import categoryservice from "../service/categoryservice";
import icon_location from "../resource/img/icon/icon_location.svg";
import { Swiper, SwiperSlide } from "swiper/react";

class recommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categorycode: queryString.parse(window.location.search).category,
      store: {},
      product: [],
      category: [],
    };
  }

  componentDidMount() {
    categoryservice.getCategoryActive().then((res) => {
      this.setState({ category: res.data });
    });
    productservice.getProductRecommend(this.state.categorycode).then((res) => {
      this.setState({ product: res.data });
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
                  className="go_back"
                  onClick={() => {
                    window.location.href = `/?code=${sessionStorage.getItem(
                      "code"
                    )}`;
                  }}
                ></a>
                <div className="gnb_title tx">
                  <h2>오늘의 추천상품</h2>
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
                      <a href={`/recommend?category=${0}`}>전체</a>
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
                        <a href={`/recommend?category=${category.code}`}>
                          {category.name}
                        </a>
                      </li>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </ul>
            </div>
          </div>
          <div className="recommend_item_list pb_60 pt_79">
            {this.state.product.map((product) => (
              <div className="product_wrap">
                <div className="product_item">
                  <img
                    id={product.code}
                    src={config.host + `/getProductImg/${product.code}`}
                    onError={(event) => {
                      event.target.src = require("../resource/img/icon/no_img.png");
                    }}
                  />
                  <a
                    className="prod_txt_wrap"
                    href={`/sub_store_detail?store=${product.storecode}`}
                  >
                    <div className="prod_txt" key={product.code}>
                      <h3>{product.name}</h3>
                      {product.storename}
                      <span></span>
                    </div>
                  </a>
                  <button type="button" className="prod_location">
                    <img src={icon_location} alt="위치정보" />
                    <span></span>
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
export default recommend;
