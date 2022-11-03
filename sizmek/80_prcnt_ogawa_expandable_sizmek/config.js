define({
	"adFormatId": 43,
	"name": "80_prcnt_ogawa_expandable_sizmek",
	"defaultBanner": "Main_Banner",
	"defaultPanel": "expand",
  "banners": [{
		"name": "Main_Banner",
		"width": 520,
		"height": 60,
		"defaultImage": "assets/OGAWA_Master.png"
	}],
	"panels": [{
		"name": "expand",
		"asset": "panels/expand/index.html",
		"width": 1000,
		"height": 700,
		"autoCollapse": "never",
		"delayedExpansion": false,
		"positionType": "pageRelativePixels",
		"x": 20,
		"y": 20
	}],
	"clickThrough": {
		"url": "https://google.com",
		"target": "newWindow",
		"showMenuBar": true,
		"showAddressBar": true
	}
});