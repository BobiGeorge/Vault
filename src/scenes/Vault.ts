import config from "../config";
import Scene from "../core/Scene";
import Handle from "../prefabs/Handle";
import ParallaxBackground from "../prefabs/ParallaxBackground";
import VaultDoor from "../prefabs/VaultDoor";

export default class Vault extends Scene{
    name = "Vault";

    private background!: ParallaxBackground;
    private vaultDoor!: VaultDoor;
    private handle!: Handle;

    load() {
        this.background = new ParallaxBackground(config.backgrounds.vault);
        this.vaultDoor = new VaultDoor();
        this.handle = new Handle();
        
        this.addChild(this.background, this.vaultDoor, this.handle);
    }

    onResize(width: number, height: number): void {
        this.background.resize(width, height);
    }


}