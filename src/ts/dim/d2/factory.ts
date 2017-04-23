import {
    ColorRGB,
    DimCircleModelBuilder,
    DimRectangleModelBuilder,
    DimScene,
    DimTriangleModelBuilder
} from "msb-web";

export function buildRectangleScene(gl: WebGLRenderingContext){

    let scene = new DimScene(),
        model,
        circleModelBuilder = new DimCircleModelBuilder(),
        rectangleModelBuilder = new DimRectangleModelBuilder(),
        triangleModelBuilder = new DimTriangleModelBuilder();

    scene.colorSize = 4;

    circleModelBuilder.color = ColorRGB.getRandom();
    model = circleModelBuilder.buildModel(gl);
    scene.modelArray.push(model);

    rectangleModelBuilder.color = ColorRGB.getRandom();
    model = rectangleModelBuilder.buildModel(gl);
    scene.modelArray.push(model);

    triangleModelBuilder.color = ColorRGB.getRandom();
    model = triangleModelBuilder.buildModel(gl);
    scene.modelArray.push(model);

    return scene;
}
