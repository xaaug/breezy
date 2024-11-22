const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location" + error);
          reject(error);
        }
      );
    } else {
      console.error("GeoLocation is not supported by your browser");
      reject(new Error("Geolocation not supported"));
    }
  });
};

export default getLocation;