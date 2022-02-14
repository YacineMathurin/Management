import React from 'react';

const Depart = ({text, showPath, percent, onHandleDestChoosen, index, ...rest}) => {
    return ( 
        <div className="depart_container" onClick={()=>onHandleDestChoosen(index)}>
            <div className="depart_btn" {...rest}><span>{text}</span></div>
            {(showPath || percent) && <div style={{display:"flex", alignItems:"center", position:"relative"}}>
                {showPath && <div style={{left: percent ? "1.1em":"0"}} className="depart_distance"></div>}
                {percent && <div className="depart_distance_realtime" style={{height: ""+percent+"px"}}></div>}
                {percent && <span className="depart_percentage">{percent}%</span>}
            </div>}
        </div>
     );
}
 
export default Depart;