export const convertColorToHEX = (color: string) => {
  // If color starts with # => it means that is already HEX representation
  if (color[ 0 ] === "#") {
    return color;
  }

  if (color.startsWith("rgb")) {
    return convertRGBToHEX(color);
  }

  const rgb = convertHSLToRGB(color);

  return convertRGBToHEX(rgb);
};

// ? Maybe we need to use iterate method instead of regex?
export const convertRGBToHEX = (color: string) => {
  const REGEX_TO_GET_COLORS = /\d+/g;

  const colorParts = color.match(REGEX_TO_GET_COLORS);

  if (colorParts?.length !== 3) {
    return "";
  }

  const red = +colorParts[ 0 ];
  const green = +colorParts[ 1 ];
  const blue = +colorParts[ 2 ];

  const redInHEX = convertDecimalNumberToHEX(red);
  const greenInHEX = convertDecimalNumberToHEX(green);
  const blueInHEX = convertDecimalNumberToHEX(blue);

  return `#${ redInHEX }${ greenInHEX }${ blueInHEX }`;
};

// ? Maybe we need to use iterate method instead of regex?
export const convertHSLToRGB = (color: string) => {
  const REGEX_TO_GET_COLORS = /\d+(\.\d+)?/g;

  const colorParts = color.match(REGEX_TO_GET_COLORS);

  if (colorParts?.length !== 3) {
    return "";
  }

  const hue = +colorParts[ 0 ];
  const saturation = +colorParts[ 1 ] / 100;
  const lightness = +colorParts[ 2 ] / 100;

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;

  const hueDerivative = hue / 60;

  const X = chroma * (1 - Math.abs(hueDerivative % 2 - 1));
  const M = lightness - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hueDerivative <= 1) {
    red = Math.round((chroma + M) * 255);
    green = Math.round((X + M) * 255);
    blue = Math.round(M * 255);
  }
  else if (hueDerivative <= 2) {
    red = Math.round((X + M) * 255);
    green = Math.round((chroma + M) * 255);
    blue = Math.round(M * 255);
  }
  else if (hueDerivative <= 3) {
    red = Math.round(M * 255);
    green = Math.round((chroma + M) * 255);
    blue = Math.round((X + M) * 255);
  }
  else if (hueDerivative <= 4) {
    red = Math.round(M * 255);
    green = Math.round((X + M) * 255);
    blue = Math.round((chroma + M) * 255);
  }
  else if (hueDerivative <= 5) {
    red = Math.round((X + M) * 255);
    green = Math.round(M * 255);
    blue = Math.round((chroma + M) * 255);
  }
  else if (hueDerivative <= 6) {
    red = Math.round((chroma + M) * 255);
    green = Math.round(M * 255);
    blue = Math.round((X + M) * 255);
  }

  return `rgb(${ red },${ green },${ blue })`;
};

export const convertDecimalNumberToHEX = (number: number) => {
  let hex = number.toString(16);

  if (number < 16) {
    hex = "0" + hex;
  }

  return hex;
};
