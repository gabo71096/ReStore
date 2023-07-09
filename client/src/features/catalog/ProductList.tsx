import Grid from "@mui/material/Grid/Grid";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);

  return (
    <Grid container spacing={4} sx={{ mb: 4 }}>
      {products.map((item) => (
        <Grid item xs={4} key={item.id}>
          {!productsLoaded ? <ProductCardSkeleton /> : <ProductCard item={item} />}
        </Grid>
      ))}
    </Grid>
  );
}
