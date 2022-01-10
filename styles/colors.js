const PRIMARY_ELEMENT_BG = '#5AD27C';
const WHITE = '#fff';
const BLACK = '#000';
const GRAY_100 = '#A99E9E';
const PRIMARY_TEXT = '#6BAA75';
const CARD_BG = '#D6E2E9';

const common = {
  PRIMARY_ELEMENT_BG,
  GRAY_100,
  PRIMARY_TEXT,
  CARD_BG,
};

const light = {...common, PRIMARY_APP_BG: WHITE};
const dark = {...common, PRIMARY_APP_BG: BLACK};

export const colors = {light, dark};
