import React, {Component} from "react";

class Home extends Component{
    render(){
        return(
            <div>
                <p>{this.props.isExist}</p>
                <h2>Home</h2>
            </div>
        );
    }
}

export default Home;