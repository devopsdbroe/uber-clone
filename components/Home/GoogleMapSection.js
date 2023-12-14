import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const GoogleMapSection = () => {
	const containerStyle = {
		width: "100%",
		height: window.innerWidth * 0.45,
	};

	const center = {
		lat: -3.745,
		lng: -38.523,
	};

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={{ mapId: "bd3b3921c013bf5" }}
		>
			{/* Child components, such as markers, info windows, etc. */}
			<></>
		</GoogleMap>
	) : (
		<></>
	);
};

export default GoogleMapSection;
