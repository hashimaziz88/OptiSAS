"use client";
import React from "react";
// import { useStyles } from "@/app/dashboard/(routes)/_styles/style";

interface FormLabelProps {
    text: string;
}

/**
 * Consistently styled form field label with the glass-grey design token colour.
 * Usage: <FormLabel text="Field Name" />
 */
const FormLabel: React.FC<FormLabelProps> = ({ text }) => {
    // const { styles } = useStyles();
    // return <span className={styles.formLabel}>{text}</span>;
    return <span>{text}</span>;
};

export default FormLabel;
