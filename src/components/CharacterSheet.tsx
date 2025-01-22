import { Stack } from "@mui/material";
import { AttributesList } from "./AttributesList";
import { ClassList } from "./ClassList";
import { ClassDetails } from "./ClassDetails";
import { Character, Class } from "../types";
import { SkillsList } from "./SkillsList";
import { useState } from "react";

interface CharacterSheetProps {
    character: Character;
}

export const CharacterSheet = ({ character }: CharacterSheetProps) => {
    const [selectedCharacterClass, setSelectedCharacterClass] = useState<Class>();

    const characterClassBtnHandler = (selectedClass: Class) => {
        return (e) => {
            e.preventDefault();
            setSelectedCharacterClass(selectedClass);
        };
    };
    return (

        <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "flex-start",
                flexGrow: 1,
            }}
        >
            <AttributesList character={character} />
            <ClassList character={character} characterClassBtnHandler={characterClassBtnHandler} />
            {selectedCharacterClass &&
                <ClassDetails selectedCharacterClass={selectedCharacterClass} setSelectedCharacterClass={setSelectedCharacterClass} />
            }
            <SkillsList character={character} />
        </Stack>

    );
};
