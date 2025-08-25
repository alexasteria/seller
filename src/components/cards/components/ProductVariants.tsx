import React, { FC } from "react";
import { ProductVariant, VariantState } from "../../../types";

const ProductVariants: FC<{
  variants?: ProductVariant[];
  setSelectVariant: (v: ProductVariant) => void;
  selected?: string;
  variantState?: VariantState;
}> = ({ variants, setSelectVariant, selected, variantState = {} }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px",
      }}
    >
      {variants?.map((variant) => {
        return (
          <div
            className="ingredient-item"
            style={{
              width: 75,
              height: 50,
              border:
                selected !== variant.id
                  ? "2px solid #c6c6c6"
                  : "2px solid var(--button)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            onClick={() => setSelectVariant(variant)}
          >
            {variant.value}
            {Boolean(variantState[variant.id]) && (
              <span
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  backgroundColor: "#ff6b6be6",
                  padding: "4px 8px",
                  borderRadius: "50%",
                  color: "#fff",
                }}
              >
                {variantState[variant.id]}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariants;
