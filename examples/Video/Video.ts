// Due to the example's babel config, we need to setup the regenerator dep for video to work
// see this issue for more info https://github.com/babel/babel/issues/9849
import 'regenerator-runtime/runtime.js';
import * as rxjs from 'rxjs';
import * as operators from 'rxjs/operators';

import { createJoymap, createStreamModule } from '../../src/index';

const app = document.getElementById('app') as HTMLElement;
app.innerHTML = `
  <div style="padding-left: 2rem; padding-right: 2rem; display: flex; flex-direction: column; align-items: center;">
    <header style="text-align: center;">
      <h3>Video feed manipulation using left stick and the A button</h3>
    </header>
    <div style="align-items: center; display: flex; flex-wrap: wrap; justify-content: center;">
    <canvas class="photo"></canvas>
    <video class="player"></video></div>
  </div>
`;

const joymap = createJoymap();
const module = createStreamModule({ rxjs, operators, padId: joymap.getUnusedPadId() });
joymap.addModule(module);
joymap.start();

const video = document.querySelector('.player') as HTMLVideoElement;
const canvas = document.querySelector('.photo') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

async function startVideo() {
  const localMediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

  try {
    video.srcObject = localMediaStream;
  } catch (error) {
    video.src = window.URL.createObjectURL(localMediaStream);
  }

  video.play();
}

function rgbSplit(pixels: ImageData, rate: number) {
  if (!rate) {
    return pixels;
  }
  if (rate > 0) {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 4 * rate + 1] = pixels.data[i];
      pixels.data[i - 4 * rate + 2] = pixels.data[i + 2];
    }
  } else {
    for (let i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + -4 * rate + 2] = pixels.data[i + 0];
      pixels.data[i - -4 * rate + 1] = pixels.data[i + 1];
    }
  }

  return pixels;
}

function drawPlaceholder() {
  ctx.fillStyle = '#EEE';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.font = 'normal bold 20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(
    'This is the modified video feed. Please connect a gamepad.',
    canvas.width * 0.5,
    canvas.height * 0.25,
  );
}

function setup() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  drawPlaceholder();

  module.getButtonStream('A').subscribe((getButtonResult) => {
    const buttonResult = getButtonResult();
    if (buttonResult.pressed && buttonResult.justChanged) {
      ctx.globalAlpha = ctx.globalAlpha === 1 ? 0.1 : 1;
    }
  });

  module.getStickStream('L').subscribe((getStickResult) => {
    ctx.drawImage(video, 0, 0, width, height);
    ctx.putImageData(
      rgbSplit(ctx.getImageData(0, 0, width, height), Math.round(getStickResult().value[0] * 100)),
      0,
      0,
    );
  });
}

startVideo();
video.addEventListener('canplay', setup);
