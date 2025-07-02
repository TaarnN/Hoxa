import { useState, useEffect, useRef } from "react";

type GeolocationState = {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error: GeolocationPositionError | null;
  timestamp: number | null;
};

export function useGeolocation(options?: PositionOptions): GeolocationState {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    timestamp: null,
  });
  
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      if (isMountedRef.current) {
        setState((prev) => ({
          ...prev,
          error: new GeolocationPositionError(),
        }));
      }
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        if (!isMountedRef.current) return;
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          error: null,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        if (!isMountedRef.current) return;
        setState((prev) => ({ ...prev, error }));
      },
      options
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [options]);

  return state;
}
