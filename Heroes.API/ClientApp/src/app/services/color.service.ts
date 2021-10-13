import { Injectable } from '@angular/core';
import { SuitColorDTO } from '../models/suit-color-dto';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  SuitColorDTOToHex(item: SuitColorDTO): string {
    return "#" + this.componentToHex(item.red) + this.componentToHex(item.green) + this.componentToHex(item.blue);
  }

  hexToSuitColorDTO(hex: string): SuitColorDTO {
    const h = hex.replace("#", "");
    return {
      red: parseInt(h.substring(0, 2), 16),
      green: parseInt(h.substring(2, 4), 16),
      blue: parseInt(h.substring(4, 6), 16)
    };
  }
}
