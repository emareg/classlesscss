# Classless.css

Classless.css is one small CSS file, which defines few but great styles for basic HTML5 tags plus a few classes for grid and spacing. Nothing more. Nothing less.

**Demo:** at [classless.de](http://classless.de)



## Features

* **Small.** Only 400 lines of pure CSS3 for tooltips, grid, navigation bar, cards and more.
* **Single File.** Everything in one file, no dependencies, no JavaScript.
* **Modular.** Don't need all features? The CSS file is structured into feature groups, simply delete what you don't need¹.
* **Responsive.** We use media queries, em/rem units, and smart overflows for tables and code.
* **Bootstrap Compatible.** Special features that require classes use the same names as Bootstrap.

¹: we also offer a pre-made tiny version (90 lines) with only the base styles.


## Getting Started

For testing, you can simply insert the following line into your HTML file. For production, please host the classless.css file yourself.
    
```html
<link rel="stylesheet" href="https://classless.de/classless.css">
```


### Embedding Font 'Open Sans'
Classless looks best with the font 'Open Sans'. Earlier versions of Classless directly imported the font from [Google Fonts](https://fonts.google.com/specimen/Open+Sans). However, this leaks the visitor's IP to Google servers which is [not compliant](https://www.theregister.com/2022/01/31/website_fine_google_fonts_gdpr/) with EU's GDPR. We therefore leave it to the user to choose how to import the font. Click on one of the following three methods


<details>
  <summary><strong>1. Import from Google Font Anyway.</strong></summary>

Add the following line to Classless.css:

```css
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400');
```

In order to be compliant with GDPR, you need to ask for the visitor's consent.

</details>



<details>
  <summary><strong>2. Use a GDPR compliant CDN.</strong></summary>

Instead of using Google, you could import the font from a CDN that is GDPR compliant. Candidates (no guarantee) are

#### CDN Fonts
Offers the fonts but no idea where this service is hosted or how it processes IP addresses.

```css
@import url('http://fonts.cdnfonts.com/css/open-sans');
```



#### Unpkg
[Unpkg](https://unpkg.com/) hosts files of NPM packages, including `fontsource`.
They also have an [open issue](https://github.com/mjackson/unpkg/issues/294) regarding GDPR compliance, but as of 2022 there is no statement. Since the CSS files are written for local access (relative paths), you need to add the following font definitions.

```css
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url('https://unpkg.com/@fontsource/open-sans@4.5.8/files/open-sans-all-400-normal.woff') format('woff');
}

@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-display: swap;
  font-weight: 700;
  src: url('https://unpkg.com/@fontsource/open-sans@4.5.8/files/open-sans-all-400-normal.woff') format('woff');
}

@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-display: swap;
  font-weight: 400;
  src: url('https://unpkg.com/@fontsource/open-sans@4.5.8/files/open-sans-all-400-italic.woff') format('woff');
}
```



</details>



<details>
  <summary><strong>3. Host Fonts Yourself.</strong></summary>

#### Add Manually
The following project offers a step-by-step explanation for hosting Google fonts on your own server:

https://google-webfonts-helper.herokuapp.com/fonts/open-sans?subsets=latin


#### Using NPM

Install fontsource and add `@import '@fontsource/open-sans';` to classless.css

```bash
npm install @fontsource/open-sans
echo -e "\n@import '@fontsource/open-sans';\n" >> classless.css
```



</details>&nbsp;



Besides that, Classless looks nice with many fonts and you can choose any other font you like.



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

