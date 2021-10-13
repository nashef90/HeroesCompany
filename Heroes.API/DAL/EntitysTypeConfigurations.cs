using Heroes.API.DAL.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Heroes.API.DAL
{
    internal abstract class BaseTypeConfiguration<TEntity> :
        IEntityTypeConfiguration<TEntity> where TEntity : BaseEntity
    {
        public virtual void Configure(EntityTypeBuilder<TEntity> entity)
        {
            entity
                  .HasKey(x => x.Id);
            entity
                .Property(x => x.Id)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("(newid())");
            entity
                .Property(p => p.CreatedTime)
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("(getdate())");
            entity
                .Property(p => p.ModifiedTime)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("(getdate())");
            entity
              .Property(x => x.IsDeleted)
              .ValueGeneratedOnAdd()
              .HasDefaultValue(false);
        }
    }

    internal class HeroEntityConfiguration : BaseTypeConfiguration<Hero>
    {
        public override void Configure(EntityTypeBuilder<Hero> entity)
        {
            base.Configure(entity);
            entity.ToTable("Heroes");

            entity.Property(e => e.SuitColor)
               .HasConversion(
                color => color.ToArgb(),
                argb => System.Drawing.Color.FromArgb(argb)
                )
               .IsRequired(true);
            entity.Property(e => e.Name).IsRequired(true);
            entity.Property(e => e.Ability).IsRequired(true);
            entity.Property(e => e.FirstTraining).IsRequired(false);
            entity.Property(e => e.StartingPower).IsRequired(true);
            entity.Property(e => e.CurrentPower).IsRequired(true);
            entity.Property(e => e.TrainerId).IsRequired(true);
        }
    }
    internal class TrainerEntityConfiguration : BaseTypeConfiguration<Trainer>
    {
        public override void Configure(EntityTypeBuilder<Trainer> entity)
        {
            base.Configure(entity);
            entity.ToTable("Trainers");
            entity.HasIndex(x => x.UserName).IsUnique(true);
            entity.Property(e => e.Password).IsRequired(true);
            entity.Property(e => e.FName).IsRequired(true);
            entity.Property(e => e.LName).IsRequired(true);
        }
    }
    internal class TrainingEntityConfiguration : BaseTypeConfiguration<Training>
    {
        public override void Configure(EntityTypeBuilder<Training> entity)
        {
            base.Configure(entity);
            entity.ToTable("Trainings");
            entity.Property(e => e.PowerGrowth).IsRequired(true);
            entity.Property(e => e.NewHeroPower).IsRequired(true);
            entity.Property(e => e.HeroId).IsRequired(true);
            entity.Property(e => e.TrainerId).IsRequired(true);
        }
    }
}
