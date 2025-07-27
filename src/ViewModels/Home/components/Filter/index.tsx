import React from "react";
import { useFilterModel } from "./useFilterModel";
import { FilterView } from "./FilterView";

export const Filter: React.FC = () => {
  const model = useFilterModel();

  return <FilterView {...model} />;
};
