// app/api/get-route/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");

  if (!source || !destination) {
    return NextResponse.json({ error: "Missing source or destination" }, { status: 400 });
  }

  const [srcLng, srcLat] = source.split(",");
  const [dstLng, dstLat] = destination.split(",");

  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const apiUrl = `https://api.geoapify.com/v1/routing?waypoints=${srcLat},${srcLng}|${dstLat},${dstLng}&mode=drive&apiKey=${apiKey}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    console.log("🚦 Geoapify Raw Response:", JSON.stringify(data, null, 2));

    if (!data.features || data.features.length === 0) {
      return NextResponse.json({ error: "No route found" }, { status: 404 });
    }

    const route = data.features[0];
   let coordinates = route.geometry.coordinates;

// Geoapify may nest LineString inside MultiLineString (1 level deeper)
if (route.geometry.type === "MultiLineString") {
  coordinates = coordinates[0]; // flatten to LineString
}

    // ✅ Fallback if route doesn't contain valid coordinates
    if (!Array.isArray(coordinates) || coordinates.length < 2) {
      console.warn("⚠️ Route has insufficient coordinates. Falling back to straight line.");

      coordinates = [
        [parseFloat(srcLng), parseFloat(srcLat)],
        [parseFloat(dstLng), parseFloat(dstLat)]
      ];
    }

    const distanceInKm = (route.properties.distance / 1000).toFixed(2);
    const durationInMin = Math.ceil(route.properties.time / 60);
    const fare = (parseFloat(distanceInKm) * 15).toFixed(0);

  return NextResponse.json({
  route: {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates,
    },
    properties: {},
  },
  distanceInKm,
  durationInMin,
  fare,
});
  } catch (err) {
    console.error("❌ Geoapify error:", err);
    return NextResponse.json({ error: "Failed to fetch route" }, { status: 500 });
  }
}
