import axios from "axios";
import config from "../json/config.json";
const weekend = ["일", "월", "화", "수", "목", "금", "토"];

class indexservice {
  getInfo() {
    return axios.get(config.host + "/");
  }

  visitRegist(link_code, storecode, storename, ip, platform, date) {
    return axios({
      url: config.host + "/visitRegist",
      method: "post",
      data: {
        link_code: link_code,
        storecode: storecode,
        storename: storename,
        ip: ip,
        platform: platform,
        date: weekend[date],
      },
    });
  }
}
export default new indexservice();
