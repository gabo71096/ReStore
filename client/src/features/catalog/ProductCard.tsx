import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Product } from "../../app/modules/product";

interface Props {
  item: Product;
}

export default function ProductCard({ item }: Props) {
  return (
    <div className="mx-auto">
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 345 }} variant="outlined">
        <div className="flex items-center p-4">
          <div className="me-4">
            <div className="bg-gray-400 flex h-10 items-center justify-center rounded-full text-2xl text-white w-10">
              <span>{item.name[0].toUpperCase()}</span>
            </div>
          </div>
          <h1 className="font-bold text-md w-full">{item.name}</h1>
        </div>
        <div className="h-48 p-4">
          <img alt={item.name} className="h-full mx-auto" src={item.pictureUrl} title={item.name} />
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
  )
}
