namespace EventPlanner.Domain.Entities
{
    public class Note
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        public string Content { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
