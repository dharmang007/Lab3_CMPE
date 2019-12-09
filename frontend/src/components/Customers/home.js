import React, { Component } from "react";
import "../login.css";
import GeneralNavbar from '../navbar';
import {Redirect}  from 'react-router';

import defaultValues from "../../constants/defaultValues";
     
export default class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }

    }
    
    componentWillMount(){

    }
    render(){
        var nextRedirect = null;
        
        return(    
                <div className="container">
                   
                    <GeneralNavbar/>
                    
                    <h3>Welcome  {this.state.user.name}</h3>      
                    <div className="row">                        
                        <img className="contain"  />
                        <p>{defaultValues.serverURI+"/api/customers/"+this.state.user._id+"/profileImg"}</p>
                    </div>         
                    <div className="row">
                        <div className="col-md-6"><p></p></div>
                        <div className="col-md-6"><p> </p></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"><p></p></div>
                        <div className="col-md-6"><p></p></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"><p></p></div>
                        <div className="col-md-6"><p></p></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6"></div>
                        <div className="col-md-6"></div>
                    </div>

                </div>
        );
    }

}


