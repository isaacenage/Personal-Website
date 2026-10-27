// ponytail: plain join; swap for clsx + tailwind-merge if Tailwind ever lands
export const cn = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(' ');
