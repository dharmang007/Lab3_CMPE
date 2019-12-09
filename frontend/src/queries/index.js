import { gql } from 'apollo-boost';

export const SIGNUP_CUSTOMER = gql`
    mutation($name: String!, $email: String!, $password: String!, $contact: String!){
        createCustomer(name: $name,  email: $email,  password: $password,contact:$contact){ name,email,password, contact}
    }
`;

export const SIGNIN_CUSTOMER = gql`
    mutation($email: String!, $password: String!){
        signinCustomer(email: $email, password: $password){ email,name, }
    }
`;

export const SIGNUP_RESTAURANT = gpl`
    mutation($name: String!, $email: String!, $password: String!, $contact: String!,cuisine:String!){
        createRestaurant(name: $name,  email: $email,  password: $password,contact:$contact,cuisine){ name,email,password, contact,cuisine}
    }
`;

export const EDIT_RESTAURANTPROFILE = gpl`
        mutation($name: String!, $email: String!, $password: String!, $contact: String!,cuisine:String!){
            editRestaurantProfile(name: $name,  email: $email,  password: $password,contact:$contact,cuisine){ name,email,password, contact,cuisine}
        }
`;