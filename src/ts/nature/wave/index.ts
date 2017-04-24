
import {
    ColorRGB,
    NatureWave,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d"),
    stageCenter: Vector,
    wave: NatureWave;

stageCenter = new Vector(stage.width / 2, stage.height / 2);

wave = new NatureWave();
wave.location.x = stage.width * 0.15;
wave.location.y = stageCenter.y;
wave.amplitude = stageCenter.y * 0.25;
wave.period = stage.width * 0.7;
wave.increment = wave.period / 50;
wave.strokeStyle = ColorRGB.getRandomInteger().toString();

function render() {

    context.clearRect(0, 0, stage.width, stage.height);

    wave.draw(context);

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);