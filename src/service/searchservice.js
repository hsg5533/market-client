import axios from "axios";
import config from "../json/config.json";

class searchservice {
  searchRegist(ip, platform, word) {
    return axios({
      url: config.host + "/searchRegist",
      method: "post",
      data: {
        ip: ip,
        platform: platform,
        word: word,
      },
    });
  }
}
export default new searchservice();
