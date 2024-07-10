import { MiniDot, MediumDot as MD, LargeDot as LD } from "./dots.style";

export const SmallDot = ({ color }: { color: string }) => (
  <MiniDot style={{ backgroundColor: color }}></MiniDot>
);

export const MediumDot = ({ color }: { color: string }) => (
  <MD
    style={{
      backgroundColor: color,
    }}
  />
);

export const LargeDot = ({ color }: { color: string }) => (
  <LD style={{ backgroundColor: color }} />
);
