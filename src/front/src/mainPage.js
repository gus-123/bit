import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useCookies } from 'react-cookie';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import photo from'./default_profile.png';
//import { useSidebar } from './sidebarContext';
//import Sidebar from './sidebar';
// import Footer from './footer';
import Header from './header';
import mainImage from './mainImage.jpg';
import wbb from './week-bmi-btn.png';
import rfb from './recom-food-btn.png';
import sb from './stress-btn.png';
import rpb from './recom-pt-btn.png';
import axios from 'axios';

function MainPage() {

    const [isProfileVisible, setIsProfileVisible] = useState(true); // 프필 박스가 보이는 게 기본
    const [isYouMember, setIsYouMember] = useState(false);
    const [isBirthday, setIsBirthday] = useState();
//    const { isSidebarVisible } = useSidebar();

    const  [member, setMember] = useState({profile_image:'', nickname_m: ''});
    const data = JSON.parse(localStorage.getItem('data')); // localStorage에서 data 값을 문자열로 가져와서 객체로 변환
    const urls = `/members/${data}`; // 객체의 id 속성을 url 경로에 넣음
    const url = `/view/${data}`; // 객체의 id 속성을 url 경로에 넣음

    const COOKIE_KEY = window.LOGIN_KEY;
    const logoutURL = window.LOGIN_SESSION_KEY_URL + '/logout?redirect_uri=${window.location.origin}';
//    const [, , removeCookie] = useCookies([COOKIE_KEY]);
    const loginPageURL = '/';


//    const handleLogout = () => {
//        removeCookie(COOKIE_KEY, {path: '/'});
//        window.location.href = logoutURL;
//        window.location.href = loginPageURL;
//    }


    useEffect(() => { // 회원 정보 가져옴
        axios.get(urls)
            .then((response) => {
                setMember(response.data);
            })
            .catch((error) => {
                console.log("Error while getting profile data:", error);
            })
    }, []);

    useEffect(() => { // 생일 데이터 가져옴
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


    useEffect(() => {
        if (!isYouMember) {
            setMember({
                profile_image: photo, // 디폴트 프로필 이미지 경로로 변경
                nickname_m: '마이페이지에서 정보를 입력해주세요.'
            });
        }
    }, [isYouMember]);

//    useEffect(() => {
//      const profileBox = document.querySelector('.profile-box');
//      if (profileBox) {
//        if (isYouMember) {
//          // 회원이면 보이도록
//          profileBox.style.display = 'block';
//        } else {
//          // 비회원이면 숨기도록
//          profileBox.style.display = 'none';
//        }
//      }
//    }, [isYouMember]);

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

    const scrollToWeekBMI = () => {
        const weekBMISection = document.querySelector('.hidden-line');
        if (weekBMISection) {
            weekBMISection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToRecomFood = () => {
        const recomFoodSection = document.querySelector('.PT-type3-text');
        if (recomFoodSection) {
            recomFoodSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToStress = () => {
        const stressSection = document.querySelector('.stress-release');
        if (stressSection) {
            stressSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToRecomPt = () => {
        const recomPTSection = document.querySelector('.phrase-line');
        if (recomPTSection) {
            recomPTSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const profileBox = document.querySelector('.profile-box');
        const container = document.querySelector('.container');

        if (profileBox && container) {

          const containerHeight = container.offsetHeight;
          const profileBoxHeight = profileBox.offsetHeight;

          const maxTop = containerHeight - profileBoxHeight - 200;
          const newTop = Math.min(maxTop, Math.max(200, scrollY));

          const maxMove = 500;
          profileBox.style.top = Math.min(newTop, + maxMove) + 'px';
        }
      };

      document.addEventListener('scroll', handleScroll);

      return () => {
        document.removeEventListener('scroll', handleScroll);
      };
    }, []);


    return (
        <div className="mainPage">
            <Header/>

            {/* Sidebar 컴포넌트 추가 */}
            {/*{isSidebarVisible && <Sidebar />}*/}

            {/* 프로필 팝업 */}
            {isProfileVisible && (
                <div className="profile-box align-items-center">
                    <div className="prf-img"><img src={member.profile_image} width={120} height={150}
                        alt="profile_image" className="main-logo"/></div>
                    <span className="prf-name">회원명: {member.nickname_m}</span>
                    <button className="myPage-btn"
                        onClick={() => { window.location.href = url; }}>
                        <span
                            className="myPage-text text-start fs-5 mr-3 text-secondary">
                            마이페이지</span>
                    </button>
                    <button className="calendar-btn"
                        onClick={() => { window.location.href = '/calendar'; }}>
                        <span
                            className="calendarPage-text text-start fs-5 mr-3 text-secondary">
                            캘린더</span>
                    </button>
                    <span className="logout-btn">로그아웃</span>
                    <Link to='/main/{data}'>
                        <i class="bi bi-house-door-fill"></i>
                    </Link>
                </div>
            )}

            <div className='bodyWrap' style={{ backgroundImage: `url(${mainImage})` }}>
                <button className="week-bmi-btn" style={{ backgroundImage: `url(${wbb})` }} onClick={scrollToWeekBMI}></button>
                <button className="recom-food-btn" style={{ backgroundImage: `url(${rfb})` }} onClick={scrollToRecomFood}></button>
                <button className="stress-btn" style={{ backgroundImage: `url(${sb})` }} onClick={scrollToStress}></button>
                <button className="recom-pt-btn" style={{ backgroundImage: `url(${rpb})` }} onClick={scrollToRecomPt}></button>
            </div>

            <div className="container">
                <div class="phrase-container"><span class="phrase">All thing are difficult before they are easy
                                모든일이 그렇다 쉽기 전에는 어렵다</span>
                    <div class="phrase-line" />
                </div>
                <div className="col-md-12">
                    <div className="recom-pt">
                        <div className="recom-PT-title-box text-center">
                            <span className="recom-PT-title-text">추천운동</span>
                        </div>
                        <div className="recom-PT-box text-center">
                            <div className="PT-type1-image"></div>
                            <div className='PT-type1-textbox'>
                                <span className="PT-type1-text">윗몸일으키기</span>
                            </div>
                            <div className="PT-type2-image"></div>
                            <div className='PT-type2-textbox'>
                                <span className="PT-type2-text">랜바이어푸흘귄기</span>
                            </div>
                            <div className="PT-type3-image"></div>
                            <div className='PT-type3-textbox'>
                                <span className="PT-type3-text">축구</span>
                            </div>
                        </div>
                    </div>
                    <div className="recom-food">
                        <span className="recom-Food-title text-center">식단표</span>
                        <div className="text-center align-items-center">
                            <div className='row justify-content-center'>
                                <div className='col-md-4 col-lg-3'>
                                    <div className="recom-Food-out-box1">
                                        <span className="food-time">아침</span>
                                        <div className="recom-Food-in-box"></div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-lg-3'>
                                    <div className="recom-Food-out-box2">
                                        <span className="food-time">점심</span>
                                        <div className="recom-Food-in-box"></div>
                                    </div>
                                </div>
                                <div className='col-md-4 col-lg-3'>
                                    <div className="recom-Food-out-box3">
                                        <span className="food-time">저녁</span>
                                        <div className="recom-Food-in-box"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hidden-line"/>
                    <div className='week-bmi'>
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
                    <div className='stress-release'>
                        <span className="stress-title recom-Food-title text-center">스트레스 해소 방법</span>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div class="stress-title-box1"><span class="stress-food fs-3">음식</span></div>
                            <div class="stress-title-box2"><span class="stress-action fs-3">활동</span></div>
                            <div class="stress-box1"></div>
                            <div class="stress-box2"></div>
                        </div>
                    </div>
                </div>
            </div>
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