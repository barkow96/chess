import Pawn from "./Pawn.js";

//CLASS THAT REPRESENTS A KNIGHT
export default class Knight extends Pawn {
	constructor(x,y,chessBoard) {
		super(x,y,chessBoard);
		this.name = "k";
		this.directions = ["upUpRight", "upRightRight", "downDownRight", "downRightRight", "downDownLeft", "downLeftLeft", "upUpLeft", "upLeftLeft"];
		this.dx = [+1, +2, +1, +2, -1, -2, -1, -2];
		this.dy = [-2, -1, +2, +1, +2, +1, -2, -1];
	}

	//CALCULATING MOVES
	movesPossible() {
		const x = this.x;
		const y = this.y;
		const moves = {
			"x": [],
			"y": [],
            "possible": []
		};
		let dx, dy;

		for (let i=0; i<this.directions.length; i++) {
			dx = this.dx[i];
			dy = this.dy[i];

			if ((x+dx) >= 0 && (x+dx) <= 7 && (y+dy) >= 0 && (y+dy) <= 7) {
				if (this.cb.poles[y+dy][x+dx].figure == "0") {
					moves.x.push(x+dx);
					moves.y.push(y+dy);
                    moves.possible.push(true);
				}
			}
		}

		return moves;
	}

	//CALCULATING CAPTURES
	capturesPossible() {
		const x = this.x;
		const y = this.y;
		const captures = {
			"x": [],
			"y": [],
			"possible": []
		};
		const color = this.cb.poles[y][x].color;
		const oppColor = (color == "W") ? "B" : "W";
		let dx, dy;

		for (let i=0; i<this.directions.length; i++) {
			dx = this.dx[i];
			dy = this.dy[i];

			if ((x+dx) >= 0 && (x+dx) <= 7 && (y+dy) >= 0 && (y+dy) <= 7) {
				captures.x.push(x+dx);
				captures.y.push(y+dy);

				if (this.cb.poles[y+dy][x+dx].color == oppColor) captures.possible.push(true);
				else captures.possible.push(false);
			}
		}

		return captures;
	}
}