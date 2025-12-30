import { X, Minus, Plus, Flame, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md bg-popover border-l border-border flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="font-display text-2xl text-foreground flex items-center gap-2">
            <Flame className="w-6 h-6 text-fire-orange" />
            Tu Orden
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-lg mb-2">Tu carrito está vacío</p>
            <p className="text-muted-foreground text-sm">¡Agrega algo delicioso del menú!</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="text-fire-yellow font-bold">
                      S/{(item.price * item.quantity).toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-fire-orange/20 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-md bg-muted flex items-center justify-center hover:bg-fire-orange/20 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-lg">Total</span>
                <span className="font-display text-3xl font-bold fire-text">
                  S/{totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <button className="w-full btn-fire py-4 rounded-lg font-display text-lg font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
                <Flame className="w-5 h-5" />
                Pagar Orden
              </button>

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className="w-full py-2 text-muted-foreground hover:text-destructive transition-colors text-sm"
              >
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
