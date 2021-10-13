import { SuitColorDTO } from "./suit-color-dto";

export interface UpdateHeroRequestDTO {
    id?: string;
    name: string;
    ability: string;
    suitColor: SuitColorDTO;
}
