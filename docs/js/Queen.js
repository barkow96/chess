import Bishop from "./Bishop.js";

//CLASS THAT REPRESENTS A ROOK
export default class Queen extends Bishop {
	constructor(x,y,chessBoard) {
		super(x,y,chessBoard);
		this.name = "Q";
		this.directions = ["up", "right", "down", "left", "upRight", "downRight", "downLeft", "upLeft"];
		this.dx = [0, +1, 0, -1, +1, +1, -1, -1];
		this.dy = [-1, 0, +1, 0, -1, +1, +1, -1];
	}	
}