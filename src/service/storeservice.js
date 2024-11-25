import axios from "axios";
import config from "../json/config.json";

class storeservice {
  getStoreCategory(category_code) {
    return axios({
      url: config.host + "/getStoreCategory",
      method: "post",
      data: { category_code: category_code },
    });
  }

  getStoreLink(link_code) {
    return axios({
      url: config.host + "/getStoreLink",
      method: "post",
      data: { link_code: link_code },
    });
  }

  getStoreDetail(storecode) {
    return axios({
      url: config.host + "/getStoreDetail",
      method: "post",
      data: { storecode: storecode },
    });
  }
}
export default new storeservice();
