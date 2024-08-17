import {io} from "socket.io-client";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  generateHEX,
  generateHSL,
  generateRGB,
} from "./utils/generate.util.ts";

import * as canvasHelper from "./helpers/canvas.helper.ts";

import {
  WIDTH as CANVAS_WIDTH,
  HEIGHT as CANVAS_HEIGHT,
} from "./consts/canvas.const.ts";
import {INITIAL_OBJECT_SIZE} from "./consts/drawObjects.const.ts";

import "./styles/app.style.css";
import {DrawObject} from "./types.ts";
import {convertColorToHEX} from "./utils/convert.util.ts";

const socket = io("http://localhost:8080");

export default function App() {
  const [drawInfo, setDrawInfo] = useState<DrawObject[]>([]);
  const [drawColor, setDrawColor] = useState<string>(generateHEX());
  const [objectSize, setObjectSize] = useState(INITIAL_OBJECT_SIZE);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);

  function onMouseMove(e: MouseEvent) {
    if (!canvasRef.current) {
      return;
    }

    const canvasPosition = canvasRef.current.getBoundingClientRect();

    const x = e.pageX - canvasPosition.left;
    const y = e.pageY - canvasPosition.top;

    const drawObject = {
      // FIXME: string id
      _id: Date.now(),
      x: x - objectSize / 2,
      y: y - objectSize / 2,
      width: objectSize,
      height: objectSize,
      color: drawColor,
      type: "rect",
    };

    canvasHelper.drawRect(
      {
        drawInfo: {
          ctx: ctx.current as CanvasRenderingContext2D,
          drawStyle: "fill",
        },
        drawObject: drawObject,
      },
    );

    drawInfo.push(drawObject);

    socket.emit("update_draw_info", drawObject);
  }

  function onMouseDown() {
    if (!canvasRef.current) {
      return;
    }

    canvasRef.current.addEventListener(
      "mousemove",
      onMouseMove,
    );

    canvasRef.current.addEventListener(
      "mouseup",
      () => {
        canvasRef.current?.removeEventListener(
          "mousemove",
          onMouseMove,
        );
      },
    );
  }

  function clearCanvas() {
    setDrawInfo([]);

    socket.emit("clear_canvas");
  }

  function fillCanvas() {
    if (!ctx.current) {
      return;
    }

    const drawObject = {
      _id: Date.now(),
      x: 0,
      y: 0,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      color: drawColor,
      type: "rect",
    };

    canvasHelper.drawRect(
      {
        drawInfo: {
          ctx: ctx.current,
          drawStyle: "fill",
        },
        drawObject: drawObject,
      },
    );

    drawInfo.push(drawObject);

    socket.emit("update_draw_info", drawObject);
  }

  useEffect(
    () => {
      if (!canvasRef.current) {
        return;
      }

      ctx.current = canvasRef.current.getContext("2d");

      socket.on(
        "add_new_draw_object",
        (drawObject) => {
          setDrawInfo(
            (prevDrawInfo: Array<object>) => [
              ...prevDrawInfo,
              drawObject,
            ],
          );
        },
      );

      socket.on(
        "set_draw_info",
        (updatedDrawInfo) => {
          setDrawInfo(updatedDrawInfo);
        },
      );

      return () => {
        socket.off("add_new_draw_object");
        socket.off("set_draw_info");
      };
    },
    [],
  );


  useEffect(() => {
    if (!ctx.current) {
      return;
    }

    ctx.current.clearRect(
      0,
      0,
      canvasRef.current?.width || 0,
      canvasRef.current?.height || 0,
    );

    for (const object of drawInfo) {
      // TODO: support multiple drawing objects
      canvasHelper.drawRect(
        {
          drawInfo: {
            ctx: ctx.current,
            drawStyle: "fill",
          },
          drawObject: object,
        },
      );
    }
  }, [ drawInfo ]);

  return (
    <div className="container">
      <div
        className="draw-options-container"
      >
        <div
          className="current-color-container"
          style={{backgroundColor: drawColor}}
          data-tooltip={drawColor}
        />

        <button
          className="button"
          onClick={() => setDrawColor(generateHEX)}
        >
          Generate HEX
        </button>

        <button
          className="button"
          onClick={() => setDrawColor(generateRGB)}
        >
          Generate RGB color
        </button>

        <button
          className="button"
          onClick={() => setDrawColor(generateHSL)}
        >
          Generate HSL color
        </button>

        <input
          type="color"
          className="input-color-container"
          placeholder="Choose color"
          value={convertColorToHEX(drawColor)}
          onChange={(e) => setDrawColor(e.target.value)}
        />

        <input
          type="number"
          className="canvas-object-size-input"
          placeholder="Object size"
          value={objectSize}
          onChange={(e) => setObjectSize(parseFloat(e.target.value))}
        />

        <button
          className="button"
          onClick={fillCanvas}
        >
          Fill canvas
        </button>

        <button
          className="button"
          onClick={clearCanvas}
        >
          Clear canvas
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="canvas"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onMouseDown={onMouseDown}
      >
        Your browser does not support canvas
      </canvas>
    </div>
  );
}
