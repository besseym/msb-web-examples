/**
 * Created by michaelbessey on 7/18/16.
 */

import {
    ColorRGB,
    ColorHSL,
    Container,
    createIntegerRangeRandomGenerator,
    createRandomRangeGenerator,
    NatureActor,
    normalGaussianGenerator,
    mouseElementLocation,
    RasterCircle,
    RasterRectangle,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d"),

    k = 0,
    wCount = 100,
    mass: number,
    massGenerator: Function = normalGaussianGenerator(7.0, 2.0),
    color: ColorRGB,
    shape: RasterCircle,
    actor: NatureActor,
    actorArray: NatureActor[] = [],
    stageContainer: Container = new Container(0, stage.width, 0, stage.height),
    dropContainer: Container = new Container(0, stage.width, 0, 0.25 * stage.height),
    liquidContainer: Container = new Container(0, stage.width, 0.35 * stage.height, stage.height),
    liquidRectangle: RasterRectangle = new RasterRectangle(stage.width, 0.65 * stage.height);

liquidRectangle.populate(liquidContainer);
liquidRectangle.fillStyle = (new ColorRGB(200, 200, 255)).toString();

while(k < wCount){

    mass = massGenerator();

    color = ColorRGB.getRandomInteger();
    color.a = 0.8;

    shape = new RasterCircle();
    shape.lineWidth = 0.01;
    shape.fillStyle = color.toString();
    shape.radius = mass;

    actor = new NatureActor(shape);
    actor.location = Vector.getRandom(dropContainer);
    actor.speedLimit = 5;
    actor.mass = mass;
    actorArray.push(actor);

    k++;
}

function render(){

    context.clearRect(0, 0, stage.width, stage.height);

    liquidRectangle.draw(context);

    let m: number;
    for(let i = 0; i < actorArray.length; i++){

        actor = actorArray[i];
        actor.draw(context);

        if(liquidContainer.isContained(actor.location)){
            actor.applyDrag(1.0);
        }

        actor.applyGravity(0.1);

        actor.update();
        actor.applyPassThrough(stageContainer);
    }

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
