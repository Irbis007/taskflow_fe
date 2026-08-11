export const getRgbColor = (color: string, opacity?: number) => {
  return `rgb(var(--${color}-rgb) ${opacity ? "/ " + opacity : ""})`;
};
