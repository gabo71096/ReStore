import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useStoreContext } from "../../app/context/useStoreContext";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((e) => console.log(e))
      .finally(() => setStatus({ loading: false, name }));
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((e) => console.log(e))
      .finally(() => setStatus({ loading: false, name }));
  }

  if (!basket || basket.items.length === 0) return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow hover key={item.productId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Box
                    component={Link}
                    to={`/catalog/${item.productId}`}
                    display="flex"
                    alignItems="center"
                    sx={{ textDecoration: "none" }}
                  >
                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">${item.price}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    color="error"
                    loading={status.loading && status.name === `remove${item.productId}`}
                    onClick={() => handleRemoveItem(item.productId, 1, `remove${item.productId}`)}
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={status.loading && status.name === `add${item.productId}`}
                    onClick={() => handleAddItem(item.productId, `add${item.productId}`)}
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">${item.price * item.quantity}</TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={status.loading && status.name === `delete${item.productId}`}
                    onClick={() => handleRemoveItem(item.productId, item.quantity, `delete${item.productId}`)}
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button component={Link} to="/checkout" variant="contained" size="large" fullWidth>
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
