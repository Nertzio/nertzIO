import React from 'react';
import {TopNavbar} from '../Navigation';

const MainLayout = ({children}) => {
  return (
    <div>
      <TopNavbar />
      {children}
    </div>
  )
}

export default MainLayout;
