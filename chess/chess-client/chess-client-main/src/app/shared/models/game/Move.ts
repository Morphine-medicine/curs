import { Cell } from './Cell';
import { Figure } from './figures/Figure';
import { Player } from './Player';

export class Move {
  private movedFigure: Figure | null;
  private capturedFigure: Figure | null;
  private castlingMove: boolean = false;

  constructor(public player: Player, public start: Cell, public end: Cell) {
    this.movedFigure = start.getFigure();
    this.capturedFigure = end.getFigure();
  }

  public isCastlingMove(): boolean {
    return this.castlingMove;
  }

  public setCastlingMove(castlingMove: boolean): void {
    this.castlingMove = castlingMove;
  }

  public setCapturedFigure(figure: Figure | null): void {
    this.capturedFigure = figure;
  }

  public getMoveedFigure(): Figure | null {
    return this.movedFigure;
  }

  public getCapturedFigure(): Figure | null {
    return this.capturedFigure;
  }
}
