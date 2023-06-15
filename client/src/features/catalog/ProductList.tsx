import { Product } from "../../app/modules/product";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-3">
      {products.map(item => (
        <ProductCard item={item} key={item.id} />
      ))}
    </div>
  )
}
