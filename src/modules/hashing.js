const sha256 = require("sha256");
module.exports = {
  enc: function (text) {
    return sha256(text);
  },
};
