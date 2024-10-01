import { Container, Sprite, Texture } from "pixi.js";

export default class VaultDoor extends Container{

    private doorName = "door";   //name of the texture
    private doorOpenName = "doorOpen";   //name of the texture

    doorTexture? : Texture; //likely temporary solution
    doorSprite : Sprite = Sprite.from(Texture.EMPTY); //likely temporary solution

    constructor(){
        super();
        this.init();
    }

    init(){
        //a close door method seems unnecessary, as the game ends once the door is open
        this.doorTexture = Texture.from(this.doorName)
        this.doorSprite = Sprite.from(this.doorTexture);

        //approximate values, needs fixing; TO DO
        this.doorSprite.width = this.doorTexture.width/4.5;
        this.doorSprite.height = this.doorTexture.height/4.5;
        
        //approximate values, needs fixing; TO DO
        this.doorSprite.position.x = 450;        
        this.doorSprite.position.y = 120;

        this.addChild(this.doorSprite);
    }

    // resize(width: number, height: number){
    //     //TO DO
    // }

    openDoor(){
        this.doorTexture = Texture.from(this.doorOpenName)
        this.doorSprite.texture = this.doorTexture;

        //approximate values, needs fixing; TO DO
        this.doorSprite.width = this.doorTexture.width/4.5;
        this.doorSprite.height = this.doorTexture.height/4.5;
        
        //approximate values, needs fixing; TO DO
        this.doorSprite.position.x = 580;        
        this.doorSprite.position.y = 120;        
    }
}