using Heroes.Contracts.Models.Hero;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Heroes.API.Extentions
{
    internal static class SuitColorDTOExtentions
    {
        internal static Color GetColor(this SuitColorDTO item)
        {
            if (item == null) return Color.FromArgb(0, 0, 0);
            return Color.FromArgb(item.Red, item.Green, item.Blue);
        }

        internal static SuitColorDTO GetSuitColorDTO(this Color item)
        {
            return new SuitColorDTO()
            {
                Red = item.R,
                Green = item.G,
                Blue = item.B
            };
        }
    }
}
