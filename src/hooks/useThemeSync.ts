import { useEffect } from 'react';

export function useThemeSync(themeParams: any) {
  useEffect(() => {
    document.documentElement.style.setProperty('--tg-bg', themeParams.bg_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-text', themeParams.text_color || '#000000');
    document.documentElement.style.setProperty('--tg-hint', themeParams.hint_color || '#6b7280');
    document.documentElement.style.setProperty('--tg-link', themeParams.link_color || '#3b82f6');
    document.documentElement.style.setProperty('--tg-button', themeParams.button_color || '#2ea6ff');
    document.documentElement.style.setProperty('--tg-button-text', themeParams.button_text_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-sec-bg', themeParams.secondary_bg_color || '#f3f4f6');
  }, [themeParams]);
}

