// Page for app layout

import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext, UserContext } from "../App";
import { AppBar, IconButton, SvgIcon, Typography } from "@mui/material";
import UserBtn from "./components/UserBtn";

function Layout() {
    // Get User Authentication details.
    const [user,] = useContext<UserContext>(AuthContext);

    const nav = useNavigate();
    return (
        <>
            <AppBar 
                position="sticky"
                sx={{
                    color: 'black',
                    backgroundColor: 'white',
                    padding: '0.6rem 2rem',
                }}
            >
                <div>
                    <Typography variant="h6" component="span" sx={{
                        fontFamily: 'Lobster',
                        fontSize: '1.5rem'
                    }}>
                        SampleApp
                    </Typography>
        
                    {/* If the user is authenticated. Show the Profile Button from the component section of app. */}
                    {
                        user.isAuthenticated ? <UserBtn /> : ''
                    }
                    <IconButton
                        onClick={() => nav('/checkbox')}
                        sx={{float: "right"}}
                        >
                        <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </SvgIcon>
                    </IconButton>
                </div>
            </AppBar>
            <Outlet />
        </>
        
    );
}

export default Layout;
