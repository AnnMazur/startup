namespace EventPlanner.Domain.Entities
{
    public class VenueFeatureMapping
    {
        public Guid VenueId { get; set; }
        public Guid FeatureId { get; set; }

        public Venue Venue { get; set; }
        public VenueFeature Feature { get; set; }
    }
}
