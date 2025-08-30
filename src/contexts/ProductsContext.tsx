import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Product } from "@/types";
import { Api } from "@/backendApi";

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchProducts = useCallback(async () => {
    const api = new Api({ baseURL: "/api" });
    const items = await api.products.productsList({
      tenant: "SELL_DEPARTMENT",
    }); //todo add from tg bot
    setProducts(items.data as Product[]); //todo id type
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    isLoading,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
}
