import { Container, Sprite, Texture } from "pixi.js";
import { Direction } from "../utils/Direction";

export default class HandleTurner extends Container{
    
    arrowSprite : Sprite = Sprite.from(Texture.EMPTY); //likely temporary solution

    constructor(texture: string, x: number, y: number){
        super();

        const handleTexture = Texture.from(texture)
        this.arrowSprite = Sprite.from(handleTexture);

        //approximate values, needs fixing; TO DO
        this.arrowSprite.width = handleTexture.width/4;
        this.arrowSprite.height = handleTexture.height/4;

        //approximate values, needs fixing; TO DO
        this.arrowSprite.position.x = x;        
        this.arrowSprite.position.y = y;

        this.addChild(this.arrowSprite);
    }

    public setInterractive(interactive: boolean){
        this.interactive = interactive;

        //TO DO 
        //Display visual indicator that handle is interactable
    }
}
