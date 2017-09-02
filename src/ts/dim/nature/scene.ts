import {
    ColorRGB,
    Container,
    DimModel,
    DimCircleModelBuilder,
    NatureContainer,
    NatureDimActor,
    NatureDimScene,
    NatureMover,
    normalGaussianGenerator,
    Vector
} from "msb-web";

export function buildScene(gl: WebGLRenderingContext, program: WebGLProgram){

    let natureScene = new NatureDimScene(),
        model: DimModel, mover: NatureMover, actor: NatureDimActor, mass,
        circleModelBuilder = new DimCircleModelBuilder(0.5, 5),
        stageContainer: Container = new Container(-1.0, 1.0, -1.0, 1.0),
        forceContainer: Container = new Container(-0.001, 0.001, -0.001, 0.001),
        massGenerator: Function = normalGaussianGenerator(0.01, 0.05);

    natureScene.colorSize = 4;
    natureScene.hasTransformation = true;
    natureScene.container = new NatureContainer(stageContainer);
    natureScene.container.constrainBounce = true;

    for(let a = 0; a < 50; a++) {

        mass = massGenerator();
        circleModelBuilder.radius = mass;
        circleModelBuilder.color = ColorRGB.getRandom();

        model = circleModelBuilder.buildModel(gl);

        mover = new NatureMover();
        mover.location = Vector.getRandom(stageContainer);
        mover.speedLimit = 0.05;
        mover.mass = mass;
        mover.applyForce(Vector.getRandom(forceContainer));

        actor = new NatureDimActor(model, mover);

        natureScene.actorArray.push(actor);
    }

    natureScene.init(gl, program);

    return natureScene;
}