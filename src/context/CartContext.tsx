import { createContext, useContext, useState, type ReactNode } from 'react';

export interface CartItem {
  ItemId: string;

  Name: string;
  PhotoItem: string;

  Brand: string;
  Article: string;

  WarehouseId: string;
  Warehouse: string;

  CategoryId: string;

  Price: number;
  CurrencyCode: string;

  ExpectedDelivery: number;
  GuaranteedDelivery: number;

  quantity: number;
}


interface CartContextType {
  items: CartItem[];
  addItem: (product: any) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // добавляем checkout
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  const addItem = (product: any) => {
    setItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.ItemId === product.ItemId &&
          item.WarehouseId === product.WarehouseId
      );

      if (existingItem) {
        return prev.map((item) =>
          item.ItemId === product.ItemId &&
          item.WarehouseId === product.WarehouseId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          ItemId: product.ItemId,

          Name: product.Name,
          PhotoItem: product.PhotoItem,

          Brand: product.Brand,
          Article: product.Article,

          WarehouseId: product.WarehouseId,
          Warehouse: product.Warehouse,

          CategoryId: product.CategoryId,

          Price: product.Price,
          CurrencyCode: product.CurrencyCode,

          ExpectedDelivery: product.ExpectedDelivery,
          GuaranteedDelivery: product.GuaranteedDelivery,

          quantity: 1,
        },
      ];
    });
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.ItemId !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.ItemId === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        openCart,
        closeCart,
        removeItem,
        updateQuantity,
        addItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
