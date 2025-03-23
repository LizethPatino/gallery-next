import { useImageStore } from "@/store/useImageStore";

export default function SortOptions() {
  const { selectedOption, sortImages } = useImageStore();

  return (
    <div>
      <div>Order By:</div>
      <select value={selectedOption} onChange={(e) => sortImages(e.target.value as "color" | "likes")}>
        <option value="likes">Likes</option>
        <option value="color">Color</option>
      </select>
    </div>
  );
}
