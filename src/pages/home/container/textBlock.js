import React from 'react';
import '../landing.css';
import Articles from '../container/Articles';
import Footer from '../../../common/Footer'; 

function TextBlock({ darkMode }) { 
  return (
    <div id="textblock">
      <div id="textblock-container">
        <Articles />
      </div>
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default TextBlock;
