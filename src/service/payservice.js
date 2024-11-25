import axios from "axios";
import config from "../json/config.json";

class payservice {
  getPaylog(orderid) {
    return axios({
      url: config.host + "/payLog",
      method: "post",
      data: {
        orderid: orderid,
      },
    });
  }
}
export default new payservice();
