using EventBus.Messages.Events;
using MassTransit;
using System.Text.Json;

namespace YtMovieApis.EventBusCosumer
{
    public class ProductCreatedConsumer : IConsumer<ProductCreateEvent>
    {
        public async Task Consume(ConsumeContext<ProductCreateEvent> context)
        {
            var jsonMesagger = JsonSerializer.Serialize(context.Message);
            await Console.Out.WriteLineAsync($"Message from Producer : {jsonMesagger}");
           
        }
    }
}
