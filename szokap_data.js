// Szókapcsolat játék adatai
// Minden feladványban 4 szó van, és egy közös kapcsolat
// difficulty: 1=könnyű, 2=közepes, 3=nehéz, 4=nagyon nehéz

const SZOKAP_PUZZLES = [
  // ── KÖNNYŰ (1-10. szint) ──
  { words:["KUTYA","MACSKA","NYÚL","EGÉR"], answer:"Háziállat", options:["Háziállat","Gyümölcs","Szín","Város"], difficulty:1 },
  { words:["ALMA","KÖRTE","SZILVA","BARACK"], answer:"Gyümölcs", options:["Gyümölcs","Zöldség","Virág","Állat"], difficulty:1 },
  { words:["PIROS","KÉK","ZÖLD","SÁRGA"], answer:"Szín", options:["Szín","Szám","Állat","Étel"], difficulty:1 },
  { words:["BUDAPEST","PÁRIZS","LONDON","BERLIN"], answer:"Főváros", options:["Főváros","Folyó","Állat","Sport"], difficulty:1 },
  { words:["FOCI","TENISZ","ÚSZÁS","FUTÁS"], answer:"Sport", options:["Sport","Étel","Szín","Állat"], difficulty:1 },
  { words:["RÓZSA","TULIPÁN","IBOLYA","SZEGFŰ"], answer:"Virág", options:["Virág","Gyümölcs","Állat","Szín"], difficulty:1 },
  { words:["PIZZA","HAMBURGER","SUSHI","GULYÁS"], answer:"Étel", options:["Étel","Ital","Szer","Virág"], difficulty:1 },
  { words:["DUNA","TISZA","RAJNA","TEMZE"], answer:"Folyó", options:["Folyó","Hegy","Tenger","Város"], difficulty:1 },
  { words:["JANUÁR","FEBRUÁR","MÁRCIUS","ÁPRILIS"], answer:"Hónap", options:["Hónap","Nap","Évszak","Szín"], difficulty:1 },
  { words:["GITÁR","ZONGORA","HEGEDŰ","DOB"], answer:"Hangszer", options:["Hangszer","Bútor","Ruha","Étel"], difficulty:1 },

  // ── KÖNNYŰ-KÖZEPES (11-20. szint) ──
  { words:["HOLD","JUPITER","MARS","VÉNUSZ"], answer:"Bolygó vagy égitest", options:["Bolygó vagy égitest","Folyó","Hegység","Állat"], difficulty:1 },
  { words:["KÖNYV","CERUZA","RADÍR","TOLL"], answer:"Iskolai eszköz", options:["Iskolai eszköz","Konyhai eszköz","Sport","Étel"], difficulty:1 },
  { words:["TAVASZ","NYÁR","ŐSZ","TÉL"], answer:"Évszak", options:["Évszak","Hónap","Nap","Szín"], difficulty:1 },
  { words:["OROSZLÁN","TIGRIS","GEPÁRD","LEOPÁRD"], answer:"Nagymacska", options:["Nagymacska","Madár","Hal","Rovar"], difficulty:1 },
  { words:["TEJ","VÍZ","KÁVÉ","TEA"], answer:"Ital", options:["Ital","Étel","Szín","Állat"], difficulty:1 },
  { words:["ASZTAL","SZÉK","ÁGY","SZEKRÉNY"], answer:"Bútor", options:["Bútor","Ruha","Étel","Jármű"], difficulty:1 },
  { words:["AUTÓ","BUSZ","VONAT","REPÜLŐ"], answer:"Jármű", options:["Jármű","Állat","Étel","Épület"], difficulty:1 },
  { words:["DOKTOR","TANÁR","RENDŐR","TŰZOLTÓ"], answer:"Foglalkozás", options:["Foglalkozás","Állat","Szín","Étel"], difficulty:1 },
  { words:["KARD","PAJZS","ÍJ","LÁNDZSA"], answer:"Középkori fegyver", options:["Középkori fegyver","Konyhai eszköz","Hangszer","Sport"], difficulty:1 },
  { words:["SZEM","FÜL","ORR","SZÁJ"], answer:"Arctestrész", options:["Arctestrész","Bútor","Állat","Szín"], difficulty:1 },

  // ── KÖZEPES (21-35. szint) ──
  { words:["PÉCS","MISKOLC","GYŐR","DEBRECEN"], answer:"Magyar nagyváros", options:["Magyar nagyváros","Folyó","Hegy","Főváros"], difficulty:2 },
  { words:["SHAKESPEARE","GOETHE","PETŐFI","ARANY"], answer:"Költő vagy író", options:["Költő vagy író","Zenész","Festő","Tudós"], difficulty:2 },
  { words:["EVEREST","KILIMANDZSÁRÓ","ALPOK","KÁRPÁTOK"], answer:"Hegy vagy hegység", options:["Hegy vagy hegység","Folyó","Tó","Sivatag"], difficulty:2 },
  { words:["SINDBÁD","ALADDIN","ALI BABA","SCHEHEREZÁDÉ"], answer:"Ezeregyéjszaka szereplő", options:["Ezeregyéjszaka szereplő","Görög isten","Magyar mese","Disney hős"], difficulty:2 },
  { words:["RADIUM","URÁN","PLUTÓNIUM","TORIUM"], answer:"Radioaktív elem", options:["Radioaktív elem","Drágakő","Bolygó","Fém"], difficulty:2 },
  { words:["BARCELONA","REAL MADRID","JUVENTUS","CHELSEA"], answer:"Futballklub", options:["Futballklub","Város","Állat","Márka"], difficulty:2 },
  { words:["EGYENLÍTŐ","NAPTÉRÍTŐ","SARKKÖR","GREENWICHI"], answer:"Képzeletbeli földrajzi vonal", options:["Képzeletbeli földrajzi vonal","Folyó","Hegy","Tó"], difficulty:2 },
  { words:["Bach","MOZART","BEETHOVEN","CHOPIN"], answer:"Klasszikus zenész", options:["Klasszikus zenész","Festő","Író","Tudós"], difficulty:2 },
  { words:["OXIGÉN","NITROGÉN","HIDROGÉN","SZÉN"], answer:"Kémiai elem", options:["Kémiai elem","Bolygó","Ásványi anyag","Étel"], difficulty:2 },
  { words:["VÉDJEGY","LOGÓ","SZLOGEN","MÁRKA"], answer:"Marketing fogalom", options:["Marketing fogalom","Sport","Jog","Zene"], difficulty:2 },
  { words:["ARANY","EZÜST","BRONZ","PLATINA"], answer:"Nemesfém", options:["Nemesfém","Szín","Drágakő","Kőzet"], difficulty:2 },
  { words:["DEMOKRÁCIA","MONARCHIA","DIKTATÚRA","KÖZTÁRSASÁG"], answer:"Államforma", options:["Államforma","Gazdasági rendszer","Vallás","Kultúra"], difficulty:2 },
  { words:["TŐZSDE","INFLÁCIÓ","KAMAT","GDP"], answer:"Közgazdasági fogalom", options:["Közgazdasági fogalom","Jogi fogalom","Sportkifejezés","Zenei kifejezés"], difficulty:2 },
  { words:["SZINUSZ","KOSZINUSZ","TANGENS","KOTANGENS"], answer:"Trigonometriai függvény", options:["Trigonometriai függvény","Kémiai elem","Bolygó","Zenei fogalom"], difficulty:2 },
  { words:["ANDROID","IOS","WINDOWS","LINUX"], answer:"Operációs rendszer", options:["Operációs rendszer","Programnyelv","Hardver","Böngésző"], difficulty:2 },

  // ── NEHÉZ (36-50. szint) ──
  { words:["FEKETE","FEHÉR","SZÜRKE","BÉZS"], answer:"Nem igazi szín (semleges)", options:["Nem igazi szín (semleges)","Gyümölcs","Állat","Étel"], difficulty:3 },
  { words:["NÍLUS","AMAZONAS","JANGCE","MISSZIPI"], answer:"Világ leghosszabb folyói", options:["Világ leghosszabb folyói","Tó","Sivatag","Hegység"], difficulty:3 },
  { words:["KVARK","LEPTON","BOZON","FERMION"], answer:"Elemi részecske", options:["Elemi részecske","Kémiai elem","Bolygó","Matematikai fogalom"], difficulty:3 },
  { words:["IMPRESSZIONIZMUS","KUBIZMUS","SZÜRREALIZMUS","DADAIZMUS"], answer:"Művészeti irányzat", options:["Művészeti irányzat","Zenei stílus","Irodalmi műfaj","Vallási irányzat"], difficulty:3 },
  { words:["SZEROTONIN","DOPAMIN","OXITOCIN","ADRENALIN"], answer:"Agyi kémiai anyag", options:["Agyi kémiai anyag","Vitamin","Ásványi anyag","Enzim"], difficulty:3 },
  { words:["HALLEY","HALE-BOPP","CHURYUMOV","ENCKE"], answer:"Üstökös", options:["Üstökös","Csillag","Bolygó","Aszteroida"], difficulty:3 },
  { words:["HAMLET","MACBETH","OTHELLO","LEAR"], answer:"Shakespeare tragédia főszereplő", options:["Shakespeare tragédia főszereplő","Görög mitológia hős","Biblia alak","Dante szereplő"], difficulty:3 },
  { words:["SZINAPTIKUS","AXON","DENDRIT","NEURON"], answer:"Idegrendszer fogalom", options:["Idegrendszer fogalom","Sejtbiológia","Genetika","Immunológia"], difficulty:3 },
  { words:["BAROKK","ROKOKÓ","GÓTIKA","RENESZÁNSZ"], answer:"Építészeti stílus", options:["Építészeti stílus","Zenei stílus","Festészeti technika","Irodalmi korszak"], difficulty:3 },
  { words:["SZUVERÉN","ALKOTMÁNY","PARLAMENT","TÖRVÉNY"], answer:"Jogi-politikai fogalom", options:["Jogi-politikai fogalom","Gazdasági fogalom","Katonai fogalom","Egyházi fogalom"], difficulty:3 },

  // ── NAGYON NEHÉZ (51+ szint) ──
  { words:["VÖRÖS","SZOMSZÉD","HOLD","CSILLAG"], answer:"Mind elé illik: 'Tenger'", options:["Mind elé illik: 'Tenger'","Mind utána illik: 'fény'","Mind állat","Mind szín"], difficulty:4 },
  { words:["KIS","NAGY","KÖZÉP","ÉSZAK"], answer:"Irány vagy méret előtag", options:["Irány vagy méret előtag","Állat","Szín","Folyó"], difficulty:4 },
  { words:["MÁTYÁS","ISTVÁN","LÁSZLÓ","BÉLA"], answer:"Magyar király neve", options:["Magyar király neve","Apostol neve","Zenész neve","Festő neve"], difficulty:4 },
  { words:["FORINT","EURÓ","DOLLÁR","FONT"], answer:"Pénznem", options:["Pénznem","Fém","Mérték","Étel"], difficulty:4 },
  { words:["RÖNTGEN","CURIE","PASTEUR","FLEMMING"], answer:"Nobel-díjas tudós", options:["Nobel-díjas tudós","Festő","Zenész","Író"], difficulty:4 },
  { words:["SZFINX","PIRAMISOK","KOLOSSZEION","AKROPOLISZ"], answer:"Ókori csoda vagy emlék", options:["Ókori csoda vagy emlék","Középkori vár","Modern épület","Vallási hely"], difficulty:4 },
  { words:["ALFA","BÉTA","GAMMA","DELTA"], answer:"Görög betű", options:["Görög betű","Csillag","Kémiai elem","Matematikai szimbólum"], difficulty:4 },
  { words:["PROZAC","ASPIRIN","PENICILLIN","INZULIN"], answer:"Gyógyszer", options:["Gyógyszer","Kémiai elem","Vitaminforrás","Élelmiszer-adalék"], difficulty:4 },
  { words:["TÜNDÉR","SÁRKÁNY","TÖRPE","MANÓ"], answer:"Mesebeli lény", options:["Mesebeli lény","Vallási alak","Mitológiai isten","Irodalmi hős"], difficulty:4 },
  { words:["BINÁRIS","DECIMÁLIS","HEXADECIMÁLIS","OKTÁLIS"], answer:"Számrendszer", options:["Számrendszer","Programnyelv","Matematikai művelet","Logikai fogalom"], difficulty:4 },
];
