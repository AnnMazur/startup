namespace EventPlanner.Domain.Entities
{
    public class Venue
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public string Address { get; set; }
        public string City { get; set; }

        public int CapacityMin { get; set; }
        public int CapacityMax { get; set; }

        public decimal? BasePrice { get; set; }

        public string WebsiteUrl { get; set; }

        public ICollection<VenueImage> Images { get; set; }
        public ICollection<VenueFeatureMapping> Features { get; set; }
    }
}
