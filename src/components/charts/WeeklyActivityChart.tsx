export function WeeklyActivityChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const hours = [7.5, 8.2, 6.8, 9.1, 7.3, 4.5, 2.1];
  const maxHours = Math.max(...hours);

  return (
    <div className="bg-card rounded-2xl p-6 card-shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">Weekly Activity</h2>
        <p className="text-sm text-muted-foreground">Total: 45.5 hours this week</p>
      </div>

      <div className="flex items-end justify-between gap-3 h-48">
        {days.map((day, index) => {
          const height = (hours[index] / maxHours) * 100;
          const gradients = [
            "gradient-peach",
            "gradient-lavender",
            "gradient-lime",
            "gradient-amber",
            "gradient-peach",
            "gradient-lavender",
            "gradient-lime",
          ];

          return (
            <div key={day} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative group">
                <div
                  className={`w-full rounded-t-lg transition-all duration-300 hover:opacity-80 ${gradients[index]}`}
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    {hours[index]}h
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
