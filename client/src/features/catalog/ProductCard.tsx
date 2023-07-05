import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/modules/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/useStoreContext";

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }

  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "secondary.main" }}>{item.name.charAt(0).toUpperCase()}</Avatar>}
        title={item.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain", bgcolor: "primary.light" }}
        image={item.pictureUrl}
        title={item.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(item.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.brand} / {item.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton loading={loading} onClick={() => handleAddItem(item.id)} size="small">
          Add to Cart
        </LoadingButton>
        <Button component={Link} size="small" to={`/catalog/${item.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
