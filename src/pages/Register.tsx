// Page for user Registration.

import { Paper, TextField, Button } from '@mui/material';
import { useContext, useEffect } from "react";
import { AuthContext, UserContext } from "../App";
import { useNavigate } from 'react-router-dom';


function Register() {
    // Get the user's auth context from parent.
    const [user, setUser] = useContext<UserContext>(AuthContext);

    const registerUser = (e:React.ChangeEvent<HTMLFormElement>) => {
        // Prevent form submission.
        e.preventDefault();

        // Get form data
        const form = new FormData(e.target);

        // Save the user details in localStorage
        for (const field of form.entries()) {
            localStorage.setItem(field[0].toString(), field[1].toString())
        }

        // Make the user's authentication true.
        setUser({
            isAuthenticated: true,
            username: (localStorage.getItem('name') || "")
        });
    }

    const nav = useNavigate();

    // Prevent already authenticated user from registering again.
    useEffect(() => {
        if (user.username != "") nav('/');
    })

    return (
        // Form element. Prevakes 'registerUser' function on submission.
        <form onSubmit={registerUser}>
            <Paper elevation={16}
                sx={{
                    margin: '12vh auto',
                    width: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem 2rem',
                    gap: '1rem',
                    borderRadius: '10px'
                }}
            >
                {/* Required Input fields */}
                <TextField id="name" name='name' label="Name" variant="outlined" required  />
                <TextField id="phone" name='phone' label="Phone No." variant="outlined" type='tel' required />
                <TextField id="email" name='email' label="Email Address" variant="outlined" type='email' required />
                <Button variant="contained" sx={{borderRadius: '10px'}} type='submit'>Submit</Button>
                
            </Paper>
        </form>
    )
}

export default Register;