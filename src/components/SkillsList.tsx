import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { CustomBox } from "../styles";
import { SKILL_LIST } from "../consts";
import { calculateModifier } from "../utils";
import { useCharacterContext } from "../store/CharacterContext";
import { Character } from "../types";
interface SkillsListProps {
    character: Character;
}
export const SkillsList = ({ character }: SkillsListProps) => {
    const { updateSkill } = useCharacterContext();

    const incrementSkill = (skill: string) => {
        if (character.availableSkillPoints <= 0) {
            alert("You have reached the maximum number of points");
            return;
        }
        updateSkill(character.id, skill, character.skills[skill].points + 1);
    }

    const decrementSkill = (skill: string) => {
        if (character.skills[skill].points - 1 < 0) {
            alert("You have reached the minimum number of points");
            return;
        }
        updateSkill(character.id, skill, character.skills[skill].points - 1);
    }

    return (
        <CustomBox flexGrow={1}>
            <Typography variant="h5" component={"h3"} sx={{ mb: 2 }}>
                Skills
            </Typography>
            <Box>Total Skills points available: {character.maximumSkillPoints}</Box>
            {SKILL_LIST.map(({ name, attributeModifier }) => (
                <div key={name}>{name}: {character.skills[name].points} (Modifier: {attributeModifier}):{calculateModifier(character.attributes[attributeModifier])}
                    <ButtonGroup variant="outlined" size="small" key={name}>
                        <Button onClick={() => incrementSkill(name)} >+</Button>
                        <Button onClick={() => decrementSkill(name)}>-</Button>
                    </ButtonGroup> total: {character.skills[name].points + calculateModifier(character.attributes[attributeModifier])}
                </div>
            ))}
        </CustomBox>
    );
};
