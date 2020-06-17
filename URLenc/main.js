/* https://github.com/emn178/online-tools */
(function ($, window, document, undefined) {
	window.method = Base64.encode;
	function copy_output() {
		var copyText = document.querySelector("#output-common");
		copyText.select();
		document.execCommand("copy");
	}
	function copy_outurl() {
		var copyText = document.querySelector("#output-special");
		copyText.select();
		document.execCommand("copy");
	}
	document.querySelector("#output-common").addEventListener("click", copy_output);
	document.querySelector("#output-special").addEventListener("click", copy_outurl);
	$(document).ready(function () {
		var input = $("#input");
		var output1 = $("#output-common");
		var output2 = $("#output-special");
		var checkbox = $("#auto-update");
		var option = $("[data-option]");
		var execute = function () {
			try {
				var s = input.val().trim();
				if (s === "") output1.val("");
				else {
					s = decodeURIComponent(s);
					// https://www.ietf.org/rfc/rfc3986.html#section-3.1 Scheme
					if (/^[a-z][a-z0-9+.-]*:.+$/i.test(s)) {
						s = s.replace(/^https:(?=\/\/.+$)/i, "");
					} else {
						if (s[0] !== "/") s = "//" + s;
					}
					s = method(s, option.val()).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_");
					output1.val(`heptazhou.com/&${s}`);
				}
			} catch (e) {
				output1.val(e);
			}
			try {
				var s = input.val().trim();
				if (s === "") throw "";
				s = decodeURIComponent(s);
				// https://www.ietf.org/rfc/rfc3986.html#section-3.1 Scheme
				if (/^[a-z][a-z0-9+.-]*:.+$/i.test(s)) {
					if (!/^https?:\/\/.+$/i.test(s)) throw "";
					s = s.replace(/^https?:\/+/i, "");
				} else {
					if (s[0] === "/" && !/^\/\/.+$/i.test(s)) throw "";
					s = s.replace(/^\/+/, "");
				}
				var k = s.match(/^(.+?)\//)[1];
				var v = s.match(/^.+?\/(.+)$/)[1];
				switch (k) {
					case "b23.tv":
						k = "b";
						break;
					case "e-hentai.org":
						s = v.match(/^(.+?)\/(.+)$/);
						switch (s[1]) {
							case "g":
								k = "eg";
								break;
							case "s":
								k = "es";
								break;
							default:
								k = "";
						}
						v = s[2];
						break;
					case "ehwiki.org":
						k = "ew";
						v = v.match(/^index\.php\?(?:.+?&)*search=([^&]+)/)[1];
						break;
					case "gelbooru.com":
						k = "g";
						v = v.match(/^index\.php\?(?:.+?&)*id=(\d+)/)[1];
						break;
					case "konachan.com":
						k = "k";
						v = v.match(/^post\/show\/(.+)/)[1];
						break;
					case "nicovideo.jp":
					case "www.nicovideo.jp":
						k = "n";
						v = v.match(/^watch\/(.+)/)[1];
						break;
					case "live.nicovideo.jp":
					case "live2.nicovideo.jp":
						k = "n";
						v = v.match(/^watch\/(.+)/)[1];
						break;
					case "seiga.nicovideo.jp":
						k = "n";
						v = (v.match(/^seiga\/(.+)/) || v.match(/^watch\/(.+)/))[1];
						break;
					case "nijie.info":
						k = "nj";
						v = v.match(/^view\.php\?(?:.+?&)*id=(\d+)/)[1];
						break;
					case "pixiv.net":
					case "www.pixiv.net":
						s = v.match(/^(.+?)\/(.+)$/);
						switch (s[1]) {
							case "artworks":
								k = "p";
								break;
							case "users":
								k = "pu";
								break;
							default:
								k = "";
						}
						v = s[2];
						break;
					case "twitter.com":
						k = "t";
						v = v.match(/^.+?\/status\/(.+)$/)[1];
						break;
					case "pbs.twimg.com":
						k = "ti";
						v = v.match(/^media\/([^?]+)/)[1];
						break;
					case "yande.re":
						k = "y";
						v = v.match(/^post\/show\/(.+)/)[1];
						break;
					case "youtu.be":
						k = "yt";
						break;
					default:
						k = "";
				}
				if (k == "" || v == "") throw "";
				output2.val(`heptazhou.com/#${k}=${v.replace("*", "%2a").replace("/", "*")}`);
			} catch (e) {
				output2.val("");
			}
		};
		function autoUpdate() {
			if (!checkbox[0].checked) return;
			execute();
		}
		if (checkbox.length > 0) {
			input.bind("input propertychange", autoUpdate);
			option.bind("input propertychange", autoUpdate);
			checkbox.click(autoUpdate);
		}
		$("#execute").click(execute);
	});
})(jQuery, window, document);
