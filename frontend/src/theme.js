import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import "./font.module.css";


const theme = responsiveFontSizes(createTheme({
    typography: {
        fontFamily: [
            "KoPubDotumMedium",
            "GangwonEduPowerExtraBoldA"
        ].join(','),
        h1: {
            fontWeight: 700
        },
        h2: {
            fontWeight: 700
        },
        h3: {
            fontWeight: 700
        },
        h4: {
            fontWeight: 700
        },
    },
    palette: {
        background: {
            default: "#fff"
        },
        primary: {
            light: "#fffbfb",
            main: "#FFE1E1",
            dark: "#ffc8c8"
        },
        secondary: {
            light: "#EEEEEE",
            main: "#829460",
            dark: "#90A17D"
        },
        // primary: {
        //     light: "#e6ee9c",
        //     main: "#d4e157",
        //     dark: "#cddc39"
        // },
        // secondary: {
        //     light: "#ffcdd4",
        //     main: "#FFE1E1",
        //     dark: "#f99aaa"
        // },
        accent: {
            main: "#000",
            contrastText: "#fff"
        },
        error: {
            light: "#f9d2da",
            main: "#e96088",
            dark: "#e30066"

        },
        success: {
            light: "#aed581",
            main: "#8bc34a",
            dark: "#689f38",
            contrastText: "#fff",
        },
        // text: {
        //     primary: '#000000',//black
        //     secondary: '#FFFFFF',//white
        // },
        // warning: {
        //     main: '#FC7B09',//orange
        // },
        // info: {
        //     main: '#6B7D6A',//gray
        // },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 1024,
            lg: 1200,
            xl: 1440,
            xxl: 1920,
        }
    }
}));

export default theme;
