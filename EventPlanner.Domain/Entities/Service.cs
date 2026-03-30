namespace EventPlanner.Domain.Entities
{
    public class Service
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }

        public decimal BasePrice { get; set; }

        public string Category; // DJ, Photographer и тд
    }
}
