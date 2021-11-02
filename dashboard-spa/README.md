# CoronaCheck Dashboard

The CoronaCheck Dashboard is an embedded single-page app which shows some key figures from the CoronaCheck-app.

## Configuration

The Dashboard requires a JSON data URL. By default it will use the relative URL `/api/dashboard.json`. This can be overridden via the `CC_DASHBOARD_DATA_URL` environment variable. During development, this can be done via a `.env` file. See `.env.example` for an example.

## Development

1. make sure you've built the parent jekyll site and its build artifacts are available at `../public`
2. make sure you have node.js v14 available on your system
3. run `npm install`
4. run `npm run dev`

## Build for deployment

Follow the steps above, and then...

5. run `run run build`
6. copy `dist/*` to `../public/js`

N.B.: if set, `CC_DASHBOARD_DATA_URL` will be "baked into" the final JS file. Make sure to use a relative URL that will work in all deployment environments.

## Using the data mock

Setting the `CC_DASHBOARD_MOCK` environment variable allows you to locally test with mocked data, a mocked API failure, or infinite loading state.

- `CC_DASHBOARD_MOCK=data` loads for 1.5 seconds and then resolves with mocked data from 2021-11-01
- `CC_DASHBOARD_MOCK=error` loads for 1.5 seconds and then sets the error state
- `CC_DASHBOARD_MOCK=loading` keeps loading ad infinitum
