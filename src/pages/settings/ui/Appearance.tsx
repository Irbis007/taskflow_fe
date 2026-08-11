import { useThemeStore, type AccentColor, type Themes } from "@shared/models";
import { CardWrapper, Select, Switch } from "@shared/ui";

const colors: {
  label: AccentColor;
  color: string;
}[] = [
  {
    label: "accent-default",
    color: "#6c63ff",
  },
  {
    label: "accent-green",
    color: "#4fd1a5",
  },
  {
    label: "accent-orange",
    color: "#f59e0b",
  },
  {
    label: "accent-red",
    color: "#e55353",
  },
  {
    label: "accent-blue",
    color: "#30befa",
  },
  {
    label: "accent-pink",
    color: "#ff60f2",
  },
];


const themes: Record<Themes, string> = {
  'theme-dark': 'Dark',
  'theme-white': 'White',
  'theme-default': 'System',
}

export function Appearance() {
  const accentColor = useThemeStore((state) => state.currentAccentColor);
  const setAccentColor = useThemeStore((state) => state.setAccentColor);
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const themeSelectOptions: {
    label: string;
    onClick: () => void;
  }[] = [
    {
      label: "Dark",
      onClick: () => setTheme("theme-dark"),
    },
    {
      label: "White",
      onClick: () => setTheme("theme-white"),
    },
    {
      label: "System",
      onClick: () => setTheme("theme-default"),
    },
  ];


  return (
    <div className="w-full">
      <div className="text-2xl">Appearance</div>
      <div className="text-secondary">Customize how Taskflow looks</div>
      <CardWrapper className="p-0 mt-5 w-full">
        <div className="p-4 border-b border-default">
          <div className="">Theme</div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Color theme</div>
            <div className="text-muted text-sm">
              Choose between dark and light mode
            </div>
          </div>
          <Select
            onChange={() => {}}
            title={themes[currentTheme]}
            options={themeSelectOptions}
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Accent color</div>
            <div className="text-muted text-sm">
              Used for buttons, links, and highlights
            </div>
          </div>

          <div className="flex gap-2">
            {colors.map((item, i) => (
              <div
                key={i}
                style={{
                  background: item.color,
                }}
                onClick={() => setAccentColor(item.label)}
                className={`cursor-pointer rounded-lg ${item.label === accentColor ? "w-9.5 h-9.5 border-2 border-primary" : "w-10 h-10"}`}
              ></div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 border-b border-default">
          <div className="">
            <div className="">Compact mode</div>
            <div className="text-muted text-sm">Reduce padding and spacing</div>
          </div>
          <Switch />
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="">
            <div className="">Sidebar collapsed by default</div>
            <div className="text-muted text-sm">Show icons only on startup</div>
          </div>
          <Switch />
        </div>
      </CardWrapper>
    </div>
  );
}
