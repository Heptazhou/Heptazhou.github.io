// 读取
function gethash(str) {
	var list = str.match(/^#\/*(.*?)\/*$/);
	if (list != null && list[1] != "") {
		return list[1].split(/\/+/);
	} else {
		return null;
	}
}

// 解码
function pdec(pointer) {
	while (pointer.length % 4 != 0) pointer += "=";
	return decodeURI(Base64.decode(pointer));
}

// 跳转
function hash_func() {
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
				case 1:
					break;
				case 2:
					switch (para[0]) {
						case "url":
							try {
								var url = pdec(para[1]);
								redirect_to(url.startsWith("//") ? "https:" + url : url);
							} catch (e) {
								console.log("Invalid pointer.");
							}
							break;
						case "p":
							redirect_to("https://www.pixiv.net/artworks/" + para[1]);
							break;
						default:
							console.log("Unknown parameter.");
					}
					break;
			}
		}
	}
}
hash_func();
window.addEventListener("hashchange", hash_func, false);
