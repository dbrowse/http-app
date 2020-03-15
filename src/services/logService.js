import * as Sentry from "@sentry/browser";

function init() {
	Sentry.init({
		dsn: "https://63802cc0d9e54b368387a4a190d0e6f5@sentry.io/4801632"
	});
}

function logError() {
	Sentry.captureException(error);
}

export default {
	init,
	log
};
