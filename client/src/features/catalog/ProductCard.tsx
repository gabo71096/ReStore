import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Product } from "../../app/modules/product";

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
  return (
    <div className="mx-auto">
      <Card sx={{ display: "flex", flexDirection: "column", height: "100%", maxWidth: 345 }} variant="outlined">
        <div className="flex items-center p-4">
          <div className="me-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-2xl text-white">
              <span>{item.name[0].toUpperCase()}</span>
            </div>
          </div>
          <h1 className="text-md w-full font-bold">{item.name}</h1>
        </div>
        <div className="h-48 p-4">
          <img alt={item.name} className="mx-auto h-full" src={item.pictureUrl} title={item.name} />
        </div>
        <CardContent>
          <p>${item.price}</p>
          <p>{item.description}</p>
        </CardContent>
        <div className="mt-auto">
          <CardActions>
            <Button size="small">Add to cart</Button>
            <Button size="small">View</Button>
          </CardActions>
        </div>
      </Card>
    </div>
  );
}
