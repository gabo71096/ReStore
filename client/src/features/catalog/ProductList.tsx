import Grid from "@mui/material/Grid/Grid";
import { Product } from "../../app/modules/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <Grid container spacing={4}>
      {products.map((item) => (
        <Grid item xs={3} key={item.id}>
          <ProductCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
}
