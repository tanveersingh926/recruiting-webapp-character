import './App.css';
import { Button, Stack, Typography } from '@mui/material';
import { CustomBox } from './styles';
import { CharacterSheet } from './components/CharacterSheet';
import { useCharacterContext, withCharacterProvider } from './store/CharacterContext';


function App() {
  const { state, addCharacter } = useCharacterContext();
  const addNewCharacterHandler = () => {
    addCharacter();
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise</h1>
      </header>
      <section className="App-section">
        <Stack direction="row" spacing={2} justifyContent={"center"} pt={2}>
          <Button variant="contained" onClick={addNewCharacterHandler}>
            Add New Character
          </Button>
          <Button variant="contained">Reset All Character</Button>
          <Button variant="contained">Save All Character</Button>
        </Stack>
        {state.characters.map((character, index) => (
          <CustomBox key={index}>
            <Typography variant="h4" component={"h2"} sx={{ textAlign: "center", my: 2 }}>
              Character: {index + 1}
            </Typography>
            <CharacterSheet character={character} />
          </CustomBox>
        ))}
      </section>
    </div>
  );
}

export default withCharacterProvider(App);
