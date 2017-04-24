/**
 * Created by mm28969 on 4/23/17.
 */

import {
    NaturePendulum,
    Vector
} from "msb-web";

let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage"),
    context: CanvasRenderingContext2D = stage.getContext("2d"),
    stageCenter: Vector = new Vector(stage.width / 2, stage.height / 2),
    pendulum: NaturePendulum = new NaturePendulum(new Vector(stageCenter.x, 0), stageCenter.y),
    style: string = "rgba(0, 0, 0, 0.75)";

pendulum.strokeStyle = style;
pendulum.fillStyle = style;

function render() {

    context.clearRect(0, 0, stage.width, stage.height);

    pendulum.update();
    pendulum.draw(context);

    window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);