const FIFA_2026_CITIES = [
  {
    id: "new-york",
    name: "New York / New Jersey",
    country: "USA",
    flag: "🇺🇸",
    stadium: "MetLife Stadium",
    stadium_capacity: 82500,
    description:
      "The biggest market in the USA hosts the FIFA World Cup Final. MetLife Stadium in East Rutherford, NJ sits just outside Manhattan and will be the stage for the most watched sporting event on earth.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take NJ Transit from Penn Station to Meadowlands Sports Complex. Avoid driving — parking is extremely limited on match days.",
    image_url: null,
    fan_zones: [
      { name: "Times Square Fan Fest", address: "Times Square, Manhattan, NY" },
      { name: "Hoboken Waterfront Watch Zone", address: "Pier A, Hoboken, NJ" },
    ],
    recommended_venues: [
      { name: "The Ainsworth", type: "Bar", address: "122 W 26th St, NY" },
      { name: "Pig N Whistle", type: "Bar", address: "950 3rd Ave, NY" },
      { name: "Shake Shack Madison Square Park", type: "Restaurant", address: "Madison Square Park, NY" },
    ],
    latitude: 40.8135,
    longitude: -74.0745,
  },
  {
    id: "los-angeles",
    name: "Los Angeles",
    country: "USA",
    flag: "🇺🇸",
    stadium: "SoFi Stadium",
    stadium_capacity: 70240,
    description:
      "Home of Hollywood and one of the most diverse cities in the world. SoFi Stadium in Inglewood is a state-of-the-art venue hosting some of the tournament's biggest matches.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take the Metro C Line to Hawthorne/Lennox station, then shuttle to SoFi Stadium. Rideshare pickup zones are designated — check the official app.",
    image_url: null,
    fan_zones: [
      { name: "LA Live Fan Village", address: "800 W Olympic Blvd, Los Angeles" },
      { name: "Santa Monica Pier Watch Zone", address: "200 Santa Monica Pier, CA" },
    ],
    recommended_venues: [
      { name: "The Dresden", type: "Bar", address: "1760 N Vermont Ave, LA" },
      { name: "Perch", type: "Restaurant", address: "448 S Hill St, LA" },
      { name: "Griffith Observatory", type: "Attraction", address: "2800 E Observatory Rd, LA" },
    ],
    latitude: 33.9534,
    longitude: -118.3392,
  },
  {
    id: "dallas",
    name: "Dallas / Fort Worth",
    country: "USA",
    flag: "🇺🇸",
    stadium: "AT&T Stadium",
    stadium_capacity: 80000,
    description:
      "AT&T Stadium in Arlington is one of the most iconic venues in American sports — a massive, air-conditioned dome that will feel spectacular for World Cup football.",
    best_time_to_visit: "June",
    transport_tips:
      "Drive or use rideshare — public transit to AT&T Stadium is limited. The TEXRail commuter line serves DFW airport area.",
    image_url: null,
    fan_zones: [
      { name: "Deep Ellum Fan Fest", address: "Deep Ellum, Dallas, TX" },
      { name: "Fort Worth Sundance Square Plaza", address: "Sundance Square, Fort Worth, TX" },
    ],
    recommended_venues: [
      { name: "Pecan Lodge", type: "Restaurant", address: "2702 Main St, Dallas" },
      { name: "Flying Saucer Draught Emporium", type: "Bar", address: "111 E 4th St, Fort Worth" },
    ],
    latitude: 32.7480,
    longitude: -97.0930,
  },
  {
    id: "san-francisco",
    name: "San Francisco Bay Area",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Levi's Stadium",
    stadium_capacity: 68500,
    description:
      "Levi's Stadium in Santa Clara sits in the heart of Silicon Valley. The Bay Area offers world-class food, culture, and the stunning backdrop of the Golden Gate Bridge.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take the VTA light rail to Great America station or Caltrain + shuttle. BART connects to Fremont, then bus to Santa Clara.",
    image_url: null,
    fan_zones: [
      { name: "Civic Center Plaza Fan Zone", address: "Civic Center Plaza, San Francisco" },
      { name: "San Jose Downtown Fan Village", address: "Plaza de César Chávez, San Jose" },
    ],
    recommended_venues: [
      { name: "Zeitgeist", type: "Bar", address: "199 Valencia St, San Francisco" },
      { name: "Foreign Cinema", type: "Restaurant", address: "2534 Mission St, San Francisco" },
    ],
    latitude: 37.4033,
    longitude: -121.9698,
  },
  {
    id: "seattle",
    name: "Seattle",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Lumen Field",
    stadium_capacity: 69000,
    description:
      "Home of the Sounders, Seattle has one of the strongest soccer cultures in the USA. Lumen Field is already famous for its incredible atmosphere and passionate fans.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take Link Light Rail to SODO station — Lumen Field is a short walk. Ample transit options from downtown Seattle.",
    image_url: null,
    fan_zones: [
      { name: "Seattle Center Fan Fest", address: "305 Harrison St, Seattle" },
      { name: "Pioneer Square Watch Zone", address: "Pioneer Square, Seattle" },
    ],
    recommended_venues: [
      { name: "Pike Place Chowder", type: "Restaurant", address: "1530 Post Alley, Seattle" },
      { name: "Elysian Brewing", type: "Bar", address: "1221 E Pike St, Seattle" },
    ],
    latitude: 47.5952,
    longitude: -122.3316,
  },
  {
    id: "miami",
    name: "Miami",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Hard Rock Stadium",
    stadium_capacity: 65326,
    description:
      "Miami's diverse Latin culture makes it one of the most football-passionate cities in the US. Hard Rock Stadium in Miami Gardens will be electric for every match.",
    best_time_to_visit: "June",
    transport_tips:
      "Brightline train to Aventura, then local bus or rideshare. Metrorail to Palmetto station, then shuttle on match days.",
    image_url: null,
    fan_zones: [
      { name: "Bayfront Park Fan Village", address: "301 Biscayne Blvd, Miami" },
      { name: "Wynwood Fan Fest", address: "Wynwood Arts District, Miami" },
    ],
    recommended_venues: [
      { name: "Versailles Restaurant", type: "Restaurant", address: "3555 SW 8th St, Miami" },
      { name: "Ball & Chain", type: "Bar", address: "1513 SW 8th St, Miami" },
    ],
    latitude: 25.9580,
    longitude: -80.2389,
  },
  {
    id: "boston",
    name: "Boston",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Gillette Stadium",
    stadium_capacity: 64628,
    description:
      "Home to New England Revolution, Boston is a proud sports city. Gillette Stadium in Foxborough is about 30 miles south of the city.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take the MBTA commuter rail (Providence/Stoughton Line) to Foxboro on match days — special service runs from South Station.",
    image_url: null,
    fan_zones: [
      { name: "City Hall Plaza Fan Fest", address: "1 City Hall Square, Boston" },
      { name: "Faneuil Hall Watch Party", address: "4 S Market St, Boston" },
    ],
    recommended_venues: [
      { name: "The Blarney Stone", type: "Bar", address: "1505 Dorchester Ave, Boston" },
      { name: "Neptune Oyster", type: "Restaurant", address: "63 Salem St, Boston" },
    ],
    latitude: 42.0910,
    longitude: -71.2643,
  },
  {
    id: "atlanta",
    name: "Atlanta",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Mercedes-Benz Stadium",
    stadium_capacity: 71000,
    description:
      "Mercedes-Benz Stadium is widely regarded as the best stadium in North America. Atlanta United's home will deliver an unforgettable World Cup experience with its retractable roof and stunning design.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take MARTA Red or Gold Line to Vine City or GWCC/CNN Center station. The stadium is a short walk from both stops.",
    image_url: null,
    fan_zones: [
      { name: "Centennial Olympic Park Fan Zone", address: "265 Park Ave W NW, Atlanta" },
      { name: "Westside BeltLine Fan Village", address: "Westside BeltLine, Atlanta" },
    ],
    recommended_venues: [
      { name: "The Local", type: "Bar", address: "758 Ponce De Leon Ave NE, Atlanta" },
      { name: "Mary Mac's Tea Room", type: "Restaurant", address: "224 Ponce De Leon Ave NE, Atlanta" },
    ],
    latitude: 33.7554,
    longitude: -84.4010,
  },
  {
    id: "kansas-city",
    name: "Kansas City",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Arrowhead Stadium",
    stadium_capacity: 76416,
    description:
      "Arrowhead Stadium is one of the loudest venues on earth. Kansas City brings world-class BBQ and midwestern hospitality to the World Cup.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Limited public transit to the stadium — most fans drive or rideshare. Tailgate lots open 5 hours before kickoff.",
    image_url: null,
    fan_zones: [
      { name: "Power & Light District Fan Fest", address: "Power & Light District, KC" },
      { name: "Kauffman Center Plaza Watch Zone", address: "1601 Broadway Blvd, KC" },
    ],
    recommended_venues: [
      { name: "Joe's Kansas City Bar-B-Que", type: "Restaurant", address: "3002 W 47th Ave, KC" },
      { name: "Boulevard Brewing Taproom", type: "Bar", address: "2534 Madison Ave, KC" },
    ],
    latitude: 39.0490,
    longitude: -94.4839,
  },
  {
    id: "houston",
    name: "Houston",
    country: "USA",
    flag: "🇺🇸",
    stadium: "NRG Stadium",
    stadium_capacity: 72220,
    description:
      "NRG Stadium is a retractable-roof venue in Houston — crucial for managing Texas summer heat. Houston's incredible diversity and Latin American energy will make it one of the tournament's hottest atmospheres.",
    best_time_to_visit: "June",
    transport_tips:
      "METRORail Red Line to NRG Park station. Multiple bus routes also serve the stadium on event days.",
    image_url: null,
    fan_zones: [
      { name: "Discovery Green Fan Zone", address: "1500 McKinney St, Houston" },
      { name: "Market Square Park Watch Party", address: "301 Milam St, Houston" },
    ],
    recommended_venues: [
      { name: "Axelrad Beer Garden", type: "Bar", address: "1517 Alabama St, Houston" },
      { name: "Ninfa's on Navigation", type: "Restaurant", address: "2704 Navigation Blvd, Houston" },
    ],
    latitude: 29.6847,
    longitude: -95.4107,
  },
  {
    id: "philadelphia",
    name: "Philadelphia",
    country: "USA",
    flag: "🇺🇸",
    stadium: "Lincoln Financial Field",
    stadium_capacity: 69796,
    description:
      "Linc is the home of one of the most passionate fanbases in North American sports. Philadelphia's rich history and iconic food scene (cheesesteaks!) make it a must-visit World Cup city.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take SEPTA Broad Street Line to AT&T Station or NRG/Pattison station. Free shuttle connects to the stadium.",
    image_url: null,
    fan_zones: [
      { name: "Penn's Landing Fan Fest", address: "Penn's Landing, Philadelphia" },
      { name: "Dilworth Park Watch Zone", address: "1 S 15th St, Philadelphia" },
    ],
    recommended_venues: [
      { name: "Pat's King of Steaks", type: "Restaurant", address: "1237 E Passyunk Ave, Philadelphia" },
      { name: "McGillin's Olde Ale House", type: "Bar", address: "1310 Drury St, Philadelphia" },
    ],
    latitude: 39.9008,
    longitude: -75.1675,
  },
  {
    id: "toronto",
    name: "Toronto",
    country: "Canada",
    flag: "🇨🇦",
    stadium: "BMO Field",
    stadium_capacity: 45736,
    description:
      "Toronto FC's home ground BMO Field will be expanded for the World Cup. As one of the most multicultural cities on earth, Toronto will celebrate football from every nation.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take TTC Line 1 to Union Station, then transfer to the 509/511 streetcar to Exhibition Place. Easy 20-minute journey from downtown.",
    image_url: null,
    fan_zones: [
      { name: "Nathan Phillips Square Fan Zone", address: "100 Queen St W, Toronto" },
      { name: "Harbourfront Watch Party", address: "235 Queens Quay W, Toronto" },
    ],
    recommended_venues: [
      { name: "The Brazen Head Irish Pub", type: "Bar", address: "165 King St E, Toronto" },
      { name: "Canoe Restaurant", type: "Restaurant", address: "66 Wellington St W, Toronto" },
      { name: "CN Tower", type: "Attraction", address: "290 Bremner Blvd, Toronto" },
    ],
    latitude: 43.6333,
    longitude: -79.4179,
  },
  {
    id: "vancouver",
    name: "Vancouver",
    country: "Canada",
    flag: "🇨🇦",
    stadium: "BC Place",
    stadium_capacity: 54500,
    description:
      "BC Place in downtown Vancouver is one of the most visually stunning stadiums in the world. Surrounded by mountains and ocean, Vancouver will offer breathtaking scenery alongside top-level football.",
    best_time_to_visit: "June–July",
    transport_tips:
      "Take SkyTrain Canada Line or Expo Line to Stadium-Chinatown station — BC Place is steps away. Excellent transit city.",
    image_url: null,
    fan_zones: [
      { name: "Vancouver Fan Zone at Jack Poole Plaza", address: "1 Canada Place, Vancouver" },
      { name: "Gastown Watch Party", address: "Gastown, Vancouver" },
    ],
    recommended_venues: [
      { name: "Alibi Room", type: "Bar", address: "157 Alexander St, Vancouver" },
      { name: "Hawksworth Restaurant", type: "Restaurant", address: "801 W Georgia St, Vancouver" },
      { name: "Stanley Park", type: "Attraction", address: "Stanley Park, Vancouver" },
    ],
    latitude: 49.2768,
    longitude: -123.1118,
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    flag: "🇲🇽",
    stadium: "Estadio Azteca",
    stadium_capacity: 87523,
    description:
      "Estadio Azteca is the most iconic football stadium in the world — host of two World Cup Finals (1970 & 1986). Its atmosphere is unlike anything else in football. Mexico City is a massive, vibrant metropolis full of culture.",
    best_time_to_visit: "June",
    transport_tips:
      "Take Metro Line 2 to Tasqueña, then take the Tren Ligero (light rail) to Estadio Azteca station. Extremely busy on match days — arrive early.",
    image_url: null,
    fan_zones: [
      { name: "Zócalo Fan Fest", address: "Plaza de la Constitución, Mexico City" },
      { name: "Paseo de la Reforma Fan Zone", address: "Paseo de la Reforma, Mexico City" },
    ],
    recommended_venues: [
      { name: "El Pendulo", type: "Bar", address: "Av. Nuevo León 115, Mexico City" },
      { name: "Pujol", type: "Restaurant", address: "Tennyson 133, Mexico City" },
      { name: "Museo Nacional de Antropología", type: "Attraction", address: "Av. Paseo de la Reforma, Mexico City" },
    ],
    latitude: 19.3030,
    longitude: -99.1503,
  },
  {
    id: "guadalajara",
    name: "Guadalajara",
    country: "Mexico",
    flag: "🇲🇽",
    stadium: "Estadio Akron",
    stadium_capacity: 49850,
    description:
      "Estadio Akron is the modern home of Chivas — one of Mexico's most beloved clubs. Guadalajara is the birthplace of mariachi and tequila, offering an authentic Mexican cultural experience.",
    best_time_to_visit: "June",
    transport_tips:
      "Take the Tren Eléctrico Urbano from downtown. Rideshare is readily available. The stadium is in Zapopan, about 20 mins from the city center.",
    image_url: null,
    fan_zones: [
      { name: "Plaza Tapatía Fan Zone", address: "Plaza Tapatía, Guadalajara" },
      { name: "Tlaquepaque Watch Zone", address: "Tlaquepaque, Jalisco" },
    ],
    recommended_venues: [
      { name: "La Chata", type: "Restaurant", address: "Corona 126, Guadalajara" },
      { name: "El Parián de Tlaquepaque", type: "Bar", address: "Independencia 2, Tlaquepaque" },
    ],
    latitude: 20.6897,
    longitude: -103.4672,
  },
  {
    id: "monterrey",
    name: "Monterrey",
    country: "Mexico",
    flag: "🇲🇽",
    stadium: "Estadio BBVA",
    stadium_capacity: 53500,
    description:
      "Estadio BBVA is consistently voted one of the most beautiful stadiums in the world, with the stunning Cerro de la Silla mountain as its backdrop. Monterrey is Mexico's industrial capital and a passionate football city.",
    best_time_to_visit: "June",
    transport_tips:
      "Take the Monterrey Metro Line 2 to Estadio BBVA station — the station is right at the stadium entrance.",
    image_url: null,
    fan_zones: [
      { name: "Macroplaza Fan Fest", address: "Macroplaza, Monterrey" },
      { name: "Barrio Antiguo Watch Zone", address: "Barrio Antiguo, Monterrey" },
    ],
    recommended_venues: [
      { name: "El Rey del Cabrito", type: "Restaurant", address: "Constitución 817 Ote, Monterrey" },
      { name: "Barrio Antiguo Bar Row", type: "Bar", address: "Barrio Antiguo, Monterrey" },
    ],
    latitude: 25.6693,
    longitude: -100.3100,
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country");
  const search = searchParams.get("search")?.toLowerCase();

  let cities = FIFA_2026_CITIES;

  if (country) {
    cities = cities.filter((c) => c.country === country);
  }

  if (search) {
    cities = cities.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.stadium.toLowerCase().includes(search) ||
        c.country.toLowerCase().includes(search),
    );
  }

  return Response.json(cities);
}
