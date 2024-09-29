import config from "../config";
import Scene from "../core/Scene";
import ParallaxBackground from "../prefabs/ParallaxBackground";
import VaultDoor from "../prefabs/VaultDoor";

export default class Vault extends Scene{
    name = "Vault";

    private background!: ParallaxBackground;
    private vaultDoor!: VaultDoor;

    load() {
        this.background = new ParallaxBackground(config.backgrounds.vault);
        this.vaultDoor = new VaultDoor(config.backgrounds.vault);
    
        this.addChild(this.background, this.vaultDoor);
    }

    onResize(width: number, height: number): void {
        this.background.resize(width, height);
    }
}