const version = '1.2.0.0';
const fileInput = document.getElementById('file-id');
const generateICSBTN = document.getElementById('generate-ics-btn');
const singleEventCbx = document.getElementById('single-event-cbx');

const warningDiv = document.getElementById('warning-div');

const fileNameInput = document.getElementById('file-name-input');
const wordFilterInput = document.getElementById('word-filter-input');
const wordFilterLabel = document.getElementById('word-filter-label');

const eventTitleInput = document.getElementById('event-title-input');
const eventTitleLabel = document.getElementById('event-title-label');

const urlaubCbx = document.getElementById('urlaub-cbx');
const urlaubTitleInput = document.getElementById('urlaub-title-input');
const urlaubTitleLabel = document.getElementById('urlaub-title-label');

const dateRegex = new RegExp(/\d\d\.\d\d\.\d\d\d?\d?/, 'g');
const timeRegex = new RegExp(/\d\d\:\d\d/, 'g');
const holidayString = ' Urlaub ';
const regexUrlaubSingleCheck = new RegExp(dateRegex.source + holidayString);

// A unique key word, that is present in origin 1
const origin1Identifier = 'Pepgruppe und An-/Abwesenheit';
// Use this variable to add an active switch (e.g. a radio button, checkbox, condition to compute)
let originSwitch = false;

const regexProductiveTimesOrigin1 = new RegExp(
	regexUrlaubSingleCheck.source +
		'|' +
		dateRegex.source +
		' produktiv ' +
		timeRegex.source +
		timeRegex.source,
	'gm'
);

const regexCombinedOrigin1 = new RegExp(
	dateRegex.source +
		regexUrlaubSingleCheck.source +
		'|' +
		dateRegex.source +
		'produktiv' +
		timeRegex.source +
		' ' +
		timeRegex.source +
		'| ww .*? ' +
		timeRegex.source +
		timeRegex.source,
	'gm'
);

const regexCombinedOrigin2 = new RegExp(
	dateRegex.source +
		' ' +
		timeRegex.source +
		' ' +
		timeRegex.source +
		' [a-zA-Z\\s]+-?\\/?[a-zA-Z\\s]+|' +
		regexUrlaubSingleCheck.source,
	'gm'
);

document.querySelector('title').innerHTML += ` ${version}`;
document.querySelector(
	'#repo-link'
).innerHTML += `Schichtplan zu ICS ${version} by Alexander Pahn `;

fileInput.addEventListener('change', resetWarning);
generateICSBTN.addEventListener('click', createICS);
singleEventCbx.addEventListener('change', () => {
	if (singleEventCbx.checked) {
		wordFilterLabel.classList.remove('show');
		eventTitleLabel.classList.add('show');
	} else {
		eventTitleLabel.classList.remove('show');
		wordFilterLabel.classList.add('show');
	}
});

urlaubCbx.addEventListener('click', () => {
	if (urlaubCbx.checked) {
		urlaubTitleLabel.classList.add('show');
	} else {
		urlaubTitleLabel.classList.remove('show');
	}
});

function createSingleEvent(pagesText) {
	resetWarning();
	const cal = ics();
	let rawText = pagesText[0];

	const filename = fileNameInput.value.trim();

	for (let pageNum = 1; pageNum < pagesText.length; pageNum++) {
		rawText += `. ${pagesText[pageNum]}`;
	}

	const productiveTimesOrigin1 = rawText.match(regexProductiveTimesOrigin1);
	const origin1 = isOrigin1(rawText);

	if (productiveTimesOrigin1 && origin1) {
		productiveTimesOrigin1.forEach(item => {
			if (item.match('produktiv')) {
				const splitted = item.split('produktiv');
				const date = splitted[0];
				const [start, end] = splitted[1].trim().split(' ');

				cal.addEvent(
					eventTitleInput.value.trim(),
					'',
					'',
					buildTimeString(date, start),
					buildTimeString(date, end)
				);
			} else if (item.includes(holidayString) && urlaubCbx.checked) {
				const splitted = item.split(holidayString);
				const date = splitted[0];

				cal.addEvent(
					urlaubTitleInput.value.trim(),
					'',
					'',
					buildTimeString(date, '00:00'),
					buildTimeString(date, '00:00')
				);
			}
		});
		cal.download(filename);
		return;
	}

	const productiveTimesOrigin2 = rawText.match(regexCombinedOrigin2);

	if (productiveTimesOrigin2) {
		const calenderCollection = {};
		productiveTimesOrigin2.forEach(item => {
			console.dir(item);

			const [date] = item.match(dateRegex);
			const dateKey = date.replaceAll('.', '');
			if (item.includes(holidayString) && urlaubCbx.checked) {
				calenderCollection[dateKey] = {};
				calenderCollection[dateKey].date = date;
				calenderCollection[dateKey].start = '00:00';
				calenderCollection[dateKey].end = '00:00';
				calenderCollection[dateKey].title = urlaubTitleInput.value.trim();
			} else {
				const [start, end] = item.match(timeRegex);
				if (!calenderCollection[dateKey]) {
					calenderCollection[dateKey] = {};
					calenderCollection[dateKey].date = date;
					calenderCollection[dateKey].start = start;
					calenderCollection[dateKey].end = end;
					calenderCollection[dateKey].title = eventTitleInput.value.trim();
					return;
				}

				calenderCollection[dateKey].end = end;
			}
		});
		Object.entries(calenderCollection).forEach(element => {
			const { date, start, end, title } = element[1];
			cal.addEvent(
				title,
				'',
				'',
				buildTimeString(date, start),
				buildTimeString(date, end)
			);
		});

		cal.download(filename);
		return;
	}

	warningDiv.classList.add('show');
}

function createMultipleEvents(pagesText) {
	resetWarning();
	const cal = ics();
	let rawText = pagesText[0];
	const filterTextRaw = wordFilterInput.value.split(',');
	const filterText = new RegExp(filterTextRaw.join('|'), 'g');
	const filename = fileNameInput.value.trim();

	for (let pageNum = 1; pageNum < pagesText.length; pageNum++) {
		rawText += `. ${pagesText[pageNum]}`;
	}

	const productiveTimesOrigin1 = rawText.match(regexCombinedOrigin1);
	const origin1 = rawText.includes(origin1Identifier);

	if (productiveTimesOrigin1 && origin1) {
		const collapsedTimes = [];
		let carryOver;
		productiveTimesOrigin1.forEach(item => {
			if (item.includes(holidayString)) {
				if (!urlaubCbx.checked || !item.match(regexUrlaubSingleCheck)) {
					return;
				}
				const splitted = item.split('Urlaub');
				const date = splitted[0].trim();
				const urlaub = {
					date,
					events: [`${urlaubTitleInput.value.trim()} 00:00 00:00`],
				};
				collapsedTimes.push(urlaub);
				return;
			}
			if (item.match(regexProductiveTimesOrigin1)) {
				if (carryOver) {
					collapsedTimes.push(carryOver);
				}
				carryOver = {};
				carryOver.events = [];
				const splitted = item.split('produktiv');
				const date = splitted[0].trim();
				carryOver.date = date;
				return;
			}
			carryOver.events.push(item);
		});
		// adds the last item to collapsed times, as it doesn't happen within the loop
		// due to the given data structure you cannot tell the events apart
		// alternative would be to do the stuff in the loop backwards
		// then you would first add events and push once you reach either Urlaub or a matching regex
		collapsedTimes.push(carryOver);

		collapsedTimes.forEach(item => {
			const date = item.date;
			const events = item.events;

			events.forEach(eventString => {
				// due to how the text is extracted, the start and end date were switched
				const [end, start] = eventString.match(timeRegex);
				const [eventName] = eventString.split(timeRegex);
				cal.addEvent(
					eventName.trim().replaceAll(filterText, '').trim(),
					eventName.trim().replaceAll(filterText, '').trim(),
					'',
					buildTimeString(date, start),
					buildTimeString(date, end)
				);
			});
		});
		cal.download(filename);
	}

	const productiveTimesOrigin2 = rawText.match(regexCombinedOrigin2);

	if (productiveTimesOrigin2) {
		const splitRegEx = /[a-zA-Z\s]+-?\/?[a-zA-Z\s]+/g;
		productiveTimesOrigin2.forEach(item => {
			const [date] = item.match(dateRegex);
			if (item.includes(holidayString) && urlaubCbx.checked) {
				cal.addEvent(
					urlaubTitleInput.value.trim(),
					'',
					'',
					buildTimeString(date, '00:00'),
					buildTimeString(date, '00:00')
				);
			} else {
				const [start, end] = item.match(timeRegex);
				const [eventName] = item.match(splitRegEx);

				cal.addEvent(
					eventName.trim().replaceAll(filterText, '').trim(),
					eventName.trim().replaceAll(filterText, '').trim(),
					'',
					buildTimeString(date, start),
					buildTimeString(date, end)
				);
			}
		});
		cal.download(filename);
		return;
	}

	warningDiv.classList.add('show');
	return;
}

function isOrigin1(rawText) {
	return rawText.includes(origin1Identifier) || originSwitch;
}

// expects format dd.mm.yyyy
// returns format mm/dd/yyy
// required for correct creation of calender events
function formatDate(date) {
	const [day, month, year] = date.split('.');
	return `${month}/${day}/${year}`;
}

function buildTimeString(date, time) {
	return `${formatDate(date)} ${time}`;
}

function resetWarning() {
	warningDiv.classList.remove('show');
}

function toggleVisibility(node) {
	node.classList.toggle('show');
}

function createICS() {
	if (!fileInput.files[0]) {
		return;
	}
	const fReader = new FileReader();
	fReader.readAsDataURL(fileInput.files[0]);
	fReader.onloadend = function (event) {
		convertDataURIToBinary(event.target.result);
	};
}

const BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
	const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	const base64 = dataURI.substring(base64Index);
	const raw = window.atob(base64);
	const rawLength = raw.length;
	const array = new Uint8Array(new ArrayBuffer(rawLength));

	for (let i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}
	getAllPagesTexts(array);
}

function getAllPagesTexts(pdfAsArray) {
	pdfjsLib.getDocument(pdfAsArray).promise.then(
		pdfDocument => {
			const pagesPromises = [];

			for (let i = 0; i < pdfDocument._pdfInfo.numPages; i++) {
				// Required to prevent that i is always the total of pages
				(pageNumber => {
					pagesPromises.push(getPageText(pageNumber, pdfDocument));
				})(i + 1);
			}

			Promise.all(pagesPromises).then(pagesText => {
				if (singleEventCbx.checked) {
					createSingleEvent(pagesText);
				} else {
					createMultipleEvents(pagesText);
				}
			});
		},
		error => {
			console.error(error);
		}
	);
}

function getPageText(pageNum, pdfDocument) {
	return new Promise((resolve, reject) => {
		pdfDocument.getPage(pageNum).then(pdfPage => {
			pdfPage.getTextContent().then(textContent => {
				const textItems = textContent.items;
				let finalString = '';

				for (let i = 0; i < textItems.length; i++) {
					const item = textItems[i];
					finalString += item.str + ' ';
				}

				resolve(finalString);
			});
		});
	});
}
