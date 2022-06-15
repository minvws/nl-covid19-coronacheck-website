CCScanner_downloads_plot_raw = [
    {
        date: "2021-03-28", 
        downloads: 237
    },
    {
        date: "2021-04-04", 
        downloads: 331
    },
    {
        date: "2021-04-11", 
        downloads: 1934
    },
    {
        date: "2021-04-18", 
        downloads: 3730
    },
    {
        date: "2021-04-25", 
        downloads: 5458
    },
    {
        date: "2021-05-02", 
        downloads: 6398
    },
    {
        date: "2021-05-09", 
        downloads: 7378
    },
    {
        date: "2021-05-16", 
        downloads: 8142
    },
    {
        date: "2021-05-23", 
        downloads: 13578
    },
    {
        date: "2021-05-30", 
        downloads: 17016
    },
    {
        date: "2021-06-06", 
        downloads: 26904
    },
    {
        date: "2021-06-13", 
        downloads: 33952
    },
    {
        date: "2021-06-20", 
        downloads: 53821
    },
    {
        date: "2021-06-27", 
        downloads: 262348
    },
    {
        date: "2021-07-04", 
        downloads: 397372
    },
    {
        date: "2021-07-11", 
        downloads: 491841
    },
    {
        date: "2021-07-18", 
        downloads: 554220
    },
    {
        date: "2021-07-25", 
        downloads: 601111
    },
    {
        date: "2021-08-01", 
        downloads: 641847
    },
    {
        date: "2021-08-08", 
        downloads: 679457
    },
    {
        date: "2021-08-15", 
        downloads: 720303
    },
    {
        date: "2021-08-22", 
        downloads: 752788
    },
    {
        date: "2021-08-29", 
        downloads: 781461
    },
    {
        date: "2021-09-05", 
        downloads: 811810
    },
    {
        date: "2021-09-12", 
        downloads: 844162
    },
    {
        date: "2021-09-19", 
        downloads: 978263
    },
    {
        date: "2021-09-26", 
        downloads: 1215228
    },
    {
        date: "2021-10-03", 
        downloads: 1397778
    },
    {
        date: "2021-10-10", 
        downloads: 1497258
    },
    {
        date: "2021-10-17", 
        downloads: 1594784
    },
    {
        date: "2021-10-24", 
        downloads: 1675985
    },
    {
        date: "2021-10-31", 
        downloads: 1778053
    },
    {
        date: "2021-11-07", 
        downloads: 2082709
    },
    {
        date: "2021-11-14", 
        downloads: 2293167}, 
    {
        date: "2021-11-21", 
        downloads: 2419318
    },
    {
        date: "2021-11-28", 
        downloads: 2505009
    },
    {
        date: "2021-12-05", 
        downloads: 2556940
    },
    {
        date: "2021-12-12", 
        downloads: 2601576
    },
    {
        date: "2021-12-19", 
        downloads: 2643836}, 
    {
        date: "2021-12-26", 
        downloads: 2695422
    },
    {
        date: "2022-01-02", 
        downloads: 2721694
    },
    {
        date: "2022-01-09", 
        downloads: 2748959
    },
    {
        date: "2022-01-16", 
        downloads: 2777990
    },
    {
        date: "2022-01-23", 
        downloads: 2809813
    },
    {
        date: "2022-01-30", 
        downloads: 2866504
    },
    {
        date: "2022-02-06", 
        downloads: 2937211
    },
    {
        date: "2022-02-06", 
        downloads: 2937211
    },
    {
        date: "2022-02-13", 
        downloads: 3002054
    },
    {
        date: "2022-02-20", 
        downloads: 3034991
    },
    {
        date: "2022-02-27", 
        downloads: 3055458
    },
    {
        date: "2022-03-06", 
        downloads: 3067385
    },
    {
        date: "2022-03-18",
        downloads: 3097042,
    },
    {
        date: "2022-03-30",
        downloads: 3098613 
    },
    {
        date: "2022-04-12",
        downloads: 3109676,
    },
    {
        date: "2022-04-15",
        downloads: 3111542
    },
    {
        date: "2022-04-22",
        downloads: 3118952
    },
    {
        date: "2022-04-29",
        downloads: 3125580
    },
    {
        date: "2022-05-06",
        downloads: 3131901
    },
    {
        date: "2022-05-13",
        downloads: 3137206
    },
    {
        date: "2022-05-20",
        downloads: 3142217
    },
    {
        date: "2022-05-27",
        downloads: 3147660
    },
    {
        date: "2022-06-03",
        downloads: 3153293
    },
    {
        date: "2022-06-10",
        downloads: 3157918
    }
]

const CCScanner_downloads_plot = CCScanner_downloads_plot_raw.map(({date, ...rest}) => {
  return {date: new Date(date), ...rest};
});
