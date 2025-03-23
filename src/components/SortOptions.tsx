import { ImageType } from "@/types";
import { useState } from "react";

export interface SortOptionsProps {
  imagesList: ImageType[];
  onSort: (sortedList: ImageType[]) => void;
}

export default function SortOptions({ imagesList, onSort }: SortOptionsProps) {
  const [selectedOption, setSelectedOption] = useState("color");

  const handleChange = (value: string) => {
    setSelectedOption(value);

    if (value === "likes") {
      const sorted = [...imagesList].sort((a, b) => a.likes - b.likes);
      onSort(sorted);
    } else {
      console.log("Ordenando por color... (pendiente de implementación)");
    }
  };

  return (
    <div>
      <div>Order By:</div>
      <select value={selectedOption} onChange={(e) => handleChange(e.target.value)}>
        <option value="likes">Likes</option>
        <option value="color">Color</option>
      </select>
    </div>
  );
}
