/**
 * Created by michaelbessey on 8/14/16.
 */

import {
    mouseElementLocation,
    NatureActor,
    NatureSpring,
    RasterCircle,
    RasterRectangle,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d"),
    stageCenter: Vector = new Vector(stage.width / 2, stage.height / 2),
    gravity: Vector = new Vector(0, 2.0),
    circle: RasterCircle,
    rectangle: RasterRectangle,
    bob: NatureActor,
    anchor: NatureActor,
    spring: NatureSpring,
    style: string = "rgba(0, 0, 0, 0.75)";

circle = new RasterCircle();
circle.fillStyle = style;
bob = new NatureActor(circle);
bob.location.x = stageCenter.x;
bob.location.y = 100;
bob.damping = 0.98;

rectangle = new RasterRectangle(25, 25);
rectangle.fillStyle = style;
anchor = new NatureActor(rectangle);
anchor.location.x = stageCenter.x;

spring = new NatureSpring(anchor, (stageCenter.y / 2));
spring.strokeStyle = style;

let mouseMove: boolean = false;
function mouseMoveHandler(event: MouseEvent) : void {

    let mouseLocation: Vector = mouseElementLocation(event, stage);
    if(mouseMove){
        bob.location = mouseLocation;
    }
    // event.preventDefault();
}

function mouseDownHandler(event: MouseEvent) : void {

    let mouseLocation: Vector = mouseElementLocation(event, stage);
    mouseMove = bob.body.isHit(mouseLocation);
    // if(mouseMove){
    //     console.log('hit actor');
    // }

    event.preventDefault();
}

function mouseUpHandler(event: MouseEvent) : void {
    mouseMove = false;
}

stage.addEventListener("mousemove", mouseMoveHandler, false);
stage.addEventListener("mousedown", mouseDownHandler, false);
stage.addEventListener("mouseup", mouseUpHandler, false);

function render() {

    context.clearRect(0, 0, stage.width, stage.height);

    if(!mouseMove) {

        bob.applyForce(gravity);

        // console.log(bob.location);

        spring.connect(bob);
        // spring.constrainLength(bob);
        bob.update();
    }

    spring.draw(context, bob);
    bob.draw(context);

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);
