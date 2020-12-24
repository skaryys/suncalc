import * as React from "react";
import { forwardRef } from "react";
import { useField, useFormikContext } from "formik";
import Select, { OptionsType } from 'react-select';
import styled from "styled-components";
import { Box } from "@xcorejs/ui";

type SelectProps = {
    name: string;
    options: OptionsType<any>[];
}

const SelectStyle = styled(Box)`
    .country-select__control {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        border-radius: 0;
        height: 4rem;
        transition: border 300ms, color 300ms, background 300ms;
    }
`;

const SelectField = forwardRef<HTMLSelectElement, SelectProps>(({
  name,
  options
}, ref) => {
    const [field] = useField(name);
    const formik = useFormikContext();

    return (
        <SelectStyle>
            <Select
                id={name}
                options={options}
                onChange={(v: any) => formik.setFieldValue(field.name, v)}
                classNamePrefix={"country-select"}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary: "#FFA500",
                    },
                })}
            />
        </SelectStyle>
    );
});

export default SelectField;