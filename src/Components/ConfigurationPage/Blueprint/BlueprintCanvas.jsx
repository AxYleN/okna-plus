import React, { Component } from 'react';

export default class BlueprintCanvas extends Component {
  constructor(props) {
    super(props);

    this.resolution = 1000;
    this.center = this.resolution / 2;
    this.canvasRef = React.createRef();
    this.color_dark = '#707070';
    this.color_mid = '#AAAAAA';
    this.color_light = '#DDDDDD';
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext('2d');

    this.drawBlueprint();
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

  fillRect(...params) {
    params = params.map(num => Math.round(num));
    this.ctx.fillRect(...params);
  }

  strokeLine(...points) {
    this.ctx.beginPath();
    const p = points.map(point => Math.round(point));

    this.ctx.moveTo(p[0], p[1]);

    for (let i = 2; i < p.length; i += 2) {
      this.ctx.lineTo(p[i], p[i + 1]);
    }

    this.ctx.stroke();
  }

  drawBlueprint() {
    if (!this.canvas) return;
    this.clearCanvas();

    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = `${this.resolution / 30}px Arial`;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = this.color_dark;
    this.ctx.strokeStyle = this.color_dark;
    this.ctx.save();

    const { x, y, width, height } = this.drawFrame();
    const windows = this.props.params.window;

    if (this.props.type === 'door') {
      this.drawDoor({
        x,
        y,
        width,
        height,
      });
    } else if (windows.length > 0) {
      const windowWidthPx = width / windows.length;
      const windowWidth = Math.round(this.props.params.width / windows.length);

      windows.forEach((window, id) => {
        const windowData = { ...window, windowWidth };
        this.drawWindow(
          x + windowWidthPx * id,
          y,
          windowWidthPx,
          height,
          windowData,
        );
      });
    }
  }

  clearCanvas() {
    const { resolution, ctx } = this;
    ctx.clearRect(0, 0, resolution, resolution);
  }

  drawFrame() {
    const { center } = this;
    const padding = 100;

    let { width, height } = this.props.params;
    [width, height] = this.normalize(width, height).map(num => num - padding);

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const x = center - halfWidth;
    const y = center - halfHeight;

    this.strokeRect(x, y, width, height);

    this.drawSize(
      this.props.params.width,
      center,
      center - halfHeight - 15,
      halfWidth,
    );
    this.drawSize(
      this.props.params.height,
      center + halfWidth + 15,
      center,
      halfHeight,
      'right',
    );

    return {
      x,
      y,
      width,
      height,
    };
  }

  drawSize(text, x, y, lineWidth, dir = 'top') {
    const { ctx } = this;

    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    if (dir === 'right') ctx.rotate(Math.PI / 2);

    ctx.fillText(text, 0, 0);

    const translateY = -10;
    const textPadding = 40;
    let lineHeight = 15;
    if (dir === 'bottom') lineHeight *= -1;

    this.strokeLine(
      -textPadding,
      translateY,
      -lineWidth,
      translateY,
      -lineWidth,
      lineHeight + translateY,
    );

    this.strokeLine(
      textPadding,
      translateY,
      lineWidth,
      translateY,
      lineWidth,
      lineHeight + translateY,
    );

    ctx.restore();
  }

  drawWindow(x, y, width, height, { openTo, windowWidth, mosquitoNet }) {
    const [winPadding] = this.normalize(openTo === 'no' ? 30 : 60);
    const winLeft = x + winPadding;
    const winTop = y + winPadding;
    const winWidth = width - winPadding * 2;
    const winHeight = height - winPadding * 2;

    this.drawSize(
      windowWidth,
      x + width / 2,
      y + height + 50,
      width / 2,
      'bottom',
    );

    this.ctx.save();
    this.ctx.fillStyle =
      openTo !== 'no' && mosquitoNet ? this.color_mid : this.color_light;
    this.fillRect(winLeft, winTop, winWidth, winHeight);
    this.ctx.restore();
    this.strokeRect(winLeft, winTop, winWidth, winHeight);

    if (openTo !== 'no') {
      const winRight = winLeft + winWidth;
      const winBottom = winTop + winHeight;
      const winCenter = (winTop + winBottom) / 2;
      const framePad = winPadding / 1.35;

      const knob = framePad / 3;
      const [knobHeight] = this.normalize(64);
      const knobTop = winCenter - knobHeight / 2;

      this.strokeRect(
        winLeft - framePad,
        winTop - framePad,
        winWidth + framePad * 2,
        winHeight + framePad * 2,
      );

      if (openTo === 'toRight') {
        this.strokeRect(winLeft - knob * 2, knobTop, knob, knobHeight);
      } else if (openTo === 'toLeft') {
        this.strokeRect(winRight + knob, knobTop, knob, knobHeight);
      }

      this.drawWindowLines(winLeft, winTop, winRight, winBottom, openTo);
    }
  }

  drawWindowLines(left, top, right, bottom, openTo) {
    const xCenter = (left + right) / 2;
    const yCenter = (top + bottom) / 2;

    this.ctx.save();
    this.ctx.strokeStyle = this.color_dark;

    if (openTo === 'toRight') {
      this.strokeLine(right, top, left, yCenter, right, bottom);
    } else if (openTo === 'toLeft') {
      this.strokeLine(left, top, right, yCenter, left, bottom);
    }

    this.strokeLine(left, bottom, xCenter, top, right, bottom);
    this.ctx.restore();
  }

  drawDoor(frame) {
    let { x, y, width, height } = frame;
    const [padding] = this.normalize(60);

    x += padding;
    y += padding;
    width -= padding * 2;
    height -= padding * 2;

    let topHeight = (height - padding) * 0.6;
    let bottomHeight = height - topHeight - padding;

    this.strokeRect(x, y, width, topHeight);
    this.strokeRect(x, y + topHeight + padding, width, bottomHeight);

    const knobH = this.normalize(84);
    const knobW = padding / 3;
    const knobX = x - knobW * 2;
    const knobY = y + topHeight - knobH;

    this.strokeRect(knobX, knobY, knobW, knobH);
  }

  componentDidUpdate() {
    this.drawBlueprint();
  }

  render() {
    const resolution = this.resolution;

    return (
      <canvas height={resolution} width={resolution} ref={this.canvasRef} />
    );
  }
}
