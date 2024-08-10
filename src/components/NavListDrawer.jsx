import { Box, List, ListItem, ListItemButton } from "@mui/material";
import { navLinks } from "../constants/navItemValues";

export const NavListDrawer = () => {
  return (
    <Box sx={{ width: 250 }}>
      <List>
        {navLinks.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
          >
            <ListItemButton
              component="a"
              href={item.path}
            >
              {item.title}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
