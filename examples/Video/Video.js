import { createJoyMap, createStreamModule } from '../../src/index';

document.getElementById('app').innerHTML = `
    <article class="examples-container">
        <header>
            <h1 className="title">JoyMap video fun times example using the stream module</h1>
        </header>
        <div class="video-example">
            <div class="controls">
                <button class="take-photo">Take Photo</button>
            </div>
            <div class="rgb">
                <label for="rmin">Red min:</label>
                <input type="range" min="0" max="255" name="rmin" />
                <label for="rmax">Red max:</label>
                <input type="range" min="0" max="255" name="rmax" />
                <br />
                <label for="gmin">Green min:</label>
                <input type="range" min="0" max="255" name="gmin" />
                <label for="gmax">Green max:</label>
                <input type="range" min="0" max="255" name="gmax" />
                <br />
                <label for="bmin">Blue min:</label>
                <input type="range" min="0" max="255" name="bmin" />
                <label for="bmax">Blue max:</label>
                <input type="range" min="0" max="255" name="bmax" />
            </div>
        </div>
        <canvas class="photo"></canvas>
        <video class="player"></video>
    </article>`;

const joyMap = createJoyMap();
const module = createStreamModule({ padId: joyMap.getUnusedPadId() });
joyMap.addModule(module);
joyMap.start();

const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            video.src = window.URL.createObjectURL(localMediaStream);
            video.play();
        })
        .catch(err => {
            console.error('Oh No!!!', err);
        });
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] * 0; // RED
        pixels.data[i + 1] = pixels.data[i + 1]; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0; // BLUE
    }
    return pixels;
}

function rgbSplit(pixels, rate) {
    if (!rate) {
        return pixels;
    }
    if (rate > 0) {
        for (let i = 0; i < pixels.data.length; i += 4) {
            pixels.data[i + (4 * rate) + 1] = pixels.data[i];
            pixels.data[(i - (4 * rate)) + 2] = pixels.data[i + 2];
        }
    } else {
        for (let i = 0; i < pixels.data.length; i += 4) {
            pixels.data[(i + (-4 * rate)) + 2] = pixels.data[i + 0];
            pixels.data[(i - (-4 * rate)) + 1] = pixels.data[i + 1];
        }
    }

    return pixels;
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    /*
    setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        //ctx.globalAlpha = 0.1;
        ctx.putImageData(
            rgbSplit(ctx.getImageData(0, 0, width, height)),
            0,
            0
        );
    }, 16);
    */

    module.getStickStream('L').subscribe(state => {
        ctx.drawImage(video, 0, 0, width, height);
        ctx.putImageData(
            rgbSplit(ctx.getImageData(0, 0, width, height), Math.round(state.value[0] * 100)),
            0,
            0
        );
    });
}

getVideo();
video.addEventListener('canplay', paintToCanvas);
