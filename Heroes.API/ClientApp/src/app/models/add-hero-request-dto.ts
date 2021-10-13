import { SuitColorDTO } from "./suit-color-dto";

export interface AddHeroRequestDTO {
    name: string;
    ability: string;
    suitColor: SuitColorDTO;
    startingPower?: number;
}
