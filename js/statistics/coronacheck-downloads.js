CC_downloads_plot_raw = [
    {
        date: "2021-03-28", 
        downloads: 4947
    },
    {
        date: "2021-04-04", 
        downloads: 5498
    },
    {
        date: "2021-04-11", 
        downloads: 31850
    },
    {
        date: "2021-04-18", 
        downloads: 77591
    },
    {
        date: "2021-04-25", 
        downloads: 120887
    },
    {
        date: "2021-05-02", 
        downloads: 135732
    },
    {
        date: "2021-05-09", 
        downloads: 150473
    },
    {
        date: "2021-05-16", 
        downloads: 161449
    },
    {
        date: "2021-05-23", 
        downloads: 221506
    },
    {
        date: "2021-05-30", 
        downloads: 250947
    },
    {
        date: "2021-06-06", 
        downloads: 369260
    },
    {
        date: "2021-06-13", 
        downloads: 518629
    },
    {
        date: "2021-06-20", 
        downloads: 947275
    },
    {
        date: "2021-06-27", 
        downloads: 3046229
    },
    {
        date: "2021-07-04", 
        downloads: 4559032
    },
    {
        date: "2021-07-11", 
        downloads: 5494752
    },
    {
        date: "2021-07-18", 
        downloads: 6337007
    },
    {
        date: "2021-07-25", 
        downloads: 7006621
    },
    {
        date: "2021-08-01", 
        downloads: 7628880
    },
    {
        date: "2021-08-08", 
        downloads: 8226583
    },
    {
        date: "2021-08-15", 
        downloads: 8756426
    },
    {
        date: "2021-08-22", 
        downloads: 9138598
    },
    {
        date: "2021-08-29", 
        downloads: 9446082
    },
    {
        date: "2021-09-05", 
        downloads: 9745140
    },
    {
        date: "2021-09-12", 
        downloads: 10048297
    },
    {
        date: "2021-09-19", 
        downloads: 10798244
    },
    {
        date: "2021-09-26", 
        downloads: 11583967
    },
    {
        date: "2021-10-03", 
        downloads: 12127703
    },
    {
        date: "2021-10-10", 
        downloads: 12449551
    },
    {
        date: "2021-10-17", 
        downloads: 12721065
    },
    {
        date: "2021-10-24", 
        downloads: 12987812
    },
    {
        date: "2021-10-31", 
        downloads: 13206963
    },
    {
        date: "2021-11-07", 
        downloads: 13516537
    },
    {
        date: "2021-11-14", 
        downloads: 13753475
    },
    {
        date: "2021-11-21", 
        downloads: 13926691}, 
    {
        date: "2021-11-28", 
        downloads: 14101764
    },
    {
        date: "2021-12-05", 
        downloads: 14244634
    },
    {
        date: "2021-12-12", 
        downloads: 14374312
    },
    {
        date: "2021-12-19", 
        downloads: 14498218
    },
    {
        date: "2021-12-26", 
        downloads: 14594925}, 
    {
        date: "2022-01-02", 
        downloads: 14693906
    },
    {
        date: "2022-01-09", 
        downloads: 14800299
    },
    {
        date: "2022-01-16", 
        downloads: 14898468
    },
    {
        date: "2022-01-23", 
        downloads: 15018093
    },
    {
        date: "2022-01-30", 
        downloads: 15185929
    },
    {
        date: "2022-02-06", 
        downloads: 15339548
    },
    {
        date: "2022-02-06", 
        downloads: 15339548
    },
    {
        date: "2022-02-13", 
        downloads: 15469220
    },
    {
        date: "2022-02-20", 
        downloads: 15561861
    },
    {
        date: "2022-02-27", 
        downloads: 15641481
    },
    {
        date: "2022-03-06", 
        downloads: 15704093
    },
    {
        date: "2022-03-11", 
        downloads: 15736349
    },
    {
        date: "2022-03-18", 
        downloads: 15789335
    },
    {
        date: "2022-03-25", 
        downloads: 15847837
    },
    {
        date: "2022-03-30", 
        downloads: 15887689
    },
    {
        date: "2022-04-12", 
        downloads: 15980355
    },
    {
        date: "2022-04-15",
        downloads: 15993650
    }
]

const CC_downloads_plot = CC_downloads_plot_raw.map(({date, ...rest}) => {
  return {date: new Date(date), ...rest};
});
