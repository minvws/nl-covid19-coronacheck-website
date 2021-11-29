import { derived, writable } from 'svelte/store';
import { dataUrl, mock } from './config.js';

export const state = writable('idle');
export const data = writable(undefined);
export const error = writable(undefined);
export const loading = derived(state, ($state) => $state === 'loading');

let requestCount = 0;

export const refresh = () => {
    let current = ++requestCount;
    state.set('loading');
    if (mock) {
        if (mock === "loading") {
            return;
        }
        setTimeout(() => {
            if (mock instanceof Error) {
                state.set('failed');
                error.set(mock);
            } else {
                state.set('idle');
                data.set(mock);
                error.set(undefined);
            }
        }, 1500);
        return;
    }
    fetch(dataUrl)
        .then((response) => {
            if (requestCount !== current) {
                return;
            }
            if (!response.ok) {
                throw new Error(
                    'Failed: ' + response.status + '  ' + response.statusText
                );
            }
            return response.json().then((responseData) => {
                state.set('idle');
                data.set(responseData);
                error.set(undefined);
            });
        })
        .catch((e) => {
            state.set('failed');
            error.set(e);
        });
};

refresh();
