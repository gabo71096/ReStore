import { PropsWithChildren, createContext, useState } from "react";
import { Basket } from "../modules/basket";

interface StoreContextValue {
  basket: Basket | null;
  setBasket: (basket: Basket) => void;
  removeItem: (productId: number, quantity: number) => void;
}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: PropsWithChildren<object>) {
  const [basket, setBasket] = useState<Basket | null>(null);

  function removeItem(productId: number, quantity: number) {
    if (!basket) return;
    const items = [...basket.items];
    const itemIndex = items.findIndex((i) => i.productId === productId);
    if (itemIndex >= 0) {
      items[itemIndex].quantity -= quantity;
      if (items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
      setBasket((prevState) => ({ ...prevState!, items }));
    }
  }

  return <StoreContext.Provider value={{ basket, setBasket, removeItem }}>{children}</StoreContext.Provider>;
}
