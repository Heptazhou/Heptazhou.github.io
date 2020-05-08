function hashsplit(str) {
	var list = str.match(/^#\/*(.*?)\/*$/);
	if (list != null && list[1] != "") return list[1].split(/\/+/);
	else return null;
}
function pdec(pointer) {
	while (pointer.length % 4 != 0) pointer += "=";
	return decodeURI(Base64.decode(pointer));
}
function redirect_to(dest) {
	console.log(dest);
	document.body.innerHTML = "";
	document.body.style = "margin: 2.7rem";
	document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Redirecting...</h1>\n\t<br />\n\t<a href="${encodeURI(dest)}">> Click here if you are not redirected.</a>\n`;
	location.replace(dest);
}
function hash_func() {
	var list = hashsplit(location.hash);
	if (list != null) {
		for (var i = 0; i < list.length; i++) {
			var para = list[i].replace(/=*$/, "").split("=");
			switch (para.length) {
				case 2:
					para[1] = para[1].replace("*", "/");
					switch (para[0]) {
						case "url":
							try {
								var dest = pdec(para[1]);
								if (dest.startsWith("//")) dest = `https:${dest}`;
								console.log(dest);
								document.body.innerHTML = "";
								document.body.style = "margin: 2.7rem";
								document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Click to redirect...</h1>\n\t<br />\n\t<a href="${encodeURI(dest)}">> ${dest}</a>\n`;
							} catch (e) {
								console.log("Invalid pointer.");
							}
							break;
						case "e":
						case "eg":
							redirect_to(`https://e-hentai.org/g/${para[1]}`);
							break;
						case "es":
							redirect_to(`https://e-hentai.org/s/${para[1]}`);
							break;
						case "ew":
							redirect_to(`https://ehwiki.org/index.php?title=Special:Search&fulltext=Search&search=${encodeURIComponent(para[1])}`);
							break;
						case "g":
						case "gp":
							redirect_to(`https://gelbooru.com/index.php?page=post&s=view&id=${para[1]}`);
							break;
						case "k":
						case "kp":
							redirect_to(`https://konachan.com/post/show/${para[1]}`);
							break;
						case "n":
							redirect_to(`https://www.nicovideo.jp/watch/${para[1]}`);
							break;
						case "p":
						case "pa":
							redirect_to(`https://www.pixiv.net/artworks/${para[1]}`);
							break;
						case "pu":
							redirect_to(`https://www.pixiv.net/users/${para[1]}`);
							break;
						case "t":
						case "ts":
							redirect_to(`https://twitter.com/i/status/${para[1]}`);
							break;
						case "ti":
							redirect_to(`https://pbs.twimg.com/media/${para[1]}?format=jpg&name=large`);
							break;
						case "y":
						case "yp":
							redirect_to(`https://yande.re/post/show/${para[1]}`);
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
}
hash_func();
window.addEventListener("hashchange", hash_func, false);
