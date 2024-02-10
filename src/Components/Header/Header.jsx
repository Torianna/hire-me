import {Typography} from "@mui/material";
import * as React from "react";

export const Header = () => {
    const text = "Children of Famly";
    const colors = ['#e53935', '#8e24aa', '#1e88e5', '#43a047', '#fb8c00', '#d81b60', '#5e35b1', '#3949ab', '#f4511e', '#546e7a', '#00acc1', '#00796b', '#c0ca33', '#fdd835', '#6d4c41'];

        return (
            <Typography align={'center'} variant="h4" gutterBottom>
                {text.split('').map((letter, index) => (
                    <span key={index} style={{ color: colors[index % colors.length] }}>
          {letter}
        </span>
                ))}
            </Typography>
        );
}