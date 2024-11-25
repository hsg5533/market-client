import React from "react";
import Dock from "./Dock";
import sub_manual from "../resource/img/sub_manual.svg";

class manual extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header>
          <div class="header_area">
            <div id="gnb">
              <div class="gnb_container">
                <a
                  class="go_back"
                  onClick={() => {
                    window.location.href = `/?code=${sessionStorage.getItem(
                      "code"
                    )}`;
                  }}
                ></a>
                <h2>이렇게 사용해 보세요</h2>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div class="manual">
            <a href="https://t.tableons.com/bujeon/mp4/ma001.mp4">
              <img class="manual_img" src={sub_manual} alt="매뉴얼영상" />
            </a>
            <p>
              <strong>편리한 장보기 영상으로 쉽게 만나기</strong>
              <br />
              <br />
              편리하게 장보는 방법
              <br />
              영상으로 만나보세요~
            </p>
          </div>
        </main>
        <Dock />
      </div>
    );
  }
}
export default manual;
