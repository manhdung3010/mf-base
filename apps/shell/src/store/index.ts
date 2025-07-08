import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface AppState {
  // Cart state
  cart: CartItem[];
  cartTotal: number;
  
  // Product state
  products: Product[];
  selectedProduct: Product | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  cart: [],
  cartTotal: 0,
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,

  // Actions
  addToCart: (product: Product, quantity = 1) => {
    set((state) => {
      const existingItem = state.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedCart = state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        return {
          cart: updatedCart,
          cartTotal: updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0)
        };
      } else {
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity
        };
        const updatedCart = [...state.cart, newItem];
        return {
          cart: updatedCart,
          cartTotal: updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0)
        };
      }
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => {
      const updatedCart = state.cart.filter(item => item.id !== productId);
      return {
        cart: updatedCart,
        cartTotal: updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0)
      };
    });
  },

  updateCartItemQuantity: (productId: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        const updatedCart = state.cart.filter(item => item.id !== productId);
        return {
          cart: updatedCart,
          cartTotal: updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0)
        };
      }
      
      const updatedCart = state.cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      return {
        cart: updatedCart,
        cartTotal: updatedCart.reduce((total, item) => total + (item.price * item.quantity), 0)
      };
    });
  },

  clearCart: () => {
    set({ cart: [], cartTotal: 0 });
  },

  setProducts: (products: Product[]) => {
    set({ products });
  },

  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  }
}));

// Export individual selectors for better performance
export const useCart = () => useAppStore(state => ({
  cart: state.cart,
  cartTotal: state.cartTotal,
  addToCart: state.addToCart,
  removeFromCart: state.removeFromCart,
  updateCartItemQuantity: state.updateCartItemQuantity,
  clearCart: state.clearCart
}));

export const useProducts = () => useAppStore(state => ({
  products: state.products,
  selectedProduct: state.selectedProduct,
  setProducts: state.setProducts,
  setSelectedProduct: state.setSelectedProduct
}));

export const useUI = () => useAppStore(state => ({
  isLoading: state.isLoading,
  error: state.error,
  setLoading: state.setLoading,
  setError: state.setError
})); 