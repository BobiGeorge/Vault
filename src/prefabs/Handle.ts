import { Container, Sprite, Texture } from "pixi.js";
import gsap from "gsap";
import HandleTurner from "./HandleTurner";
import { Debug } from "../utils/debug";


export default class Handle extends Container{

    private handleName = "handle";   //name of the texture
    private spinDuration = 0.5;   
    private spinRotation = 2.15;  //the degree of rotation; can use negative values to change direction

    private handleSprite : Sprite;
    private handleLeft : HandleTurner;
    private handleRight : HandleTurner;

    constructor(){
        super();

        const handleTexture = Texture.from(this.handleName)
        this.handleSprite = Sprite.from(handleTexture);

        this.handleLeft = new HandleTurner("arrow_left", 480, 100, this.spinDuration);
        this.handleRight = new HandleTurner("arrow_right", 670, 100, this.spinDuration);

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
    public spinAnimation(direction: boolean){        
        const rotation = direction ? Math.abs(this.spinRotation) : -Math.abs(this.spinRotation);
        gsap.to(this.handleSprite, {duration: this.spinDuration, rotation: rotation})   
    }

    //true for left, false for right
    public spin(direction: boolean){

        this.spinAnimation(direction);
    }

    setHandleTurners(){
        this.handleLeft.setInterractive(true);
        this.handleRight.setInterractive(true);

        this.handleLeft.addEventListener("click", async (e) => {
           // this.spin(true);
            this.setInterractive(false);
            await this.setDelay(2000);
            this.setInterractive(true);
        });

        this.handleRight.on("mousedown", async () => {
           // this.spin(false);
            this.setInterractive(false);
            await this.setDelay(2000);
            this.setInterractive(true);
        });

        this.addChild(this.handleLeft, this.handleRight);
    }

    //sets interractivity for both handles; both are always either enabled or disabled at once
    async setInterractive(interactive: boolean){
        this.handleLeft.setInterractive(interactive);
        this.handleRight.setInterractive(interactive);
    }

    //this method should be moved elswhere
    setDelay(delay: number) {
        return new Promise(function(resolve) {
            setTimeout(resolve, delay);
        });
    }
}