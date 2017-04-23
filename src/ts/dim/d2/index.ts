
import {getWebGLRenderingContext, compileShaders} from "msb-web";

import {buildRectangleScene} from "./factory";

(function(){

    let gl: WebGLRenderingContext,
        program: WebGLProgram,
        uSceneId, uResolution,
        scene1, scene2;

    function init(): void {

        let stage: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("stage");

        if(stage === undefined) {
            throw "unable to find stage";
        }

        gl = getWebGLRenderingContext(stage);
        if(!gl){
            throw "Graphics context isn't available.";
        }

        gl.viewport(0, 0, stage.width, stage.height);
        gl.clearColor(0.8, 0.8, 0.8, 1.0);

        program = compileShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        uSceneId = gl.getUniformLocation(program, "u_SceneId");

        uResolution = gl.getUniformLocation(program, "u_Resolution");
        gl.uniform2fv(uResolution, new Float32Array([stage.width, stage.height]));

        scene1 = buildRectangleScene(gl);
        scene1.init(gl, program);
    }

    function render(): void {

        gl.clear(gl.COLOR_BUFFER_BIT);
        scene1.render(gl);

        // window.requestAnimationFrame(render);
    }

    init();
    render();

}());
