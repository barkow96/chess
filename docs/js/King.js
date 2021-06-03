import Knight from "./Knight.js";

//CLASS THAT REPRESENTS A KING
export default class King extends Knight {
	constructor(x,y,chessBoard) {
		super(x,y,chessBoard);
		this.name = "K";
		this.directions = ["up", "upRight", "right", "downRight", "down", "downLeft", "left", "upLeft"];
		this.dx = [0, +1, +1, +1, 0, -1, -1, -1];
		this.dy = [-1, -1, 0, +1, +1, +1, 0, -1];
		this.firstMove = true;
	}

	//CALCULATING CASTLINGS
	castlingPossible(player) {
		let castlings = {
			"rooks": ["0", "0"],
			"dx": [-2, +2],
			"possible": [false, false]
		};
		let attackedSpots = {
			"x": [],
			"y": []
		};
		let dx;
		let multip = 1;
		let spotsTaken = false;
		let spotsAttacked = false;

		if (this.firstMove) {
			this.cb.poles.forEach(row => {
				row.forEach(pole => {
					if (pole.figure.name == "R" && pole.color == player.color && pole.figure.firstMove) {
						if (pole.figure.x == 0) castlings.rooks[0] = pole.figure;
						if (pole.figure.x == 7) castlings.rooks[1] = pole.figure;
					}

					else if (pole.figure != "0" && pole.color != player.color) {
						attackedSpots.x = attackedSpots.x.concat(pole.figure.capturesPossible().x);
						attackedSpots.y = attackedSpots.y.concat(pole.figure.capturesPossible().y);
					}
				})
			});

			for (const [index, rook] of castlings.rooks.entries()) {
				if (rook != "0") {
					multip = 1;
					dx = 0;
					spotsTaken = false;
					spotsAttacked = false;

					while (this.x+dx != rook.x) {
						if (this.cb.poles[this.y][this.x+dx].figure != "0" && this.cb.poles[this.y][this.x+dx].figure.name != "K") spotsTaken = true;

						for (let i=0; i<attackedSpots.x.length; i++) if (attackedSpots.x[i] == this.x+dx && attackedSpots.y[i] == this.y) spotsTaken = true;

						
						dx = multip*(rook.x-this.x)/Math.abs(rook.x-this.x);
						multip++;
					}

					if (!spotsTaken && !spotsAttacked) castlings.possible[index] = true;
					
				}
			}
		}

		return castlings;
	}
}