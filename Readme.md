# Classless.css

Classless.css is one small CSS file, which defines few but great styles for basic HTML5 tags plus a few classes for grid and spacing. Nothing more. Nothing less.

**Demo:** at [classless.de](http://classless.de)



## Features

* **Small.** Only 400 lines of pure CSS3 for themes, grid, navigation bar, cards and more¹.
* **Single File.** Everything in one file, no dependencies¹, no JavaScript, no exceptions.
* **Modular.** Don't need all features?² The CSS file is structured into feature groups. Simply delete what you don't need.
* **Responsive.** We use media queries, rem units, and smart overflows for tables and code.
* **Bootstrap Compatible.** Special features that require classes use the same names as Bootstrap.

¹: we import the font 'Open Sans' but if it fails, we fallback to Helvetica.</br>
²: we also offer a pre-made tiny version (90 lines) with only the base styles.


## Getting Started

For testing, you can simply insert the following line into your HTML file. For production, please host the classless.css file yourself.
    
```
<link rel="stylesheet" href="https://classless.de/classless.css">
```



## Comparison of Minimal Frameworks

|           | Classless  | Skeleton   | Milligram  | Sakura     |
|-----------|------------|------------|------------|------------|
| Features  | responsive | responsive | responsive | responsive |
|           | grid       |      grid  |      grid  |            |
|           | utilities  |            | utilities  |            |
|           | navbar     |            |            |            |
| Size	    | 11.2kB     |    11.2 kB |   10.3 kB  |    3.3 kB  |
| LOC       | 400        |     400    |     600    |      165   |




## Classeless 0.94 Tests


| Browser                       | Appearance | 
|-------------------------------|------------|
| Chromium 87.0 on Ubuntu 18.04 | perfect    |
| FireFox 85.0  on Ubuntu 18.04 | perfect    |
| FireFox 84.0  on Windows 10   | perfect    |
| Edge 42.17 on Windows 10      | very good¹ |
| Edge 88.0 on Windows 10       | perfect    |
| IE 11 on Windows 10           | poor²      |
| FireFox 85.1 on Android 10    | perfect    |
| Samsung Browser on Android 10 | perfect    |
| Safari on iPhone 10           | perfect    |


¹: drop letter slightly below baseline, citations slightly too high<br>
²: body full width, table and code styles ignored, cite elements overlap text
