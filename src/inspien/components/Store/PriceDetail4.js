import React, {useEffect, useState} from 'react';
import Button from "components/Button/Button";
import ConfirmDialog from "components/Modal/ConfirmDialog";
import CustomDatePicker from "../datepicker/CustomDatePicker";
import {AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import RadioButton from "../Radio/RadioButton";
import {Link} from "react-router-dom";
import Dialog from "../Modal/Dialog";
import DialogCheck from "../../images/ico/ico_check_bg.svg";
import {ModalWrap} from "../../styles/modal.styled";
import {customerTheme} from "../../theme";

function PrdDetail4({ setTheme, family, onContentClick }){
    useEffect(() => {
        setTheme(customerTheme);
    }, []);
    const [check, setCheck] = useState("period2");
    //팝업
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    let year;
    if(check === "period2") {
        year = "1년";
    }else{
        year = "3년";
    }

    return (
        <>
            <div className="price_detail">
                <div className="outline_box">
                    <p className="title">구독형</p>
                    <div className="price_info">
                        <div>
                            <p className="info_title">이용 개시</p>
                            <div className="info_text">
                                <CustomDatePicker />
                                <p className="dot_msg">이용 개시일을 기준으로 사용 금액 익월 청구 예정</p>
                            </div>
                        </div>
                        <div>
                            <p className="info_title">단위</p>
                            <div className="info_text">100<span className="unit">GB</span></div>
                        </div>
                        <div>
                            <p className="info_title">판매가</p>
                            <div className="info_text">90,000<span className="unit">원</span></div>
                        </div>
                        <div>
                            <p className="info_title">수량</p>
                            <div className="info_text">
                                <div className="count_box">
                                    <button type="button"><AiOutlineMinus /></button>
                                    <label>1</label>
                                    <button type="button"><AiOutlinePlus /></button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="info_title">구독기간</p>
                            <div className="info_text">
                                <div className="radios">
                                    <RadioButton label="무약정" name="period" id="period1" onChange={() => setCheck("period1")} checked={check === "period1" && "true"} />
                                    <RadioButton label="1년" name="period" id="period2" onChange={() => setCheck("period2")} checked={check === "period2" && "true"} />
                                    <RadioButton label="3년" name="period" id="period3" onChange={() => setCheck("period3")} checked={check === "period3" && "true"} />
                                </div>
                            </div>
                        </div>
                        <div className="total">
                            <p className="info_title">총 상품 금액</p>
                            <div className="info_text">90,000<span className="unit">원</span></div>
                        </div>
                    </div>
                </div>
                {/*단독 주문 불가 - 패밀리 상품*/}
                {family ? <>
                    <Button type="button" className="large full" onClick={() => setVisible(true)}>장바구니</Button>
                    <div className="guide_box">
                        <p>단독 주문과 이용이 불가한 패밀리 상품입니다.</p>
                        <p>하단의 <span className="link" onClick={onContentClick}>상품정보</span>에서 부모 패밀리 정보를 확인 후 같이 장바구니에 담아주세요.</p>
                        <p>※ 이미 부모 패밀리 상품을 이용중인 경우 재구매는 불필요합니다.</p>
                    </div>
                </> : <Button type="button" className="large full" onClick={() => setVisible2(true)}>장바구니</Button>}
                {/*단독 주문 불가 - 패밀리 상품*/}
                {check !== "period1" ? <div className="guide_box">
                    <div className="bottom_guide">
                        <p>구독형 {year} 약정의 상품입니다.</p>
                        <p>약정 기간 동안 월별로 금액이 청구되며, 마지막 1개월의 청구 금액은 마일리지 할인이 자동으로 적용됩니다.</p>
                        <p>※ 약정 기간 도중 이용 취소/해지 시 마일리지 발급 제한</p>
                    </div>
                </div>: null}
            </div>
            <ConfirmDialog
                visible={visible}
                text="부모 패밀리 상품이 반드시 필요한 상품입니다."
                subText="확인 시 관련 상품의 상세 페이지로 이동합니다."
                //onConfirm={}
                onCancel={() => setVisible(false)}
            />
            <ModalWrap className="complete_order_modal">
                <Dialog visible={visible2} size={"small"} onCancel={() => setVisible2(false)}>
                    <div className="modal_text">
                        <img src={DialogCheck} alt="" />
                        <p className="main_text">장바구니 담기 완료</p>
                        <p className="sub_text"><b>EDI 워크스페이스 구축</b> 상품이<br />장바구니에 정상적으로 담겼습니다.</p>
                    </div>
                    <div className="button_wrap">
                        <Button type="button" className="large" onClick={() => window.location.href = "/cart/cart2"}>장바구니 이동</Button>
                    </div>
                </Dialog>
            </ModalWrap>
        </>
    )
}

export default PrdDetail4;