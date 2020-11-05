import {useSelector, useDispatch} from 'react-redux';

export const ThemeSupport = [
  {
    theme: 'default',
    light: {
      dark: false,
      colors: {
        primary: '#000',
        primaryDark: '#F90030',
        primaryLight: '#FF5E80',
        accent: '#4A90A4',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#FF2D55',
        primaryDark: '#F90030',
        primaryLight: '#FF5E80',
        accent: '#4A90A4',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'cyan',
    light: {
      dark: false,
      colors: {
        primary: '#5DADE2',
        primaryDark: '#1281ac',
        primaryLight: '#68c9ef',
        accent: 'blue',
        background: 'white',
        card: 'cyan',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#5DADE2',
        primaryDark: '#1281ac',
        primaryLight: '#68c9ef',
        accent: '#FF8A65',
        background: '#010101',
        card: 'cyan',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  ,
  {
    theme: 'red',
    light: {
      dark: false,
      colors: {
        primary: '#FDC60A',
        primaryDark: '#FFA000',
        primaryLight: '#FFECB3',
        accent: '#795548',
        background: 'white',
        card: 'red',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#FDC60A',
        primaryDark: '#FFA000',
        primaryLight: '#FFECB3',
        accent: '#795548',
        background: '#010101',
        card: 'red',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'green',
    light: {
      dark: false,
      colors: {
        primary: '#FDC60A',
        primaryDark: '#FFA000',
        primaryLight: '#FFECB3',
        accent: '#795548',
        background: 'white',
        card: 'green',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#FDC60A',
        primaryDark: '#FFA000',
        primaryLight: '#FFECB3',
        accent: '#795548',
        background: '#010101',
        card: 'green',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
];

export const DefaultTheme = {
  theme: 'black',
  light: {
    dark: false,
    colors: {
      primary: '#000',
      primaryDark: '#F90030',
      primaryLight: '#FF5E80',
      accent: '#4A90A4',
      background: 'white',
      card: '#F5F5F5',
      text: '#212121',
      border: '#c7c7cc',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: '#FF2D55',
      primaryDark: '#F90030',
      primaryLight: '#FF5E80',
      accent: '#4A90A4',
      background: '#010101',
      card: '#121212',
      text: '#e5e5e7',
      border: '#272729',
    },
  },
};

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  const isDark = useSelector((state) => state.entities.application.isDark);
  const themeStorage = useSelector((state) => state.entities.application.theme);
  const listTheme = ThemeSupport.filter((item) => item.theme == themeStorage);
  const theme = listTheme.length > 0 ? listTheme[0] : DefaultTheme;

  if (isDark) {
    return {theme: theme.dark, colors: theme.dark.colors};
  } else {
    return {theme: theme.light, colors: theme.light.colors};
  }
};
