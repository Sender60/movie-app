import React from 'react';
import FilmList from './components/FilmList/FilmList';
import { GenresProvider } from './components/api/genresApi';

function App() {
  return (
    <GenresProvider>
      <div className="app">
        <header className="app-header">
          <FilmList />
        </header>
      </div>
    </GenresProvider>
  );
}

export default App;
