import ReactNative, {I18nManager} from 'react-native';
import i18n from 'i18next';
import RNRestart from 'react-native-restart';

/**
 * Basic Setting Variables Define
 */
export const BaseSetting = {
  name: 'Test',
  displayName: 'Test',
  appVersion: '1.0.0',
  defaultLanguage: 'en',
  languageSupport: ['en', 'ar', 'fr'],
  resourcesLanguage: {
    en: {
      translation: require('../langauge/en.json'),
    },
    ar: {
      translation: require('../langauge/ar.json'),
    },
    fr: {
      translation: require('../langauge/fr.json'),
    },
  },
};

export const languageFromCode = (code) => {
  switch (code) {
    case 'en':
      return 'English';
    case 'fr':
      return 'French';
    case 'ar':
      return 'Arabic';

    default:
      return 'Unknown';
  }
};

export const languageLogo = (code) => {
  switch (code) {
    case 'en':
      return 'En';
    case 'fr':
      return 'Fr';
    case 'ar':
      return 'Ar';

    default:
      return 'Unknown';
  }
};

export const isLanguageRTL = (code) => {
  switch (code) {
    case 'ar':
      return true;
    default:
      return false;
  }
};

export const reloadLocale = (oldLanguage, newLanguage) => {
  const oldStyle = isLanguageRTL(oldLanguage);
  const newStyle = isLanguageRTL(newLanguage);
  if (oldStyle != newStyle) {
    i18n.changeLanguage(newLanguage);
    I18nManager.forceRTL(newStyle);
    RNRestart.Restart();
  }
};
