//make sure sw are supported
if('serviceWorker' in navigator){
	console.log("Service worker supported!");

	//// register service workers
	window.addEventListener('load', () => {
		navigator.serviceWorker
		.register('../service-worker.js')
		.then(reg => console.log('service worker registered'))
		.catch(err => console.log(`Service Worker Error: ${err}`));
	})
}
