/**
 * Created by mm28969 on 4/23/17.
 */

import {
    compileShaders,
    DimEye,
    getWebGLRenderingContext,
    DimLight,
    DimOrthographicProjection,
    DimPerspectiveProjection,
    Vector
} from "msb-web";

import {buildScene} from "./factory";

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
        // gl.enable(gl.BLEND);
        gl.enable(gl.DEPTH_TEST);

        program = compileShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);

        uSceneId = gl.getUniformLocation(program, "u_SceneId");

        uResolution = gl.getUniformLocation(program, "u_Resolution");
        gl.uniform2fv(uResolution, new Float32Array([stage.width, stage.height]));

        let eye = new DimEye();
        eye.position = new Vector(0.0, 0.0, 4.0);
        eye.init(gl, program);
        eye.render(gl);

        let aspect = stage.width/stage.height,
            projection = new DimPerspectiveProjection(aspect);
        // projection = new DimOrthographicProjection(aspect);

        projection.near = 0.2;
        projection.far = 30.0;
        projection.init(gl, program);
        projection.render(gl);

        let light = DimLight.starter();
        light.position = new Vector(0.0, 0.0, 5.0);
        light.init(gl, program);
        light.render(gl);

        scene1 = buildScene(gl);
        scene1.init(gl, program);
    }

    function render(): void {

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        scene1.render(gl);
        scene1.rotate();

        window.requestAnimationFrame(render);
    }

    init();
    render();

}());