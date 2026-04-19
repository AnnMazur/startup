namespace EventPlanner.Domain.Entities
{
    public class VenueLike
    {
        public Guid UserId { get; set; }
        public Guid VenueId { get; set; }

        public User User { get; set; }
        public Venue Venue { get; set; }
    }
}
