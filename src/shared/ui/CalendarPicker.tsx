import { useClickOutside } from "@shared/libs";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type Props = {
  value?: string | null;
  onChange: (val: string) => void;
  maxDate?: Date;
  minDate?: Date;
  label?: string;
  required?: boolean;
};

export function CalendarPicker({
  value,
  label,
  required,
  maxDate,
  minDate,
  onChange,
}: Props) {
  const [isModal, setIsModal] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const containerRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(containerRef, () => setIsModal(false));

  useEffect(() => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    if (window.innerHeight - rect.bottom < 0) {
      setPosition("top");
    }
  }, [wrapperRef]);

  const dateText = value
    ? dayjs(value).format("MMM DD, YYYY")
    : "e.g. Jun 30, 2026";
  return (
    <div className="w-full relative" ref={containerRef}>
      {!!label && (
        <div className="text-primary mb-1">
          {label}
          {required && <span className="ml-1 text-danger">*</span>}
        </div>
      )}
      <div
        onClick={() => setIsModal(true)}
        className={`w-full p-4 py-2 bg-elevated rounded-lg border border-default cursor-pointer ${!value ? "text-muted" : "text-primary"}`}
      >
        {dateText}
      </div>

      <div
        className={`absolute ${position === "top" ? "bottom-20" : "top-20"} grid overflow-hidden
        transition-all duration-300 ${isModal ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div
          className={` min-h-0 max-w-100 bg-surface mt-auto
        overflow-hidden  rounded-lg shadow-lg shadow-primary/20`}
          ref={wrapperRef}
        >
          <div className="p-4 border border-default">
            <Calendar
              onChange={(val) => {
                onChange(val ? val.toString() : "");
                setIsModal(false);
              }}
              value={value}
              prevLabel={<IoIosArrowBack />}
              nextLabel={<IoIosArrowForward />}
              tileClassName={({ date }) => {
                const defaultClasses = `text-center aspect-square rounded-lg py-0.5 cursor-pointer 
              hover:bg-elevated rounded-none w-[${(wrapperRef?.current?.clientWidth || 1) / 7}px]`;
                if (
                  (maxDate && dayjs(date).isAfter(maxDate)) ||
                  (minDate && dayjs(date).isBefore(minDate))
                ) {
                  return "text-primary/40 cursor-not-allowed " + defaultClasses;
                }
                if (dayjs(date).isSame(value)) {
                  return "bg-elevated " + defaultClasses;
                }
                return defaultClasses;
              }}
              formatShortWeekday={(_, date) =>
                ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][date.getDay()]
              }
              maxDate={maxDate}
              minDate={minDate}
              next2Label={false}
              prev2Label={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
