import React, {Component} from "react";
import { render } from "react-dom";

class Root extends Component{

    render(){
        let renderData;
        renderData = (
            this.props.children
        );

        return(
          
                <div className="container-fluid">
                    <div className="row">
                        
                            {renderData}
        
                    </div>
                </div>
       
        );
    }
}

export default Root;