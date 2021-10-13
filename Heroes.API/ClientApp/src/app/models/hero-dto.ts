import { SuitColorDTO } from "./suit-color-dto";

export interface HeroDTO {
    id?: string;
    name: string;
    ability: string;
    firstTraining?: any;
    suitColor: SuitColorDTO;
    startingPower?: number;
    currentPower?: number;
    canStartTraining?: boolean;
}
