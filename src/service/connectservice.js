import axios from "axios";
import config from "../json/config.json";

class connectservice {
  connectRegist(ip, platform, categorycode, categoryname) {
    return axios({
      url: config.host + "/connectRegist",
      method: "post",
      data: {
        ip: ip,
        platform: platform,
        categorycode: categorycode,
        categoryname: categoryname,
      },
    });
  }
}
export default new connectservice();
