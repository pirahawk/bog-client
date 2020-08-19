using System;

namespace Bog.Client.Domain.Configuration
{
    public class ContentConfiguration
    {
        public Guid BogId { get; set; }
        public int Take { get; set; }
        public string Filter { get; set; }
        public string Include { get; set; }
    }
}