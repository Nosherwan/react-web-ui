import { colorOptions } from "../utils/generic";

export default function Tags({ tags }: { tags: string[] | undefined }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {tags?.map((tag: string, index: number) => {
        const randomColorIndex = Math.floor(
          Math.random() * colorOptions.length,
        );
        const { bg, text } = colorOptions[randomColorIndex];

        return (
          <span
            key={index}
            className={`inline-block ${bg} ${text} text-xs px-2 py-1 rounded-full`}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
