import { create } from 'zustand';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    isCartOpen: boolean;

    // Acciones
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    setIsCartOpen: (isOpen: boolean) => void;
    clearCart: () => void;

    // Cálculos
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    isCartOpen: false,

    addItem: (newItem) => set((state) => {
        const existingItem = state.items.find((item) => item.id === newItem.id);
        if (existingItem) {
            return {
                items: state.items.map((item) =>
                    item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                isCartOpen: true,
            };
        }
        return {
            items: [...state.items, { ...newItem, quantity: 1 }],
            isCartOpen: true,
        };
    }),

    removeItem: (id) => set((state) => ({
        items: state.items.filter((item) => item.id !== id),
    })),

    updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) return { items: state.items.filter((i) => i.id !== id) };
        return {
            items: state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ),
        };
    }),

    setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),

    clearCart: () => set({ items: [] }),

    getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
    },

    getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
    }
}));