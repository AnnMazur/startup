using EventPlanner.Domain.Enums;

namespace EventPlanner.Domain.Entities
{
    public class VenueApplication
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string ContactPhone { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }

        public ApplicationStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
