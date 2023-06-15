import { Product } from "../../app/modules/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catalog() {
  useEffect(() => {
    fetch("http://localhost:5002/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const [products, setProducts] = useState<Product[]>([]);

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
