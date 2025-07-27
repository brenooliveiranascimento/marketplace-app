import { tv, type VariantProps } from "tailwind-variants";

export const appInputVariants = tv({
  slots: {
    container: "w-full my-4",
    wrapper: "flex-row items-center border-b border-gray-300 pb-5",
    input: "bg-transparent text-gray-500 text-base h-full",
    label: "text-sm text-gray-300 mb-2 font-semibold",
    error: "text-sm text-danger mt-1",
    icon: "",
  },
  variants: {
    isFocused: {
      true: {
        wrapper: "border-purple-600",
        label: "text-purple-600",
      },
    },
    isError: {
      true: {
        wrapper: "border-danger",
        label: "text-danger",
      },
    },
    isDisabled: {
      true: {
        wrapper: "opacity-50",
        input: "text-gray-300",
      },
    },
  },
  defaultVariants: {
    isFocused: false,
    isError: false,
    isDisabled: false,
  },
});

export type AppInputVariants = VariantProps<typeof appInputVariants>;
