using EventPlanner.Domain.Enums;


namespace EventPlanner.Domain.Entities
{
    public class User
    {
            public Guid Id { get; set; }
            public string Email { get; set; }
            public string PasswordHash { get; set; }
            public string Name { get; set; }

            public UserRole Role { get; set; }

            public DateTime CreatedAt { get; set; }

            public ICollection<Event> Events { get; set; }
            public ICollection<VenueLike> LikedVenues { get; set; }
    }
}
