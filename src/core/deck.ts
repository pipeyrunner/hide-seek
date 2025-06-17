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

export type DeckCardData = {
	file: string;
	id: string;
};

export function serializeDeck(deck: DeckCard[]): DeckCardData[] {
	return deck.map(({ file, id }) => ({ file, id }));
}

export function deserializeDeck(data: DeckCardData[]): DeckCard[] {
	if (data === null || data === undefined) return null;
	return data.map(({ file, id }) => {
		const def = cardDefinitions.find((c) => c.file === file);
		if (!def) throw new Error(`Unknown card file: ${file}`);
		return {
			file,
			id,
			hasMorePages: def.hasMorePages,
			useText: def.useText,
			cannotUseText: def.cannotUseText,
			canUse: def.canUse,
		};
	});
}

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
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет карты в руке.',
		canUse: (hand) => hand.length > 1,
	},
	{
		file: 'powerup_discard_2_draw_3',
		count: 4,
		hasMorePages: true,
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет 2 карт в руке.',
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
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет карты в руке.',
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
		useText: 'Чтобы использовать эту карту, ты должен быть на расстоянии (S 1.5) (M 8) (L 48) километров от искателей.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_cairn',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен построить башню из камней.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_distant_cuisine',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен быть в ресторане.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_drained_brain',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен сбросить свою руку.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_egg_partner',
		count: 1,
		hasMorePages: true,
		useText: 'Чтобы использовать эту карту, ты должен сбросить 2 карты из руки.',
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет 2 карт в руке.',
		canUse: (hand) => hand.length > 2,
	},
	{
		file: 'curse_endless_tumble',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен бросить кубик. Если выпадет 5 или 6, карта не сработает.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_gamblers_feet',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен бросить кубик. Если выпадет чётное число, карта не сработает.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_hidden_hangman',
		count: 1,
		hasMorePages: true,
		useText: 'Чтобы использовать эту карту, ты должен сбросить 2 карты из руки.',
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет 2 карт в руке.',
		canUse: (hand) => hand.length > 2,
	},
	{
		file: 'curse_impressionable_consumer',
		count: 1,
		hasMorePages: false,
		useText: 'Если ты используешь эту карту, следующий вопрос искателей будет бесплатным. (Это обрабатывается игрой, не забудь записать следующий вопрос.)',
		canUse: (hand) => true,
	},
	{
		file: 'curse_jammed_door',
		count: 1,
		hasMorePages: true,
		useText: 'Чтобы использовать эту карту, ты должен сбросить 2 карты из руки.',
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет 2 карт в руке.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_labyrinth',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен нарисовать лабиринт.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_lemon_phylactery',
		count: 1,
		hasMorePages: true,
		useText: 'Чтобы использовать эту карту, ты должен сбросить усиление из руки.',
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет усиления в руке.',
		canUse: (hand) => {
			for (let card of hand) if (card.file.includes('powerup_')) return true;
			return false;
		},
	},
	{
		file: 'curse_luxury_car',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен отправить искателям фото машины.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_mediocre_travel_agent',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, место отпуска искателей должно быть дальше от тебя, чем их текущее местоположение.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_overflowing_chalice',
		count: 1,
		hasMorePages: true,
		useText: 'Чтобы использовать эту карту, ты должен сбросить карту из руки.',
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет карты в руке.',
		canUse: (hand) => hand.length > 1,
	},
	{
		file: 'curse_ransom_note',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен выложить "выкупное письмо" как выкупное письмо.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_right_turn',
		count: 1,
		hasMorePages: true,
		useText: 'Чтобы использовать эту карту, ты должен сбросить карту из руки.',
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет карты в руке.',
		canUse: (hand) => hand.length > 1,
	},
	{
		file: 'curse_spotty_memory',
		count: 1,
		hasMorePages: true,
		useText: 'Чтобы использовать эту карту, ты должен сбросить бонус времени из руки.',
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет бонуса времени в руке.',
		canUse: (hand) => {
			for (let card of hand) if (card.file.includes('time_bonus')) return true;
			return false;
		},
	},
	{
		file: 'curse_the_bird_guide',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен отправить искателям видео с птицей.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_the_unguided_tourist',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, искатели должны быть на улице.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_the_uturn',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, искатели должны двигаться в неправильном направлении.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_urban_explorer',
		count: 1,
		hasMorePages: true,
		useText: 'Чтобы использовать эту карту, ты должен сбросить 2 карты из руки.',
		cannotUseText: 'Ты не можешь использовать эту карту, так как у тебя нет 2 карт в руке.',
		canUse: (hand) => hand.length > 2,
	},
	{
		file: 'curse_water_weight',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, искатели должны быть в 300 метрах от водоёма.',
		canUse: (hand) => true,
	},
	{
		file: 'curse_zoologist',
		count: 1,
		hasMorePages: false,
		useText: 'Чтобы использовать эту карту, ты должен отправить искателям фото животного.',
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
