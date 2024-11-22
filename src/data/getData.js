import getLocation from "./getLocation";
import conditions from "./conditions";

const weatherEndpoint = `https://api.weatherapi.com/v1/current.json?key=983e0b48a9674515b8703843240311&q=`;
// const timeEndpoint = `http://api.timezonedb.com/v2.1/get-time-zone?key=Z84632FBZ7EY`;

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Failed to fetch data" + response.status);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return "Error: " + error;
  }
};

const getData = async () => {
  try {
    const location = await getLocation();
    if (!location) {
      throw new Error("Failed to get location");
    }

    const weather = await fetchData(
      `${weatherEndpoint}${location.latitude},${location.longitude}`
    );
    if (!weather) {
      throw new Error("Failed to fetch weather");
    }

    // const time = await fetchData(
    //   `${timeEndpoint}&format=json&by=position&lat=${location.latitude}&lng=${location.longitude}`
    // );

    // if (!time) {
    //   throw new Error("Failed to get time");
    // }

    // console.log(generateChallenges(conditions[0].sunny.challenges, 10));
    // console.log(conditions[0].sunny)

    // console.log(getValues(conditions, weather.current.condition.text))
    console.log();
    const conditionValues = getValues(conditions, weather.current.condition.text.toLowerCase());
    // console.log(conditionValues);

    return {
      location: weather.location,
      weather: weather.current,
      //   time: time,
      time: getTime(),
      values: {
        challenges: generateChallenges(conditionValues.challenges, 5),
        dayColors: conditionValues.dayColors,
        nightColors: conditionValues.nightColors,
        text: conditionValues.text,
      },
    };
  } catch (error) {
    console.error("Error fetching data: " + error);
    return JSON.stringify(error);
  }
};

const generateChallenges = (challenges, number) => {
  let selectedChallenges = [];
  for (let i = 0; i < number; i++) {
    const randomNo = Math.floor(Math.random() * challenges.length);
    if (selectedChallenges.includes(challenges[randomNo])) {
      i++;
    } else {
      selectedChallenges.push(challenges[randomNo]);
    }
  }

  return selectedChallenges;
};

const getValues = (arr, condition) => {
  let conditionObj = null;
  for (let i = 0; i < arr.length; i++) {
    if (Object.keys(arr[i]).includes(condition)) {
      conditionObj = arr[i];
    }
  }

  return conditionObj[condition];
};

const getTime = () => {
  const today = new Date();
  return {
    date: {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
    },
    time: {
      hours: today.getHours(),
      minutes: today.getMinutes(),
    },
    day: today.getDay(),
  };
};

function getHsl(hex) {
  // Remove the leading '#' if it's there
  hex = hex.replace(/^#/, "");

  // Parse hex values to RGB
  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  // Find the maximum and minimum values to get luminance
  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  // If max and min are equal, it's a shade of gray
  if (max === min) {
    h = s = 0; // Achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = hex;
    }
    h /= 6;
  }

  // Convert to [0, 360] for hue, [0, 100] for saturation and lightness
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100) + 25;

  return `hsl(${h}, ${s}%, ${l}%)`;
}

// Example usage:

export default getData;
export { getTime, getHsl };
