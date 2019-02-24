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

let w = stage.width/2,
    h = stage.height/2,
    r = Math.max(w, h) * .7,
    clock = new NatureClock(new Vector(stage.width/2, stage.height/2), r);

function render(){

    clock.date = new Date();
    clock.draw(context);

    window.requestAnimationFrame(render);
}

render();