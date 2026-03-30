using EventPlanner.Domain.Enums;

namespace EventPlanner.Domain.Entities
{
    public class EventTemplateItem
    {
        public Guid Id { get; set; }
        public Guid TemplateId { get; set; }

        public EventItemType Type { get; set; }
        public Guid ReferenceId { get; set; }
    }
}
