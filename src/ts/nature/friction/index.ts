/**
 * Created by mm28969 on 4/23/17.
 */

/**
 * Created by michaelbessey on 8/7/16.
 */

import {
    ColorRGB,
    ColorHSL,
    Container,
    createIntegerRandomRangeGenerator,
    createRandomRangeGenerator,
    mouseElementLocation,
    NatureActor,
    NatureMover,
    normalGaussianGenerator,
    RasterCircle,
    RasterRectangle,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d"),

    k: number = 0,
    wCount: number = 100,
    mass: number,
    massGenerator: Function = normalGaussianGenerator(7.0, 2.0),
    mouse: NatureMover,
    mEffectRange = stage.width * 0.5,
    color: ColorRGB,
    circle: RasterCircle,
    actor: NatureActor,
    actorArray: NatureActor[] = [],
    stageContainer: Container = new Container(0, stage.width, 0, stage.height),
    frictionContainer: Container = new Container(0.25 * stage.width, 0.75 * stage.width, 0.25 * stage.height, 0.75 * stage.height),
    frictionRectangle: RasterRectangle = new RasterRectangle(0.75 * stage.width, 0.75 * stage.height);

frictionRectangle.populate(frictionContainer);
frictionRectangle.fillStyle = (new ColorRGB(220, 220, 220)).toString();

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

function mouseOutHandler(event: MouseEvent) : void {

    mouse = undefined;
}

stage.addEventListener("mouseout", mouseOutHandler, false);

function mouseMoveHandler(event: MouseEvent) : void {

    if(!mouse){
        mouse = new NatureMover();
        mouse.mass = 1000.0;
    }

    mouse.location = mouseElementLocation(event, stage);

    // event.preventDefault();
}

stage.addEventListener("mousemove", mouseMoveHandler, false);

function render(){

    context.clearRect(0, 0, stage.width, stage.height);

    frictionRectangle.draw(context);

    for(let i = 0; i < actorArray.length; i++){

        actor = actorArray[i];

        // actor.applyGravity(0.1);

        if(mouse){
            actor.applyAttraction(mouse, 15.0, mEffectRange);
            // actor.applyRepellent(mouse, 5.0, mEffectRange);
        }

        if(frictionContainer.isContained(actor.location)){
            actor.applyFriction(0.5);
        }

        actor.update();
        actor.draw(context);

        actor.applyBounce(stageContainer);
        // walker.applyPassThrough(stageContainer);
    }

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);

