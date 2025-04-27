import { v4 as uuidv4 } from 'uuid';

export type Card = {
	file: string;
	count: number;
	hasMorePages: boolean;
	useText?: string;
	cannotUseText?: string;
	canUse: (hand: DeckCard[]) => boolean;
};
export type DeckCard = {
	file: string;
	id: string;
	hasMorePages?: boolean;
	useText?: string;
	cannotUseText?: string;
	canUse: (hand: DeckCard[]) => boolean;
};

export const cardDefinitions: Card[] = [
	{
		file: 'time_bonus_5',
		count: 25,
		hasMorePages: false,
		canUse: (hand) => false,
	},
	{
		file: 'time_bonus_10',
		count: 15,
		hasMorePages: false,
		canUse: (hand) => false,
	},
	{
		file: 'time_bonus_15',
		count: 10,
		hasMorePages: false,
		canUse: (hand) => false,
	},
	{
		file: 'time_bonus_20',
		count: 3,
		hasMorePages: false,
		canUse: (hand) => false,
	},
	{
		file: 'time_bonus_30',
		count: 2,
		hasMorePages: false,
		canUse: (hand) => false,
	},
	{
		file: 'powerup_discard_1_draw_2',
		count: 4,
		hasMorePages: true,
		cannotUseText:
			'You cannot use this card as you do not have a card in your hand.',
		canUse: (hand) => hand.length > 1,
	},
	{
		file: 'powerup_discard_2_draw_3',
		count: 4,
		hasMorePages: true,
		cannotUseText:
			'You cannot use this card as you do not have 2 cards in your hand.',
		canUse: (hand) => hand.length > 2,
	},
	{
		file: 'powerup_draw_1_expand_1',
		count: 2,
		hasMorePages: true,
		canUse: (hand) => true,
	},
	{
		file: 'powerup_duplicate_another_card',
		count: 2,
		hasMorePages: true,
		cannotUseText:
			'You cannot use this card as you do not have a card in your hand.',
		canUse: (hand) => hand.length > 1,
	},
	{
		file: 'powerup_move',
		count: 1,
		hasMorePages: false,
		canUse: (hand) => true,
	},
	{
		file: 'powerup_randomize_question',
		count: 4,
		hasMorePages: false,
		canUse: (hand) => true,
	},
	{
		file: 'powerup_veto_question',
		count: 4,
		hasMorePages: false,
		canUse: (hand) => true,
	},
	{
		file: 'curse_bridge_troll',
		count: 1,
		hasMorePages: false,
		useText:
			'To use this card, you must be (S 1) (M 5) (L 30) miles away from the seekers.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_cairn',
		count: 1,
		hasMorePages: false,
		useText: 'To use this card, you must build a rock tower.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_distant_cuisine',
		count: 1,
		hasMorePages: false,
		useText: 'To use this card, you must be at the restaurant.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_drained_brain',
		count: 1,
		hasMorePages: false,
		useText: 'To use this card, you must discard your hand.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_egg_partner',
		count: 1,
		hasMorePages: true,
		useText: 'To use this card, you must discard 2 cards from your hand.',
		cannotUseText:
			'You cannot use this card as you do not have 2 cards in your hand.',
		canUse: (hand) => hand.length > 2,
	},
	{
		file: 'curse_endless_tumble',
		count: 1,
		hasMorePages: false,
		useText:
			"To use this card, you must roll a die. If it's a 5 or a 6, this card has no effect.",
		canUse: (hand) => true,
	},
	{
		file: 'curse_gamblers_feet',
		count: 1,
		hasMorePages: false,
		useText:
			"To use this card, you must roll a die. If it's an even number, this card has no effect.",
		canUse: (hand) => true,
	},
	{
		file: 'curse_hidden_hangman',
		count: 1,
		hasMorePages: true,
		useText: 'To use this card, you must discard 2 cards from your hand.',
		cannotUseText:
			'You cannot use this card as you do not have 2 cards in your hand.',
		canUse: (hand) => hand.length > 2,
	},
	{
		file: 'curse_impressionable_consumer',
		count: 1,
		hasMorePages: false,
		useText:
			"If you use this card, the seekers' next question is free. (This is handled by the game, be sure to log the next question.)",
		canUse: (hand) => true,
	},
	{
		file: 'curse_jammed_door',
		count: 1,
		hasMorePages: true,
		useText: 'To use this card, you must discard 2 cards from your hand.',
		cannotUseText:
			'You cannot use this card as you do not have 2 cards in your hand.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_labyrinth',
		count: 1,
		hasMorePages: false,
		useText: 'To use this card, you must draw a maze.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_lemon_phylactery',
		count: 1,
		hasMorePages: true,
		useText: 'To use this card, you must discard a powerup from your hand.',
		cannotUseText:
			'You cannot use this card as you do not have a powerup in your hand.',
		canUse: (hand) => {
			for (let card of hand) if (card.file.includes('powerup_')) return true;
			return false;
		},
	},
	{
		file: 'curse_luxury_car',
		count: 1,
		hasMorePages: false,
		useText: 'To use this card, you must send the seekers a photo of a car.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_mediocre_travel_agent',
		count: 1,
		hasMorePages: false,
		useText:
			"To use this card, the seekers' vacation destination must be further from you than their current location.",
		canUse: (hand) => true,
	},
	{
		file: 'curse_overflowing_chalice',
		count: 1,
		hasMorePages: true,
		useText: 'To use this card, you must discard a card from your hand.',
		cannotUseText:
			'You cannot use this card as you do not have a card in your hand.',
		canUse: (hand) => hand.length > 1,
	},
	{
		file: 'curse_ransom_note',
		count: 1,
		hasMorePages: false,
		useText:
			'To use this card, you must spell out "ransom note" as a ransom note.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_right_turn',
		count: 1,
		hasMorePages: true,
		useText: 'To use this card, you must discard a card from your hand.',
		cannotUseText:
			'You cannot use this card as you do not have a card in your hand.',
		canUse: (hand) => hand.length > 1,
	},
	{
		file: 'curse_spotty_memory',
		count: 1,
		hasMorePages: true,
		useText: 'To use this card, you must discard a time bonus from your hand.',
		cannotUseText:
			'You cannot use this card as you do not have a time bonus in your hand.',
		canUse: (hand) => {
			for (let card of hand) if (card.file.includes('time_bonus')) return true;
			return false;
		},
	},
	{
		file: 'curse_the_bird_guide',
		count: 1,
		hasMorePages: false,
		useText: 'To use this card, you must send the seekers a video of a bird.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_the_unguided_tourist',
		count: 1,
		hasMorePages: false,
		useText: 'To use this card, the seekers must be outside.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_the_uturn',
		count: 1,
		hasMorePages: false,
		useText: 'To use this card, the seekers must be heading the wrong way.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_urban_explorer',
		count: 1,
		hasMorePages: true,
		useText: 'To use this card, you must discard 2 cards from your hand.',
		cannotUseText:
			'You cannot use this card as you do not have 2 cards in your hand.',
		canUse: (hand) => hand.length > 2,
	},
	{
		file: 'curse_water_weight',
		count: 1,
		hasMorePages: false,
		useText:
			'To use this card, the seekers must be within 1,000 feet of a body of water.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_zoologist',
		count: 1,
		hasMorePages: false,
		useText:
			'To use this card, you must send the seekers a photo of an animal.',
		canUse: (hand) => true,
	},
];

function generateDeck(): DeckCard[] {
	const fullDeck: DeckCard[] = [];
	for (const {
		file,
		count,
		hasMorePages,
		useText,
		cannotUseText,
		canUse,
	} of cardDefinitions) {
		for (let i = 0; i < (count || 1); i++) {
			fullDeck.push({
				file,
				id: uuidv4(),
				hasMorePages,
				useText,
				cannotUseText,
				canUse,
			});
		}
	}
	return shuffle(fullDeck);
}

function shuffle<T>(array: T[]): T[] {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}
	return result;
}

export function getDeck(): DeckCard[] {
	return shuffle(generateDeck());
}

export function getUseText(card: DeckCard): string | undefined {
	const cardDef = cardDefinitions.find((c) => c.file === card.file);
	return cardDef?.useText;
}
export function getCannotUseText(card: DeckCard): string | undefined {
	const cardDef = cardDefinitions.find((c) => c.file === card.file);
	return cardDef?.cannotUseText;
}

export function findCardByFile(
	file: string,
	deck: DeckCard[]
): DeckCard | undefined {
	for (let card of deck) {
		if (card.file === file) return card;
	}
	return undefined;
}
