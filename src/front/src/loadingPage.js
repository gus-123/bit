import React from 'react';
import './login.css';
import loading from './loading.gif';

const LoadingPage = () => {
    return (
        <div class="loading-page"><span  class="loading-text">잠시만 기다려주세요</span>
        <div class="loading-gif" style={{ backgroundImage: `url(${loading})` }}></div></div>
    );
};
export default LoadingPage;