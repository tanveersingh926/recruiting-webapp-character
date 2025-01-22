import { Button, Typography, Box } from "@mui/material";
import { CustomBox } from "../styles";
import { CLASS_LIST } from "../consts";
import { Class } from "../types";

interface ClassDetailsProps {
    selectedCharacterClass: string;
    setSelectedCharacterClass: React.Dispatch<React.SetStateAction<Class>>
}
export const ClassDetails = ({ selectedCharacterClass, setSelectedCharacterClass }: ClassDetailsProps) => {
    return (
        <CustomBox sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component={"h3"} sx={{ mb: 2 }}>
                {selectedCharacterClass}
            </Typography>

            <Box>
                {Object.entries(CLASS_LIST[selectedCharacterClass]).map(
                    ([key, value]: [string, number]) => (
                        <Typography key={key} variant="body2">
                            {key}: {value}
                        </Typography>
                    )
                )}
            </Box>
            <Button
                variant="contained"
                onClick={() => {
                    setSelectedCharacterClass(null);
                }}
            >
                Close Requirement View
            </Button>
        </CustomBox>
    );
};
