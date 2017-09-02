import {
    ColorRGB,
    Container,
    DimCircleModelBuilder,
    NatureContainer,
    NatureDimActor,
    NatureDimScene,
    normalGaussianGenerator,
    Vector
} from "msb-web";

export function buildScene(gl: WebGLRenderingContext){

    let natureScene = new NatureDimScene(),
        model, actor, mass,
        circleModelBuilder = new DimCircleModelBuilder(0.5, 5),
        stageContainer: Container = new Container(-1.0, 1.0, -1.0, 1.0),
        forceContainer: Container = new Container(-0.001, 0.001, -0.001, 0.001),
        massGenerator: Function = normalGaussianGenerator(0.01, 0.05);

    natureScene.scene.colorSize = 4;
    natureScene.scene.hasTransformation = true;
    natureScene.container = new NatureContainer(stageContainer);
    natureScene.container.constrainBounce = true;

    for(let a = 0; a < 50; a++) {

        mass = massGenerator();
        circleModelBuilder.radius = mass;
        circleModelBuilder.color = ColorRGB.getRandom();

        model = circleModelBuilder.buildModel(gl);

        actor = new NatureDimActor(model);
        actor.location = Vector.getRandom(stageContainer);
        actor.speedLimit = 0.05;
        actor.mass = mass;
        actor.applyForce(Vector.getRandom(forceContainer));

        natureScene.addActor(actor);
    }

    return natureScene;
}