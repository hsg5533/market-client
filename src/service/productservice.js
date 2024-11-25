import axios from "axios";
import config from "../json/config.json";

class productservice {
  getProductStore(storecode) {
    return axios({
      url: config.host + "/getProductStore",
      method: "post",
      data: { storecode: storecode },
    });
  }

  getProductCategory(category_code) {
    return axios({
      url: config.host + "/getProductCategory",
      method: "post",
      data: { category_code: category_code },
    });
  }

  getProductRecommend(category_code) {
    return axios({
      url: config.host + "/getProductRecommend",
      method: "post",
      data: { category_code: category_code },
    });
  }

  searchProduct(word) {
    return axios({
      url: config.host + "/searchProduct",
      method: "post",
      data: { word: word },
    });
  }
}
export default new productservice();
