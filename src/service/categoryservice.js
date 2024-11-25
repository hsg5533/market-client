import axios from "axios";
import config from "../json/config.json";

class homeservice {
  getCategoryActive() {
    return axios.get(config.host + "/getCategoryActive");
  }
}
export default new homeservice();
