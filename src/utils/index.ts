export const calculateModifier = (value: number) => {
    return Math.floor((value - 10) / 2);
}

export const calculateSkillPoints = (intelligencePoints: number) => {
    return 10 + (4 * calculateModifier(intelligencePoints));
}
