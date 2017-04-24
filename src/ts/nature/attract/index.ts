// import {normalGaussianGenerator, createIntegerRangeRandomGenerator, createRangeRandomGenerator}
//     from "../bower_components/msb-viz/src/ts/msb/math/utility";
// import Vector from "../bower_components/msb-viz/src/ts/msb/math/vector";

// import {mouseToCanvas} from "../bower_components/msb-viz/src/ts/msb/graphics/utility";
// import {ColorRGB, ColorHSL} from "../bower_components/msb-viz/src/ts/msb/graphics/color";
// import Container from "../bower_components/msb-viz/src/ts/msb/graphics/container";

// import Circle from "../bower_components/msb-viz/src/ts/msb/graphics/raster/circle";
// import Rectangle from "../bower_components/msb-viz/src/ts/msb/graphics/raster/rectangle";

// import Actor from "../bower_components/msb-viz/src/ts/msb/nature/elements/actor";

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

    k: number = 0,
    wCount: number = 100,
    mass: number,
    massGenerator: Function = normalGaussianGenerator(10.0, 2.0),
    color: ColorRGB,
    circle: RasterCircle,
    actor: NatureActor,
    actorArray: NatureActor[] = [],
    stageContainer: Container = new Container(0, stage.width, 0, stage.height),
    doAttract = true;

while(k < wCount){

    mass = massGenerator();

    color = ColorRGB.getRandomInteger();
    color.a = 0.8;

    circle = new RasterCircle();
    circle.lineWidth = 0.01;
    circle.fillStyle = color.toString();
    circle.radius = mass;

    actor = new NatureActor(circle);
    actor.location = Vector.getRandom(stageContainer);
    actor.speedLimit = 5;
    actor.mass = mass;
    actorArray.push(actor);

    k++;
}

function clickHandler(event: MouseEvent){

    doAttract = !doAttract;

    // let canvasPoint = mouseElementLocation(event, stage);
    //
    // console.log(canvasPoint.toString());

    event.preventDefault();
}

stage.addEventListener("click", clickHandler, false);

function render(){

    context.clearRect(0, 0, stage.width, stage.height);

    let walker1: NatureActor;
    for(let i = 0; i < actorArray.length; i++){

        actor = actorArray[i];

        for(let j = 0; j < actorArray.length; j++){

            if(i != j){

                walker1 = actorArray[j];

                if(doAttract){
                    actor.applyAttraction(walker1, 5.0, 25.0);
                }
                else {
                    actor.applyRepellent(walker1, 5.0, 25.0);
                }
            }
        }

        actor.update();
        actor.draw(context);

        actor.applyBounce(stageContainer);
        // walker.applyPassThrough(stageContainer);
    }

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);