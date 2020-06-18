function hashsplit(str) {
	var list = str.match(/^#\/*(.*?)\/*$/);
	if (list != null && list[1] != "") return list[1].split(/\/+/);
	else return null;
}
function pdec(pointer) {
	while (pointer.length % 4 != 0) pointer += "=";
	return decodeURI(Base64.decode(pointer));
}
function redirect1(dest) {
	var dest = pdec(dest);
	if (dest.startsWith("//")) dest = `https:${dest}`;
	console.log(dest);
	document.body.innerHTML = "";
	document.body.style = "margin: 2.7rem";
	document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Click to redirect...</h1>\n\t<br />\n\t<a href="${encodeURI(dest)}">> ${dest}</a>\n`;
}
function redirect2(dest) {
	console.log(dest);
	document.body.innerHTML = "";
	document.body.style = "margin: 2.7rem";
	document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Redirecting...</h1>\n\t<br />\n\t<a href="${encodeURI(dest)}">> Click here if you are not redirected.</a>\n`;
	location.replace(dest);
}
function hash_func() {
	var list = hashsplit(location.hash);
	if (list == null) return null;
	for (var i = 0; i < list.length; i++) {
		var para = list[i].replace(/=*$/, "").split("=");
		switch (para.length) {
			case 2:
				para[1] = decodeURI(para[1].replace(/\*/g, "/"));
				switch (para[0]) {
					case "url":
						try {
							redirect1(para[1]);
						} catch (e) {
							console.log("Invalid pointer.");
						}
						break;
					case "b":
						redirect2(`https://b23.tv/${para[1]}`);
					case "e":
					case "eg":
						redirect2(`https://e-hentai.org/g/${para[1]}`);
						break;
					case "es":
						redirect2(`https://e-hentai.org/s/${para[1]}`);
						break;
					case "ew":
						redirect2(`https://ehwiki.org/index.php?title=Special:Search&fulltext=Search&search=${encodeURIComponent(para[1])}`);
						break;
					case "g":
					case "gp":
						redirect2(`https://gelbooru.com/index.php?page=post&s=view&id=${para[1]}`);
						break;
					case "k":
					case "kp":
						redirect2(`https://konachan.com/post/show/${para[1]}`);
						break;
					case "n":
						if (para[1].startsWith("sm")) redirect2(`https://www.nicovideo.jp/watch/${para[1]}`);
						else if (para[1].startsWith("ch")) redirect2(`https://ch.nicovideo.jp/channel/${para[1]}`);
						else if (para[1].startsWith("im")) redirect2(`https://seiga.nicovideo.jp/seiga/${para[1]}`);
						else if (para[1].startsWith("lv")) redirect2(`https://live.nicovideo.jp/watch/${para[1]}`);
						else if (para[1].startsWith("mg")) redirect2(`https://seiga.nicovideo.jp/watch/${para[1]}`);
						else if (para[1].startsWith("nw")) redirect2(`https://news.nicovideo.jp/watch/${para[1]}`);
						else if (para[1].startsWith("so")) redirect2(`https://www.nicovideo.jp/watch/${para[1]}`);
						break;
					case "nj":
						redirect2(`https://nijie.info/view.php?id=${para[1]}`);
						break;
					case "p":
					case "pa":
						redirect2(`https://www.pixiv.net/artworks/${para[1]}`);
						break;
					case "pu":
						redirect2(`https://www.pixiv.net/users/${para[1]}`);
						break;
					case "t":
					case "ts":
						redirect2(`https://twitter.com/i/status/${para[1]}`);
						break;
					case "ti":
						redirect2(`https://pbs.twimg.com/media/${para[1]}?format=jpg&name=large`);
						break;
					case "w":
						redirect2(`https://m.weibo.cn/status/${para[1]}`);
						break;
					case "y":
					case "yp":
						redirect2(`https://yande.re/post/show/${para[1]}`);
						break;
					case "yt":
						redirect2(`https://youtu.be/{para[1]}`);
						break;
					default:
						console.log("Unknown parameter.");
				}
				break;
			default:
				console.log("Nothing to do.");
		}
	}
}
hash_func();
window.addEventListener("hashchange", hash_func, false);
