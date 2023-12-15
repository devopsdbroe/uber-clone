"use client";

import React, { useContext, useEffect, useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

const GoogleMapSection = () => {
	const containerStyle = {
		width: "100%",
		height: typeof window !== "undefined" && window.innerWidth * 0.45,
	};

	const { source, setSource } = useContext(SourceContext);
	const { destination, setDestination } = useContext(DestinationContext);

	const [center, setCenter] = useState({
		lat: -3.745,
		lng: -38.523,
	});

	const [map, setMap] = React.useState(null);

	useEffect(() => {
		if (source.length != [] && map) {
			map.panTo({
				lat: source.lat,
				lng: source.lng,
			});

			setCenter({
				lat: source.lat,
				lng: source.lng,
			});
		}
	}, [source]);

	useEffect(() => {
		if (destination.length != [] && map) {
			setCenter({
				lat: destination.lat,
				lng: destination.lng,
			});
		}
	}, [destination]);

	const onLoad = React.useCallback(function callback(map) {
		// This is just an example of getting and using the map instance!!! don't just blindly copy!
		const bounds = new window.google.maps.LatLngBounds(center);
		map.fitBounds(bounds);

		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={{ mapId: "bd3b3921c013bf5" }}
		>
			{source.length != [] ? (
				<MarkerF
					position={{ lat: source.lat, lng: source.lng }}
					icon={{ url: "/source.png", scaledSize: { width: 20, height: 20 } }}
				/>
			) : null}
			{destination.length != [] ? (
				<MarkerF
					position={{ lat: destination.lat, lng: destination.lng }}
					icon={{
						url: "/dest.png",
						scaledSize: { width: 20, height: 20 },
					}}
				/>
			) : null}
			{/* Child components, such as markers, info windows, etc. */}
			<></>
		</GoogleMap>
	);
};

export default GoogleMapSection;
