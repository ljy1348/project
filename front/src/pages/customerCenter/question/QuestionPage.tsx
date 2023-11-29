import React, { useEffect } from "react";
import { Accordion } from "react-bootstrap";
import initScripts from "../../../assets/js/scripts";
import initCustom from "../../../assets/js/custom";

function QuestionPage() {
  useEffect(() => {
    initScripts();
    initCustom();
  }, []);

  return (
    <div>
      {/* 테마 제목 시작 */}
      <div className="hero hero-customer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto text-center">
              <div className="intro-wrap">
                <h1 className="mb-0">자주 찾는 질문</h1>
                <p className="text-white">
                 무엇을 도와드릴까요?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 테마 제목 끝 */}

      {/* 질문 List */}
      <Accordion className="test1">
        
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            항공권 구매 후 탑승날짜 또는 노선 변경이 가능한가요?
          </Accordion.Header>
          <Accordion.Body>
            구매하신 항공권은 탑승날짜 변경만 가능하며, 이용구간(노선) 변경은 할
            수 없습니다. <br />
            제주항공 홈페이지 및 모바일앱에서 구매하신 항공권은 홈페이지와
            앱에서 변경/취소가 가능합니다.
            <br />
            <br />
            1) 국내선 항공권 날짜 변경시 - 최초 결제금액에서 변경수수료를 제외한
            금액이 환불되며, 변경하신 신규 항공권 운임으로 다시 결제 됩니다.
            <br />
            <br />
            2) 국제선 항공권 날짜 변경시 - 기존에 구매한 항공권과 새로 구매한
            항공권 운임 차액과 변경 수수료가 추가로 결제 됩니다.
            <br />
            <br />
            ※ 항공권의 변경 및 취소는 최초 구매처를 통해 가능합니다. - 제주항공
            고객센터에서 구매하신 항공권은 고객센터를 통해 변경/취소가
            가능합니다.
            <br />
            <br />
            여행사 또는 다른 홈페이지 (예시 :익스피디아, 트립닷컴 등)에서
            구매하신 항공권은 최초 구매하신 곳으로 연락해주셔야 합니다
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            태풍, 지진 등 천재지변이나 스케줄 변경으로 인한 항공기 지연 또는
            결항 시 항공권 변경(취소)는 어떻게 하나요?
          </Accordion.Header>
          <Accordion.Body>
            천재지변(태풍, 지진, 폭우, 폭설 등)이나 스케줄 변경으로 인한 항공편
            지연 또는 결항 관련하여 문자, 이메일 등을 통해 고객 안내를 실시하고
            있습니다.
            <br />
            지연 또는 결항 확정 사항을 안내 받으신 경우에는 수수료 없이 항공권
            1회 변경(변경 가능기한 국내선/국제선 +/- 2일 이내) 또는 환불이
            가능합니다. <br />
            단, 변경가능한 일정은 지연시간에 따라 달라지며 운임차액이 발생될 수
            있습니다.
            <br />
            <br />
            제주항공 홈페이지 또는 모바일(웹/앱)에서 직접 구매한 항공권
            <br />
            - 취소 및 환불은 홈페이지/ 모바일(웹/앱) 마이페이지에서 조회하여
            취소 가능합니다.
            <br />
            - 마이페이지에서 취소 되지 않는경우에는 홈페이지의 고객센터 [ 1:1
            문의하기 ]에 예약번호, 탑승날짜, 성명을 기입하여 취소 요청을
            해주시면 순차적으로 취소 및 환불을 진행해드리겠습니다.
            <br />
            - 변경은 고객센터(채팅상담 포함) 또는 출발 지점으로 요청해주시면
            가능합니다.
            <br />
            <br />
            여행사 및 타 사이트를 통해 구매한 항공권은 해당 여행사 및 구입처로
            문의하여 주시기 바랍니다.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            기내반입 수하물 허용량은 어떻게 되나요?
          </Accordion.Header>
          <Accordion.Body>
            기내반입 수하물 허용량은 1인당 10kg 이하 1개 입니다.
            <br />
            반입 가능 사이즈는 세변의 합이 115cm(가로 55cm+세로 40cm+높이
            20cm)입니다.
            <br />
            (혹은 한변의 길이가 최대 55cm를 넘지 않으면서 세변의 합이 115cm일
            경우도 가능 )
            <br />
            기내반입 수하물은 구매하신 항공권 운임과 관계없이 모두에게 제공되는
            서비스입니다.
            <br />
            (단, 24개월 미만 유아는 제외)
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>국내선의 성수기는 언제인가요?</Accordion.Header>
          <Accordion.Body>
            2023년 기준
            <br />
            1월 ~ 3월 : 1.1 , 1.19 ~ 1.26 , 2.19 ~ 3.1
            <br />
            4월 ~ 6월 : 5.1 , 5.4 ~ 5.7 , 6.4 ~ 6.6
            <br />
            7월 ~ 10월 : 7.23 ~ 8.19 , 9.27 ~ 10.6 , 10.9
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>
            가족 간의(동승객) 수하물 합산이 가능한가요?
          </Accordion.Header>
          <Accordion.Body>
            동일 카운터에서 2인 이상 같이 수속하고, 출/도착지 공항이 같은경우
            함께 탑승하시는 동승자간 위탁수하물 합산이 가능합니다.
            <br />
            또한, 구매하신 수하물 운임에 따른 무게를 맞춰주신다면 1개 이상의
            수하물도 위탁이 가능합니다.
            <br />
            (대양주 제외)
            <br />
            단, 구매하신 수하물 무게 내 1개의 크기는203cm(가로X세로X높이의
            합)이내여야 하며, 한 가방의 무게는 32Kg까지만 가능한 점
            참고바랍니다.
            <br />
            7월 ~ 10월 : 7.23 ~ 8.19 , 9.27 ~ 10.6 , 10.9
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>
            해외 공항에서 출발하는 국제선은 모바일 탑승권 발금이 안 되나요?
          </Accordion.Header>
          <Accordion.Body>
            해외 공항에서 출발하는 국제선의 경우 일부 일본 노선을 제외하고
            모바일 탑승권 발급이 제한되며, 공항 카운터에서 탑승권을 발급
            받으셔야 합니다.
            <br />
            <br />
            *일본발 모바일 탑승권 발급 가능 노선
            <br />
            - 나리타 (NRT) - 시즈오카 (FSZ) - 나고야(NGO) -오사카(KIX) 
            <br />
            - 마쯔야마(MYJ) -오이타(OIT) -히로시마(HIJ) -후쿠오카(FUK)
            <br />
            <br />
            국제선 항공편은 출발 24시간 전 부터 1시간 30분 전까지만 발급받으실
            수 있습니다.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>
            위탁 수하물(캐리어)이 파손 되었는데 어떻게 하나요?
          </Accordion.Header>
          <Accordion.Body>
            그린항공을 이용하시면서 위탁하신 수하물(캐리어)이 파손된 경우에는
            공항에서 바로 확인하신 경우에는 주변 그린항공 직원에게 문의하여 파손
            접수를 하시기 바랍니다. 현장에서 바로 확인을 하지 못하고
            거주지(집)으로 가신 다음에 확인하셨다면 도착일 기준 7일 이내에
            도착지 공항의 그린항공 또는 홈페이지 1:1 문의하기를 통해
            접수해주시기 바랍니다.
            <br />
            <br />
            아래의 경우는 배상대상이 아니오니, 유의하여 주시기 바랍니다.
            <br />
            - 유모차 부속품, 외부에 튀어나온 장식이나 손잡이, 고객 과실, 수하물
            고유 결함 등으로 인해 발생한 파손
            <br />
            - 정상적인 수하물 취급과정에서발생하는 경미한 긁힘, 흠집, 눌림 얼룩
            및 마모
            <br />- 액세서리, 외부 자물쇠, 이름표, 커버, 벨트 등 부속품의 분실
            및 손상
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion.Header>DB 확인 후</Accordion.Header>
          <Accordion.Body>{/* 여기 */}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>DB 확인 후</Accordion.Header>
          <Accordion.Body>{/* 여기 */}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion.Header>DB 확인 후</Accordion.Header>
          <Accordion.Body>{/* 여기 */}</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="10">
          <Accordion.Header>DB 확인 후</Accordion.Header>
          <Accordion.Body>{/* 여기 */}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default QuestionPage;
