import agent from "../../app/api/agent";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { Product } from "../../app/modules/product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";

export default function Catalog() {
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  if (loading) return <LoadingComponents message="Loading products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
