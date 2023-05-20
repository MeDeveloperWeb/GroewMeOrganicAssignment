// User Profile Button component.
// Allows user to see his username and logout.

import { IconButton, SvgIcon, Menu, MenuItem } from "@mui/material";
import { useState, useContext } from "react";
import { AuthContext, UserContext } from "../../App";

function UserBtn() {
    // Get user Authentication context
    const [user, setUser] = useContext<UserContext>(AuthContext);

    //  Anchor element for Menu functionality
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Determine if the menu is open or closed
    const open = Boolean(anchorEl);

    // Handle click event for opening the menu
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    
    // Handle click event for closing the menu
    const handleClose = () => {
      setAnchorEl(null);
    };

    // Function to handle User Logout
    function logout() {

        // Delete user details from local storage
        localStorage.removeItem('name');
        localStorage.removeItem('phone');
        localStorage.removeItem('email');

        // Update user context to reflect user as unauthorized
        setUser({
            isAuthenticated: false,
            username: ""
        });
    
    }
  
    return (
      <>
        <IconButton
          id="profie-btn"
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{float: "right"}}
        >
          <SvgIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
          </SvgIcon>
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'profile-btn',
          }}
        >
          <MenuItem onClick={handleClose}>Hi {user.username}</MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </>
    )
  }
export default UserBtn;