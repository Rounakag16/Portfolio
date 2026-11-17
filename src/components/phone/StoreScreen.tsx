const products = [
  { name: "Lavender jar", price: 399, tone: "#c4b5fd" },
  { name: "Sandal tin", price: 349, tone: "#fcd34d" },
  { name: "Rose diya set", price: 499, tone: "#fda4af" },
  { name: "Mogra pillar", price: 449, tone: "#bbf7d0" },
];

/** "After" screen for the D2C store demo (made-up brand). */
export function StoreScreen() {
  return (
    <div className="flex h-full flex-col bg-white pt-8 text-charcoal">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-heading text-[14px] font-bold">Mitti Candles</span>
        <span className="text-[10px] text-stone-500">Hand-poured in Pune</span>
      </div>
      <ul className="grid grid-cols-2 gap-2 px-3">
        {products.map((p) => (
          <li key={p.name} className="rounded-xl bg-stone-50 p-2">
            <div className="mb-1.5 grid aspect-square place-items-center rounded-lg" style={{ background: p.tone }}>
              <div className="h-8 w-6 rounded-t-md rounded-b-sm bg-white/70" />
            </div>
            <p className="truncate">{p.name}</p>
            <p className="font-semibold">₹{p.price}</p>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between bg-charcoal px-4 py-3 text-cream">
        <span>2 items, ₹848</span>
        <span className="rounded-full bg-orange px-3 py-1 font-semibold text-charcoal">Checkout</span>
      </div>
    </div>
  );
}
