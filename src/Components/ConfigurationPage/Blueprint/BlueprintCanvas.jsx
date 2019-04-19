import React, { Component } from 'react';

function Point(x, y) {
  return { x, y };
}

export default class BlueprintCanvas extends Component {
  resolution = 1000;
  center = this.resolution / 2;
  padding = this.resolution / 10;

  canvasRef = React.createRef();
  colors = {
    dark: '#505050',
    mid: '#AAAAAA',
    light: '#DDDDDD',
  };
  frame = {
    x1: this.padding,
    y1: this.padding,
    x2: this.resolution - this.padding,
    y2: this.resolution - this.padding,
  };

  clearCanvas() {
    const { resolution, ctx } = this;
    ctx.clearRect(0, 0, resolution, resolution);
  }

  setDefaultCTX() {
    const ctx = this.canvas.getContext('2d');
    this.ctx = ctx;

    this.fontSize = Math.round(this.resolution / 30);
    ctx.font = `${this.fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.colors.dark;
    ctx.strokeStyle = this.colors.dark;
    ctx.save();
  }

  normalize(...arr) {
    const { width, height } = this.props.params;
    const max = Math.max(width, height);

    return arr.map(num => (num / max) * this.resolution);
  }

  strokeRect(x, y, w, h) {
    const params = [x, y, w, h].map(num => Math.round(num));
    this.ctx.strokeRect(...params);
  }

  fillRect(x, y, w, h) {
    const params = [x, y, w, h].map(num => Math.round(num));
    this.ctx.fillRect(...params);
  }

  rectWithPadding(x, y, w, h, padding) {
    x = x + padding;
    y = y + padding;
    w = w - padding * 2;
    h = h - padding * 2;

    return [x, y, w, h];
  }

  strokeLine(...points) {
    this.ctx.beginPath();
    const p = points.map(point => ({
      x: Math.round(point.x),
      y: Math.round(point.y),
    }));

    this.ctx.moveTo(p[0].x, p[0].y);

    for (let point of p) {
      this.ctx.lineTo(point.x, point.y);
    }

    this.ctx.stroke();
  }

  fillText(text, x, y) {
    x = Math.round(x);
    y = Math.round(y);
    this.ctx.fillText(text, x, y);
  }

  translate(x, y) {
    x = Math.round(x);
    y = Math.round(y);
    this.ctx.translate(x, y);
  }

  drawBlueprint() {
    if (!this.canvas) return;
    this.clearCanvas();
    this.setDefaultCTX();

    this.drawFrame();

    if (this.props.type === 'door') {
      this.drawDoor();
    } else {
      this.drawWindows();
    }
  }

  drawFrame() {
    const { center, padding } = this;

    const { width, height } = this.props.params;
    const [nWidth, nHeight] = this.normalize(width, height).map(
      num => num - padding,
    );

    const halfWidth = nWidth / 2;
    const halfHeight = nHeight / 2;

    const x = center - halfWidth;
    const y = center - halfHeight;

    this.strokeRect(x, y, nWidth, nHeight);
    this.frame = {
      x1: x,
      y1: y,
      x2: x + nWidth,
      y2: y + nHeight,
    };

    this.drawSize(width, 0, nWidth);
    this.drawSize(height, 0, nHeight, 'right');
  }

  drawDoor() {
    const [padding] = this.normalize(60);

    const frame = [
      this.frame.x1,
      this.frame.y1,
      this.frame.x2 - this.frame.x1,
      this.frame.y2 - this.frame.y1,
    ];

    const [x, y, w, h] = this.rectWithPadding(...frame, padding);

    const topHeight = (h - padding) * 0.6;
    const bottomHeight = h - topHeight - padding;

    this.ctx.save();
    this.ctx.fillStyle = this.colors.light;
    this.fillRect(x, y, w, topHeight);
    this.strokeRect(x, y, w, topHeight);
    this.ctx.restore();

    this.strokeRect(x, y + topHeight + padding, w, bottomHeight);

    const knobH = this.normalize(84);
    const knobW = padding / 3;
    const knobX = x - knobW * 2;
    const knobY = y + topHeight - knobH;

    this.strokeRect(knobX, knobY, knobW, knobH);
  }

  drawWindows() {
    const params = this.props.params;
    const windows = params.window;
    if (windows.length <= 0) return;

    const windowWidth = Math.round(params.width / windows.length);
    const windowWidthPx = (this.frame.x2 - this.frame.x1) / windows.length;

    windows.forEach((window, id) => {
      this.drawWindow(windowWidth, windowWidthPx, windowWidthPx * id, window);
    });
  }

  drawWindow(width, widthPx, shift, { openTo, mosquitoNet }) {
    this.drawSize(width, shift, widthPx, 'bottom');

    const [winPadding] = this.normalize(openTo === 'no' ? 30 : 60);

    this.ctx.save();
    this.ctx.fillStyle =
      openTo !== 'no' && mosquitoNet ? this.colors.mid : this.colors.light;
    const glassSize = this.drawGlass(widthPx, shift, winPadding);
    this.ctx.restore();

    if (openTo !== 'no') {
      const framePading = winPadding / 1.35;

      const [x, y, w, h] = this.rectWithPadding(...glassSize, -framePading);
      this.strokeRect(x, y, w, h);

      const windowCenterY = (y + h + y) / 2;
      const knobWidth = framePading / 3;
      const [knobHeight] = this.normalize(64);
      const knobTop = windowCenterY - knobHeight / 2;

      const openDir = openTo.split('_');

      if (openDir.includes('toRight')) {
        this.strokeRect(x + knobWidth, knobTop, knobWidth, knobHeight);
      } else {
        this.strokeRect(x + w - knobWidth * 2, knobTop, knobWidth, knobHeight);
      }

      if (openDir.includes('tilt')) {
        this.drawTiltLines(...glassSize);
      }
      if (openDir.includes('toRight')) {
        this.drawToRightLines(...glassSize);
      }
      if (openDir.includes('toLeft')) {
        this.drawToLeftLines(...glassSize);
      }
    }
  }

  drawTiltLines(x1, y1, w, h) {
    const x2 = x1 + w;
    const y2 = y1 + h;
    const xCenter = (x2 + x1) / 2;

    this.strokeLine(Point(x1, y2), Point(xCenter, y1), Point(x2, y2));
  }

  drawToRightLines(x1, y1, w, h) {
    const x2 = x1 + w;
    const y2 = y1 + h;
    const yCenter = (y2 + y1) / 2;

    this.strokeLine(Point(x2, y1), Point(x1, yCenter), Point(x2, y2));
  }

  drawToLeftLines(x1, y1, w, h) {
    const x2 = x1 + w;
    const y2 = y1 + h;
    const yCenter = (y2 + y1) / 2;

    this.strokeLine(Point(x1, y1), Point(x2, yCenter), Point(x1, y2));
  }

  drawGlass(width, shift, padding) {
    let x = this.frame.x1 + shift;
    let y = this.frame.y1;
    let w = width;
    let h = this.frame.y2 - this.frame.y1;

    [x, y, w, h] = this.rectWithPadding(x, y, w, h, padding);

    this.fillRect(x, y, w, h);
    this.strokeRect(x, y, w, h);
    return [x, y, w, h];
  }

  drawSize(text, shift, width, position = 'top') {
    text = String(text);
    shift = Number(shift);
    width = Number(width);

    const ctx = this.ctx;
    const { x1, y1, x2, y2 } = this.frame;

    let padding = 30;
    const textPadding = 10;

    if (position === 'bottom') padding = -padding;
    let X = position === 'right' ? x2 : x1;
    let Y = position === 'bottom' ? y2 : y1;

    switch (position) {
      case 'top':
      case 'bottom':
        X += shift;
        break;
      default:
        Y += shift;
        break;
    }

    const textCenter = width / 2;
    const textHalfWidth = (this.fontSize * text.length) / 4 + textPadding;

    ctx.save();
    this.translate(X, Y);

    if (position === 'right') ctx.rotate(Math.PI / 2);

    this.fillText(text, width / 2, -padding);

    this.strokeLine(
      Point(0, -padding / 3),
      Point(0, -padding),
      Point(textCenter - textHalfWidth, -padding),
    );
    this.strokeLine(
      Point(width, -padding / 3),
      Point(width, -padding),
      Point(textCenter + textHalfWidth, -padding),
    );

    ctx.restore();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    this.drawBlueprint();
  }

  componentDidUpdate() {
    this.drawBlueprint();
  }

  render() {
    const resolution = this.resolution;

    return (
      <canvas
        height={resolution}
        width={resolution}
        ref={this.canvasRef}
        style={{ maxWidth: '100%', maxHeight: '80vh' }}
      />
    );
  }
}
