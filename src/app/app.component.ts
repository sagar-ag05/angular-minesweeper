import { Component, OnDestroy } from '@angular/core';
import { Cell } from '../shared/cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Minesweeper';

  //Total no of rows & columns
  scale: number = 5;
  
  //Array to hold all the cells
  mine = [];
  bombLocations = [];
  isGameOver : boolean = false;
  
  //variables for timer and cancelling timer when game is over.
  timer: number = 0;
  countTimer;
  
  totalRevealedCells: number = 0;
  outputClass = 'result win';
  totalPositiveCells: number;

  constructor() {
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  generateMine() {
    this.resetVariables();
    this.populateRandomBombs();
    this.populateMineWithBombs();
    this.populateMineWithCounters();
    this.startTimer();
  }

  resetVariables() {
    this.bombLocations.splice(0, this.bombLocations.length);
    this.totalRevealedCells = 0;
    this.isGameOver = false;
    this.mine.splice(0, this.mine.length);
    this.totalPositiveCells = ( this.scale * this.scale ) - this.scale;
  }

  populateRandomBombs() {
    let val;
    let i = 0;
    while( i != this.scale){
      val = this.getRandom();
      this.bombLocations.push( this.getRandom() );
      i++;
    }
    this.bombLocations.sort();    
  }

  populateMineWithBombs() {
    let counter = 1;
    let isBomb: boolean;

    for(let i = 0; i < this.scale; i++){
      let arr: Cell[] = new Array();

      for(let j = 0; j < this.scale; j++){
        isBomb = false;
        if(j+1 == this.bombLocations[i]){
          isBomb = true;
        }
        let c = new Cell(counter++, isBomb, 0);
        arr.push(c);
      }
      this.mine.push(arr);
    }
  }

  populateMineWithCounters() {
    let currCell: Cell;
    for(let row = 0; row < this.scale; row++){
      for(let col = 0; col < this.scale; col++ ){
        currCell = this.mine[row][col];

        if(currCell.isBomb){
          this.updateCells(row, col);
        }
      }
    }    
  }

  updateCells(row, col) {
    //update upper row cells
    this.populateAdjacentCells(row-1, col-1);
    this.populateAdjacentCells(row-1, col);
    this.populateAdjacentCells(row-1, col+1);

    //update adjacent cells
    this.populateAdjacentCells(row, col-1);
    this.populateAdjacentCells(row, col+1);

    //update lower row cells
    this.populateAdjacentCells(row+1, col-1);
    this.populateAdjacentCells(row+1, col);
    this.populateAdjacentCells(row+1, col+1);
  }

  populateAdjacentCells(row, col) {
    //for first and last row in the array, add check to bypass updating cells above the first row and below the last row.
    if(row < 0 || col < 0 || row >= this.scale || col >= this.scale){
      return;
    }    
    let cell:Cell = this.mine[row][col];

    //updating counter is irrelevant as current cell has bomb, ergo returning.
    if(cell.isBomb){
      return;
    }
    cell.count++;
  }

  openAllCells(){
    for(let i = 0; i < this.scale; i++){
      for(let j = 0; j < this.scale; j++){
        this.mine[i][j].isOpen = true;
      }
    }
  }

  reveal(cell: Cell) {
    
    if(cell.isBomb) {
      cell.isOpen = true;
      this.isGameOver = true;
      this.outputClass = 'result lost';
      this.stopTimer();
      this.openAllCells();
    }
    else {

      if(!cell.isOpen) {
        this.totalRevealedCells++;
        cell.isOpen = true;
      }
      
      if(this.totalRevealedCells == this.totalPositiveCells) {        
        this.isGameOver = true;
        this.outputClass = 'result win';
        this.stopTimer();
        this.openAllCells();
      }
    }
  }

  rowTrackby(cell: Cell){
    return cell.id;
  }

  stopTimer() {
    clearInterval(this.countTimer);
  }

  startTimer(){
    this.timer = 0;
    this.countTimer = setInterval(()=> {
      this.timer++;
    }, 1000);
  }

  getRandom() {
    const min = 1;
    const max = this.scale; // * this.scale;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
