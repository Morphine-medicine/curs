import { CellChecker } from 'src/app/shared/utils/cell-checker';
import { Board } from '../Board';
import { Colors } from '../Colors';
import { Point } from '../Point';
import { Figure } from './Figure';
import { FigureTypes } from './Figure-types';

export class Pawn extends Figure {
  private moved = false;
  public readonly direction: number = this.color === Colors.WHITE ? -1 : 1;

  constructor(color: Colors, x: number, y: number) {
    super(color, x, y);
    this.type = FigureTypes.PAWN;
    this.imgSrc = `./assets/images/figures/pawn-${color}.png`;
  }

  public override canMove(board: Board, start: Point, end: Point): boolean {
    if (!super.canMove(board, start, end)) return false;

    const startCell = board.getCell(start.x, start.y);
    const endCell = board.getCell(end.x, end.y);

    if (
      (end.y === start.y + this.direction ||
        (!this.moved &&
          end.y === start.y + this.direction * 2 &&
          board.isCellEmpty(end.x, end.y - this.direction))) &&
      end.x === start.x &&
      board.isCellEmpty(end.x, end.y)
    ) {
      return true;
    }

    if (
      end.y === start.y + this.direction &&
      Math.abs(end.x - start.x) === 1 &&
      CellChecker.areEnemies(startCell, endCell)
    ) {
      return true;
    }

    return false;
  }

  public isMoved(): boolean {
    return this.moved;
  }

  public setMoved(moved: boolean): void {
    this.moved = moved;
  }
}
