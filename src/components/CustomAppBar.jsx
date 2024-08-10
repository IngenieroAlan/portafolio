import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavListDrawer } from "./NavListDrawer";
import { navLinks } from "../constants/navItemValues";

export const CustomAppBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          borderRadius: 1,
          mt: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setIsOpen(true)}
            sx={{ display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              justifyContent: "space-around",
            }}
          >
            {navLinks.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                href={item.path}
                sx={{ minHeight: 48, minWidth: 48 }}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={isOpen}
        anchor="left"
        onClose={() => setIsOpen(false)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <NavListDrawer navLinks={navLinks} />
      </Drawer>
    </>
  );
};
