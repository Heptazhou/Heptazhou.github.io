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
function hash_redirect() {
	var list = gethash(location.hash);
	if (list != null) {
		for (var i = 0; i < list.length; i++) {
			var item = list[i].replace(/=*$/, "").split("=");
			switch (item.length) {
				case 1:
					break;
				case 2:
					switch (item[0]) {
						case "url":
							try {
								var url = pdec(item[1]);
								if (url.startsWith("//")) url = "https:" + url;
								console.log(url);
								document.body.innerHTML = "";
								document.body.style = "margin: 2.7rem";
								document.body.innerHTML = `\n\t<h1 style="line-height: 3.14rem; font-weight: normal">Click to redirect...</h1>\n\t<br />\n\t<a href="${encodeURI(url)}">> ${url}</a>\n`;
							} catch (error) {
								console.log("Invalid pointer.");
							}
							break;
						default:
							console.log("Unknown parameter.");
					}
					break;
				default:
					console.log("Invalid parameter.");
			}
		}
	}
}
hash_redirect();
window.addEventListener("hashchange", hash_redirect, false);
