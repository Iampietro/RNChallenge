/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect, useCallback, useRef  } from 'react';
import {
  SafeAreaView,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import styles from './styles';
import useInterval from "./useInterval";

const rows: number = 3;
const cols: number = 3;

const generateGrid = () => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * 2))
    }
    grid.push(row)
  }
  return grid;
}

const positions = [
  [0, 1], // right
  [0, -1], // left
  [1, -1], // top left
  [-1, 1], // top right
  [1, 1], // top
  [-1, -1], // bottom
  [1, 0], // bottom right
  [-1, 0], // bottom left
];

// console.log(generateGrid())

type Grid = number[][];
// const initialState: Grid = [[]];

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [grid, setGrid] = useState(() => {
    return generateGrid();
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback((grid: Grid) => {
    if (!runningRef.current) {
      return;
    }

    let gridCopy = JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let neighbors = 0;

        positions.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < rows && newJ >=0 && newJ < cols) {
            neighbors += grid[newI][newJ]; 
          }
        })
        if (neighbors < 2 || neighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          gridCopy[i][j] = 1;
        }
      }
    }

    setGrid(gridCopy);
  }, [])

  useInterval(() => {
    runSimulation(grid);
  }, 1000);

  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.contentContainer]}>
      {grid &&
        grid.map((rows, i) => 
          rows.map((col, k) => (
            <View style={[styles.cell, {backgroundColor: grid[i][k] ? "green" : undefined}]} 
                  key={`${i}-${k}`}
            >
              <Text style={{ fontWeight: 'bold' }}>{
                col ? '0' : 'X'
              }</Text>
            </View>
          ))
        )
      }
      </View>
      <Button
        title={running ? 'Stop' : 'Start'}
        color="#f194ff"
        onPress={() => {
          setRunning(!running);
            if (!running) {
              runningRef.current = true;
            }
        }}
      />
    </SafeAreaView>
  );
}

export default App;
