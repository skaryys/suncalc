import type { NextApiRequest, NextApiResponse } from "next";
import NodeGeocoder, { Options } from "node-geocoder";
import * as SunCalc from "suncalc";
import * as GeoTz from "geo-tz";

const options: Options = {
    provider: "opencage",
    apiKey: "ba197d05cea541eeac5e71b16ac00437"
};

const convertTZ = (date, tzString): Date => {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
}

const geocoder = NodeGeocoder(options);

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const countryData = await geocoder.geocode({ address: req.body.country.label, countryCode: req.body.country.value, limit: 1 });

        if (countryData) {
            const times = SunCalc.getTimes(new Date(req.body.day), countryData[0].latitude, countryData[0].longitude);
            const countryTimeZone = GeoTz(countryData[0].latitude, countryData[0].longitude)[0];

            const result = {
                sunrise: convertTZ(times.sunrise, countryTimeZone),
                sunset: convertTZ(times.sunset, countryTimeZone)
            }
            res.status(200).json(result);
        } else {
            res.status(500);
        }
    }
}