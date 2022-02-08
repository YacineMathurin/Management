import React from 'react';

const Depart = ({text, distance, current}) => {
    return ( 
        <div className="depart_container">
            <div className="depart_btn"><span>{text}</span></div>
            <div style={{display:"flex", alignItems:"center", position:"relative"}}>
                {distance && <div style={{left: current ? "1.1em":"0"}} className="depart_distance"></div>}
                {current && <div className="depart_distance_realtime"></div>}
                {current && <span className="depart_percentage">50%</span>}
                {/* <div><span>{distance} %</span></div> */}
            </div>
        </div>
     );
}
 
export default Depart;