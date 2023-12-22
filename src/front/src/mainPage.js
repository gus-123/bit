import React, { useState , useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
// import Footer from './footer';
import Header from './header';
import axios from 'axios';

function MainPage() {

    const [isProfileVisible, setIsProfileVisible] = useState(true); // 프필 박스가 보이는 게 기본
    const [isYouMember, setIsYouMember] = useState(false);
    const [isBirthday, setIsBirthday] = useState();

    const  [member, setMember] = useState({profile_image:'', nickname_m: ''});
    const data = JSON.parse(localStorage.getItem('data')); // localStorage에서 data 값을 문자열로 가져와서 객체로 변환
    const urls = `/members/${data}`; // 객체의 id 속성을 url 경로에 넣음
    const url = `/view/${data}`; // 객체의 id 속성을 url 경로에 넣음


    useEffect(() => {
        axios.get('/members')
            .then((response) => {
                setIsBirthday(response.data);
            })
            .catch((error) => {
                console.log("Error while fetching books:", error);
            });
    }, []);

    useEffect(() => {
        setIsYouMember(!!isBirthday); // isBirthday가 trut이면 true, false면 false
    }, [isBirthday]);

        useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth <= 1279) {
                    setIsProfileVisible(false); // 프필 박스 숨김
                } else {
                    setIsProfileVisible(true);
                }
            };

            handleResize();

            window.addEventListener('resize', handleResize);

            // 컴포넌트가 안 쓰일 때 이벤트 지움
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

    const [feedbackData, setFeedbackData] = useState({
        rec_ac: '', // 운동추천 부분
        rec_ac1: '',
        rec_ac2: '',
        rec_ac3: '',

        rec_fd: '', // 식단추천 부분
        rec_fd1: '',
        rec_fd2: '',
        rec_fd3: '',

        rec_pd: '', // 피드백 부분

        rec_ta: '', // 스트레스 해소 부분
        rec_ta1: '', // 음식
        rec_ta2: '', // 활동
    });
    return (
        <div className="mainPage">
            <head>
            </head>
                <body>
                    <Header/>
                    <main>
                        <div className='bodyWrap'>
                            <div className="container">
                                <div className="col-md-12">
                                    <div className="recom-PT-title-box text-center">
                                        <span className="recom-PT-title-text">추천운동</span>
                                    </div>
                                    <div className="recom-PT-box text-center">
                                        <div className="PT-type1">
                                            <span className="PT-type1-text">윗몸일으키기</span>
                                        </div>
                                        <div className="PT-type2">
                                            <span className="PT-type2-text">랜바이어푸흘귄기흘</span>
                                        </div>
                                        <div className="PT-type3">
                                            <span className="PT-type3-text">축구</span>
                                        </div>
                                    </div>

                                    <div className="text-center">
                                        <span className="recom-Food-title text-center">식단표</span>
                                        <div className="text-center align-items-center">
                                            <div className='row justify-content-center'>
                                                <div className='col-md-4 col-lg-3'>
                                                    <div className="recom-Food-out-box1">
                                                        <span className="Food-morning">아침</span>
                                                        <div className="recom-Food-in-box1"></div>
                                                    </div>
                                                </div>

                                                <div className='col-md-4 col-lg-3'>
                                                    <div className="recom-Food-out-box2">
                                                        <span className="Food-afternoon">점심</span>
                                                        <div className="recom-Food-in-box2"></div>
                                                    </div>
                                                </div>

                                                <div className='col-md-4 col-lg-3'>
                                                    <div className="recom-Food-out-box3">
                                                        <span className="Food-evening">저녁</span>
                                                        <div className="recom-Food-in-box3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='text-center'>
                                        <span className="BMI-title recom-Food-title text-center">
                                            한 주 간 BMI 측정지수
                                        </span>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div className="BMI-graphBox">
                                                <span className="BMI-text position-absolute start-0 fs-5">BMI <br></br> (%)</span>
                                                <div className="BMI-graph-section"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <span className="stress-title recom-Food-title text-center">스트레스 해소 방법</span>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <div className="stress-box">
                                                <div className="stress-title-box">
                                                    <div className="middle-line"></div>
                                                    <span className="stress-food fs-3">음식</span>
                                                    <span className="stress-action fs-3">활동</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    {/* <div className="graph-img"></div> */}
                                </div>
                            </div>
                            <div className="profile-container">
                                {/* 프로필 팝업 */}
                                {isYouMember && isProfileVisible && (
                                    <div className="profile-box align-items-center">
                                        <div className="prf-img"><img src={member.profile_image} width={120} height={150}
                                            alt="profile_image" className="main-logo"/></div>
                                        <span className="prf-name">&nbsp;&nbsp;&nbsp;{member.nickname_m} 님</span>
                                        <button className="myPage-btn"
                                            onClick={() => { window.location.href = url; }}>
                                            <span
                                                className="myPage-text text-start fs-5 mr-3 text-secondary">
                                                마이페이지</span>
                                        </button>
                                        <button className="calendar-btn"
                                            onClick={() => { window.location.href = urls; }}>
                                            <span
                                                className="calendarPage-text text-start fs-5 mr-3 text-secondary">
                                                캘린더</span>
                                        </button>
                                        <span className="logout-btn">로그아웃</span>
                                        <i class="bi bi-house-door-fill"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>       
                </body>
                <div class="m-footer">
                    <div class="footer-line">
                        <span class="footer-title">Withus</span>
                        <span class="footer-info">Contact Us 33 Seocho-daero 74-gilSeocho-gu,Seoul,
                            Korea Phone: +82 10 5589 5488 Email: bit@example.com</span>
                    </div>
                </div>
        </div>
    );
}

export default MainPage;
