import { Container, Sprite, Texture } from "pixi.js";
import * as PIXI from "pixi.js";
import gsap from "gsap";
import HandleTurner from "./HandleTurner";
import { PixiPlugin } from "gsap/PixiPlugin";
import { wait } from "../utils/misc";
import { Direction } from "../utils/Direction";

// register the plugin
gsap.registerPlugin(PixiPlugin);

// give the plugin a reference to the PIXI object
PixiPlugin.registerPIXI(PIXI);

export default class Handle extends Container{

    private handleName = "handle_test";   //name of the texture
    private spinDuration = 0.5;   
    private spinRotation = 2;  //the degree of rotation; can use negative values to change direction

    private handleSprite : Sprite;
    private handleLeft : HandleTurner;
    private handleRight : HandleTurner;

    constructor(private onTurnCallback : (direction: Direction) => void){ 
        super();

        const handleTexture = Texture.from(this.handleName)
        this.handleSprite = Sprite.from(handleTexture);

        this.handleLeft = new HandleTurner("arrow_left", 480, 100);
        this.handleRight = new HandleTurner("arrow_right", 670, 100);

        this.setSprite();
        this.setHandleTurners();
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
  
    setHandleTurners(){
        this.handleLeft.setInterractive(true);
        this.handleRight.setInterractive(true);

        this.handleLeft.on("mousedown", () => {this.turnHandle(Direction.CLOCKWISE);});
        this.handleRight.on("mousedown", () => {this.turnHandle(Direction.COUNTERCLOCKWISE);});

        this.addChild(this.handleLeft, this.handleRight);
    }

    //true for left, false for right
    public async turnHandle(direction: Direction){
        this.turnAnimation(direction); //animation needs to play first regardless of result

        this.onTurnCallback(direction);
        this.setInterractive(false);
        await wait(this.spinDuration);  
        this.setInterractive(true);
    }

    //true for left, false for right
    //this method is responsible solely for animation
    public turnAnimation(direction: Direction){        
        const rotation = direction ? -Math.abs(this.spinRotation) : Math.abs(this.spinRotation);
        gsap.to(this.handleSprite, {duration: this.spinDuration, rotation: rotation, repeatRefresh: true})     
        //gsap.to(this.handleSprite, {pixi: {rotation: rotation}, duration: 1});
    }

    //when the combination resets, a crazy animation plays
    public crazySpinAnimatio(){
        //TO DO
    }

    //sets interractivity for both handles; both are always either enabled or disabled at once
    setInterractive(interactive: boolean){
        this.handleLeft.setInterractive(interactive);
        this.handleRight.setInterractive(interactive);
    }

    public disable(){
        this.interactive = false;
        this.visible = false;
    }

    public resize(){

    }
}