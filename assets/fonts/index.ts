export const Poppins = {
  regular: {
    default: "Poppins-Regular",
    italics: "Poppins-Italic"
  },
  bold: {
    default: "Poppins-Bold",
    italics: "Poppins-BoldItalic"
  },
  black: {
    default: "Poppins-Black",
    italics: "Poppins-BlackItalic"
  },
  extraBold: {
    default: "Poppins-ExtraBold",
    italics: "Poppins-ExtraBoldItalic"
  },
  medium: {
    default: "Poppins-Medium",
    italics: "Poppins-MediumItalic"
  },
  semiBold: {
    default: "Poppins-SemiBold",
    italics: "Poppins-SemiBoldItalic"
  }
};

export type PoppinsProps =
  | (typeof Poppins)[keyof typeof Poppins]["default"]
  | (typeof Poppins)[keyof typeof Poppins]["italics"];
