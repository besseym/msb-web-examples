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

function actorGeneratorCreator(stageContainer: Container): Function {

    let circleModelBuilder = new DimCircleModelBuilder(0.5, 30),
        forceContainer: Container = new Container(-0.001, 0.001, -0.001, 0.001),
        massGenerator: Function = normalGaussianGenerator(0.01, 0.05);

    return function(gl: WebGLRenderingContext){

        let mass = massGenerator(),
            model: DimModel, mover: NatureMover,
            actor: NatureDimActor;

        circleModelBuilder.radius = mass;
        circleModelBuilder.color = ColorRGB.getRandom();

        model = circleModelBuilder.buildModel(gl);

        mover = new NatureMover();
        mover.location = Vector.getRandom(stageContainer);
        mover.speedLimit = 0.05;
        mover.mass = mass;
        mover.applyForce(Vector.getRandom(forceContainer));

        actor = new NatureDimActor(model, mover);

        return actor;
    }
}

export class NatureExperience {

    stageContainer: Container;
    actorGenerator: Function;

    scene: NatureDimScene;

    constructor(gl: WebGLRenderingContext, program: WebGLProgram){

        this.stageContainer = new Container(-1.0, 1.0, -1.0, 1.0);

        this.actorGenerator = actorGeneratorCreator(this.stageContainer);

        this.scene = new NatureDimScene();
        this.scene.colorSize = 4;
        this.scene.hasTransformation = true;
        this.scene.container = new NatureContainer(this.stageContainer);
        this.scene.container.constrainBounce = true;

        let intialActorCount = 50,
            actor: NatureDimActor;

        for(let a = 0; a < intialActorCount; a++) {

            actor = this.actorGenerator(gl);
            this.scene.actorArray.push(actor);
        }

        this.scene.init(gl, program);

        //input behavior
        let inputActorCount = <HTMLInputElement> document.getElementById("input-actor-count"),
            outputActorCount = document.getElementById("actor-count");

        inputActorCount.value = intialActorCount.toString();
        outputActorCount.innerText = inputActorCount.value;

        inputActorCount.addEventListener("input", function(e){
            outputActorCount.innerText = this.value;
        });
        inputActorCount.addEventListener("change", (e) => {

            let newCount = parseInt(inputActorCount.value);
            // outputActorCount.innerText = inputActorCount.value;

            if(newCount < this.scene.actorArray.length){

                let removeCount = this.scene.actorArray.length - newCount;
                this.scene.actorArray.splice(newCount, removeCount);
                this.scene.loadSceneData(gl);
            }
            else if(newCount > this.scene.actorArray.length){

                let addCount = newCount - this.scene.actorArray.length;

                for(let a = 0; a < addCount; a++) {

                    actor = this.actorGenerator(gl);
                    this.scene.actorArray.push(actor);
                    this.scene.loadSceneData(gl);
                }
            }
        });
    }
}