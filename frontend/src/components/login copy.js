
/* #region Import statements */
import React, { Component } from "react";
import GeneralNavbar from '../components/navbar';
import { Mutation } from 'react-apollo';
import { SIGNIN_RESTAURANT } from './../../queries';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import "./login.css";
import {Button, Form, FormGroup,Label, Input, Dropdown,
     DropdownMenu, DropdownItem, DropdownToggle } from'reactstrap';
     

import defaultValues from '../constants/defaultValues';

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
        this.userTypeChangeEvent = this.userTypeChangeEvent.bind(this);
        this.toggle = this.toggle.bind(this);
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
        
            
}
    /* #endregion */
    
    render(){    
        const email = this.state.email;
        const password = this.state.password;
        let signUpLink = null;
        let errorMsg = null;
        let nextRedirect = null;
        if(this.state.userType == userType.customer){
            signUpLink = <Link to='/create-user'>Not a user? Sign Up</Link>
        }
        else{
            signUpLink = <Link to='/create-restaurant'> Expand your Business! Sign Up</Link>
        }

        if(this.state.authToken){
            
            if(this.state.userType == userType.customer){
                nextRedirect = (<Redirect to='/home'/>);    
            }
            else {
                nextRedirect = (<Redirect to='/home-restaurant' />);
            }
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
                    <h1> Restaurant Login </h1>
                    
                    <Mutation mutation={SIGNIN_} variables={{ email, password }}>
                        {(signinRestua, { loading }) => {
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
