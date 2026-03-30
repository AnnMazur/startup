using EventPlanner.Domain.Enums;

namespace EventPlanner.Domain.Entities
{
    public class EventItem
    {
        public Guid Id { get; set; }
        public Guid EventId { get; set; }

        public EventItemType Type { get; set; }

        public Guid ReferenceId { get; set; } // Venue / Service

        public decimal Price { get; set; }

        public Event Event { get; set; }
    }
}
