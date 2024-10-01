import { Container, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import HandleTurner from "./HandleTurner";

export default class Handle extends Container{

    private handleName = "handle";   //name of the texture
    private spinDuration = 0.5;   
    private spinRotation = 2.15;  //the degree of rotation; can use negative values to change direction

    private handleSprite : Sprite;
    private handleLeft : HandleTurner;
    private handleRight : HandleTurner;

    constructor(private onTurnCallback : (direction: boolean) => void){ 
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

        this.handleSprite.anchor.x = 0.5;
        this.handleSprite.anchor.y = 0.5;

        this.addChild(this.handleSprite);
    }
  
    setHandleTurners(){
        this.handleLeft.setInterractive(true);
        this.handleRight.setInterractive(true);

        this.handleLeft.on("mousedown", () => {this.turnHandle(true);});
        this.handleRight.on("mousedown", () => {this.turnHandle(false);});

        this.addChild(this.handleLeft, this.handleRight);
    }

    //true for left, false for right
    public async turnHandle(direction: boolean){
        this.onTurnCallback(direction);
        this.setInterractive(false);
        await this.setDelay(this.spinDuration*1000);  
        this.setInterractive(true);

        this.turnAnimation(direction);
    }

    //true for left, false for right
    //this method is responsible solely for animation
    public turnAnimation(direction: boolean){        
        const rotation = direction ? Math.abs(this.spinRotation) : -Math.abs(this.spinRotation);
        gsap.to(this.handleSprite, {duration: this.spinDuration, rotation: rotation})   
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

    //this method should be moved elswhere
    setDelay(delay: number) {
        return new Promise(function(resolve) {
            setTimeout(resolve, delay);
        });
    }
}