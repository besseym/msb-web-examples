import {
    ColorRGB,
    ColorHSL,
    Container,
    NatureActor,
    normalGaussianGenerator,
    RasterCircle,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d");

let color: ColorRGB,
    circle: RasterCircle,
    actor: NatureActor,
    mass: number,
    massGenerator: Function = normalGaussianGenerator(15.0, 5.0),
    stageContainer: Container = new Container(0, stage.width, 0, stage.height);

mass = massGenerator();

// color = ColorRGB.getRandom();
color = new ColorRGB(256, 0, 0);
color.a = 0.8;

circle = new RasterCircle();
circle.lineWidth = 0.01;
circle.fillStyle = color.toString();
circle.radius = mass;

actor = new NatureActor(circle);
actor.location = Vector.getRandom(stageContainer);
actor.speedLimit = 15;
actor.mass = mass;
actor.applyForce(new Vector(1.0, 1.0));

function clickHandler(event: MouseEvent){

    let force = actor.velocity.clone();
    force.normalize();
    actor.applyForce(Vector.multiply(force, 5));

    event.preventDefault();
}

stage.addEventListener("click", clickHandler, false);

function render() {

    context.clearRect(0, 0, stage.width, stage.height);

    actor.update();
    actor.draw(context);

    actor.applyBounce(stageContainer);

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);


