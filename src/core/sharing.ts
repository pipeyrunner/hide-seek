let cardData = {
	curse_bridge_troll: {
		type: 'curse',
		title: 'Curse of the Bridge Troll',
		description: 'You must ask your next question from under a bridge.',
		bylaws:
			'"Bridge" is defined as any elevated structure, acting as a path, road or railway, intended to be crossed by pedestrians, cars, or other vehicles. All seekers must have some part of their body under some part of the bridge when the next question is asked. If there are no bridges on the game map, this curse should be removed from the deck.',
		file: 'curse_bridge_troll',
	},
	curse_cairn: {
		type: 'curse',
		title: 'Curse of the Cairn',
		description:
			'I have stacked ___ rocks on top of each other, and it stood for 5 seconds. You must now stack that many rocks and have it stand for 5 seconds before you can ask another question. Your rocks must be found in nature, and you must disperse the rocks after building.',
		bylaws: `You cannot begin fulfilling the casting cost of this curse if you would be otherwise unable to play a curse; once the cost is fulfilled, this cast must be cast immediately. "Found in nature," in this context, does not necessarily mean found in a natural space or untouched by humans; it simply means that you must find the rocks yourself, and cannot buy them.`,
		file: 'curse_cairn',
	},
	curse_distant_cuisine: {
		type: 'curse',
		title: 'Curse of the Distant Cuisine',
		description:
			'I have found a restaurant that serves food from ___. You must visit a restaurant serving food from a country that is equal or greater distance away before asking another question.',
		bylaws: `The restaurants used in this curse must explicit reference a single country or region within a single country within either their name or some other public-facing material such as a menu. If a restaurant associates itself with multiple countries, or a region larger than a single country (such as an "Asian" restaurant), it cannot be used for this curse. Distance from a given country is measured from your exact location to the nearest point in that country.`,
		file: 'curse_distant_cuisine',
	},
	curse_drained_brain: {
		type: 'curse',
		title: 'Curse of the Drained Brain',
		description:
			'For the rest of my run, you cannot ask these questions: ___, ___, and ___.',
		bylaws: `This curse may be used (and its price paid) during the time interval between a question and its answer, allowing a player to discard their hand before receiving the reward from a given question. You may not, however, ban the question that has just been asked, even if you have not yet answered it. Questions removed from the game using this curse cannot be asked, even for increased cost.`,
		file: 'curse_drained_brain',
	},
	curse_egg_partner: {
		type: 'curse',
		title: 'Curse of the Egg Partner',
		description:
			'You must aquire an egg before asking another question. This egg is now an official team member. If the egg cracks before the end of my run, I am awarded an extra (S 30) (M 45) (L 60) minutes.',
		bylaws: `The egg can be from any type of animal, but it must be a real egg (a chocolate egg or a plastic egg, for example, would not count.) Any visible fracture, however small, counts as killing the egg. If you do not want to buy items during the course of your game, or object to this curse on ethical grounds, this curse should be removed from the deck. For any other curse that requires all seekers to do something, the egg counts as a seeker. For example, using the Curse of the Lemon Phylactery after this curse has been played would require the egg to have a lemon attached to it.`,
		file: 'curse_egg_partner',
	},
	curse_endless_tumble: {
		type: 'curse',
		title: 'Curse of the Endless Tumble',
		description: `You must roll a die at least 100 feet and have it land on a 5 or a 6 before asking another question. The die must roll the full distance, unaided, using only the momentum from the initial throw and gravity to travel the 100 feet. If you accidentally hit someone with a die, I am awarded a (S 10) (M 20) (L 30) minute bonus.`,
		bylaws: `100 feet is measured parallel to the ground. The die can, and likely should, be rolled on an inclined surface. If the die is lost or does not land cleanly on one side, it cannot be counted. Any bonuses awarded to the hider should be delivered immediately.`,
		file: 'curse_endless_tumble',
	},
	curse_gamblers_feet: {
		type: 'curse',
		title: "Curse of the Gambler's Feet",
		description: `For the next (S 20) (M 40) (L 60) minutes, you must roll a die before taking any steps in any direction. You may take that many steps before rolling again.`,
		bylaws: `The die rolled for this curse must be a d6. If there are multiple seekers, seekers may choose to roll independently or have one die dictate steps for all seekers at once; either is acceptable. If seekers accidentally take extra steps, they should stop and roll the die retroactively until they have made up for all the unaccounted steps. Seekers cannot take unaccounted steps on purpose. except in situation where it would be unsafe to not take extra steps (such as crossing a busy road.)`,
		file: 'curse_gamblers_feet',
	},
	curse_hidden_hangman: {
		type: 'curse',
		title: 'Curse of the Hidden Hangman',
		description: `Before asking another question or boarding another form of transportation, you must beat me in a game of hangman. I will choose a 5 letter word, and the game ends after either a correct word guess or 7 wrong letter guesses. I will respond to all queries within 30 seconds. If you loose, you cannot challenge me again for 10 minutes. After (S 1) (M 2) (L 3) losses, you must wait 10 more minutes and then the curse is cleared.`,
		bylaws: `The chosen five-letter word must be a real word, found in a dictionary, in the language that the game is being played in. You cannot, for example, use a French word if all players only speak English. If the hider ever fails to respond to a query in 30 seconds, this curse is instantly cleared.`,
		file: `curse_hidden_hangman`,
	},
	curse_impressionable_consumer: {
		type: 'curse',
		title: 'Curse of the Impressionable Consumer',
		description: `You must enter and gain admission to a location or buy a product that you saw an advertisement for before asking another question. This advertisement must be found out in the world, not on your device, and must be at least 100 feet from the product or location itself.`,
		bylaws: `Any object or display whose primary purpose is to raise awareness of a product, service, or business counts as an advertisement. If the advertisement is for a specific service, such as a massage, the seekers must pay for and receive the service advertised. If the advertisement is for a location but not a specific service, such as an amusement park, the seekers must enter that location. Locations that are not private businesses, such as a public park, do not count. If you do not want to be forced to potentially spend money to fulfill this curse, it should be removed from the deck.`,
		file: 'curse_impressionable_consumer',
	},
	curse_jammed_door: {
		type: 'curse',
		title: 'Curse of the Jammed Door',
		description: `For the next (S 0.5) (M 1) (L 3) hours, whenever you want to pass through a doorway into a building, business, train, or other vehicle, you must first roll 2 dice. If you do not roll a 7 or higher, you cannot enter that space (including through other doorways.) Any given doorway can be re-attempted after (S 5) (M 10) (L 15) minutes.`,
		bylaws: `Seekers must roll two d6 dice. Dice can only be rolled to enter a doorway once the doorway is visible to the seekers. For example, if you are attempting to roll to enter a train, you cannot roll the dice before the train arrives; you must be able to see the train door first. Doorways within a building that lead to other parts of the same building, such as a store within a train station, do not need to pass a dice check. If there is any reasonable dispute as to whether something counts as a seperate building, err on the side of doing a dice check. If the curse expires while a doorway is on cooldown, that cooldown also immediately expires.`,
		file: 'curse_jammed_door',
	},
	curse_labyrinth: {
		type: 'curse',
		title: 'Curse of the Labyrinth',
		description: `I have just drawn a maze. You must solve it before asking another question.`,
		bylaws: `"Solvable," in this context, refers to a conventional solution to the maze–you must be able to draw an unbroken line from the start of the maze to the end of the maze. Your time limit begins from the moment you draw your first line; time spent gathering materials does not count. You may discard your maze and start drawing a new maze at any point, but you cannot restart your timer. You may not consult the internet or any other materials when drawing your maze; it must come entirely from your own head.`,
		file: 'curse_labyrinth',
	},
	curse_lemon_phylactery: {
		type: 'curse',
		title: 'Curse of the Lemon Phylactery',
		description: `You must find a lemon and affix it to the outermost layer of your clothes or skin. If, at any point, one of these lemons is no longer touching you, I am awarded an extra (S 30) (M 45) (L 60) minutes.`,
		bylaws: `The lemon must be a real lemon. It can be affixed using any means, but must be constantly touching the seekers's skin or clothes. Once the lemon falls, the hider should be informed of their bonus immediately.`,
		file: 'curse_lemon_phylactery',
	},
	curse_luxury_car: {
		type: 'curse',
		title: 'Curse of the Luxury Car',
		description: `I have just taken a photo of a car. You must take a photo of a more expensive car before asking another question.`,
		bylaws: `You must be able to identify the car in question when sending the photo, and the seekers must agree that it is, in fact, the car that you claim that it is. Use the MSRP of the car, factoring it its year of production, and disregarding any add-ons or modifications that may have been paid for. (For example: upgrades to the car's interior, special tires, custom colors, etc.) The photo sent to the seekers must include enough of the car for it to be identifiable. All of these rules also apply to the car found by the seekers. If you cannot confirm a car's exact production year or exact model, both sides must come to a consensus on which model and year to use for determining price.`,
		file: 'curse_luxury_car',
	},
	curse_mediocre_travel_agent: {
		type: 'curse',
		title: 'Curse of the Mediocre Travel Agent',
		description: `I have chosen a publicly-accessible location within (S 0.25) (M 0.25) (L 0.5) miles of your current location. You must go there, and spend at least (S 5) (M 5) (L 10) minutes there, before asking another question. You must send me at least three photos of you enjoying your vacation, and procure an object to bring to me as a souvenir. If this souvenir is lost before you can give it to me, I am awarded an extra (S 30) (M 45) (L 60) minutes.`,
		bylaws: `"Publicly accessible" in this context follows the same rules as "publicly accessible" in the context of hiding spots. The destination does not need to be a single point; it can be a small general area like a park or store. The souvenir can be literally any physical object. It does not need to be with the seekers at all times, but it must be with them at the moment that the hider is caught.`,
		file: 'curse_mediocre_travel_agent',
	},
	curse_ransom_note: {
		type: 'curse',
		title: 'Curse of the Ransom Note',
		description: `Your next question must be composed of words and letters cut out of any printed material. The question must be coherent, and include at least 5 words.`,
		bylaws: `You cannot begin fulfilling the casting cost of this curse if you would be otherwise unable to play a curse; once the cost is fulfilled, this curse must be cast immediately. The printed material cannot be printed by the seekers; the letters should be gathered from magazines, newspapers, or any other material that the seekers encounter in the wild. "Coherence" in this context does not necessarily mean complete sentences, but the hider should be able to discern the meaning of the question without further clarification. You may use easy-to-understand abbreviations for certain words (such as "2" instead of "to.") If the question requires additional context outside of the basic sentence itself, this context does NOT need to be provided in the form of a ransom note. For example, if you are asking a thermometer question, you can simply ask something along the lines of, "Went 5 miles. Hotter/colder?" Any information about where you started and ended the thermometer can be provided as normal, in the form of a location pin or text.`,
		file: 'curse_ransom_note',
	},
	curse_right_turn: {
		type: 'curse',
		title: 'Curse of the Right Turn',
		description: `For the next (S 20) (M 40) (L 60) minutes, you can only turn right at any street intersection. If, at any point you find yourself in a dead end where you cannot continue forward or turn right for another 1,000 feet, you may do a full 180. A right turn is defined as a road at any angle that veers to the right of you.`,
		bylaws: `This curse only applies to street intersections, meaning the intersection between two roads intended for cars (or pedestrian sidewalks along those roads.) This curse would not have any effects indoors, or in an area where there are no streets.`,
		file: 'curse_right_turn',
	},
	curse_spotty_memory: {
		type: 'curse',
		title: 'Curse of Spotty Memory',
		description: `For the rest of my run, one random category of questions will be disabled at all times. You must roll a die to determine the category of questions to be disabled. This category remains disabled until the next question is asked, at which point a die is rolled again to choose a new category. The same category can be disabled multiple times in a row.`,
		bylaws: `The seekers should assign die numbers to each category before their first roll. For small-sized games, which only include five categories of questions, a six would result in a reroll.`,
		file: 'curse_spotty_memory',
	},
	curse_the_bird_guide: {
		type: 'curse',
		title: 'Curse of The Bird Guide',
		description: `I have filmed a bird for ___ minutes straight. You must film a bird for the same amount of time or longer before asking another question.`,
		bylaws: `The bird must be in frame from the moment the video starts. It is considered "in frame" so long as there is any recognizable portion of the bird on camera. The seekers have unlimited attempts to accomplish this.`,
		file: 'curse_the_bird_guide',
	},
	curse_the_unguided_tourist: {
		type: 'curse',
		title: 'Curse of The Unguided Tourist',
		description: `I have found an image on Google Street View within 500 feet of your current location. Without using the internet for research, you must find what I sent you in real life before you can use transportation or ask another question. Send me a picture for verification.`,
		bylaws: `The human-built structure in question cannot be any part of a road, including curbs or sidewalks. If you are playing in a country or area with highly limited Google Street View coverage (such as Germany), this curse should be removed from the deck.`,
		file: 'curse_the_unguided_tourist',
	},
	curse_the_uturn: {
		type: 'curse',
		title: 'Curse of The U-Turn',
		description: `You must disembark from your current mode of transportation at the next station (as long as that station is serviced by another form of transit in the next (S 0.5) (M 0.5) (L 1) hours.)`,
		bylaws: `"Next Station," in this context, refers to the next station that the seekers' current mode of transit will stop at; if there are any stops along the line that their current route will skip, those should be disregarded. If you are not sure whether the seekers are on transit, or whether their route will stop at a particular station, you may ask them for that information. If there is any ambiguity, you should tell them what you believe their next station is when this curse is cast to confirm that you didn't misread their tracker. Even if the seekers' current mode of transit would eventually bring them closer to you, this curse may still be played so long as their next station is further; a line that heads in your direction but temporarily curves away is a particularly advantageous situation for this curse.`,
		file: 'curse_the_uturn',
	},
	curse_urban_explorer: {
		type: 'curse',
		title: 'Curse of the Urban Explorer',
		description: `For the rest of my run, you cannot ask questions when you are on transit or in a transit station.`,
		bylaws: `Any pending questions that were asked on transit before this curse was played must still be answered. Questions can still be asked outside of transit stations, but seekers cannot be on a platform or in any building associated with the transit station when asking questions.`,
		file: 'curse_urban_explorer',
	},
	curse_water_weight: {
		type: 'curse',
		title: 'Curse of Water Weight',
		description: `You must aquire and carry at least 2 liters of liquid per seeker for the rest of my run. You cannot ask another question until you have aquired the liquid. The water may be distributed between the seekers as you see fit. If the liquid is lost or abandoned at any point after aquisition, I am awarded a (S 30) (M 30) (L 60) minute bonus.`,
		bylaws: `Any liquid already traveling with the seekers at the time that this card is played (e.g. water bottles) does not count. The liquid can be in any number of containers, and can be passed back and forth between the seekers at any time. The liquid can be sat down when the seekers are stationary or on transit, but it is considered "abandoned" once it is no longer within 10 feet of any seeker. The hider must be informed of their bonus immediately. "Body of water" within this context does not necessarily mean natural, but it cannot be a pool and must be large enough to be marked on the map.`,
		file: 'curse_water_weight',
	},
	curse_zoologist: {
		type: 'curse',
		title: 'Curse of the Zoologist',
		description: `I have taken a photo of a wild fish, bird, mammal, reptile, amphibian, or bug. YOu must take a picture of a wild animal in the same category before asking another question.`,
		bylaws: `"Bug" in this context refers to any insect, arachnid, diplopoda, chilopoda, or anything else that would be colloquially and commonly referred to as a "bug". "Wild" in this context means undomesticated and not kept in human captivity, including large-scale outdoor instances of captivity, such as farms or sanctuaries. The photo must include enough of the animal to be recognizable within its category. If there is any dispute as to an animal's classification, defer to Wikipedia. Animals outside of any of these categories (such as crustaceans) cannot be used for this curse.`,
		file: 'curse_zoologist',
	},
	powerup_move: {
		type: 'powerup',
		title: 'Move',
		description: `I have sent you the location of my current transit station. I now have (S 10) (M 20) (L 60) minutes to establish a new hiding zone somewhere else on the game map. My hiding timer is paused, and you must freeze until my new hiding period has concluded.`,
		bylaws: `The move powerup, if played at the right moment, can be one of the most powerful cards in the game. When played, you are granted a certain amount of time based on game size to establish a new hiding zone. The rules for finding a new hiding zone apply as usual; you must center yourself on a new transit station, and you can only use valid transit to reach your new location. While you move, your hiding timer is paused, and the seekers must stay where they are and refrain from asking questions until the move timer is up. At this point, the game resumes, and your hiding timer continues from where it was at the moment you played the move powerup. It is crucial to do this at the perfect moment, as playing the move comes at a severe cost–you must immediately discard your entire hand and inform the seekers of your original transit station after playing it. Given that the move cannot be played during the end game, this means that you must be confident that the seekers are close to finding you, and that you are better off starting from scratch instead of using the cards you've already accumulated over the course of your round. Play it wisely!`,
		file: 'powerup_move',
	},
	powerup_randomize_question: {
		type: 'powerup',
		title: 'Randomize Question',
		description: `Instead of answering your question, you must choose a new question from the same category, at random, which I will answer instead.`,
		bylaws: `The randomize powerup can be played in response to any question instead of answering. After the seekers have been informed that you have used a randomize powerup, they must choose–at random, either using a random number generator or dice–a different unasked question from the same category (e.g. a 10 mile radar might become a 50 mile radar.) This question is then automatically asked instead, and you provide an answer as normal. The original question is not considered to have been asked, and can therefore be asked again for its original cost. If the randomize causes a question to be asked that returns a null answer, this is permitted (tough luck, though). You may play a randomize at any time during the response window after a question has been asked.`,
		file: 'powerup_randomize_question',
	},
	powerup_veto_question: {
		type: 'powerup',
		title: 'Veto Question',
		description: `I have vetoed your question.`,
		bylaws: `The veto powerup can be played in response to any question instead of answering. The seekers are given no answer to their question, and are instead informed that you have used a veto. The question is still considered to have been asked, and therefore can only be asked again for its additional cost. Since you have not answered their question, however, you are given no reward and do not draw any cards from the hider deck. You may play a veto at any time during the response window after a question has been asked.`,
		file: 'powerup_veto_question',
	},
};

export async function shareCardImage(cardFile: string) {
	const imageUrl = `${window.location.origin}/img/cards/${cardFile}.png`;

	try {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const file = new File([blob], `${cardFile}.png`, { type: blob.type });

		if (navigator.canShare && navigator.canShare({ files: [file] })) {
			await navigator.share({
				files: [file],
				title: cardData[cardFile].title,
				text: getText(cardFile),
			});
		} else {
			alert('Your device does not support sharing files.');
		}
	} catch (error) {
		console.error('Error sharing card image:', error);
		alert('There was a problem sharing the card.');
	}
}

function getText(cardFile: string): string {
	const card = cardData[cardFile];
	let text = '';
	if (card.type === 'curse') {
		text += "You've been cursed!\n\n";
		text += `${card.title}\n\n`;
	} else {
		text += `I've played a ${card.title} card!\n\n`;
	}

	text += card.description;
	// text += 'Information about this card:\n\n';
	// text += card.bylaws;

	return text;
}

export function canBeShared(cardFile: string): boolean {
	return !!cardData[cardFile];
}
