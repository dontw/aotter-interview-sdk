const API_URL = "http://localhost:3000";

const onAdLoadedEvent = new CustomEvent("on-ad-loaded");
const onAdFailedEvent = new CustomEvent("on-ad-failed");
// const onAdImpressionEvent = new CustomEvent('on-ad-impression');

export default {
    impressionStatus: false,

    /**
     * AotterAd initiation function
     *
     * @param {string} [selectorName="#aotter-ad"] css selector
     * @param {string} [adType="BANNER"] ad type: BANNER, VIDEO
     */
    init(selectorName = "#aotter-ad", adType = "BANNER") {
        const AdElement = document.querySelector(selectorName);
        if (!AdElement) {
            console.error("AotterAd: Can' find the element!");
            return;
        }
        this.addStyle();
        this.fetchAd(adType)
            .then((json) => {
                this.render(AdElement, json);
                document.dispatchEvent(onAdLoadedEvent);

                // if ad data has success status, init check impression function
                if (json.success) {
                    console.log("add success!");
                    this.checkAdImpression(AdElement, json.impression_url);
                    document.addEventListener("scroll", () => {
                        this.checkAdImpression(AdElement, json.impression_url);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                document.dispatchEvent(onAdFailedEvent);
            });
    },

    /**
     * Add AotterAd's css style to html's head tag
     */
    addStyle() {
        const head = document.head || document.getElementsByTagName("head")[0];
        const style = document.createElement("style");
        const css = `
            .aotter-card {
                border: 1px solid #DEE0E3;
                display:block;
                color:  #1C2028;
                background-color: #EAEAED;
            }

            .aotter-card:hover {
                text-decoration: none; 
            }

            .aotter-card .image {
                width: 100%;
                padding-bottom:60%;
                background-size: cover;
                background-repeat: no-repeat;
            }
            
            .aotter-card .content {
                padding: 15px;
                position: relative;
            }

            .aotter-card .icon {
                width:32px;
                height: 32px;
                background: white;
                position: absolute;
                top: -16px;
                right: 15px;
                border-radius: 9999px;
                text-align: center;
                line-height: 32px;
                font-weight: bold;
            }

            .aotter-card h4 {
                color: #1C2028;
            }

            .aotter-card h5 {
                color: gray;
            }

            .aotter-video {
                border: none;
                width: 100%;
                height: 100%;
                min-height:500px;
            }

        `;

        head.appendChild(style);
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
    },

    /**
     * Fetch ad data from API_URL server
     */
    fetchAd(adType) {
        return fetch(API_URL + `/ads?type=${adType}`).then((response) =>
            response.json()
        );
    },

    getDomain(url) {
        const domainRegex = /(\:\/\/)([a-z]|[0-9]|\.|\-)+/g;
        return url.match(domainRegex)[0].replace("://", "").toUpperCase();
    },

    checkAdImpression(adElm, url) {
        // impression reveal percentage
        const PERCENTAGE = 50;

        // check if impresseion checked before
        if (this.impressionStatus) {
            return;
        }

        if (this.checkAdElmPercentage(adElm, PERCENTAGE)) {
            this.impressionStatus = true;

            // console.log(
            //     "is 50% up",
            //     this.checkAdElmPercentage(adElm, PERCENTAGE)
            // );

            //check impresseion percentage 1 second later
            setTimeout(() => {
                if (this.checkAdElmPercentage(adElm, PERCENTAGE)) {
                    if (!this.checkAdImpressionUrl(url)) {
                        this.sendAdImpression(url);
                    }
                } else {
                    this.impressionStatus = false;
                }
            }, 1000);
        }
    },

    // check if ad impression url is in the storage
    checkAdImpressionUrl(url) {
        const storageAdImpressionUrls = JSON.parse(
            localStorage.getItem("adImpressionUrls")
        );

        // if there's no urls in storage
        if (
            !storageAdImpressionUrls ||
            !storageAdImpressionUrls.includes(url)
        ) {
            if (Array.isArray(storageAdImpressionUrls)) {
                storageAdImpressionUrls.push(url);
                localStorage.setItem(
                    "adImpressionUrls",
                    JSON.stringify(storageAdImpressionUrls)
                );
            } else {
                localStorage.setItem("adImpressionUrls", JSON.stringify([url]));
            }
            return false;
        } else {
            console.log("this ad url has sent before!");
            return true;
        }
    },

    sendAdImpression(url) {
        console.log("send impression to", url);
    },

    checkAdElmPercentage(adElm, percentage = 50) {
        const rect = adElm.getBoundingClientRect();
        const elmTop = rect.top;
        const elmBottom = rect.bottom;
        const elmHeight = elmBottom - elmTop; // calculate ad element's height
        return elmBottom - elmHeight * percentage * 0.01 < window.innerHeight;
    },

    render(element, data) {
        if (data.success) {
            let content = `<div>尚未有本類型廣告</div>`;

            if (data.type === "BANNER") {
                content = `
                <a class="aotter-card" href="${
                    data.url
                }" target="_blank" title="${data.description}">
                <div class="image" style="background-image: url(${
                    data.image
                })"></div>
                <div class="content">
                    <div class="icon">i</div>
                    <h5 class="domain">${this.getDomain(data.url)}</h5>
                    <h4 class="title">${data.title}</h4>
                    </div>
                </a>
                `;
            }

            if (data.type === "VIDEO") {
                content = `
                    <iframe class="aotter-video" src="${data.video_url}" alt="${data.title}" allowFullScreen></iframe>
                `;
            }

            element.innerHTML = content;
        } else {
            element.innerHTML = `
            <div>
                目前尚未有廣告！
            </div>
            `;
        }
    },
};
