import App from './App.svelte';

const target = document.querySelector('#dashboard-spa');

if (target) {
    new App({ target });
}
