import config from "../config";
import Scene from "../core/Scene";
import Handle from "../prefabs/Handle";
import ParallaxBackground from "../prefabs/ParallaxBackground";
import VaultDoor from "../prefabs/VaultDoor";
import { Direction } from "../utils/Direction";

export default class Vault extends Scene{
    name = "Vault";

    public combination: Direction[] = [];    
    private combinationRange: number = 5; //combination number will be between 1 and combinationRange

    private background!: ParallaxBackground;
    private vaultDoor!: VaultDoor;
    private handle!: Handle;

    load() {
        this.background = new ParallaxBackground(config.backgrounds.vault);
        this.vaultDoor = new VaultDoor();
        this.handle = new Handle(this.turnHandle);
        
        this.addChild(this.background, this.vaultDoor, this.handle);

        this.generateCombination();
    }

    //I assume you do not need to return to a starting position before entering the next step
    //I assume the safe doesn't necessarily alternate between clockwise and counterclockwise
    //->meaning clockwise/clockwise/clockwise is a possible combination
    generateCombination() {
        console.log("Combination has been reset");
        this.combination.length = 0;
        for (let i = 0; i < 3; i++) {
            const combinationNbr = Math.floor(Math.random() * this.combinationRange) + 1;
            const direction = Math.random() < 0.5;
            for (let y = 0; y < combinationNbr; y++) {
                this.combination.push(direction ? Direction.CLOCKWISE : Direction.COUNTERCLOCKWISE);
            }
        }        
        for (let i = 0; i < this.combination.length; i++) {
            console.log(this.combination[i]);
        }
        console.log(this.combination);
    }

    private turnHandle = (direction: Direction) =>{
        if (direction != this.combination[0]){         //This is where we reset if input is wrong
            this.generateCombination();
            this.handle.reset();
        }
        else {
            this.combination.shift();
            this.handle.successClickAnimation(direction);
        }
        console.log(this.combination);
        if(this.combination.length == 0) this.win();    //this is where we evaluate winning the condition
    }

    win(){
        console.log("You won");
        this.vaultDoor.openDoor();
        this.handle.disable();
    }
 
    onResize(width: number, height: number): void {
        this.background.resize(width, height);
        this.vaultDoor.resize(width, height);
        this.handle.onResize();
    } 
}