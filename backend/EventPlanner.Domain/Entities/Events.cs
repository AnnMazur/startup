using EventPlanner.Domain.Enums;

namespace EventPlanner.Domain.Entities
{
    public class Event
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        public string Title { get; set; }
        public Guid EventTypeId { get; set; }

        public int GuestCount { get; set; }
        public decimal Budget { get; set; }

        public DateTime EventDate { get; set; }

        public EventStatus Status { get; set; }

        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
        public ICollection<EventItem> Items { get; set; }
    }
}
