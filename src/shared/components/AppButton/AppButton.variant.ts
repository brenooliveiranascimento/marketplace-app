import { tv, VariantProps } from "tailwind-variants";

export const buttonVariants = tv({
  slots: {
    base: "w-full h-[48px] rounded-[10px] border px-4 flex flex-row items-center active:opacity-80",
    text: "font-semibold",
    icon: "w-5 h-5",
  },
  variants: {
    variant: {
      filled: {
        base: "bg-purple-base border-purple-base",
        text: "text-white",
        icon: "text-white",
      },
      outlined: {
        base: "bg-transparent border-purple-base",
        text: "text-purple-base",
        icon: "text-purple-base",
      },
    },
    size: {
      small: {
        base: "h-[40px] px-3",
        text: "text-sm",
        icon: "w-4 h-4",
      },
      medium: {
        base: "h-[48px] px-4",
        text: "text-base",
        icon: "w-5 h-5",
      },
      large: {
        base: "h-[56px] px-5",
        text: "text-lg",
        icon: "w-6 h-6",
      },
    },
    hasIcon: {
      true: {
        base: "justify-between",
      },
      false: {
        base: "justify-center",
      },
    },
    isLoading: {
      true: {
        base: "opacity-60",
      },
    },
    isDisabled: {
      true: {
        base: "opacity-50",
      },
    },
  },
  compoundVariants: [
    {
      variant: "filled",
      isDisabled: true,
      class: {
        base: "bg-gray-300 border-gray-300",
        text: "text-gray-500",
        icon: "text-gray-500",
      },
    },
    {
      variant: "outlined",
      isDisabled: true,
      class: {
        base: "border-gray-300",
        text: "text-gray-300",
        icon: "text-gray-300",
      },
    },
  ],
  defaultVariants: {
    variant: "filled",
    size: "medium",
    hasIcon: false,
    isLoading: false,
    isDisabled: false,
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
