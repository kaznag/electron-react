
interface Language {
  label: string;
  language: string;
}

interface WindowParameter {
  isFocused: boolean;
  isMaximized: boolean;
  language: string;
  supportLanguages: Language[];
  title: string;
}

export {
  Language,
  WindowParameter
}
