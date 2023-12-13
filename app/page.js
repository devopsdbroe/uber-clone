"use client";

import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [source, setSource] = useState([]);
	const [destination, setDestination] = useState([]);

	return (
		<SourceContext.Provider value={{ source, setSource }}>
			<DestinationContext.Provider value={{ destination, setDestination }}>
				<div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
					<div>
						<SearchSection />
					</div>
					<div className="col-span-2">
						<GoogleMapSection />
					</div>
				</div>
			</DestinationContext.Provider>
		</SourceContext.Provider>
	);
}
