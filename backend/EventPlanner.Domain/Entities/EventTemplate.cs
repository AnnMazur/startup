namespace EventPlanner.Domain.Entities
{
    public class EventTemplate
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public Guid? CreatedByUserId { get; set; }

        public ICollection<EventTemplateItem> Items { get; set; }
    }
}
