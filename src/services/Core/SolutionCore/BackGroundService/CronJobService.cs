using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SolutionCore.BackGroundService
{
    public   class CronJobService : IHostedService, IDisposable
    {


        private readonly ILogger<CronJobService> _logger;
        private Timer _timer;

        public CronJobService(ILogger<CronJobService> logger)
        {
            _logger = logger;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {


            //_timer = new Timer(
            //      OnTimer,
            //      null,
            //      TimeSpan.Zero,
            //      TimeSpan.FromSeconds(5)
            //  );

           // _timer = new Timer(OnTimer, null, getJobRunDelay(), new TimeSpan(24, 0, 0));
            _timer = new Timer(OnTimer, null, TimeSpan.FromSeconds(8), TimeSpan.FromSeconds(10));
            //TimeSpan interval = TimeSpan.FromHours(24);

            //var nextRunTime = DateTime.Today.AddDays(1).AddHours(1);
            //var curTime = DateTime.Now;
            //var firstInterval = nextRunTime.Subtract(curTime);

            //Action action = () =>
            //{
            //    var t1 = Task.Delay(firstInterval);
            //    t1.Wait();
            //    //remove inactive accounts at expected time
            //    //RemoveScheduledAccounts(null);
            //    //now schedule it to be called every 24 hours for future
            //    // timer repeates call to RemoveScheduledAccounts every 24 hours.
            //    _timer = new Timer(
            //        OnTimer,
            //        null,
            //        TimeSpan.Zero,
            //        interval
            //    );
            //};

            return Task.CompletedTask;
        }

        private void OnTimer(object state)
        {

          


            _logger.LogInformation("OnTimer event called " + DateTime.Now.ToString("dd/MM/YYYY HH:mm:ss") );
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("StopAsync Called");
            _timer.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _logger.LogInformation("Dispose Called");
            _timer?.Dispose();
        }

        private static TimeSpan getJobRunDelay()
        {
            TimeSpan scheduledParsedTime = getScheduledParsedTime();
            TimeSpan curentTimeOftheDay = TimeSpan.Parse(DateTime.Now.TimeOfDay.ToString("hh\\:mm"));
            //TimeSpan delayTime = scheduledParsedTime >= curentTimeOftheDay
            //    ? scheduledParsedTime - curentTimeOftheDay
            //    : new TimeSpan(24, 0, 0) - curentTimeOftheDay + scheduledParsedTime;

            TimeSpan delayTime = scheduledParsedTime >= curentTimeOftheDay
                ? scheduledParsedTime - curentTimeOftheDay
                : new TimeSpan(24, 0, 0) - curentTimeOftheDay + scheduledParsedTime;

            //TimeSpan delayTime;
            //if (scheduledParsedTime >= curentTimeOftheDay) {
            //    delayTime = scheduledParsedTime - curentTimeOftheDay;
            //}
            //else
            //{

            //    var sum = curentTimeOftheDay + scheduledParsedTime;
            //    delayTime =  new TimeSpan(24, 0, 0) - sum;
            //}


            return delayTime;
        }

        private static TimeSpan getScheduledParsedTime()
        {
            string[] formats = { @"hh\:mm\:ss", "hh\\:mm" };
            string jobStartTime = "08:43";
            TimeSpan.TryParseExact(jobStartTime, formats, CultureInfo.InvariantCulture, out TimeSpan ScheduledTimespan);
            return ScheduledTimespan;
        }
    }

}

