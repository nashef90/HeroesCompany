namespace Heroes.API.Configuration
{
    public class AppConfig
    {
        public string TokenKey { get; set; }
        public string HashSalt { get; set; }
        public int MaxPowerGrowth { get; set; }
        public int MaxQuantityOfTrainingPerHeroOnDay { get; set; }
    }
}
