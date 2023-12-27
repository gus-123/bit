import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSidebar } from './sidebarContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  const handleMenuClick = (path) => {
    toggleSidebar(); // 메뉴 클릭 시 사이드바 닫기
    navigate(path);
  };

  return (
    <div className={`sidebar ${isSidebarVisible ? 'sidebar-show' : 'sidebar-hide'}`}>
      <ul>
        <li>
          <Link to="/view/1" onClick={() => handleMenuClick('/view/1')}>
            <span className="myPage-text fs-4 fw-bold">마이페이지</span>
          </Link>
        </li>
        <li>
          <Link to="/calendar" onClick={() => handleMenuClick('/calendar')}>
            <span className="calendarPage-text fs-4 fw-bold mr-3">캘린더</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
