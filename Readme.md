# Classless.css

Classless.css is one small CSS file, which defines few but great styles for basic HTML5 tags plus a few classes for grid and spacing. Nothing more. Nothing less.

**Demo:** at [classless.de](http://classless.de)



## Features

* **Small.** Only 400 lines of pure CSS3 for tooltips, grid, navigation bar, cards and more.
* **Single File.** Everything in one file, no dependencies¹, no JavaScript.
* **Modular.** Don't need all features? The CSS file is structured into feature groups, simply delete what you don't need².
* **Responsive.** We use media queries, em/rem units, and smart overflows for tables and code.
* **Bootstrap Compatible.** Special features that require classes use the same names as Bootstrap.

¹: we import the font 'Open Sans' but if it fails, we fallback to Helvetica.</br>
²: we also offer a pre-made tiny version (90 lines) with only the base styles.


## Getting Started

For testing, you can simply insert the following line into your HTML file. For production, please host the classless.css file yourself.
    
```
<link rel="stylesheet" href="https://classless.de/classless.css">
```



## Comparison of Minimal Frameworks

<table>
  <thead>
    <tr>
      <th></th>      
      <th>Classless</th>      
      <th><a href="http://getskeleton.com/">Skeleton</a></th>
      <th><a href="https://milligram.io/">Milligram</a></th>
      <th><a href="https://oxal.org/projects/sakura/">Sakura</a></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Features</td>      
      <td>responsive, grid,<br>themes, navbar,<br>cards, utilities</td>      
      <td>responsive,<br>grid</td>      
      <td>responsive,<br>grid, utilities</td>
      <td>responsive</td>
    </tr>
    <tr>
      <td data-tooltip="Size of the readable, non-minified code (these tiny libs don't need minimizers)">Size</td>      
      <td>11.2 kB<br>400 LOC</td>      
      <td>11.2 kB<br>400 LOC</td>      
      <td>10.3 kB<br>600 LOC</td>
      <td>3.3 kB <br>165 LOC</td>
    </tr>
    <tr>
      <td>Reset</td>      
      <td>tiny reset</td>      
      <td>normalize</td>      
      <td>normalize</td>
      <td>normalize</td>
    </tr>
    <tr>
      <td>Browsers</td>      
      <td>Chrome, FF,<br>Edge</td>      
      <td>Chrome, FF</td>      
      <td>Chrome, FF, Opera<br> Edge, Safari</td>      
      <td>Chrome, FF</td>
    </tr>
    <tr>
      <td>License</td>      
      <td>MIT</td>      
      <td>MIT</td>      
      <td>MIT</td>      
      <td>MIT</td>      
    </tr>          
  </tbody>
</table>


## Classeless Support


| Browser                       | Support v94 | Support v95 | Support v1.0 | 
|-------------------------------|-------------|-------------|--------------|
| Chromium 96.0 on Ubuntu 20.04 | --          | perfect     | perfect      |
| FireFox 97.0  on Ubuntu 20.04 | --          | perfect     | perfect      |
| FireFox 84.0  on Windows 10   | perfect     | perfect     | perfect      |
| Edge 88.0 on Windows 10       | perfect     | perfect     | perfect      |
| IE 11 on Windows 10           | poor/good¹  | poor/good¹  | poor/good¹   |
| FireFox 85.1 on Android 10    | perfect     | perfect     | perfect      |
| Samsung Browser on Android 10 | perfect     | perfect     | perfect      |
| Safari on iPhone 10           | perfect     | --          | good²        |


¹: Classless-full: body full width, table and code styles ignored, cite elements overlap text. However, classless-tiny without variables looks good.<br>
²: card borders not rounded

