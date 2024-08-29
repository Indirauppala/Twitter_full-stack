import React from 'react';
import './SidebarOptions.css';

const SidebarOptions = ({ active, text, Icon }) => {
  return (
    <div className={`sidebarOptions ${active ? 'sidebarOptions_active' : ''}`}>
      <Icon className="twitter_icon"/>
      <h2>{text}</h2>
    </div>
  );
};

export default SidebarOptions;
