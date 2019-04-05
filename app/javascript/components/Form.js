import React from "react"
import StyledForm from "./Blocks/Form/Index"
import SecondaryButton from "./Elements/SecondaryBtn"


export default function Form(props){

    const labelToString = str => {
        return str.toLowerCase().split(" ").join("_")
    }

    if (props.type === 'login') {
        return (
            <StyledForm action='/sessions' method="post">
                <StyledForm.Label>Email</StyledForm.Label>
                <StyledForm.Input name='email' type='email'/>
                <StyledForm.Label>Password</StyledForm.Label>
                <StyledForm.Input name='password' type='password' />
                <SecondaryButton>Log in</SecondaryButton>
            </StyledForm>
        )
    } 
    // else if (props.type === 'create-account') {
    //     return ()
    // }
    
}
