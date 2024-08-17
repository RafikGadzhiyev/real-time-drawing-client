import {convertDecimalNumberToHEX} from "./convert.util.ts";

export function generateHEX() {
  const red = generateNumberFromRange(0, 256);
  const green = generateNumberFromRange(0, 256);
  const blue = generateNumberFromRange(0, 256);

  const redInHEX = convertDecimalNumberToHEX(red);
  const greenInHEX = convertDecimalNumberToHEX(green);
  const blueInHEX = convertDecimalNumberToHEX(blue);

  return `#${ redInHEX }${ greenInHEX }${ blueInHEX }`;
}

export function generateRGB() {
  const red = generateNumberFromRange(0, 256);
  const green = generateNumberFromRange(0, 256);
  const blue = generateNumberFromRange(0, 256);

  return `rgb(${ red }, ${ green }, ${ blue })`;
}

export function generateHSL() {
  const hue = generateNumberFromRange(0, 361);
  const saturation = generateNumberFromRange(0, 101);
  const lightness = generateNumberFromRange(0, 101);

  return `hsl(${ hue }, ${ saturation }%, ${ lightness }%)`;
}

export function generateNumberFromRange(from: number, to: number) {
  return Math.floor(
    Math.random() * (to - from) + from,
  );
}
