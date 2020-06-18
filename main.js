function hashsplit(str) {
	var list = str.match(/^#\/*(.*?)\/*$/);
	if (list != null && list[1] != "") return list[1].split(/\/+/);
	else return null;
}
function pdec(pointer) {
	while (pointer.length % 4 != 0) pointer += "=";
	return decodeURI(Base64.decode(pointer));
}
function redirect(dest) {
	console.log(dest);
	document.body.innerHTML = "";
	document.body.style = "margin: 2.7rem";
	if (quiet === false) {
		document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Click to redirect...</h1>\n\t<br />\n\t<a href="${encodeURI(dest)}">> ${dest}</a>\n`;
	}
	if (quiet === true) {
		document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Redirecting...</h1>\n\t<br />\n\t<a href="${encodeURI(dest)}">> Click here if you are not redirected.</a>\n`;
		location.hash = location.hash.replace(/^#\/*/, "*/");
		location.href = dest;
	}
}
function hash_func() {
	var list = hashsplit(location.hash);
	if (list == null) return null;
	for (var i = 0; i < list.length; i++) {
		var para = list[i].replace(/=*$/, "").split("=");
		switch (para.length) {
			case 1:
				if (para[0] === "*") quiet = false;
				break;
			case 2:
				var s = decodeURI(para[1].replace(/\*/g, "/"));
				switch (para[0]) {
					case "url":
						try {
							quiet = false;
							s = pdec(s);
							if (s.startsWith("//")) s = s.replace(/^\/+/, "https://");
							redirect(s);
						} catch (e) {
							console.log("Invalid pointer.");
						}
						break;
					case "b":
						redirect(`https://b23.tv/${s}`);
					case "e":
					case "eg":
						redirect(`https://e-hentai.org/g/${s}`);
						break;
					case "es":
						redirect(`https://e-hentai.org/s/${s}`);
						break;
					case "ew":
						redirect(`https://ehwiki.org/index.php?title=Special:Search&fulltext=Search&search=${encodeURIComponent(s)}`);
						break;
					case "g":
					case "gp":
						redirect(`https://gelbooru.com/index.php?page=post&s=view&id=${s}`);
						break;
					case "k":
					case "kp":
						redirect(`https://konachan.com/post/show/${s}`);
						break;
					case "n":
						if (0);
						else if (s.startsWith("sm")) redirect(`https://www.nicovideo.jp/watch/${s}`);
						else if (s.startsWith("ch")) redirect(`https://ch.nicovideo.jp/channel/${s}`);
						else if (s.startsWith("im")) redirect(`https://seiga.nicovideo.jp/seiga/${s}`);
						else if (s.startsWith("lv")) redirect(`https://live.nicovideo.jp/watch/${s}`);
						else if (s.startsWith("mg")) redirect(`https://seiga.nicovideo.jp/watch/${s}`);
						else if (s.startsWith("nw")) redirect(`https://news.nicovideo.jp/watch/${s}`);
						else if (s.startsWith("so")) redirect(`https://www.nicovideo.jp/watch/${s}`);
						break;
					case "nj":
						redirect(`https://nijie.info/view.php?id=${s}`);
						break;
					case "p":
					case "pa":
						redirect(`https://www.pixiv.net/artworks/${s}`);
						break;
					case "pu":
						redirect(`https://www.pixiv.net/users/${s}`);
						break;
					case "t":
					case "ts":
						redirect(`https://twitter.com/i/status/${s}`);
						break;
					case "ti":
						redirect(`https://pbs.twimg.com/media/${s}?format=jpg&name=large`);
						break;
					case "w":
						redirect(`https://m.weibo.cn/status/${s}`);
						break;
					case "y":
					case "yp":
						redirect(`https://yande.re/post/show/${s}`);
						break;
					case "yt":
						redirect(`https://youtu.be/${s}`);
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
var quiet = true;
hash_func();
window.addEventListener("hashchange", hash_func, false);
