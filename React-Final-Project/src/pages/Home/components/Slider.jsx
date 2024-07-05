import React, { useState } from 'react';

const datas = {
  strawberry: 'The garden strawberry (or simply strawberry /ˈstrɔːbᵊri/; Fragaria × ananassa) is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries)',
  banana: 'A banana is an edible fruit, botanically a berry, produced by several kinds of large herbaceous flowering plants in the genus Musa.',
  apple: 'The apple tree (Malus domestica) is a deciduous tree in the rose family best known for its sweet, pomaceous fruit, the apple. It is cultivated worldwide as a fruit tree, and is the most widely grown species in the genus Malus.',
  orange: 'The orange (specifically, the sweet orange) is the fruit of the citrus species Citrus × sinensis in the family Rutaceae.'
};

const Slider = () => {
  const [selectedItem, setSelectedItem] = useState('item-1');

  const handleChange = (event) => {
    setSelectedItem(event.target.id);
  };

  return (
    <div className={`containerr ${selectedItem}`}>
      <input
        type="radio"
        name="slider"
        id="item-1"
        checked={selectedItem === 'item-1'}
        onChange={handleChange}
      />
      <input
        type="radio"
        name="slider"
        id="item-2"
        checked={selectedItem === 'item-2'}
        onChange={handleChange}
      />
      <input
        type="radio"
        name="slider"
        id="item-3"
        checked={selectedItem === 'item-3'}
        onChange={handleChange}
      />

      <div className="cards">
        <label className="card" htmlFor="item-1" id="song-1">
          <img src="https://firebasestorage.googleapis.com/v0/b/final-project-c4738.appspot.com/o/slider3.jfif?alt=media&token=eccd7b86-aa86-4dd7-bd4c-fb5e3d8d9b46" alt="song" />
        </label>
        <label className="card" htmlFor="item-2" id="song-2">
          <img src="https://firebasestorage.googleapis.com/v0/b/final-project-c4738.appspot.com/o/slider6.jpg?alt=media&token=67712173-084a-4e35-b001-3c5a52769e8d" alt="song" />
        </label>
        <label className="card" htmlFor="item-3" id="song-3">
          <img src="https://firebasestorage.googleapis.com/v0/b/final-project-c4738.appspot.com/o/slider3.jfif?alt=media&token=eccd7b86-aa86-4dd7-bd4c-fb5e3d8d9b46" alt="song" />
        </label>
      </div>
    </div>
  );
};

export default Slider;
