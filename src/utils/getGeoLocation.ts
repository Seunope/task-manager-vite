type Coordinates = {
  latitude: number;
  longitude: number;
};

type GeolocationError = {
  message: string;
};

type GeolocationOptions = {
  onSuccess: (coordinates: Coordinates) => void;
  onError: (error: GeolocationError) => void;
};

export const getCurrentLocation = (options: GeolocationOptions): void => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        options.onSuccess({ latitude, longitude });
      },
      (error) => {
        options.onError({
          message: `Error getting geolocation: ${error.message}`,
        });
      },
    );
  } else {
    options.onError({
      message: 'Geolocation is not supported by your browser',
    });
  }
};

// Example usage:
// getCurrentLocation({
//   onSuccess: (coordinates) => {
//     console.log(`Latitude: ${coordinates.latitude}, Longitude: ${coordinates.longitude}`);
//     // You can do something with the latitude and longitude here
//   },
//   onError: (error) => {
//     console.error(error.message);
//   },
// });
