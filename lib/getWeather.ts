export const getWeatherData = async (variant) => {
  try {
    const response = await fetch(`/api/weather`);
    const data = await response.json();
    if (data.error) {
      console.log("Weather API error: ", data.error);
      return [];
    }

    if (variant === "forecast") {
      return data.forecast.forecastday.map((item) => {
        return {
          id: item.date_epoch,
          mintemp: item.day.mintemp_c,
          maxtemp: item.day.maxtemp_c,
          condition: item.day.condition.text,
          icon: "https://" + item.day.condition.icon,
        };
      });
    } else if (variant === "current") {
      return data.current;
    }
  } catch (err) {
    console.log(err);
  }
};
