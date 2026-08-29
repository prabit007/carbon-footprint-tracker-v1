// ---------------------------------------------------------------------------
// emissionFactors.js
//
// Every number the calculator uses to turn "distance driven" or "kWh used"
// into kilograms of CO2 lives here, in one place, so nothing is hardcoded
// inside a component. These are widely-cited, general-purpose factors
// (IPCC / DEFRA / IEA style averages) — not a certified national inventory.
// Real footprints depend on your vehicle, your grid mix, and your exact
// habits, so treat every result as an informed estimate, not a lab reading.
// ---------------------------------------------------------------------------

// kg CO2 emitted per passenger-kilometre, by transport mode.
// Electric vehicles are lower than the global EV average here because
// Nepal's grid is hydropower-dominant, which is cleaner than most grids.
export const TRANSPORT_FACTORS = {
  petrol: { label: 'Petrol car', kgPerKm: 0.192, icon: '🚗' },
  diesel: { label: 'Diesel car', kgPerKm: 0.171, icon: '🚙' },
  motorcycle: { label: 'Motorcycle', kgPerKm: 0.103, icon: '🏍️' },
  bus: { label: 'Bus', kgPerKm: 0.089, icon: '🚌' },
  ev: { label: 'Electric vehicle', kgPerKm: 0.045, icon: '⚡' },
  bicycle: { label: 'Bicycle', kgPerKm: 0, icon: '🚲' },
  walking: { label: 'Walking', kgPerKm: 0, icon: '🚶' },
};

// kg CO2 per kWh of grid electricity. Nepal's supply is mostly hydro,
// so this is set well below the ~0.4–0.5 kg/kWh global average.
// Swap this constant if you're calculating for a different country.
export const ELECTRICITY_KG_PER_KWH = 0.05;

// kg CO2 per standard 14.2 kg LPG cylinder (the size most households use).
export const LPG_KG_PER_CYLINDER = 42;

// Annual dietary footprint, in tonnes CO2e/year, following the general
// pattern from published diet-emissions studies (meat and dairy carry the
// largest share; plant-forward diets carry the least).
export const FOOD_FACTORS = {
  highMeat: { label: 'High meat', description: 'Meat with most meals', tonnesPerYear: 3.3, icon: '🥩' },
  mediumMeat: { label: 'Medium meat', description: 'Meat most days', tonnesPerYear: 2.5, icon: '🍗' },
  lowMeat: { label: 'Low meat', description: 'Meat a few times a week', tonnesPerYear: 1.9, icon: '🍲' },
  vegetarian: { label: 'Vegetarian', description: 'No meat or fish', tonnesPerYear: 1.7, icon: '🥗' },
  vegan: { label: 'Vegan', description: 'No animal products', tonnesPerYear: 1.5, icon: '🌱' },
};

// tonnes CO2e per flight, blended short/medium-haul average (round trip).
export const TONNES_PER_FLIGHT = 0.5;

// Flat annual add-on, in tonnes CO2e, for general shopping/consumption habits.
export const SHOPPING_FACTORS = {
  low: { label: 'Low', description: 'Buy only what I need', tonnesPerYear: 0.3 },
  medium: { label: 'Medium', description: 'Occasional non-essential purchases', tonnesPerYear: 0.7 },
  high: { label: 'High', description: 'Frequent new purchases', tonnesPerYear: 1.3 },
};

// Reference points used on the results page, in tonnes CO2e/year.
// Nepal's national personal-footprint figures vary by methodology and are
// dominated by agriculture and land use rather than individual lifestyle
// choices, so this is presented as an illustrative comparison, not an
// official per-capita statistic.
export const BENCHMARKS = {
  nepalIllustrative: 1.8,
  globalAverage: 4.7,
  parisAlignedTarget2030: 2.3,
};

// Category thresholds, in tonnes CO2e/year, used to label a result.
export const CATEGORY_THRESHOLDS = [
  { max: 2, label: 'Low', tone: 'low' },
  { max: 4, label: 'Moderate', tone: 'moderate' },
  { max: 7, label: 'High', tone: 'high' },
  { max: Infinity, label: 'Very High', tone: 'veryHigh' },
];
