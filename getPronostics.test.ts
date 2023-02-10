import { describe, expect, test } from "vitest";
import { getPronostics, type ChessPlayer } from "./getPronostics";

interface Participant extends ChessPlayer {
	name: string;
}

describe.concurrent("getPronostics", () => {
	test("returns player highest elo", () => {
		//ARRANGE
		const WINNER_NAME = "Sherlock";
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 3100, age: 33, name: WINNER_NAME },
			{ elo: 3000, age: 32, name: "Magnus" },
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 2900, age: 24, name: "Moriarty" },
			{ elo: 700, age: 30, name: "Félix" },
			{ elo: 2700, age: 31, name: "Erik Lehnsherr" },
			{ elo: 2800, age: 30, name: "Charles Xavier" },
		];

		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.champion.name).toEqual(WINNER_NAME);
	});

	test("returns player highest elo and youngest age", () => {
		//ARRANGE
		const WINNER_NAME = "Magnus";
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 3000, age: 33, name: "Sherlock" },
			{ elo: 3000, age: 32, name: WINNER_NAME },
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 2900, age: 24, name: "Moriarty" },
			{ elo: 700, age: 30, name: "Félix" },
			{ elo: 2600, age: 31, name: "Erik Lehnsherr" },
			{ elo: 2700, age: 30, name: "Charles Xavier" },
		];

		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.champion.name).toEqual(WINNER_NAME);
	});

	

	test("a list with multiple possible champions can't be empty", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 3000, age: 30, name: "Sherlock" },
			{ elo: 3000, age: 30, name: "Magnus" },
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 700, age: 30, name: "Félix" },
			{ elo: 2600, age: 31, name: "Erik Lehnsherr" },
			{ elo: 2700, age: 30, name: "Charles Xavier" },
		];
		const EMPTY_ARRAY: never[] = [];
		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.possibleChampions).not.toEqual(EMPTY_ARRAY);
	});

	test("cannot return a default object with default values", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 3000, age: 30, name: "Sherlock" },
			{ elo: 3000, age: 30, name: "Magnus" },
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 700, age: 30, name: "Félix" },
			{ elo: 2600, age: 31, name: "Erik Lehnsherr" },
			{ elo: 2700, age: 30, name: "Charles Xavier" },
		];
		const DEFAULT_OBJECT = {elo: 0, age: 0};
		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.champion).not.toEqual(DEFAULT_OBJECT);
	});

	test("returns all players with highest elo and same age", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 3000, age: 32, name: "Sherlock" },
			{ elo: 3000, age: 32, name: "Magnus" },
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 700, age: 30, name: "Félix" },
			{ elo: 2600, age: 31, name: "Erik Lehnsherr" },
			{ elo: 2700, age: 30, name: "Charles Xavier" },
		];

		const POSSIBLE_CHAMPIONS: Array<Participant> = [
			{ elo: 3000, age: 32, name: "Sherlock" },
			{ elo: 3000, age: 32, name: "Magnus" },
		];
		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.possibleChampions).toEqual(POSSIBLE_CHAMPIONS);
	});

	test("returns all 3 players with highest elo and same age", () => {
		//ARRANGE
		const PLAYER_LIST: Array<Participant> = [
			{ elo: 3000, age: 32, name: "Sherlock" },
			{ elo: 3000, age: 32, name: "Magnus" },
			{ elo: 3000, age: 32, name: "Daniil Dubov" },
			{ elo: 2999, age: 24, name: "Francis" },
			{ elo: 700, age: 30, name: "Félix" },
			{ elo: 2600, age: 31, name: "Erik Lehnsherr" },
			{ elo: 2700, age: 30, name: "Charles Xavier" },
		];

		const POSSIBLE_CHAMPIONS: Array<Participant> = [
			{ elo: 3000, age: 32, name: "Sherlock" },
			{ elo: 3000, age: 32, name: "Magnus" },
			{ elo: 3000, age: 32, name: "Daniil Dubov" },
		];
		//ACT
		const RESULT = getPronostics(PLAYER_LIST);
		//ASSERT
		expect(RESULT.possibleChampions).toEqual(POSSIBLE_CHAMPIONS);
	});
});
