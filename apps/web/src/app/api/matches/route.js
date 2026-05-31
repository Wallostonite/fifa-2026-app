// Official FIFA World Cup 2026 group stage schedule
// Sources: Wikipedia per-group articles (verified against FIFA.com)
// Times stored as UTC ISO strings.
// Timezone conversions: EDT=UTC-4, CDT=UTC-5, MDT=UTC-6, PDT=UTC-7

const FIFA_2026_MATCHES = [
  // ─── GROUP A: Mexico, South Korea, Czechia, South Africa ───
  // Venues sourced from: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_A
  { id:"A1", team1:"Mexico",       team1_flag:"🇲🇽", team2:"South Africa",  team2_flag:"🇿🇦", match_date:"2026-06-11T19:00:00Z", venue:"Estadio Azteca",             location:"Mexico City, Mexico",            tournament:"Group A" },
  { id:"A2", team1:"South Korea",  team1_flag:"🇰🇷", team2:"Czechia",        team2_flag:"🇨🇿", match_date:"2026-06-12T02:00:00Z", venue:"Estadio Akron",              location:"Guadalajara, Mexico",            tournament:"Group A" },
  { id:"A3", team1:"Czechia",      team1_flag:"🇨🇿", team2:"South Africa",   team2_flag:"🇿🇦", match_date:"2026-06-18T16:00:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Group A" },
  { id:"A4", team1:"Mexico",       team1_flag:"🇲🇽", team2:"South Korea",    team2_flag:"🇰🇷", match_date:"2026-06-19T01:00:00Z", venue:"Estadio Akron",              location:"Guadalajara, Mexico",            tournament:"Group A" },
  { id:"A5", team1:"Czechia",      team1_flag:"🇨🇿", team2:"Mexico",         team2_flag:"🇲🇽", match_date:"2026-06-25T01:00:00Z", venue:"Estadio Azteca",             location:"Mexico City, Mexico",            tournament:"Group A" },
  { id:"A6", team1:"South Africa", team1_flag:"🇿🇦", team2:"South Korea",    team2_flag:"🇰🇷", match_date:"2026-06-25T01:00:00Z", venue:"Estadio BBVA",               location:"Monterrey, Mexico",              tournament:"Group A" },

  // ─── GROUP B: Canada, Bosnia & Herzegovina, Qatar, Switzerland ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_B
  { id:"B1", team1:"Canada",                 team1_flag:"🇨🇦", team2:"Bosnia & Herzegovina", team2_flag:"🇧🇦", match_date:"2026-06-12T19:00:00Z", venue:"BMO Field",                  location:"Toronto, Canada",                tournament:"Group B" },
  { id:"B2", team1:"Qatar",                  team1_flag:"🇶🇦", team2:"Switzerland",           team2_flag:"🇨🇭", match_date:"2026-06-13T19:00:00Z", venue:"Levi's Stadium",             location:"San Francisco Bay Area, USA",    tournament:"Group B" },
  { id:"B3", team1:"Switzerland",            team1_flag:"🇨🇭", team2:"Bosnia & Herzegovina",  team2_flag:"🇧🇦", match_date:"2026-06-18T19:00:00Z", venue:"SoFi Stadium",               location:"Los Angeles, USA",               tournament:"Group B" },
  { id:"B4", team1:"Canada",                 team1_flag:"🇨🇦", team2:"Qatar",                 team2_flag:"🇶🇦", match_date:"2026-06-18T22:00:00Z", venue:"BC Place",                   location:"Vancouver, Canada",              tournament:"Group B" },
  { id:"B5", team1:"Switzerland",            team1_flag:"🇨🇭", team2:"Canada",                team2_flag:"🇨🇦", match_date:"2026-06-24T19:00:00Z", venue:"BC Place",                   location:"Vancouver, Canada",              tournament:"Group B" },
  { id:"B6", team1:"Bosnia & Herzegovina",   team1_flag:"🇧🇦", team2:"Qatar",                 team2_flag:"🇶🇦", match_date:"2026-06-24T19:00:00Z", venue:"Lumen Field",                location:"Seattle, USA",                   tournament:"Group B" },

  // ─── GROUP C: Brazil, Morocco, Haiti, Scotland ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_C
  { id:"C1", team1:"Brazil",   team1_flag:"🇧🇷", team2:"Morocco", team2_flag:"🇲🇦", match_date:"2026-06-13T22:00:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Group C" },
  { id:"C2", team1:"Haiti",    team1_flag:"🇭🇹", team2:"Scotland",team2_flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", match_date:"2026-06-14T01:00:00Z", venue:"Gillette Stadium",           location:"Boston, USA",                    tournament:"Group C" },
  { id:"C3", team1:"Scotland", team1_flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", team2:"Morocco", team2_flag:"🇲🇦", match_date:"2026-06-19T22:00:00Z", venue:"Gillette Stadium",           location:"Boston, USA",                    tournament:"Group C" },
  { id:"C4", team1:"Brazil",   team1_flag:"🇧🇷", team2:"Haiti",   team2_flag:"🇭🇹", match_date:"2026-06-20T00:30:00Z", venue:"Lincoln Financial Field",    location:"Philadelphia, USA",              tournament:"Group C" },
  { id:"C5", team1:"Scotland", team1_flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", team2:"Brazil",  team2_flag:"🇧🇷", match_date:"2026-06-24T22:00:00Z", venue:"Hard Rock Stadium",          location:"Miami, USA",                     tournament:"Group C" },
  { id:"C6", team1:"Morocco",  team1_flag:"🇲🇦", team2:"Haiti",   team2_flag:"🇭🇹", match_date:"2026-06-24T22:00:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Group C" },

  // ─── GROUP D: United States, Paraguay, Australia, Türkiye ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_D
  { id:"D1", team1:"United States", team1_flag:"🇺🇸", team2:"Paraguay",       team2_flag:"🇵🇾", match_date:"2026-06-13T01:00:00Z", venue:"SoFi Stadium",               location:"Los Angeles, USA",               tournament:"Group D" },
  { id:"D2", team1:"Australia",     team1_flag:"🇦🇺", team2:"Türkiye",         team2_flag:"🇹🇷", match_date:"2026-06-14T04:00:00Z", venue:"BC Place",                   location:"Vancouver, Canada",              tournament:"Group D" },
  { id:"D3", team1:"United States", team1_flag:"🇺🇸", team2:"Australia",       team2_flag:"🇦🇺", match_date:"2026-06-19T19:00:00Z", venue:"Lumen Field",                location:"Seattle, USA",                   tournament:"Group D" },
  { id:"D4", team1:"Türkiye",       team1_flag:"🇹🇷", team2:"Paraguay",        team2_flag:"🇵🇾", match_date:"2026-06-20T03:00:00Z", venue:"Levi's Stadium",             location:"San Francisco Bay Area, USA",    tournament:"Group D" },
  { id:"D5", team1:"Türkiye",       team1_flag:"🇹🇷", team2:"United States",   team2_flag:"🇺🇸", match_date:"2026-06-26T02:00:00Z", venue:"SoFi Stadium",               location:"Los Angeles, USA",               tournament:"Group D" },
  { id:"D6", team1:"Paraguay",      team1_flag:"🇵🇾", team2:"Australia",       team2_flag:"🇦🇺", match_date:"2026-06-26T02:00:00Z", venue:"Levi's Stadium",             location:"San Francisco Bay Area, USA",    tournament:"Group D" },

  // ─── GROUP E: Germany, Curaçao, Ivory Coast, Ecuador ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_E
  { id:"E1", team1:"Germany",      team1_flag:"🇩🇪", team2:"Curaçao",     team2_flag:"🇨🇼", match_date:"2026-06-14T17:00:00Z", venue:"NRG Stadium",                location:"Houston, USA",                   tournament:"Group E" },
  { id:"E2", team1:"Ivory Coast",  team1_flag:"🇨🇮", team2:"Ecuador",     team2_flag:"🇪🇨", match_date:"2026-06-14T23:00:00Z", venue:"Lincoln Financial Field",    location:"Philadelphia, USA",              tournament:"Group E" },
  { id:"E3", team1:"Germany",      team1_flag:"🇩🇪", team2:"Ivory Coast", team2_flag:"🇨🇮", match_date:"2026-06-20T20:00:00Z", venue:"BMO Field",                  location:"Toronto, Canada",                tournament:"Group E" },
  { id:"E4", team1:"Ecuador",      team1_flag:"🇪🇨", team2:"Curaçao",     team2_flag:"🇨🇼", match_date:"2026-06-21T00:00:00Z", venue:"Arrowhead Stadium",          location:"Kansas City, USA",               tournament:"Group E" },
  { id:"E5", team1:"Curaçao",      team1_flag:"🇨🇼", team2:"Ivory Coast", team2_flag:"🇨🇮", match_date:"2026-06-25T20:00:00Z", venue:"Lincoln Financial Field",    location:"Philadelphia, USA",              tournament:"Group E" },
  { id:"E6", team1:"Ecuador",      team1_flag:"🇪🇨", team2:"Germany",     team2_flag:"🇩🇪", match_date:"2026-06-25T20:00:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Group E" },

  // ─── GROUP F: Netherlands, Japan, Sweden, Tunisia ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_F
  { id:"F1", team1:"Netherlands",  team1_flag:"🇳🇱", team2:"Japan",       team2_flag:"🇯🇵", match_date:"2026-06-14T20:00:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Group F" },
  { id:"F2", team1:"Sweden",       team1_flag:"🇸🇪", team2:"Tunisia",     team2_flag:"🇹🇳", match_date:"2026-06-15T02:00:00Z", venue:"Estadio BBVA",               location:"Monterrey, Mexico",              tournament:"Group F" },
  { id:"F3", team1:"Netherlands",  team1_flag:"🇳🇱", team2:"Sweden",      team2_flag:"🇸🇪", match_date:"2026-06-20T17:00:00Z", venue:"NRG Stadium",                location:"Houston, USA",                   tournament:"Group F" },
  { id:"F4", team1:"Tunisia",      team1_flag:"🇹🇳", team2:"Japan",       team2_flag:"🇯🇵", match_date:"2026-06-21T04:00:00Z", venue:"Estadio BBVA",               location:"Monterrey, Mexico",              tournament:"Group F" },
  { id:"F5", team1:"Japan",        team1_flag:"🇯🇵", team2:"Sweden",      team2_flag:"🇸🇪", match_date:"2026-06-25T23:00:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Group F" },
  { id:"F6", team1:"Tunisia",      team1_flag:"🇹🇳", team2:"Netherlands", team2_flag:"🇳🇱", match_date:"2026-06-25T23:00:00Z", venue:"Arrowhead Stadium",          location:"Kansas City, USA",               tournament:"Group F" },

  // ─── GROUP G: Belgium, Egypt, IR Iran, New Zealand ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_G
  { id:"G1", team1:"Belgium",     team1_flag:"🇧🇪", team2:"Egypt",       team2_flag:"🇪🇬", match_date:"2026-06-15T19:00:00Z", venue:"Lumen Field",                location:"Seattle, USA",                   tournament:"Group G" },
  { id:"G2", team1:"IR Iran",     team1_flag:"🇮🇷", team2:"New Zealand", team2_flag:"🇳🇿", match_date:"2026-06-16T01:00:00Z", venue:"SoFi Stadium",               location:"Los Angeles, USA",               tournament:"Group G" },
  { id:"G3", team1:"Belgium",     team1_flag:"🇧🇪", team2:"IR Iran",     team2_flag:"🇮🇷", match_date:"2026-06-21T19:00:00Z", venue:"SoFi Stadium",               location:"Los Angeles, USA",               tournament:"Group G" },
  { id:"G4", team1:"New Zealand", team1_flag:"🇳🇿", team2:"Egypt",       team2_flag:"🇪🇬", match_date:"2026-06-22T01:00:00Z", venue:"BC Place",                   location:"Vancouver, Canada",              tournament:"Group G" },
  { id:"G5", team1:"Egypt",       team1_flag:"🇪🇬", team2:"IR Iran",     team2_flag:"🇮🇷", match_date:"2026-06-27T03:00:00Z", venue:"Lumen Field",                location:"Seattle, USA",                   tournament:"Group G" },
  { id:"G6", team1:"New Zealand", team1_flag:"🇳🇿", team2:"Belgium",     team2_flag:"🇧🇪", match_date:"2026-06-27T03:00:00Z", venue:"BC Place",                   location:"Vancouver, Canada",              tournament:"Group G" },

  // ─── GROUP H: Spain, Cabo Verde, Saudi Arabia, Uruguay ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_H
  { id:"H1", team1:"Spain",         team1_flag:"🇪🇸", team2:"Cabo Verde",   team2_flag:"🇨🇻", match_date:"2026-06-15T16:00:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Group H" },
  { id:"H2", team1:"Saudi Arabia",  team1_flag:"🇸🇦", team2:"Uruguay",      team2_flag:"🇺🇾", match_date:"2026-06-15T22:00:00Z", venue:"Hard Rock Stadium",          location:"Miami, USA",                     tournament:"Group H" },
  { id:"H3", team1:"Spain",         team1_flag:"🇪🇸", team2:"Saudi Arabia", team2_flag:"🇸🇦", match_date:"2026-06-21T16:00:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Group H" },
  { id:"H4", team1:"Uruguay",       team1_flag:"🇺🇾", team2:"Cabo Verde",   team2_flag:"🇨🇻", match_date:"2026-06-21T22:00:00Z", venue:"Hard Rock Stadium",          location:"Miami, USA",                     tournament:"Group H" },
  { id:"H5", team1:"Cabo Verde",    team1_flag:"🇨🇻", team2:"Saudi Arabia", team2_flag:"🇸🇦", match_date:"2026-06-27T00:00:00Z", venue:"NRG Stadium",                location:"Houston, USA",                   tournament:"Group H" },
  { id:"H6", team1:"Uruguay",       team1_flag:"🇺🇾", team2:"Spain",        team2_flag:"🇪🇸", match_date:"2026-06-27T00:00:00Z", venue:"Estadio Akron",              location:"Guadalajara, Mexico",            tournament:"Group H" },

  // ─── GROUP I: France, Senegal, Iraq, Norway ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_I
  { id:"I1", team1:"France",   team1_flag:"🇫🇷", team2:"Senegal", team2_flag:"🇸🇳", match_date:"2026-06-16T19:00:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Group I" },
  { id:"I2", team1:"Iraq",     team1_flag:"🇮🇶", team2:"Norway",  team2_flag:"🇳🇴", match_date:"2026-06-16T22:00:00Z", venue:"Gillette Stadium",           location:"Boston, USA",                    tournament:"Group I" },
  { id:"I3", team1:"France",   team1_flag:"🇫🇷", team2:"Iraq",    team2_flag:"🇮🇶", match_date:"2026-06-22T21:00:00Z", venue:"Lincoln Financial Field",    location:"Philadelphia, USA",              tournament:"Group I" },
  { id:"I4", team1:"Norway",   team1_flag:"🇳🇴", team2:"Senegal", team2_flag:"🇸🇳", match_date:"2026-06-23T00:00:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Group I" },
  { id:"I5", team1:"Norway",   team1_flag:"🇳🇴", team2:"France",  team2_flag:"🇫🇷", match_date:"2026-06-26T19:00:00Z", venue:"Gillette Stadium",           location:"Boston, USA",                    tournament:"Group I" },
  { id:"I6", team1:"Senegal",  team1_flag:"🇸🇳", team2:"Iraq",    team2_flag:"🇮🇶", match_date:"2026-06-26T19:00:00Z", venue:"BMO Field",                  location:"Toronto, Canada",                tournament:"Group I" },

  // ─── GROUP J: Argentina, Algeria, Austria, Jordan ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_J
  { id:"J1", team1:"Argentina", team1_flag:"🇦🇷", team2:"Algeria", team2_flag:"🇩🇿", match_date:"2026-06-17T01:00:00Z", venue:"Arrowhead Stadium",          location:"Kansas City, USA",               tournament:"Group J" },
  { id:"J2", team1:"Austria",   team1_flag:"🇦🇹", team2:"Jordan",  team2_flag:"🇯🇴", match_date:"2026-06-17T04:00:00Z", venue:"Levi's Stadium",             location:"San Francisco Bay Area, USA",    tournament:"Group J" },
  { id:"J3", team1:"Argentina", team1_flag:"🇦🇷", team2:"Austria", team2_flag:"🇦🇹", match_date:"2026-06-22T17:00:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Group J" },
  { id:"J4", team1:"Jordan",    team1_flag:"🇯🇴", team2:"Algeria", team2_flag:"🇩🇿", match_date:"2026-06-23T03:00:00Z", venue:"Levi's Stadium",             location:"San Francisco Bay Area, USA",    tournament:"Group J" },
  { id:"J5", team1:"Algeria",   team1_flag:"🇩🇿", team2:"Austria", team2_flag:"🇦🇹", match_date:"2026-06-28T02:00:00Z", venue:"Arrowhead Stadium",          location:"Kansas City, USA",               tournament:"Group J" },
  { id:"J6", team1:"Jordan",    team1_flag:"🇯🇴", team2:"Argentina",team2_flag:"🇦🇷", match_date:"2026-06-28T02:00:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Group J" },

  // ─── GROUP K: Portugal, DR Congo, Uzbekistan, Colombia ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_K
  { id:"K1", team1:"Portugal",   team1_flag:"🇵🇹", team2:"DR Congo",   team2_flag:"🇨🇩", match_date:"2026-06-17T17:00:00Z", venue:"NRG Stadium",                location:"Houston, USA",                   tournament:"Group K" },
  { id:"K2", team1:"Uzbekistan", team1_flag:"🇺🇿", team2:"Colombia",   team2_flag:"🇨🇴", match_date:"2026-06-18T02:00:00Z", venue:"Estadio Azteca",             location:"Mexico City, Mexico",            tournament:"Group K" },
  { id:"K3", team1:"Portugal",   team1_flag:"🇵🇹", team2:"Uzbekistan", team2_flag:"🇺🇿", match_date:"2026-06-23T17:00:00Z", venue:"NRG Stadium",                location:"Houston, USA",                   tournament:"Group K" },
  { id:"K4", team1:"Colombia",   team1_flag:"🇨🇴", team2:"DR Congo",   team2_flag:"🇨🇩", match_date:"2026-06-24T02:00:00Z", venue:"Estadio Akron",              location:"Guadalajara, Mexico",            tournament:"Group K" },
  { id:"K5", team1:"Colombia",   team1_flag:"🇨🇴", team2:"Portugal",   team2_flag:"🇵🇹", match_date:"2026-06-27T23:30:00Z", venue:"Hard Rock Stadium",          location:"Miami, USA",                     tournament:"Group K" },
  { id:"K6", team1:"DR Congo",   team1_flag:"🇨🇩", team2:"Uzbekistan", team2_flag:"🇺🇿", match_date:"2026-06-27T23:30:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Group K" },

  // ─── GROUP L: England, Croatia, Ghana, Panama ───
  // Source: https://en.wikipedia.org/wiki/2026_FIFA_World_Cup_Group_L
  { id:"L1", team1:"England",  team1_flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", team2:"Croatia", team2_flag:"🇭🇷", match_date:"2026-06-17T20:00:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Group L" },
  { id:"L2", team1:"Ghana",    team1_flag:"🇬🇭", team2:"Panama",  team2_flag:"🇵🇦", match_date:"2026-06-17T23:00:00Z", venue:"BMO Field",                  location:"Toronto, Canada",                tournament:"Group L" },
  { id:"L3", team1:"England",  team1_flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", team2:"Ghana",   team2_flag:"🇬🇭", match_date:"2026-06-23T20:00:00Z", venue:"Gillette Stadium",           location:"Boston, USA",                    tournament:"Group L" },
  { id:"L4", team1:"Panama",   team1_flag:"🇵🇦", team2:"Croatia", team2_flag:"🇭🇷", match_date:"2026-06-23T23:00:00Z", venue:"BMO Field",                  location:"Toronto, Canada",                tournament:"Group L" },
  { id:"L5", team1:"Panama",   team1_flag:"🇵🇦", team2:"England", team2_flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", match_date:"2026-06-27T21:00:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Group L" },
  { id:"L6", team1:"Croatia",  team1_flag:"🇭🇷", team2:"Ghana",   team2_flag:"🇬🇭", match_date:"2026-06-27T21:00:00Z", venue:"Lincoln Financial Field",    location:"Philadelphia, USA",              tournament:"Group L" },

  // ─── ROUND OF 32 — venues confirmed by FIFA ───
  { id:"R32-1",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-06-28T19:00:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Round of 32" },
  { id:"R32-2",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-06-28T22:30:00Z", venue:"SoFi Stadium",               location:"Los Angeles, USA",               tournament:"Round of 32" },
  { id:"R32-3",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-06-29T19:00:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Round of 32" },
  { id:"R32-4",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-06-29T22:30:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Round of 32" },
  { id:"R32-5",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-06-30T19:00:00Z", venue:"NRG Stadium",                location:"Houston, USA",                   tournament:"Round of 32" },
  { id:"R32-6",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-06-30T22:30:00Z", venue:"Lumen Field",                location:"Seattle, USA",                   tournament:"Round of 32" },
  { id:"R32-7",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-01T19:00:00Z", venue:"Estadio Azteca",             location:"Mexico City, Mexico",            tournament:"Round of 32" },
  { id:"R32-8",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-01T22:30:00Z", venue:"Hard Rock Stadium",          location:"Miami, USA",                     tournament:"Round of 32" },
  { id:"R32-9",  team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-02T19:00:00Z", venue:"BC Place",                   location:"Vancouver, Canada",              tournament:"Round of 32" },
  { id:"R32-10", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-02T22:30:00Z", venue:"BMO Field",                  location:"Toronto, Canada",                tournament:"Round of 32" },
  { id:"R32-11", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-03T19:00:00Z", venue:"Estadio BBVA",               location:"Monterrey, Mexico",              tournament:"Round of 32" },
  { id:"R32-12", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-03T22:30:00Z", venue:"Gillette Stadium",           location:"Boston, USA",                    tournament:"Round of 32" },
  { id:"R32-13", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-04T19:00:00Z", venue:"Lincoln Financial Field",    location:"Philadelphia, USA",              tournament:"Round of 32" },
  { id:"R32-14", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-04T22:30:00Z", venue:"Arrowhead Stadium",          location:"Kansas City, USA",               tournament:"Round of 32" },
  { id:"R32-15", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-05T19:00:00Z", venue:"Levi's Stadium",             location:"San Francisco Bay Area, USA",    tournament:"Round of 32" },
  { id:"R32-16", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-05T22:30:00Z", venue:"Estadio Akron",              location:"Guadalajara, Mexico",            tournament:"Round of 32" },

  // ─── ROUND OF 16 ───
  { id:"R16-1", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-06T22:30:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Round of 16" },
  { id:"R16-2", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-07T19:00:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Round of 16" },
  { id:"R16-3", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-07T22:30:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Round of 16" },
  { id:"R16-4", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-08T22:30:00Z", venue:"SoFi Stadium",               location:"Los Angeles, USA",               tournament:"Round of 16" },
  { id:"R16-5", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-09T19:00:00Z", venue:"Hard Rock Stadium",          location:"Miami, USA",                     tournament:"Round of 16" },
  { id:"R16-6", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-09T22:30:00Z", venue:"NRG Stadium",                location:"Houston, USA",                   tournament:"Round of 16" },
  { id:"R16-7", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-10T19:00:00Z", venue:"Lumen Field",                location:"Seattle, USA",                   tournament:"Round of 16" },
  { id:"R16-8", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-10T22:30:00Z", venue:"Arrowhead Stadium",          location:"Kansas City, USA",               tournament:"Round of 16" },

  // ─── QUARTER-FINALS ───
  { id:"QF1", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-11T22:30:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Quarter Final" },
  { id:"QF2", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-12T19:00:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Quarter Final" },
  { id:"QF3", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-12T22:30:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Quarter Final" },
  { id:"QF4", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-13T22:30:00Z", venue:"SoFi Stadium",               location:"Los Angeles, USA",               tournament:"Quarter Final" },

  // ─── SEMI-FINALS ───
  { id:"SF1", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-14T22:30:00Z", venue:"AT&T Stadium",               location:"Dallas / Fort Worth, USA",       tournament:"Semi Final" },
  { id:"SF2", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-15T22:30:00Z", venue:"Mercedes-Benz Stadium",      location:"Atlanta, USA",                   tournament:"Semi Final" },

  // ─── THIRD PLACE ───
  { id:"3P", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-18T22:30:00Z", venue:"Hard Rock Stadium",          location:"Miami, USA",                     tournament:"Third Place" },

  // ─── FINAL — MetLife Stadium, East Rutherford NJ, Jul 19 2026 ───
  { id:"F", team1:"TBD", team1_flag:"🏳️", team2:"TBD", team2_flag:"🏳️", match_date:"2026-07-19T22:00:00Z", venue:"MetLife Stadium",            location:"New York / New Jersey, USA",     tournament:"Final" },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const team  = searchParams.get("team");
  const stage = searchParams.get("stage");

  let matches = FIFA_2026_MATCHES;

  if (team) {
    const t = team.toLowerCase();
    matches = matches.filter(m =>
      m.team1.toLowerCase().includes(t) || m.team2.toLowerCase().includes(t)
    );
  }

  if (stage) {
    matches = matches.filter(m => m.tournament === stage);
  }

  // DB override — if DATABASE_URL set and rows exist, prefer DB
  if (process.env.DATABASE_URL) {
    try {
      const { default: sql } = await import("../utils/sql.js");
      const dbMatches = team
        ? await sql`SELECT * FROM matches WHERE team1 ILIKE ${"%" + team + "%"} OR team2 ILIKE ${"%" + team + "%"} ORDER BY match_date ASC`
        : await sql`SELECT * FROM matches ORDER BY match_date ASC`;
      if (dbMatches.length > 0) return Response.json(dbMatches);
    } catch { /* fall through to static */ }
  }

  return Response.json(matches);
}
