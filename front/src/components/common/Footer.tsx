import { useEffect, useState } from "react";

function Footer() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleShowButton = () => {
      // 스크롤 길이
      window.scrollY > 150 ? setShowButton(true) : setShowButton(false);
    };

    console.log(window.scrollY);
    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);

  return (
    <>
      {showButton && (
        <div className="scroll-top-move">
          <img
            src="/images/top-button.png"
            className="button-click-top-move"
            onClick={scrollToTop}
          />
        </div>
      )}
      <div className="jwFooterDiv3">
        <div className="jwFooterDiv1">
          <div className="jwFooterDiv2">
            <div>
              <div>
                <div className="jwFooterDiv4">
                  <h3 className="heading">그린에어 프로젝트 팀원</h3>
                  <table>
                    <tr>
                      <td>
                        <ul className="list-unstyled social">
                          <li className="jwLi1">
                            이주영
                            <a href="https://jy-java.tistory.com/">
                              <span className="bi bi-bootstrap-fill ml-2 fs-5"></span>
                            </a>
                            <a href="https://github.com/ljy1348">
                              <span className="bi bi-github ml-2 fs-5"></span>
                            </a>
                          </li>
                          <li className="jwLi1">
                            강상민
                            <a href="https://stunote.tistory.com/">
                              <span className="bi bi-bootstrap-fill ml-2 fs-5"></span>
                            </a>
                            <a href="https://github.com/sangminka">
                              <span className="bi bi-github ml-2 fs-5"></span>
                            </a>
                          </li>
                          <li className="jwLi1">
                            권진욱
                            <a href="https://digiiiiiy.tistory.com/">
                              <span className="bi bi-bootstrap-fill ml-2 fs-5"></span>
                            </a>
                            <a href="https://github.com/digiiy">
                              <span className="bi bi-github ml-2 fs-5"></span>
                            </a>
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul className="list-unstyled social">
                          <li className="jwLi1"></li>
                          <li className="jwLi2">
                            남희현
                            <a href="https://namhee7209.tistory.com/">
                              <span className="bi bi-bootstrap-fill ml-2 fs-5"></span>
                            </a>
                            <a href="https://github.com/NHH7209">
                              <span className="bi bi-github ml-2 fs-5"></span>
                            </a>
                          </li>
                          <li className="jwLi2">
                            박유빈
                            <a href="https://qnsrkzn99.tistory.com/">
                              <span className="bi bi-bootstrap-fill ml-2 fs-5"></span>
                            </a>
                            <a href="https://github.com/mayoigaa">
                              <span className="bi bi-github ml-2 fs-5"></span>
                            </a>
                          </li>
                          <li className="jwLi2">
                            이지우
                            <a href="https://wmnm1150.tistory.com/">
                              <span className="bi bi-bootstrap-fill ml-2 fs-5"></span>
                            </a>
                            <a href="https://github.com/honmono14">
                              <span className="bi bi-github ml-2 fs-5"></span>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
