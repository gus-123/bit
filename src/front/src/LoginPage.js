import React from 'react';
import './login.css';

const LoginPage = () => {
    const handleKakaoLoginClick = () => {
        window.location.href = 'http://localhost:8080/oauth/kakao';
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div class="login-background"><span class="login-top-text">HELLENDAR</span></div>
                <span class="login-middle-text">맞춤형 건강 관리를 원하십니까?</span>
                <button
                    className='login-btn'
                    onClick={handleKakaoLoginClick}
                >
                    <span class="login-text">로그인</span>
                </button>
            </div>
        </div>
    );
};

export default LoginPage;