import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { getOrCreateSessionId } from '../shared/lib/session';
import apiBackendFra from '../api/services/api';
// import { useAuth } from './AccessTokenContext';

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
  fetchCart: () => Promise<void>;
  addItem: (product: any) => void;
  removeItem: (article: string, brand: string) => Promise<void>;
  removeAllItems: (article: string, brand: string) => Promise<void>;
  updateQuantity: (
    itemId: string,
    warehouseId: string,
    quantity: number,
  ) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  // const { token } = useAuth();

  const openCheckout = () => setIsCheckoutOpen(true);
  const closeCheckout = () => setIsCheckoutOpen(false);

  const fetchCart = async () => {
    const { data } = await apiBackendFra.get('/shoppingcarts');

    const mappedItems = data.map((item: any) => ({
      ItemId: item.item1CGuid,
      Name: item.name,
      PhotoItem: '',
      Brand: item.brand,
      Article: item.article,
      WarehouseId: item.warehouse1CGuid,
      Warehouse: item.warehouseName,
      CategoryId: item.category1CGuid,
      Price: item.price,
      CurrencyCode: 'KZT',
      ExpectedDelivery: item.expectedDelivery,
      GuaranteedDelivery: item.guaranteedDelivery,
      quantity: item.count,
    }));

    setItems(mappedItems);
  };

  const addItem = async (product: any) => {
    const sessionID = getOrCreateSessionId();

    const body = {
      sessionID,
      supplierID: product.SupplierId ?? 0,
      article: product.Article,
      brand: product.Brand,
      name: product.Name,
      price: product.Price,
      providerPrice: product.ProviderPrice ?? 0,
      warehouse1CGuid: product.Warehouse1CGuid,
      category1CGuid: product.Category1CGuid,
      comment: '',
      count: 1,
      oldPrice: 0,
      oldCount: 0,
      providerItemID: product.ProviderItemID ?? '',
      providerWarehouseID: product.ProviderWarehouseID ?? '',
      optionsJson: '',
      expectedDelivery: product.ExpectedDelivery,
      guaranteedDelivery: product.GuaranteedDelivery,
      unit: product.Unit ?? '',
      item1CGuid: product.Item1CGuid,
      orderType: 0,
      discount: 0,
      minSize: 0,
      basePrice: product.Price,
      priceWithoutDiscount: product.Price,
      warehouseName: product.Warehouse,
      cityID: product.CityId ?? 0,
      contract1CGuid: product.Contract1CGuid,
    };

    await apiBackendFra.post('/shoppingcarts/add', body);

    await fetchCart();
  };

  const removeItem = async (article: string, brand: string) => {
    const sessionId = getOrCreateSessionId();

    const body = {
      article,
      brand,
      sessionId,
    };

    await apiBackendFra.post('/shoppingcart/remove', body);

    await fetchCart();
  };

  const removeAllItems = async (article: string, brand: string) => {
    const sessionId = getOrCreateSessionId();

    const body = {
      article,
      brand,
      sessionId,
    };

    await apiBackendFra.post('/shoppingcart/remove-all', body);

    await fetchCart();
  };

  const updateQuantity = (
    itemId: string,
    warehouseId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      removeItem(itemId, warehouseId);
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.ItemId === itemId && item.WarehouseId === warehouseId
          ? { ...item, quantity }
          : item,
      ),
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
        fetchCart,
        isCartOpen,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        openCart,
        closeCart,
        removeItem,
        updateQuantity,
        addItem,
        removeAllItems,
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
