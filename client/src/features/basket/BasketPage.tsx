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
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

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
                    loading={status === `pendingRemoveItem${item.productId}${"remove"}`}
                    onClick={() =>
                      dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: "remove" }))
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    color="secondary"
                    loading={status === `pendingAddItem${item.productId}`}
                    onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">${item.price * item.quantity}</TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    loading={status === `pendingRemoveItem${item.productId}${"delete"}`}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: "delete" })
                      )
                    }
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
