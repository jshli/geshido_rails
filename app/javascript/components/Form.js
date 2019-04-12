import React from "react"
import StyledForm from "./Blocks/Form/Index"
import Btn from "./Elements/Btn"


export default function Form(props){



    if (props.type === 'login') {
        return (
            <StyledForm action='/sessions' method="post">
                <StyledForm.Label>Email</StyledForm.Label>
                <StyledForm.Input name='email' type='email'/>
                <StyledForm.Label>Password</StyledForm.Label>
                <StyledForm.Input name='password' type='password' />
                <button>Log in</button>
            </StyledForm>
        )
    } 
    // else if (props.type === 'create-account') {
    //     return ()
    // }
    
}
