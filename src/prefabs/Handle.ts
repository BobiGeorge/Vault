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

    //true for left, false for right
    public turnAnimation(direction: boolean){        
        const rotation = direction ? Math.abs(this.spinRotation) : -Math.abs(this.spinRotation);
        gsap.to(this.handleSprite, {duration: this.spinDuration, rotation: rotation})   
    }

    //true for left, false for right
    public turnHandle(direction: boolean){

        this.turnAnimation(direction);
    }

    setHandleTurners(){
        this.handleLeft.setInterractive(true);
        this.handleRight.setInterractive(true);

        this.handleLeft.on("mousedown", async () => {
           // this.spin(true);
            this.onTurnCallback(true);
            this.setInterractive(false);
            console.log("Left click");
            await this.setDelay(this.spinDuration*1000);  
            this.setInterractive(true);
            console.log("Can interract");
        });

        this.handleRight.on("mousedown", async () => {
           // this.spin(false);
            this.onTurnCallback(false);
            this.setInterractive(false);
            console.log("Right click");
            await this.setDelay(this.spinDuration*1000);
            this.setInterractive(true);
            console.log("Can interract");
        });

        this.addChild(this.handleLeft, this.handleRight);
    }

    //sets interractivity for both handles; both are always either enabled or disabled at once
    setInterractive(interactive: boolean){
        this.handleLeft.setInterractive(interactive);
        this.handleRight.setInterractive(interactive);
    }

    //this method should be moved elswhere
    setDelay(delay: number) {
        return new Promise(function(resolve) {
            setTimeout(resolve, delay);
        });
    }

    public disable(){
        this.interactive = false;
        this.visible = false;
    }
}