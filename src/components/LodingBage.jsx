import React  from 'react'
import "./loader.css"
export default function LodingBage({isLoding}) {
    
    

    if (!isLoding) return null;
  return (
    <div  className="loader-cont">
       
        <div class="loader-icon"></div>
        
        
        
        <div className="bottom">
          <p>CloseRoom</p>
          <p>© 2023 abdelmajid bendada</p>
        </div>
    </div>
  )
}
