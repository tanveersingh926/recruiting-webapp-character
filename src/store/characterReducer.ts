import { Reducer } from "react";
import { v6 as uuidv6 } from "uuid";
import { Attributes, Character, Class } from "../types";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "../consts";
import { calculateSkillPoints } from "../utils";

export interface State {
  characters: Character[];
}

export type Action =
  | { type: "ADD_CHARACTER" }
  | {
    type: "UPDATE_ATTRIBUTE";
    payload: {
      characterId: string;
      attribute: keyof Attributes;
      value: number;
    };
  }
  | {
    type: "UPDATE_SKILL";
    payload: { characterId: string; skill: string; points: number };
  }


export const initialState: State = {
  characters: [],
};

export const characterReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "ADD_CHARACTER":
      const attributes = ATTRIBUTE_LIST.reduce((acc, attribute) => {
        acc[attribute] = 10;
        return acc;
      }, {} as Attributes);

      const skills = {}
      SKILL_LIST.forEach(({ name, attributeModifier }) => {
        skills[name] = {
          name,
          attributeModifier,
          points: 0,
        }
      })
      return {
        ...state,
        characters: [
          ...state.characters,
          {
            id: uuidv6(),
            attributes,
            skills: skills,
            maximumSkillPoints: calculateSkillPoints(attributes.Intelligence),
            availableSkillPoints: 10,
          },
        ],
      };

    case "UPDATE_ATTRIBUTE":
      console.log(state)
      return {
        ...state,
        characters: state.characters.map((character) => {

          if (character.id !== action.payload.characterId) return character;

          const updatedCharacter = {
            ...character,
            attributes: {
              ...character.attributes,
              [action.payload.attribute]: action.payload.value,
            },
            ...(action.payload.attribute === 'Intelligence' ? { maximumSkillPoints: calculateSkillPoints(action.payload.value) } : {}),
          }

          return updatedCharacter;
        }
        ),
      };

    case "UPDATE_SKILL":
      return {
        ...state,
        characters: state.characters.map((character) => {
          if (character.id !== action.payload.characterId) return character;

          const currentSkillPoints = character.skills[action.payload.skill].points;
          const newSkillPoints = action.payload.points;
          const skillPointDifference = newSkillPoints - currentSkillPoints;

          return {
            ...character,
            skills: {
              ...character.skills,
              [action.payload.skill]: {
                ...character.skills[action.payload.skill],
                points: newSkillPoints,
              },
            },
            availableSkillPoints: character.availableSkillPoints - skillPointDifference,
          };
        }),
      };
    default:
      return state;
  }
};
