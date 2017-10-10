import React from 'react';
import {TopNavbar} from '../Navigation';
import {BlurWhenActionRequired} from '../AppStateFeedback';


const MainLayout = ({children}) => {
  return (
    <div>
      <TopNavbar />
      <BlurWhenActionRequired>
        {() => children}
      </BlurWhenActionRequired>
    </div>
  )
}

export default MainLayout;
