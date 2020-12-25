import { FC, useState, useEffect } from "react";
import * as React from "react";
import SunBackground from "components/SunBackground";
import { Box, Container, Flex, Button, Stack, Heading1, Img } from "@xcorejs/ui";
import { Formik, Form } from "formik";
import DatePickerField from "components/forms/DatePicker";
import SelectField from "components/forms/Select";
import axios from 'axios';
import * as Yup from 'yup';

type SunTimes = {
  sunrise: Date;
  sunset: Date;
};

// Validation of Formik form
const FormSchema = Yup.object().shape({
    day: Yup.date()
        .required("Required"),
    country: Yup.object().shape({
        label: Yup.string().required("Required"),
        value: Yup.string().required("Required")
    }).nullable().required("Required")
});

const Main: FC = () => {
    const [countries, setCountries] = useState([]);
    const [sunTimes, setSunTimes] = useState(null as SunTimes);

    // Get options for country select
    useEffect(() => {
        const fetchCountries = async () => {
            const result = await axios(
                'https://raw.githubusercontent.com/umpirsky/country-list/master/data/en_US/country.json',
            );

            const countryOptions = [];
            for (const [key, value] of Object.entries(result.data)) {
                countryOptions.push({ value: key, label: value});
            }

            setCountries(countryOptions);
        };

        fetchCountries();
    }, []);

    // Get sunrise and sunset times
    const fetchTimes = async (values) => {
        await axios.post(
            '/api/suncalc', {
                day: values.day,
                country: values.country
            }
        ).then(result => {
            const times = {
                sunrise: new Date(result.data.sunrise),
                sunset: new Date(result.data.sunset)
            }

            setSunTimes(times);
        }).catch(error => {
            console.log(error);
            alert("Data not available.")
        });
    };

    return (
        <>
            <SunBackground zIndex={0} light={sunTimes !== null} />

            <Flex position="absolute" top={0} left={0} right={0} bottom={0} zIndex={1} minHeight="48rem">
                <Container height="100%">
                    <Flex width="100%" flexDirection="column">
                        <Flex width="100%" flex={"1 0 50%"} justifyContent="center" alignItems="center">
                            <Formik
                                initialValues={{ day: new Date(), country: "" }}
                                onSubmit={(values) => {
                                    fetchTimes(values);
                                }}
                                validationSchema={FormSchema}
                            >
                                {formik => (
                                    <Form noValidate onSubmit={formik.handleSubmit}>
                                        <Box>
                                            <Heading1
                                                fontSize={{ _: "2.3rem", sm: "4.8rem" }}
                                                color="#FFA500"
                                                lineHeight={{ _: "2.7rem", sm: "4.8rem" }}
                                                textAlign="center"
                                                mb="3rem"
                                                maxWidth={{ _: "100%", sm: "45rem" }}
                                            >
                                                Sunrise / Sunset Calculator
                                            </Heading1>
                                            <Stack gap={{ _: "2rem", xs: "5rem" }} direction={{ _: "column", xs: "row" }} alignItems={{ _: "center", xs: "flex-start" }}>
                                                <Box width={{ _: "20rem" }}>
                                                    <Flex alignItems="center">
                                                        <Box flex={"0 0 85%"} width="85%">
                                                            <DatePickerField name="day" />
                                                        </Box>
                                                        <Box width="15%" ml="1rem">
                                                            <label htmlFor="day">
                                                                <Img src={"/calendar-alt-solid.svg"} alt="Calendar Icon" width="100%" />
                                                            </label>
                                                        </Box>
                                                    </Flex>
                                                    {formik.errors.day && formik.touched.day ? (
                                                        <Box mt=".5rem" color="red">Please enter a valid date</Box>
                                                    ) : null}
                                                </Box>
                                                <Box width={{ _: "20rem" }}>
                                                    <SelectField
                                                        name="country"
                                                        options={countries}
                                                    />
                                                    {formik.errors.country && formik.touched.country ? (
                                                        <Box mt=".5rem" color="red">Please choose country</Box>
                                                    ) : null}
                                                </Box>
                                            </Stack>
                                            <Flex justifyContent="center" mt="3rem">
                                                <Button type="submit">
                                                    <Img src={"/sun-solid.svg"} alt="Sun Icon" width="2rem" />
                                                    <Box ml="1rem">Show</Box>
                                                </Button>
                                            </Flex>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Flex>

                        <Flex width="100%" flex={"1 0 50%"} justifyContent="center" alignItems="center">
                            {sunTimes && (
                                <Stack direction="column" gap="3rem" justifyContent="center">
                                    <Flex alignItems="center">
                                        <Img src={"/sun-solid-org.svg"} alt="Sun Icon" width="5rem" height="5rem" mr="2rem" />
                                        <Box fontSize={{ _: "2rem", xs: "3.2rem" }} color="white">Sunrise is at {sunTimes.sunrise.getHours() + ":" + (sunTimes.sunrise.getMinutes()<10?'0':'') + sunTimes.sunrise.getMinutes()}</Box>
                                    </Flex>
                                    <Flex alignItems="center">
                                        <Img src={"/moon-solid.svg"} alt="Moon Icon" width="5rem" height="5rem" mr="2rem" />
                                        <Box fontSize={{ _: "2rem", xs: "3.2rem" }} color="white">Sunset is at {sunTimes.sunset.getHours() + ":" + (sunTimes.sunset.getMinutes()<10?'0':'') + sunTimes.sunset.getMinutes()}</Box>
                                    </Flex>
                                </Stack>
                            )}
                        </Flex>
                    </Flex>
                </Container>
            </Flex>
        </>
    );
};

export default Main;