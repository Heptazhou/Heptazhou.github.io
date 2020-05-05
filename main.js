function hash_func() {
	function gethash(str) {
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
		document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Click to redirect...</h1>\n\t<br />\n\t<a href="${encodeURI(dest)}">> ${dest}</a>\n`;
	}
	var list = gethash(location.hash);
	if (list != null) {
		for (var i = 0; i < list.length; i++) {
			var para = list[i].replace(/=*$/, "").split("=");
			switch (para.length) {
				case 2:
					para[1] = para[1].replace("*", "/");
					switch (para[0]) {
						case "url":
							try {
								var url = pdec(para[1]);
								redirect_to(url.startsWith("//") ? `https:${url}` : url);
							} catch (e) {
								console.log("Invalid pointer.");
							}
							break;
						case "b":
							redirect_to(`https://b23.tv/${para[1]}`);
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
							redirect_to(`https://twitter.com/_/status/${para[1]}`);
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
