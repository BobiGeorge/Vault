import config from "../config";
import Scene from "../core/Scene";
import Handle from "../prefabs/Handle";
import ParallaxBackground from "../prefabs/ParallaxBackground";
import VaultDoor from "../prefabs/VaultDoor";

export default class Vault extends Scene{
    name = "Vault";

    public combination: boolean[] = [];    //true for left, false for right

    private combinationRange: number = 9; //combination number will be between 1 and combinationRange

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

    onResize(width: number, height: number): void {
        this.background.resize(width, height);
    }

    //I assume you do not need to return to a starting position before entering the next step
    //I assume the safe doesn't necessarily alternate between clockwise and counterclockwise
    //->meaning clockwise/clockwise/clockwise is a possible combination
    generateCombination() {
        this.combination.length = 0;
        console.log("---------");
        for (let i = 0; i < 3; i++) {
            const combinationNbr = Math.floor(Math.random() * this.combinationRange) + 1;
            const direction = Math.random() < 0.5;
            console.log(combinationNbr);        
            console.log(direction);
            for (let y = 0; y < combinationNbr; y++) {
                this.combination.push(direction);
            }
        }
        console.log("---------");
        
        for (let i = 0; i < this.combination.length; i++) {
            console.log(this.combination[i]);
        }
        console.log(this.combination);
    }

    private turnHandle = (direction: boolean) =>{
        if (direction != this.combination[0]) this.generateCombination();
        this.combination.shift();
        console.log(this.combination);
        if(this.combination.length == 0) this.win();
    }

    win(){
        console.log("You won");
        this.vaultDoor.openDoor();
        this.handle.disable();
    }
  
}