import { Container, Sprite, Texture } from "pixi.js";

export default class VaultDoor extends Container{

    private doorName = "door";   //name of the texture
    private doorOpenName = "doorOpen";   //name of the texture
    private goldShineName = "blink";   //name of the texture

    doorSprite : Sprite;

    constructor(){
        super();

        //a close door method seems unnecessary, as the game ends once the door is open
        const doorTexture = Texture.from(this.doorName)
        this.doorSprite = Sprite.from(doorTexture);

        this.setClosedDoor();
    }

    setClosedDoor(){
        //approximate values, needs fixing; TO DO
        this.doorSprite.width /= 4.5;
        this.doorSprite.height /= 4.5;
        
        //approximate values, needs fixing; TO DO
        this.doorSprite.position.x = 450;        
        this.doorSprite.position.y = 120;

        this.addChild(this.doorSprite);
    }

    openDoor(){
        const doorTexture = Texture.from(this.doorOpenName)
        this.doorSprite.texture = doorTexture;

        //approximate values, needs fixing; TO DO
        this.doorSprite.width = doorTexture.width/4.5;
        this.doorSprite.height = doorTexture.height/4.5;
        
        //approximate values, needs fixing; TO DO
        this.doorSprite.position.x = 580;        
        this.doorSprite.position.y = 120;     
        
        this.goldShine();
    }

    goldShine(){
        const goldShineTexture = Texture.from(this.goldShineName);
        const goldShineSprite = Sprite.from(goldShineTexture);

        goldShineSprite.position.x = 250; 
        goldShineSprite.position.y = 150;        

        this.addChild(goldShineSprite);
    }

    resize(width: number, height: number){
        //TO DO
    }

}