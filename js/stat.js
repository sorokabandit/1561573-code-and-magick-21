'use strict';
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const GAP_GORIZONTAL = 55;
const FONT_GAP = 50;
const TEXT_HEIGHT = 50;
const BAR_HEIGHT = CLOUD_HEIGHT - GAP - TEXT_HEIGHT - GAP - FONT_GAP;
const BAR_WIDTH = 40;
const BAR_GAPBETWEEN = 50;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
const getMaxElement = function (arr) {
  let maxElement = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);
  ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
  ctx.font = `16px PTMono`;
  ctx.fillText(`Ура вы победили!`, 140, 30);
  ctx.fillText(`Список результатов:`, 140, 50);
  let colors = [];
  colors[0] = `hsl(244, 73%, 36%)`;
  colors[1] = `hsl(244, 97%, 56%)`;
  colors[2] = `hsl(244, 75%, 24%)`;
  colors[3] = `hsl(244, 83%, 14%)`;
  ctx.fillStyle = `rgba(255, 0, 0, 1)`;
  let maxTime = getMaxElement(times);
  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = `black`;
    ctx.fillText(times[i].toFixed(), (CLOUD_X + GAP_GORIZONTAL) + i * (BAR_WIDTH + BAR_GAPBETWEEN), CLOUD_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - 4 * GAP);
    ctx.fillText(names[i], (CLOUD_X + GAP_GORIZONTAL) + i * (BAR_WIDTH + BAR_GAPBETWEEN), CLOUD_Y + TEXT_HEIGHT + BAR_HEIGHT + FONT_GAP);
    ctx.fillStyle = colors[i];
    ctx.fillRect(CLOUD_X + GAP_GORIZONTAL + i * (BAR_WIDTH + BAR_GAPBETWEEN), CLOUD_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime - 3 * GAP, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);

  }
};
