using Heroes.API.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Heroes.API.DAL
{
    internal class HeroesContext : DbContext
    {
        public DbSet<Hero> Heroes { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<Trainer> Trainers { get; set; }
        public HeroesContext(DbContextOptions<HeroesContext> options) : base(options) { }
        public override int SaveChanges()
        {
            OnBeforeSaving();
            return base.SaveChanges();
        }
        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(cancellationToken);
        }

        private void OnBeforeSaving()
        {
            DateTime now = DateTime.Now;
            foreach (var entry in this.ChangeTracker.Entries<BaseEntity>())
            {
                var entity = entry.Entity;
                switch (entry.State)
                {
                    case EntityState.Added:
                        entity.Id = Guid.NewGuid();
                        entity.CreatedTime = now;
                        entity.ModifiedTime = now;
                        break;
                    case EntityState.Modified:
                        entity.ModifiedTime = now;
                        break;
                    default:
                        break;
                }
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new HeroEntityConfiguration());
            modelBuilder.ApplyConfiguration(new TrainerEntityConfiguration());
            modelBuilder.ApplyConfiguration(new TrainingEntityConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}
