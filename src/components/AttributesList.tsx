import React, { useContext } from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Attributes, Character } from "../types";
import { CharacterContext } from "../store/CharacterContext";
import { CustomBox } from "../styles";
import { MAX_ATTRIBUTES_POINTS } from "../consts";

interface AttributeProps {
    name: keyof Attributes;
    characterId: string;
    attributeValue: number;
    totalAttributePoints: number;
}
const Attribute = ({ name, characterId, attributeValue, totalAttributePoints }: AttributeProps) => {
    const { updateAttribute } = useContext(CharacterContext);

    const onAttributeIncrement = () => {
        if (totalAttributePoints >= MAX_ATTRIBUTES_POINTS) { alert(`A character can have up to ${MAX_ATTRIBUTES_POINTS} Delegated Attribute Points`); return };
        updateAttribute(characterId, name, attributeValue + 1);
    };

    const onAttributeDecrement = () => {
        console.log({ totalAttributePoints, attributeValue });
        if (attributeValue <= 0) { alert("You have reached the minimum number of points"); return };
        updateAttribute(characterId, name, attributeValue - 1);
    };

    const calculateModifier = (value: number) => {
        return Math.floor((value - 10) / 2);
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                pb: 1,
            }}
        >
            <Box>
                {name}: {attributeValue} (Modifier: {calculateModifier(attributeValue)})
            </Box>
            <ButtonGroup variant="outlined" size="small">
                <Button onClick={onAttributeIncrement}>+</Button>
                <Button onClick={onAttributeDecrement}>-</Button>
            </ButtonGroup>
        </Box>
    );
};

interface AttributesListProps {
    character: Character;
}

export const AttributesList = ({ character }: AttributesListProps) => {
    const totalAttributePoints = Object.entries(character.attributes).reduce((acc, [, value]) => {
        return acc + value;
    }, 0);

    return (
        <CustomBox sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component={"h3"} mb={2}>
                Attribute List
            </Typography>
            {Object.entries(character.attributes).map(
                ([attributeKey, value], index) => (
                    <Attribute
                        key={index}
                        name={attributeKey as keyof Attributes}
                        characterId={character.id}
                        attributeValue={value}
                        totalAttributePoints={totalAttributePoints}
                    />
                )
            )}
        </CustomBox>
    );
};
