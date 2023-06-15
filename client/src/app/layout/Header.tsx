import { AppBar, Switch, Toolbar } from "@mui/material";

interface Props {
  changeDarkMode: () => void;
  darkMode: boolean;
}

export default function Header({ changeDarkMode, darkMode }: Props) {
  return (
    <AppBar position="static">
      <Toolbar>
        <h1 className="text-2xl">ReStore</h1>
        <Switch checked={darkMode} onChange={changeDarkMode} />
      </Toolbar>
    </AppBar>
  )
}
