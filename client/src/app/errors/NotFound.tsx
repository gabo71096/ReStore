import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container component={Paper}>
      <Typography gutterBottom variant="h3">
        Oops - we couldn't find what you are looking for
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Go back to the shop
      </Button>
    </Container>
  );
}
