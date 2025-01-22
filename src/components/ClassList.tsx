import { Stack, Typography, Box, Button } from "@mui/material";
import { CustomBox } from "../styles";
import { CLASS_LIST } from "../consts";
import { Character, Class } from "../types";

interface ClassListProps {
    character: Character;
    characterClassBtnHandler: (selectedClass: Class) => (e: any) => void
}
export const ClassList = ({ character, characterClassBtnHandler }: ClassListProps) => {
    const meetsClassRequirements = (className: Class): boolean => {
        const classDetails = CLASS_LIST[className]
        if (!classDetails) return false;

        return Object.entries(classDetails).every(
            ([attr, min]) => character.attributes[attr] >= min
        );
    };

    return (
        <CustomBox flexGrow={1}>
            <Typography variant="h5" component={"h3"} sx={{ mb: 2 }}>
                Class List
            </Typography>
            <Stack>
                {Object.keys(CLASS_LIST).map((characterClass: Class) => (
                    <Box key={characterClass}>
                        <Button
                            variant={
                                meetsClassRequirements(characterClass)
                                    ? "contained"
                                    : "outlined"
                            }
                            onClick={characterClassBtnHandler(characterClass)}
                        >
                            {characterClass}
                        </Button>
                    </Box>
                ))}
            </Stack>
        </CustomBox>
    );
};
