using System.ComponentModel;

namespace Heroes.Contracts
{
    public class Enums
    {
        public enum HeroAbility
        {
            [Description("Attacker")] attacker = 0,
            [Description("Defender")] defender
        }
    }
}
