import { styled, Box } from "@mui/material";

export const CustomBox = styled(Box)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.common.white,
    backgroundColor: "#282c3",
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    borderRadius: "10px",
    boxShadow: "1px 1px 5px rgba(255, 255, 255, 0.5)",
}));