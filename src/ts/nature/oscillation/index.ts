/**
 * Created by besseym on 8/8/16.
 */

import {
    createHarmonicGenerator,
    NatureOscillator,
    randomRange,
    RasterCircle,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d"),
    shape: RasterCircle,
    stageCenter: Vector,
    amplitude: number = 200,
    period: number = 300,
    harmonicGenerator = createHarmonicGenerator(amplitude, period),
    oscillator: NatureOscillator;

stageCenter = new Vector(stage.width / 2, stage.height / 2);

shape = new RasterCircle(50.0);
shape.fillStyle = "rgba(0, 0, 0, 0.5)";
// shape.location = new Vertex(stageCenter.x, stageCenter.y);

oscillator = new NatureOscillator();
oscillator.body = shape;
oscillator.location = new Vector(stageCenter.x, stageCenter.y);
// oscillator.velocity = new Vector(getRangeRandom(-0.15, 0.15), getRangeRandom(-0.15, 0.15));
oscillator.velocity = new Vector(0.1, 0.05);
// oscillator.amplitude = new Vector(getRangeRandom(0, stageCenter.x), getRangeRandom(0, stageCenter.y));
oscillator.amplitude = new Vector(0.75 * stageCenter.x, 0.75 * stageCenter.y);

let angle = 0,
    aVelocity = 0.05,
    frameCount: number = 0;

function render() {

    context.clearRect(0, 0, stage.width, stage.height);

    oscillator.oscillate();
    oscillator.draw(context);

    // angle += aVelocity;
    // shape.location.x = (stage.width / 2) + (amplitude * Math.cos(angle));

    // frameCount = (frameCount + 1) % period;
    // shape.location.x = (stage.width / 2) + harmonicGenerator(frameCount);
    // shape.draw(context);


    // console.log(harmonicGenerator(frameCount));


    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
