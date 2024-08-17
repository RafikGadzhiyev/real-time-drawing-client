import {
  DEFAULT_FILL_COLOR,
  DEFAULT_STOKE_COLOR,
} from "../consts/draw.const.ts";

// ? Need to move to types files
type DrawRectArguments = {
  drawInfo: {
    ctx: CanvasRenderingContext2D
    drawStyle: "stroke" | "fill"
  },
  drawObject: {
    x: number,
    y: number,
    width: number,
    height: number,
    color?:string,
  },
}

export const drawRect = (args: DrawRectArguments) => {
  const {
    drawInfo,
    drawObject,
  } = args;

  changeColor(drawInfo.ctx, drawInfo.drawStyle, drawObject.color);

  switch (drawInfo.drawStyle) {
  case "fill":
    drawInfo.ctx.fillRect(
      drawObject.x,
      drawObject.y,
      drawObject.width,
      drawObject.height,
    );

    break;

  case "stroke":
    drawInfo.ctx.strokeRect(
      drawObject.x,
      drawObject.y,
      drawObject.width,
      drawObject.height,
    );
  }
};

/**
 *
 * @description set new fill|stroke color. If color is not provided, function will set default color
 *
 */
export const changeColor = (ctx: CanvasRenderingContext2D, colorType: "fill" | "stroke", color?: string) => {
  switch (colorType) {
  case "fill":
    ctx.fillStyle = color
        || DEFAULT_FILL_COLOR;

    break;

  case "stroke":
    ctx.strokeStyle = color
        || DEFAULT_STOKE_COLOR;

    break;
  }
};
