import React, { useState, useEffect, useCallback, useRef  } from 'react';
import {
  SafeAreaView,
  Text,
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
  [1, -1], // bottom left
  [-1, 1], // top right
  [1, 1], // bottom right
  [-1, -1], // top left
  [1, 0], // bottom 
  [-1, 0], // top
];


type Grid = number[][];

const renderLineBreak = (index: number) => {
  return index === 2
    ? (<View style={{ width: '100%'}}></View>)
    : '' 
}

function App(): JSX.Element {

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
        let aliveNeighbors = 0;

        // We check the eight possible neighbors for each cell
        positions.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < rows && newJ >=0 && newJ < cols) {
            aliveNeighbors += grid[newI][newJ]; 
          }
        })

        //We apply the rules
        if (aliveNeighbors < 2 || aliveNeighbors > 3) {
          gridCopy[i][j] = 0;
        } else if (grid[i][j] === 0 && aliveNeighbors === 3) {
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
            <React.Fragment key={`${i}-${k}`}>
              <View style={[styles.cell, {backgroundColor: grid[i][k] ? "green" : undefined}]}>
                <Text style={[styles.cellContent]}>{
                  col ? '0' : 'X'
                }</Text>
              </View>
              {renderLineBreak(k)}
            </React.Fragment>
          ))
        )
      }
      </View>
      <Button
        title={running ? 'Stop' : 'Start'}
        color="#6197ed"
        onPress={() => {
          setRunning(!running);
            if (!running) {
              runningRef.current = true;
            }
        }}
      />
      <Button
        title='Reset'
        color="#bf130a"
        onPress={() => {
          setGrid(generateGrid())
        }}
      />
    </SafeAreaView>
  );
}

export default App;
