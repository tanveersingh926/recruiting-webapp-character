export type Attributes = {
    Strength: number;
    Dexterity: number;
    Constitution: number;
    Intelligence: number;
    Wisdom: number;
    Charisma: number;
};

export type Class = "Barbarian" | "Wizard" | "Bard";

export type Skills = {
    [x: string]: {
        name: string;
        attributeModifier: string;
        points: number;
    };
}

export type Character = {
    id: string;
    attributes: Attributes;
    skills: Skills;
    maximumSkillPoints: number;
    availableSkillPoints: number;
};
