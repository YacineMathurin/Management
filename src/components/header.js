import React from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const Header = ({title, subheader, onBackClicked}) => {
    return ( 
        <Card>
            <CardHeader
                avatar={
                <div>
                    <img width="32" src="./images/carrier.svg" />
                </div>
                }
                title={title}
                subheader={subheader}
            />
            <CardContent >
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: "relative",
                    bottom: "6.5em",
                }}>
                <img onClick={() => onBackClicked()} src={"./images/go_back.png"} style={{width:"50px", marginRight:"1em", position:"relative", top:"15px", left:"17px"}}></img>
                </div>
            </CardContent>
        </Card>
    );
}
 
export default Header;