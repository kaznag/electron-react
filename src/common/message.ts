interface Language {
  label: string;
  language: string;
}

interface WindowParameter {
  language: string;
  supportLanguages: Language[];
}

interface TitleBarState {
  isFocused?: boolean;
  isMaximized?: boolean;
  title?: string;
}

export { Language, WindowParameter, TitleBarState };
