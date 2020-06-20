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
		/* https://github.com/the1812/Bilibili-Evolved/blob/master/min/url-params-clean.min.js */
		function cleanurl(z) {
			const a = [
				"__cf_chl_captcha_tk__",
				"__cf_chl_jschl_tk__",
				"accept_quality",
				"bbid",
				"broadcast_type",
				"current_qn",
				"current_quality",
				"from_source",
				"from_spmid",
				"from",
				"network_status",
				"network",
				"platform_network_status",
				"playurl_h264",
				"playurl_h265",
				"quality_description",
				"rt",
				"seid",
				"session_id",
				"share_medium",
				"share_plat",
				"share_source",
				"share_tag",
				"spm_id_from",
				"tdsourcetag",
				"timestamp",
				"ts",
				"unique_k",
				"utm_campaign",
				"utm_medium",
				"utm_source",
				"visit_id",
			];
			const b = (i) => i;
			const c = z.replace(/^.+?(\?.+)$/, "$1");
			const d = c.substring(1).split("&");
			const e = d.filter((j) => (a.some((k) => j.startsWith(`${k}=`)) ? false : true));
			const f = e.join("&");
			const g = b(z.replace(c, ""));
			const h = f ? "?" + f : "";
			return g + h;
		}
		var execute = function () {
			try {
				var s = input.val().trim();
				var t = cleanurl(s);
				if (s != "" && s !== t) input.val(t);
			} catch (e) {}
			try {
				var s = input.val().trim();
				if (s == "") output1.val("");
				else {
					s = decodeURIComponent(s);
					// https://www.ietf.org/rfc/rfc3986.html#section-3.1 Scheme
					if (/^[a-z][a-z0-9+.-]*:.+$/i.test(s)) s = s.replace(/^https:(?=\/\/.+$)/i, "");
					else if (s[0] !== "/") s = "//" + s;
					s = method(s, option.val()).replace(/=*$/, "").replace(/\+/g, "-").replace(/\//g, "_");
					output1.val(`heptazhou.com/&${s}`);
				}
			} catch (e) {
				output1.val(e);
			}
			try {
				var s = input.val().trim();
				if (s == "") throw "";
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
				output2.val(`heptazhou.com/#${k}=${v.replace(/\*/g, "%2a").replace(/\//g, "*")}`);
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
