// ==UserScript==
// @name         douyu-blocker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  屏蔽斗鱼的傻逼主播
// @author       You
// @match        *://www.douyu.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  let count = 0;
  let doing;
  const fun = () => {
    const urls = ["500269", "60937"];
    const parent = document.querySelector(".layout-Cover-list");
    const childrens = document.querySelector(".layout-Cover-list").children;

    const urlSet = new Set(urls);
    const shouldDelete = [];

    for (const children of childrens) {
      if (children.firstChild && children.firstChild.firstChild) {
        const target = children.firstChild.firstChild.href.match(
          /https:\/\/www\.douyu\.com\/(.+)/
        );
        if (urlSet.has(target && target[1])) {
          shouldDelete.push(children);
        }
      }
    }
    shouldDelete.forEach((item) => {
        item.style.display = 'none'
    });
    count++;
    if (count === 10) {
      console.log("clear");
      clearInterval(doing);
    }
  };

  doing = setInterval(() => {
    console.log(count);
    fun();
  }, 200);
})();
