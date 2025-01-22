import React, { useState } from 'react';
import { Tabs } from 'antd';
import FilmList from './components/FilmList/FilmList';
import { GenresProvider } from './components/api/genresApi';
import './App.css';

function App() {
  const items = ['Search', 'Rated'];
  const [activeKey, setActiveKey] = useState('Search');

  return (
    <GenresProvider>
      <div className="app">
        <header className="app-header">
          <Tabs
            className="app-menu"
            defaultActiveKey="1"
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
            items={items.map((item) => ({ key: item, label: item }))}
          />
          <FilmList parameter={activeKey} />
        </header>
      </div>
    </GenresProvider>
  );
}

export default App;
