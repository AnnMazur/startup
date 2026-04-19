namespace EventPlanner.Domain.Entities
{
    public class VenueAlbum
    {
        public Guid Id { get; set; }

        public Guid VenueId { get; set; }

        public string Name { get; set; } // "Интерьер", "Еда", "События"

        public int Order { get; set; } // порядок отображения

        public Venue Venue { get; set; }
        public ICollection<VenueImage> Images { get; set; }
    }
}
