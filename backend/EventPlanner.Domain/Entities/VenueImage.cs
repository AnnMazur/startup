namespace EventPlanner.Domain.Entities
{
    public class VenueImage
    {
        public Guid Id { get; set; }
        public Guid VenueId { get; set; }

        public string Url { get; set; }

        public Venue Venue { get; set; }
    }
}
