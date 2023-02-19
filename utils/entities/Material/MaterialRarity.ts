import {routes} from "@/lib/routes";

export class MaterialRarity implements MaterialRarityUI {
    public borderColor: string
    public starCount: number;

    constructor(backgroundImage: string, borderColor: string, starCount: number) {
        this._backgroundImage = backgroundImage;
        this.borderColor = borderColor;
        this.starCount = starCount;
    }

    private _backgroundImage: string

    get backgroundImage(): string {
        return routes.materialRarityBackgrounds + this._backgroundImage + ".png";
    }
}

export interface MaterialRarityUI {
    backgroundImage: string
    borderColor: string
}