import {
    ColorRGB,
    DimCircleModelBuilder,
    DimCylinderModelBuilder,
    DimCubeModelBuilder,
    DimScene,
    DimSphereModelBuilder,
    DimTriangleModelBuilder,
    Material
} from "msb-web";

export function buildScene(gl: WebGLRenderingContext){

    let scene = new DimScene(), model,
        cubeModelBuilder = new DimCubeModelBuilder();

    scene.hasTransformation = true;
    scene.hasMaterial = true;
    scene.normalSize = 3;

    cubeModelBuilder.hasNormals = true;
    cubeModelBuilder.material = Material.emerald();
    model = cubeModelBuilder.buildModel(gl);
    model.matrix.translationX = -1;
    scene.modelArray.push(model);

    cubeModelBuilder.hasNormals = true;
    cubeModelBuilder.material = Material.ruby();
    model = cubeModelBuilder.buildModel(gl);
    model.matrix.translationX = 1;
    scene.modelArray.push(model);

    return scene;
}