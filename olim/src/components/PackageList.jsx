import React from "react";
import PackageCard from "./PackageCard";

const PackageList = ({ packages, onAddToCart }) => {
  return (
    <div className="package-list">
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default PackageList;
