import { createContext, useContext, useReducer } from "react";
import { Action, characterReducer, initialState, State } from "./characterReducer";
import { Attributes } from "../types";

interface CharacterContextState {
    state: State;
    addCharacter: (name?: string) => void;
    updateAttribute: (characterId: string,
        attribute: keyof Attributes,
        value: number) => void;
    updateSkill: (characterId: string, skill: string, points: number) => void;
    dispatch: React.Dispatch<Action>;
}

const initialContextState: CharacterContextState = {
    state: {
        characters: [],
    },
    addCharacter: () => { },
    updateAttribute: () => { },
    updateSkill: () => { },
    dispatch: () => { },
};


export const useCharacterContext = () => {
    const context = useContext(CharacterContext);
    if (context === undefined) {
        throw new Error("useCharacterContext must be used within a CharacterProvider");
    }
    return context;
}


export const CharacterContext = createContext<
    CharacterContextState | undefined
>(initialContextState);

export const CharacterProvider = ({ children }) => {
    const [state, dispatch] = useReducer(characterReducer, initialState);
    const addCharacter = (name?: string) => {
        dispatch({ type: "ADD_CHARACTER" });
    };

    const updateAttribute = (
        characterId: string,
        attribute: keyof Attributes,
        value: number
    ) => {
        dispatch({
            type: "UPDATE_ATTRIBUTE",
            payload: { characterId, attribute, value },
        });
    };

    const updateSkill = (characterId: string, skill: string, points: number) => {
        dispatch({ type: "UPDATE_SKILL", payload: { characterId, skill, points } });
    };

    return (
        <CharacterContext.Provider
            value={{
                state,
                addCharacter,
                updateAttribute,
                updateSkill,
                dispatch,
            }}
        >
            {children}
        </CharacterContext.Provider>
    );
};

export const withCharacterProvider = (Component) => {
    return () => {
        return (
            <CharacterProvider>
                <Component />
            </CharacterProvider>
        );
    };
}
