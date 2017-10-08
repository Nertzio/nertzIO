import React from 'react';
import {TopNavbar} from '../Navigation';

const MainLayout = ({children}) => {
  console.log('MainLayout');
  return (
    <div>
      <TopNavbar />
      {console.log('TopNavbar')}
      {children}
    </div>
  )
}

export default MainLayout;
