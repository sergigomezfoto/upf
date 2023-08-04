let test=false;
var krpano = null;
				const getLanguage = () => {
					const urlParams = new URLSearchParams(window.location.search);
					let languageParam = urlParams.get("ln");
					const validLanguages = ["es", "ca", "en"];
					if (languageParam !== null && validLanguages.includes(languageParam)) {
						return languageParam;
					}
					return null;
				};

				let lang = "es";

				const languageParam = getLanguage();

				if (languageParam !== null) {
					lang = languageParam;
				}


				//TOUR
				embedpano({
					xml: "tour.xml",
					target: "pano",
					passQueryParameters: false,
					mobilescale: 1.0,
					consolelog: true,
					bgcolor: "#ffffff",
					onready: krpano_onready_callback,
					initvars: {
						test: test,
						language: lang,
					},
				});

				function krpano_onready_callback(krpano_interface) {
					krpano = krpano_interface;
				}
