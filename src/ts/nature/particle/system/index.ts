/**
 * Created by michaelbessey on 8/20/16.
 */

import {
    ColorRGB,
    createHarmonicGenerator,
    mouseElementLocation,
    NatureParticleSystem,
    NatureParticleSystemConfetti,
    NatureRepeller,
    randomRange,
    RasterCircle,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d"),
    gravity: Vector = new Vector(0, 0.1),
    stageCenter: Vector,
    particleSystem: NatureParticleSystem,
    particleSystems: NatureParticleSystem [] = [],
    repeller: NatureRepeller;

stageCenter = new Vector(stage.width / 2, stage.height / 2);

repeller = new NatureRepeller(stageCenter.clone());
repeller.body = new RasterCircle();
repeller.body.fillStyle = ColorRGB.getRandomInteger().toString();

function mouseClickHandler(event: MouseEvent) : void {

    let mouse: Vector = mouseElementLocation(event, stage);
    particleSystem = new NatureParticleSystemConfetti(mouse.clone());
    particleSystems.push(particleSystem);
}

stage.addEventListener("click", mouseClickHandler, false);

function render() {

    context.clearRect(0, 0, stage.width, stage.height);

    for(particleSystem of particleSystems) {

        particleSystem.applyForce(gravity);
        particleSystem.applyRepeller(repeller);
        particleSystem.addParticle();

        particleSystem.draw(context);
    }

    repeller.draw(context);

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
