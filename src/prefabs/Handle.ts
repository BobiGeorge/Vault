import { Container, Sprite, Texture } from "pixi.js";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { Direction } from "../utils/Direction";

// register the plugin
gsap.registerPlugin(PixiPlugin);

// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI);

export default class Handle extends Container{

    private handleName = "handle_test";   //name of the texture

    private spinRotation = 1;  //the distance of a rotation
    private rotationPerTurn = 0.01 //how much the handle is turne by frame

    private handleSprite : Sprite;

    //starting mouse position when dragging the handle; only x is important
    private dragStartPositionX = 0;
    //prevents the player from dragging backwards once he's begun dragging in a certain direction
    private currentDragPositionX = 0;
    private movingLeft = false;
    private movingRight = false;

    private rotationDistance = 0;     //tracks the length of a current rotation

    constructor(private onTurnCallback : (direction: Direction) => void){ 
        super();

        const handleTexture = Texture.from(this.handleName)
        this.handleSprite = Sprite.from(handleTexture);

        this.setSprite();
        this.setHandleTurning();
    }

    setSprite() {   
        //approximate values, needs fixing; TO DO
        this.handleSprite.width /= 4;
        this.handleSprite.height /= 4;
        
        //approximate values, needs fixing; TO DO
        this.handleSprite.position.x = 655;        
        this.handleSprite.position.y = 320;

        this.handleSprite.anchor.set(0.5);

        this.addChild(this.handleSprite);
    }
  
    setHandleTurning(){
        this.setInterractive(true);
        this.on("mousedown", this.startTurning);
        this.on("mouseupoutside", this.stopTurning);
        this.on("mouseup", this.stopTurning);
    }

    public startTurning(event: PIXI.FederatedPointerEvent){
        this.dragStartPositionX = event.pageX;

        this.on("globalmousemove", this.turning);
    }

    public turning(event: PIXI.FederatedPointerEvent){
        if(this.dragStartPositionX > event.pageX){
            if(this.movingLeft && this.currentDragPositionX < event.pageX){
                this.stopTurning();
                return;
            }
            this.handleSprite.rotation -= this.rotationPerTurn;
            if(!this.movingRight)    //only one should be true at a time: movingLeft or movingRight
                this.movingLeft = true;
        }
        else{
            if(this.movingRight && this.currentDragPositionX > event.pageX){
                this.stopTurning();
                return;
            }
            this.handleSprite.rotation += this.rotationPerTurn;
            if(!this.movingLeft)    //only one should be true at a time: movingLeft or movingRight
                this.movingRight = true;
        }
        this.rotationDistance += this.rotationPerTurn;
        this.currentDragPositionX = event.pageX;

        if(this.rotationDistance >= this.spinRotation){ //checking if a full rotation has been made
            if(this.movingLeft)
                this.onTurnCallback(Direction.COUNTERCLOCKWISE);
            if(this.movingRight)
                this.onTurnCallback(Direction.CLOCKWISE);
            this.stopTurning();
        }
    }

    public stopTurning(){
        this.movingLeft = false;
        this.movingRight = false;
        this.rotationDistance = 0;
        this.off("globalmousemove", this.turning);
    }

    //when the combination resets, a crazy animation plays
    public crazySpinAnimatio(){
        //TO DO
    }

    setInterractive(interactive: boolean){
        this.interactive = interactive;
    }

    public disable(){
        this.interactive = false;
        this.visible = false;
    }
}