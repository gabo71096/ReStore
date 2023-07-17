import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/basket";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
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
                {isBasket && (
                  <LoadingButton
                    color="error"
                    loading={status === `pendingRemoveItem${item.productId}${"remove"}`}
                    onClick={() =>
                      dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: "remove" }))
                    }
                  >
                    <Remove />
                  </LoadingButton>
                )}
                {item.quantity}
                {isBasket && (
                  <LoadingButton
                    color="secondary"
                    loading={status === `pendingAddItem${item.productId}`}
                    onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                  >
                    <Add />
                  </LoadingButton>
                )}
              </TableCell>
              <TableCell align="right">${item.price * item.quantity}</TableCell>
              {isBasket && (
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
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
