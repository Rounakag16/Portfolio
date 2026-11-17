const menu = [
  { name: "Cold coffee", price: 140 },
  { name: "Hazelnut latte", price: 180 },
  { name: "Paneer tikka sandwich", price: 210 },
];

/** "After" screen for the café demo (made-up brand). */
export function CafeScreen() {
  return (
    <div className="flex h-full flex-col bg-[#fffaf3] pt-8 text-charcoal">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-heading text-[14px] font-bold">Brew &amp; Bloom</span>
        <span className="rounded-full bg-teal/15 px-2 py-0.5 text-[9.5px] font-semibold text-teal-deep">Open till 11 pm</span>
      </div>
      <div className="mx-3 rounded-2xl bg-[linear-gradient(135deg,#7c2d12,#c2410c_55%,#fb923c)] p-4 text-white">
        <p className="font-heading text-[16px] leading-tight font-bold">Coffee, bakes and long evenings</p>
        <p className="mt-1 text-[10px] opacity-90">Hakimpara, Siliguri</p>
      </div>
      <p className="mt-3 px-4 font-heading text-[12px] font-semibold">Menu</p>
      <ul className="mx-3 mt-1 divide-y divide-stone-200 rounded-xl bg-white px-3">
        {menu.map((m) => (
          <li key={m.name} className="flex justify-between py-2">
            <span>{m.name}</span>
            <span className="font-semibold">₹{m.price}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto space-y-2 p-3">
        <div className="rounded-full bg-[#25d366] py-2 text-center text-[11.5px] font-semibold text-white">Order on WhatsApp</div>
        <div className="flex gap-2">
          <div className="flex-1 rounded-full border border-charcoal/20 py-1.5 text-center">Directions</div>
          <div className="flex-1 rounded-full border border-charcoal/20 py-1.5 text-center">Book a table</div>
        </div>
      </div>
    </div>
  );
}
