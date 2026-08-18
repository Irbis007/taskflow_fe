import { $tagHooks } from "@entities/tag";
import { useClickOutside } from "@shared/libs";
import { Tag } from "@shared/models";
import { CardWrapper, Input, Spinner } from "@shared/ui";
import { compareArrays } from "@shared/utils";
import { useEffect, useRef, useState } from "react";

type Props = {
  defaultValue?: string[];
  isLoading?: boolean;
} & (
  | {
      onChange: (val: string[]) => void;
      onSubmitByClose?: undefined;
    }
  | {
      onChange?: undefined;
      onSubmitByClose: (val: string[]) => void;
    }
);

export function TagsSelect({
  defaultValue = [],
  onChange,
  onSubmitByClose,
  isLoading,
}: Props) {
  const { data: tags = [] } = $tagHooks.getAll();

  const [value, setValue] = useState("");
  const [position, setPosition] = useState<"top" | "bottom">("top");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(
    tags?.filter((t) => defaultValue.includes(t.id)) || [],
  );
  const filteredTags = tags?.filter((t) => t.name.includes(value)) || [];

  const selectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectRef.current) return;
    const rect = selectRef.current.getBoundingClientRect();
    if (window.innerHeight - rect.bottom < 0) {
      setPosition("top");
    } else {
      setPosition("bottom");
    }
  }, [selectRef, isOpen]);

  const handleChange = (tag: Tag) => {
    const tagId = tag.id;
    if (onSubmitByClose) {
      if (selectedTags.some((t) => t.id === tagId)) {
        setSelectedTags((prev) => prev.filter((t) => t.id !== tagId));
      } else {
        setSelectedTags((prev) => [...prev, tag]);
      }
    } else {
      if (defaultValue.includes(tagId)) {
        onChange(defaultValue.filter((t) => t !== tagId));
      } else {
        onChange([...defaultValue, tagId]);
      }
    }
  };

  useClickOutside(selectRef, () => {
    setIsOpen(false);
    const selectedIds = selectedTags.map((t) => t.id);
    if (onSubmitByClose && !compareArrays(selectedIds, defaultValue))
      onSubmitByClose(selectedIds);
  });

  return (
    <div className="relative">
      <div className="flex gap-2 flex-wrap">
        {(onSubmitByClose ? selectedTags : tags).map((tag) => {
          const isSelected = selectedTags.find((t) => t.id == tag.id);
          return (
            <div
              className={`py-1 px-3 rounded-full border text-sm cursor-pointer transition-colors 
                duration-300bg-elevated ${!onSubmitByClose && isSelected ? "border-accent text-accent" : "border-default text-secondary"}`}
              key={tag.id}
              onClick={() => {
                if (!onSubmitByClose) handleChange(tag);
              }}
            >
              {tag.name}
            </div>
          );
        })}
        {!!onSubmitByClose && (
          <div
            onClick={() => setIsOpen(true)}
            className="px-3 py-1 text-sm rounded-full border-dashed border-default border cursor-pointer 
        transition-colors duration-300 hover:bg-elevated"
          >
            + Add tag
          </div>
        )}
        {isLoading && <Spinner />}
      </div>
      <CardWrapper
        className={`absolute ${position === "top" ? "top-15" : "bottom-15"} max-h-70 p-0 overflow-auto ${isOpen ? "block" : "hidden"}`}
        ref={selectRef}
      >
        <Input
          value={value}
          onChange={setValue}
          placeholder="Write tag name"
          className="mt-1 sticky top-0 left-0 bg-surface z-100"
          inputClassName="bg-transparent border-t-0 border-x-0 rounded-none"
        />
        {filteredTags.length ? (
          <div className="mt-2">
            {filteredTags.map((tag, i) => {
              const isSelected = selectedTags?.some((t) => t.id == tag.id);
              return (
                <div
                  onClick={() => handleChange(tag)}
                  className={`py-2 px-3 border-t hover:bg-elevated cursor-pointer transition-colors duration-300 
                    ${isSelected ? "text-accent" : "text-primary"} ${i > 0 ? "border-default" : "border-transparent"}`}
                  key={tag.id}
                >
                  {tag.name}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-2 px-3">There are no tags with this name</div>
        )}
      </CardWrapper>
    </div>
  );
}
