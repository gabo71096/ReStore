import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

interface Props {
  changeDarkMode: () => void;
  darkMode: boolean;
}

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": { color: "grey.500" },
  "&.active": { color: "text.secondary" },
};

export default function Header({ changeDarkMode, darkMode }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <Typography component={NavLink} fontSize={"1.5rem"} fontWeight={"bold"} to={"/"} sx={navStyles}>
            ReStore
          </Typography>
          <Switch checked={darkMode} onChange={changeDarkMode} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={{ alignItems: "center", display: "flex" }}>
          <IconButton component={Link} to={"/basket"} size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart sx={navStyles} />
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
