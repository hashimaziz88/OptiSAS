"use client";
import React from "react";

interface FormLabelProps {
    text: string;
}

/**
 * Consistently styled form field label with the glass-grey design token colour.
 * Usage: <FormLabel text="Field Name" />
 */
const FormLabel: React.FC<FormLabelProps> = ({ text }) => {
    return <span>{text}</span>;
};

export default FormLabel;
