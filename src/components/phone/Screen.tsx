import type { ScreenKind } from "@/content/work";
import { CafeScreen } from "./CafeScreen";
import { StoreScreen } from "./StoreScreen";

export function Screen({ kind }: { kind: ScreenKind }) {
  return kind === "cafe" ? <CafeScreen /> : <StoreScreen />;
}
