"use client";

import React, { useContext, useEffect, useState } from "react";
import {
	DirectionsRenderer,
	DirectionsService,
	GoogleMap,
	MarkerF,
	useJsApiLoader,
} from "@react-google-maps/api";
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
	const [directionRoutePoints, setDirectionRoutePoints] = useState([]);

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

		if (source.length != [] && destination.length != []) {
			directionRoute();
		}
	}, [source]);

	useEffect(() => {
		if (destination.length != [] && map) {
			setCenter({
				lat: destination.lat,
				lng: destination.lng,
			});
		}

		if (source.length != [] && destination.length != []) {
			directionRoute();
		}
	}, [destination]);

	const directionRoute = () => {
		const directionService = new google.maps.DirectionsService();

		directionService.route(
			{
				origin: { lat: source.lat, lng: source.lng },
				destination: { lat: destination.lat, lng: destination.lng },
				travelMode: google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					setDirectionRoutePoints(result);
				} else {
					console.error("Error");
				}
			}
		);
	};

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

			<DirectionsRenderer
				directions={directionRoutePoints}
				options={{
					suppressMarkers: true,
					polylineOptions: {
						strokeColor: "#000",
						strokeWeight: 5,
					},
				}}
			/>
		</GoogleMap>
	);
};

export default GoogleMapSection;
