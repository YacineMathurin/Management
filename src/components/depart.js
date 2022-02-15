import React from 'react';

const Depart = ({text, showPath, percent, onHandleDestChoosen, index, blured, ...rest}) => {
    console.log("Index && Blured", index, blured);
    const ref = React.useRef();
    return ( 
        <div className={"depart_container"} onClick={()=>onHandleDestChoosen(index)} style={{pointerEvents: blured ? "none": "auto"}}>
            <div disabled={true} className={!blured ? "depart_btn":"depart_btn blured"} {...rest}><span className="depart_btn_text">{text}</span></div>
            {(showPath || percent) && <div style={{display:"flex", alignItems:"center", position:"relative"}}>
                {showPath && <div style={{left: percent ? "1.1em":"0"}} className="depart_distance"></div>}
                {percent && <div className="depart_distance_realtime" style={{height: ""+percent+"px"}}></div>}
                {percent && <span className="depart_percentage">{percent < 98 ? percent+"%":"OK !!!"}</span>}
            </div>}
        </div>
     );
}
 
export default Depart;