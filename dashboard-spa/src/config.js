export const dataUrl =
    import.meta.env.CC_DASHBOARD_DATA_URL || '/api/dashboard.json';

export const mock =
    import.meta.env.CC_DASHBOARD_MOCK === 'data'
        ? {
              dcc: {
                  total: {
                      vaccination: 7107574,
                      recovery: 380569,
                      test: 1161643,
                  },
                  week: { vaccination: 112, recovery: 33, test: 33 },
                  month: { vaccination: 1555, recovery: 150, test: 157 },
              },
              appstats: {
                  android: { downloads: 5767048, active: 0 },
                  ios: { downloads: 5031608, active: 0 },
              },
              date: '01-11-2021',
              version: 1,
          }
        : import.meta.env.CC_DASHBOARD_MOCK === 'error'
        ? new Error('Mock error')
        : import.meta.env.CC_DASHBOARD_MOCK === 'loading'
        ? 'loading'
        : false;
