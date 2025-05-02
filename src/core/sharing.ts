export async function shareCardImage(cardFile: string) {
	const imageUrl = `${window.location.origin}/img/cards/${cardFile}.png`;

	try {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const file = new File([blob], `${cardFile}.png`, { type: blob.type });

		if (navigator.canShare && navigator.canShare({ files: [file] })) {
			await navigator.share({
				files: [file],
				title: 'Jet Lag Card',
				text: 'Here’s a card!',
			});
		} else {
			alert('Your device does not support sharing files.');
		}
	} catch (error) {
		console.error('Error sharing card image:', error);
		alert('There was a problem sharing the card.');
	}
}
