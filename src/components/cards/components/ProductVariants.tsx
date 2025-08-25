import React, { FC } from "react";
import { ProductVariant } from "../../../types";

const ProductVariants: FC<{
  variants?: ProductVariant[];
  setSelectVariant: (v?: ProductVariant) => void;
  selected?: string;
}> = ({ variants, setSelectVariant, selected }) => {
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
            }}
            onClick={() => setSelectVariant(variant)}
          >
            {variant.value}
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariants;
