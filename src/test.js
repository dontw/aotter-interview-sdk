import AotterAd from "./AotterAd";

const bannerData = {
    id: "1558497375672-224",
    type: "BANNER",
    title: "三星電視獨家搶先支援Apple TV App，手機還能一秒變遙控器！",
    description:
        "好消息！三星在本週宣布~即日起旗下2019年全系列智慧電視、和2018年的指定機型將可透過更新支援Apple TV App以及Airplay2啦！",
    image:
        "https://agirls.aotter.net/media/da724a8b-fe19-4f4e-8262-75c207ae038b.jpg",
    url: "https://agirls.aotter.net/post/55419",
    impression_url: "https://agirls.aotter.net?imp=1",
    success: true,
};

const videoData = {
    id: "1558497398011-670",
    type: "VIDEO",
    title: "Google Pixel 3a XL使用一週心得 拍照有輸Pixel 3嗎？",
    description:
        "Google新出的Pixel 3a系列，定位在中階機款，卻擁有OLED螢幕，和可比旗艦機的強悍拍照功能，那整體使用體驗到底是如何呢？使用體驗跟Pixel 3有差很多嗎？",
    image:
        "https://agirls.aotter.net/media/60dcde35-6798-4784-8985-78323c7ec75b.jpg",
    video_url: "https://www.youtube.com/embed/lquZJyVj3-I",
    impression_url: "https://agirls.aotter.net?imp=2",
    success: true,
};

const noAdData = {
    success: false,
};

const testing = (describe, testValue, cb) => {
    try {
        const value = cb();
        if (value === testValue) {
            console.log("✅ " + describe + " is success! ");
        } else {
            console.log("🚨 " + describe + " is failed!");
        }
    } catch (err) {
        console.log("🚨 " + describe + " is failed!");
    }
};

testing("Testing Function Example", true, () => true);

testing("Testing Function Example", true, () => false);

testing(
    "Render banner",
    '\n                <a class="aotter-card" href="https://agirls.aotter.net/post/55419" target="_blank" title="好消息！三星在本週宣布~即日起旗下2019年全系列智慧電視、和2018年的指定機型將可透過更新支援Apple TV App以及Airplay2啦！">\n                <div class="image" style="background-image: url(https://agirls.aotter.net/media/da724a8b-fe19-4f4e-8262-75c207ae038b.jpg)"></div>\n                <div class="content">\n                    <div class="icon">i</div>\n                    <h5 class="domain">AGIRLS.AOTTER.NET</h5>\n                    <h4 class="title">三星電視獨家搶先支援Apple TV App，手機還能一秒變遙控器！</h4>\n                    </div>\n                </a>\n                ',
    () => {
        var elm = document.createElement("div");
        AotterAd.render(elm, bannerData);
        return elm.innerHTML;
    }
);

testing(
    "Render Video",
    '\n                    <iframe class="aotter-video" src="https://www.youtube.com/embed/lquZJyVj3-I" alt="Google Pixel 3a XL使用一週心得 拍照有輸Pixel 3嗎？" allowfullscreen=""></iframe>\n                ',
    () => {
        var elm = document.createElement("div");
        AotterAd.render(elm, videoData);
        return elm.innerHTML;
    }
);

testing(
    "Render No Ad",
    "\n            <div>\n                目前尚未有廣告！\n            </div>\n            ",
    () => {
        var elm = document.createElement("div");
        AotterAd.render(elm, noAdData);
        return elm.innerHTML;
    }
);
