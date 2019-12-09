
/* #region Import statements */
import React, { Component } from "react";
import GeneralNavbar from '../components/navbar';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from './../../queries';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import "./login.css";
import {Button, Form, FormGroup,Label, Input, e } from'reactstrap';
     

import defaultValues from '../constants/defaultValues';
import { Session } from "inspector";

/* #endregion */

const userType = {customer:"Customer",restaurant:"Restaurant"}
/**
 * @description This login component will be used for both Customer and Restaurant
 */
export default class Login extends Component{    
    
    constructor(){
        super();  
        this.state = {
            email : "",
            name : "",
            password: "",
            dropdownOpen: false,
            authToken:null,
            errorMsg :null,
            loginMethod: SIGNIN_USER
        }
        this.onEmailChangeEvent = this.onEmailChangeEvent.bind(this);
        this.onPasswordChangeEvent = this.onPasswordChangeEvent.bind(this);
        this.submitButtonEvent = this.submitButtonEvent.bind(this);
       
    }

    componentDidMount(){
        this.setState({
            authToken:null,
        })   
    }


    /* #region OnChange methods and Submit Method */
    onEmailChangeEvent = (e) =>{
        
        this.setState({
            email : e.target.value
        })
        
    }

    onPasswordChangeEvent = (e) =>{
        this.setState({
            password : e.target.value
        })
        
    }

   
     
    // Login 
    submitButtonEvent = (e) => {
        //send the Get Request to Server 
        e.preventDefault();
        
        const req = {
            userType : this.state.userType,
            email: this.state.email,
            password: this.state.password

        }    
        event.preventDefault();
        signinUser().then(async ({ req }) => {
            
            this.setState({
                authToken : true
            })
        
        }).catch(error => {
            
            this.setState({
                errorMsg : error.toString()
            });
        }); 
        
            
}
    /* #endregion */
    
    render(){    
        const email = this.state.email;
        const password = this.state.password;
        let signUpLink = null;
        let errorMsg = null;
        let nextRedirect = null;
       
            signUpLink = <Link to='/create-user'>Not a user? Sign Up</Link>
      

        if(this.state.authToken){
            
            
                nextRedirect = (<Redirect to='/home'/>);    
        
           
        }
        else{
            errorMsg = <p>{this.state.errorMsg}</p>;
            
        }

        return (
            <div>
                {nextRedirect}
            <GeneralNavbar/>
            <div className = "Login">
                <div className="panel panel-default">
                    <div className="panel-body">
                    <h1>Customer Login </h1>
                    
                    <Mutation mutation={SIGNIN_USER} variables={{ email, password }}>
                        {(signinUser, { loading }) => {
                        return (
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" onChange={this.onEmailChangeEvent} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" onChange={this.onPasswordChangeEvent} required />
                        </FormGroup>
                        <FormGroup>                       
                            <Button color="danger" onClick={this.submitButtonEvent} block> Login </Button>
                        </FormGroup>
                        
                        <FormGroup>                       
                            {signUpLink}
                        </FormGroup>
                        {errorMsg}
                    </Form>
                            );
                        }}
            
                      </Mutation>
                    </div>
                </div>            
            </div>
            </div>
        )
    }
}
