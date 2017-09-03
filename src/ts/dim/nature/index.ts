import {
    createProgram,
    createProgramByShaderElements,
    getWebGLRenderingContext
} from "msb-web";

import {NatureExperience} from "./experience";

(function(){

    let vertexShaderSrc = `
        
            uniform int u_SceneId;
            
            uniform mat4 u_TranslationMatrix_1;
            
            attribute vec4 a_Position_1;
            attribute vec4 a_Color_1;
    
            varying vec4 v_Color;
    
            void
            main()
            {
                mat4 modelMatrix = u_TranslationMatrix_1;
            
                gl_Position = modelMatrix * a_Position_1;
                v_Color = a_Color_1;
            }
        `,
        fragmentShaderSrc = `
            
            precision mediump float;
    
            varying vec4 v_Color;
    
            void
            main()
            {
                gl_FragColor = v_Color;
            }
        `;

    let gl: WebGLRenderingContext,
        program: WebGLProgram,
        uSceneId, uResolution,
        natureExperience;

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

        program = createProgram(gl, vertexShaderSrc, fragmentShaderSrc);
        gl.useProgram(program);

        uSceneId = gl.getUniformLocation(program, "u_SceneId");

        uResolution = gl.getUniformLocation(program, "u_Resolution");
        gl.uniform2fv(uResolution, new Float32Array([stage.width, stage.height]));

        natureExperience = new NatureExperience(gl, program);
    }

    function render(): void {

        gl.clear(gl.COLOR_BUFFER_BIT);

        natureExperience.scene.updateRender(gl);

        window.requestAnimationFrame(render);
    }

    init();
    render();

}());