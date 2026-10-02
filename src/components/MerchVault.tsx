import React, { useState } from 'react';
import { ShoppingBag, Disc, Package, Sparkles, Check, Trash2, ArrowRight, ShieldCheck, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MerchItem } from '../types';

interface MerchVaultProps {
  merchItems: MerchItem[];
  cart: { item: MerchItem; quantity: number }[];
  onAddToCart: (item: MerchItem) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
}

export const MerchVault: React.FC<MerchVaultProps> = ({
  merchItems,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  const categories = ['All', 'Vinyl', 'Tape', 'Apparel', 'Print'];

  const filteredItems = selectedCategory === 'All'
    ? merchItems
    : merchItems.filter((i) => i.category === selectedCategory);

  const cartTotal = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);

  const handleCheckout = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setOrderComplete(false);
      setIsCartOpen(false);
    }, 3500);
  };

  return (
    <div className="space-y-10 pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-purple-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-purple-400">
            <ShoppingBag className="h-4 w-4" />
            <span>OFFICIAL PHYSICAL ARTIFACTS & PRESSINGS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
            THE MERCH VAULT
          </h2>
          <p className="mt-1 text-sm text-neutral-400 max-w-2xl">
            Limited-run 180g vinyl, hand-dubbed studio cassettes, heavyweight organic apparel, and silkscreen prints stamped with the 000 seal.
          </p>
        </div>

        {/* View Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 px-4 py-2.5 text-xs font-mono font-bold text-white shadow-lg shadow-purple-600/30 transition-all self-start sm:self-auto"
        >
          <ShoppingBag className="h-4 w-4" />
          <span>VIEW CART ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-neutral-400 mr-2">CATEGORY:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-medium transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400'
                : 'bg-neutral-900/80 text-neutral-400 hover:text-white border border-white/5 hover:border-purple-500/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-900/50 p-5 backdrop-blur-xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-950/30 transition-all group"
            >
              <div>
                {/* Visual Artwork Frame */}
                <div
                  className="relative h-48 w-full rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-inner border border-white/10 mb-4 transition-transform group-hover:scale-[1.02]"
                  style={{
                    background: `linear-gradient(135deg, ${item.colorHex}22 0%, #0a0812 100%)`,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] text-purple-300 border border-purple-500/30">
                      {item.tag}
                    </span>
                    <span className="font-mono text-sm font-bold text-white">
                      €{item.price}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto">
                    {item.category === 'Vinyl' ? (
                      <Disc className="h-16 w-16 text-purple-400/80 group-hover:rotate-45 transition-transform duration-700" />
                    ) : (
                      <Package className="h-16 w-16 text-purple-400/80 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </div>

                  <div className="font-mono text-[9px] text-neutral-500 text-right">
                    EDITION: {item.category.toUpperCase()}
                  </div>
                </div>

                <h4 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h4>
                <p className="font-mono text-xs text-purple-400/80 mt-0.5">{item.edition}</p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                {/* Bullet details */}
                <ul className="mt-3 space-y-1">
                  {item.details.slice(0, 2).map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
                      <span className="h-1 w-1 rounded-full bg-purple-400"></span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={() => onAddToCart(item)}
                className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600/30 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-200 hover:text-white py-2.5 text-xs font-mono font-bold transition-all shadow-md group-hover:shadow-purple-600/20"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>ADD TO VAULT ORDER</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Cart Modal / Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-md w-full rounded-3xl border border-purple-500/40 bg-neutral-950 p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-5 right-5 rounded-full p-2 bg-neutral-900 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {!orderComplete ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    VAULT CART
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Physical items are packaged with hand-numbered 000 holographic stickers.
                  </p>
                </div>

                {cart.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-xs text-neutral-500 font-mono">
                    Your cart is currently empty.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {cart.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/60 border border-white/5 text-xs"
                      >
                        <div className="truncate mr-3">
                          <p className="font-display font-bold text-white truncate">{cartItem.item.title}</p>
                          <p className="font-mono text-[10px] text-purple-400">Qty: {cartItem.quantity} × €{cartItem.item.price}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-white">
                            €{cartItem.item.price * cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onRemoveFromCart(cartItem.item.id)}
                            className="text-neutral-500 hover:text-rose-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex justify-between items-baseline font-mono text-sm">
                      <span className="text-neutral-400">SUBTOTAL</span>
                      <span className="text-xl font-bold text-white">€{cartTotal}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/20">
                      <ShieldCheck className="h-4 w-4 shrink-0" />
                      <span>Free worldwide archival shipping over €75 included.</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-purple-600 hover:bg-purple-500 py-3 text-xs font-mono font-bold text-white shadow-lg shadow-purple-600/40 transition-all"
                    >
                      <span>CONFIRM STUDIO DISPATCH</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  ORDER LOGGED TO THE VAULT
                </h3>
                <p className="text-xs text-neutral-300 font-mono">
                  Dispatch receipt #BLUR-ORDER-{Math.floor(100000 + Math.random() * 900000)} has been generated.
                </p>
                <p className="text-[11px] text-neutral-400">
                  Vinyl & cassettes will be stamped with the 000-BETTY imprint and dispatched from Berlin Studio.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
