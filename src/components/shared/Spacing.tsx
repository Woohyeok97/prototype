interface SpacingProps {
  size?: keyof typeof Sizes;
}
const Sizes = {
  xs: 'h-[1rem]',
  sm: 'h-[2rem]',
  md: 'h-[3rem]',
  lg: 'h-[4rem]',
  xl: 'h-[5rem]',
};

export function Spacing({ size = 'xs' }: SpacingProps) {
  return <div className={`${Sizes[size]}`} />;
}
