import React from "react";
import config from "../json/config.json";
import storeservice from "../service/storeservice";
import icon_share_sms from "../resource/img/icon/icon_share_sms.svg";
import icon_share_kakao from "../resource/img/icon/icon_share_kakao.svg";

class Modal extends React.Component {
  constructor() {
    super();
    this.state = {
      store: [],
    };
  }

  componentDidMount() {
    // 가맹점의 상세정보를 가져옴
    storeservice.getStoreDetail(this.props.storecode).then((res) => {
      this.setState({ store: res.data });
    });
    // 카카오톡 sdk 추가
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }

  checkMobile() {
    var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
    if (varUA.indexOf("android") > -1) {
      // 안드로이드
      return "android";
    } else if (
      varUA.indexOf("iphone") > -1 ||
      varUA.indexOf("ipad") > -1 ||
      varUA.indexOf("ipod") > -1
    ) {
      // IOS
      return "ios";
    } else {
      // 아이폰, 안드로이드 외
      return "other";
    }
  }

  render() {
    return (
      <div>
        <div className="share_icon_wrap">
          <div className="share_icon">
            <button
              className="share_kakao"
              onClick={() => {
                if (window.Kakao) {
                  const kakao = window.Kakao;
                  if (!kakao.isInitialized()) {
                    kakao.init("19eab3a30f796b6d20716c28e1b57222");
                  }
                  kakao.Link.sendDefault({
                    objectType: "feed",
                    content: {
                      title: this.state.store.name,
                      description: this.state.store.explan,
                      imageUrl:
                        config.host +
                        `/getStoreImg/${this.state.store.regnumber}`,
                      link: {
                        mobileWebUrl: window.location.href,
                        webUrl: window.location.href,
                      },
                    },
                  });
                }
              }}
            >
              <img src={icon_share_kakao} alt="카카오톡 공유하기" />
              <p>카카오톡</p>
            </button>
            <button
              className="share_sms"
              onClick={() => {
                window.location.href =
                  "sms:" +
                  (this.checkMobile() === "ios" ? "&" : "?") +
                  `body=링크: ${window.location.href}`;
              }}
            >
              <img src={icon_share_sms} alt="문자 공유하기" />
              <p>문자</p>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
