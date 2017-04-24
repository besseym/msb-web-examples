/**
 * Created by michaelbessey on 8/7/16.
 */

import {
    ColorRGB,
    Container,
    NatureActor,
    RasterCircle,
    RasterRectangle,
    RasterTriangle,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d"),
    color: ColorRGB,
    shape: RasterTriangle,
    circle: RasterCircle,
    actor: NatureActor,
    location: Vector,
    force: Vector,
    strength: number,
    stageContainer: Container = new Container(0, stage.width, 0, stage.height);


color = ColorRGB.getRandomInteger();
color.a = 0.2;

shape = new RasterTriangle(50.0, 50.0);
// shape = new Rectangle(100.0, 50.0);
// shape = new Circle(100.0);
shape.fillStyle = color.toString();

circle = new RasterCircle(5.0);
circle.fillStyle = "rgba(0, 0, 0, 0.5)";

actor = new NatureActor(shape);
actor.location = new Vector(stage.width / 2, stage.height / 2);

let theta = 0.0, r = 10.0;

function render() {

    context.clearRect(0, 0, stage.width, stage.height);

    location = new Vector(0, 0);
    location.setXY(theta, r);
    location.x = location.x + stage.width / 2;
    location.y = location.y + stage.height / 2;

    circle.location = location.clone();
    // console.log(force.toString());

    force = Vector.subtract(location, actor.location);
    strength = force.magnitude * 0.025;
    force.normalize();
    force.multiply(strength);
    //
    // actor.applyForce(force);
    actor.velocity = force;
    actor.angle = force.getAngleXY();

    // actor.applyForce(force);
    // actor.applyAngularForce(0.01);

    circle.draw(context);

    actor.update();
    actor.draw(context);

    r = (r < 250.0) ? (r + 0.1) : r;
    theta = (theta + 1.0) % 360;

    // actor.applyBounce(stageContainer);

    window.requestAnimationFrame(render);

}

window.requestAnimationFrame(render);