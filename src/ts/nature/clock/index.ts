/**
 * Created by mm28969 on 4/23/17.
 */

import {
    NatureClock,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement,
    context: CanvasRenderingContext2D;

stage = <HTMLCanvasElement> document.getElementById("stage");
context = stage.getContext("2d");

let clock = new NatureClock(new Vector(stage.width/2, stage.height/2), 200);

function render(){

    clock.date = new Date();
    clock.draw(context);

    window.requestAnimationFrame(render);
}

render();