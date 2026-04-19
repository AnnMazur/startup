using Microsoft.EntityFrameworkCore;
using EventPlanner.Domain.Entities;


namespace EventPlanner.Infrastructure.Db
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<EventItem> EventItems { get; set; }

        public DbSet<Venue> Venues { get; set; }
        public DbSet<VenueImage> VenueImages { get; set; }
        public DbSet<VenueFeature> VenueFeatures { get; set; }
        public DbSet<VenueFeatureMapping> VenueFeatureMappings { get; set; }
        public DbSet<Service> Services { get; set; }

        public DbSet<EventTemplate> EventTemplates { get; set; }
        public DbSet<EventTemplateItem> EventTemplateItems { get; set; }
        public DbSet<Note> Notes { get; set; }

        public DbSet<VenueApplication> VenueApplications { get; set; }
        public DbSet<VenueLike> VenueLikes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<VenueFeatureMapping>()
                .HasKey(vf => new { vf.VenueId, vf.FeatureId });

            modelBuilder.Entity<VenueLike>()
                .HasKey(vl => new { vl.UserId, vl.VenueId });
        }
    }
}
