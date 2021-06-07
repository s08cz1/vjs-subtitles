using System;
using System.IO;

namespace GenerateVttWithTimings
{
    class Program
    {
        static void Main(string[] args)
        {
            // defaults
            var timespanMs = 10; // 10 ms
            var durationMs = 10000; // 10sec

            // args provided?
            if (args.Length > 0)
                timespanMs = int.Parse(args[0]);
            if (args.Length > 1)
                durationMs = int.Parse(args[1]);

            Console.WriteLine($"Timespan: {timespanMs} ms, duration: {durationMs} ms");

            // where we are now
            var currentMs = 0;
            using (StreamWriter outputFile = new StreamWriter($"subtitles{DateTime.Now.Year}{DateTime.Now.Month}{DateTime.Now.Day}{DateTime.Now.Hour}{DateTime.Now.Minute}{DateTime.Now.Second}{DateTime.Now.Millisecond}.vtt"))
            {
                outputFile.WriteLine($"WEBVTT - Some title");
                outputFile.WriteLine("");
                for (var iMs = timespanMs; iMs <= durationMs; iMs += timespanMs)
                {
                    int currentSeconds = GetSecondsFromMilliseconds(currentMs);
                    int currentMinutes = GetMinutesFromSeconds(currentSeconds);
                    int iSeconds = GetSecondsFromMilliseconds(iMs);
                    int iMinutes = GetMinutesFromSeconds(iSeconds);

                    var fromTime = GetFormattedTime(currentMinutes, currentSeconds, currentMs);
                    var toTime = GetFormattedTime(iMinutes, iSeconds, iMs);

                    outputFile.WriteLine($"{fromTime} --> {toTime}");
                    outputFile.WriteLine($"{fromTime}");
                    outputFile.WriteLine("");
                    // set current time
                    currentMs = iMs;
                }
            }
            Console.WriteLine($"Done");
        }

        private static string GetFormattedTime(int minutes, int seconds, int milliseconds) =>
            $"{minutes.ToString("D2")}:{(seconds - (minutes * 60)).ToString("D2")}.{(milliseconds % 1000).ToString("D3")}";
        private static int GetSecondsFromMilliseconds(int ms) => ms / 1000;
        private static int GetMinutesFromSeconds(int s) => s / 60;
    }
}
