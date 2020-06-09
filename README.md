# 🦦 Aotter Ad Sdk
可讓開發者可以在自己的網站頁面中顯示廣告的 javascript sdk

## Usage

1. 引入 `aotter-ad.min.js` 至 html 檔

```html
...
<head>
    ...
    <script src="dist/aotters-ad.min.js">
    ...
</head>
...
```

2. 在要顯示廣告的 html tag 中加上 `aotter-ad` 的 id
```html
...
<body>
    ...
    <div id="aotter-ad"></div>
    ...
</body>
...
```
3. 於 script 中加入啟動的 js
```js
window.onload = function() {
    AotterAd.init()
}
```

4. 廣告顯示在頁面了！ 收工！🎉🎉

## Config

### AotterAd.init(selector, AdType) 啟動廣告
| arguments    | type   | default    | description                                          |
| ------------ | ------ | ---------- | ---------------------------------------------------- |
| selector     | String | #aotter-ad | 廣告要插入的元素，須為有效的 CSS 選擇器              |
| requiredType | String | BANNER     | 指定廣告類型，有 `BANNER` 橫幅廣告、`VIDEO` 影音廣告 |

```js
// example

Aotter.init('#my-custom-ad-container', 'VIDEO')
```
## Custom Events 
| EventName        | description                             |
| ---------------- | --------------------------------------- |
| on-ad-loaded     | 廣告載入成功觸發                        |
| on-ad-failed     | 廣告載入失敗觸發                        |
| on-ad-impression | 廣告出現在畫面上超過 50% 至少一秒時觸發 |

```js
// example

document.addEventListener(EventName, ()=> {
    console.log('something happend!')
    //... your code...
})

```

## Development 

1. 安裝 [Parcel](https://parceljs.org/)，本專案的打包工具
```shell
yarn global add parcel-bundler

# or
npm install -g parcel-bundler
```
2. 安裝 mock server 所需的 `express.js`

```shell
# install
npm install

# or
yarn install
```

3. 開啟 mock server
```shell
npm run server

# or
yarn server

# server will running on http://localhost:3000
```

4. 進入開發模式
```shell 
yarn dev

# or
npm run dev

# src/example.html will running on http://localhost:80
```

5. 執行測試
```shell
yarn test

# or

npm run test
```
## Demonstrate
1. 安裝 mock server 所需的 `express.js` 及 網頁 demo 所需的 `http-server`

```shell
# install
npm install

# or
yarn install
```

2. 開啟 mock server
```shell
npm run server

# or
yarn server

# server will running on http://localhost:3000
```

3. 執行 demo page
```shell
npm run demo

# or

yarn demo
# server will running on http://localhost:8080
```


## Contact


lawtrooper@gmail.com

