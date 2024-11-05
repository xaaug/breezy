import { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import getData, { getTime, getHsl } from "./data/getData";

import Place from "./components/Place";
import Loader from "./components/Loader";
import Weather from "./components/Weather";
import Quote from "./components/Quote";

const App = () => {
  // const [] = useState(null)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData();
        // TODO: Add error handling for invalid or no response
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        const dataString = JSON.stringify(response);
        const dataObj = JSON.parse(dataString);
        console.log(dataObj);
        setData(dataObj);
      } catch (error) {
        setError((prev) => [...prev, `Error: ${error}`]);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [loading]);

  const [time, setTime] = useState(null);
  const [cycle, setCycle] = useState(null);
  useEffect(() => {
    let intervalId = null;
    
    const displayTime = () => {
      const timeObj = getTime();
      setCycle(timeObj.time.hours);
      
      setTime(
        `${
          timeObj.time.hours < 10
            ? "0" + data.time.time.hours
            : data.time.time.hours
          }:${
          timeObj.time.minutes < 10
            ? "0" + timeObj.time.minutes
            : timeObj.time.minutes
        }`
      );
    };

    if (data) {
      displayTime();
      intervalId = setInterval(() => displayTime(), 1000);
    }
    
    return () => {
      window.removeEventListener("load", getTime);
      clearInterval(intervalId);
    };
  }, [data, time]);
  
  const [bgColor, setBgColor] = useState([]);
  const [hslColor, setHslColor] = useState(null)
  useEffect(() => {
    if (time) {
      if (cycle <= 6 && cycle >= 18) {
        setBgColor(data.values.nightColors);
        setHslColor(getHsl(data.values.nightColors[0]))
      } else if (cycle >= 6 && cycle <= 18) {
        setBgColor(data.values.dayColors);
        setHslColor(getHsl(data.values.dayColors[0]))

      }
    }
  }, [data, cycle, time]);

  const [date, setDate] = useState([]);
  useEffect(() => {
    if (data) {
      let day = "";
      switch (data.time.day) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tueasday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
        case 7:
          day = "Sunday";
          break;
        default:
          day = "Date not Found";
      }
      setDate([
        day,
        `${
          data.time.date.day < 10
            ? "0" + data.time.date.day
            : data.time.date.day
        }·${
          data.time.date.month < 10
            ? "0" + data.time.date.month
            : data.time.date.month
        }·${data.time.date.year}`,
      ]);
    }
  }, [data]);

  const backgroundStyle = {
    background: cycle
      ? `linear-gradient(180deg, ${bgColor.join(",")})`
      : "black",
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container} style={backgroundStyle}>
          <Place
            time={time}
            location={data.location.name}
            day={date[0]}
            date={date[1]}
          />
          <Weather
            temp={data.weather.temp_c}
            condition={data.weather.condition.text}
            wind={data.weather.wind_kph}
            humidity={data.weather.humidity}
            bgColor={hslColor}
          />
          <div style={{ margin: "2rem 0 2rem", borderBottom: '1.5px solid ', paddingBottom: '2.5rem'}}>
            <Quote quote={data.values.text} uvColor={bgColor[0]} uv={data.weather.uv}/>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
