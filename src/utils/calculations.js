// ---------------------------------------------------------------------------
// calculations.js
//
// Pure functions that turn form answers into emissions numbers. Nothing in
// here touches React or the DOM, so it's easy to test or reuse.
// ---------------------------------------------------------------------------

import { CATEGORY_THRESHOLDS } from '../data/emissionFactors';

const KG_PER_TONNE = 1000;
const PETROL_FACTOR = 2.31; // kg CO2e per litre of petrol
const ELECTRICITY_FACTOR = 0.37; // kg CO2e per kWh of electricity
const FLIGHT_FACTOR = 0.17; // kg CO2e per flight mile

/** Calculates CO2e emissions from petrol, electricity, and flight miles. */
export function calculateFootprint(answers) {
  const petrolLiters = Number(answers.petrolLiters) || 0;
  const electricityKwh = Number(answers.electricityKwh) || 0;
  const flightMiles = Number(answers.flightMiles) || 0;

  const transportKg = petrolLiters * PETROL_FACTOR;
  const energyKg = electricityKwh * ELECTRICITY_FACTOR;
  const otherKg = flightMiles * FLIGHT_FACTOR;
  const totalKg = transportKg + energyKg + otherKg;
  const total = Math.round((totalKg / KG_PER_TONNE) * 100) / 100;

  const roundKg = (val) => Math.round(val * 100) / 100;

  return {
    transport: roundKg(transportKg),
    energy: roundKg(energyKg),
    other: roundKg(otherKg),
    total,
  };
}

/** Rounds to 2 decimal places for display-friendly tonnage. */
export function round(value) {
  return Math.round(value * 100) / 100;
}

/** Maps a total (tonnes/year) to a category label + tone. */
export function categorize(totalTonnes) {
  return (
    CATEGORY_THRESHOLDS.find((tier) => totalTonnes <= tier.max) ??
    CATEGORY_THRESHOLDS[CATEGORY_THRESHOLDS.length - 1]
  );
}

/** Returns the breakdown entries sorted largest-first, with share %. */
export function rankBreakdown(breakdown) {
  const entries = [
    { key: 'transport', label: 'Transportation', value: breakdown.transport },
    { key: 'energy', label: 'Electricity & gas', value: breakdown.energy },
    { key: 'other', label: 'Flights & shopping', value: breakdown.other },
  ];
  const total = breakdown.total || 1;
  return entries
    .map((entry) => ({ ...entry, share: entry.value / total }))
    .sort((a, b) => b.value - a.value);
}

const RECOMMENDATIONS = {
  transport: {
    text: 'Transportation is your largest source of emissions. Swapping a couple of trips a week for a bus, bike, or walk — or carpooling when you drive — is the fastest way to bring this down.',
  },
  energy: {
    text: 'Electricity and gas make up your biggest share. Look at what runs when no one is using it: standby devices, water heaters, and lighting left on are usually the easiest wins.',
  },
  other: {
    text: 'Flights and shopping are your biggest lever right now. Combining trips, flying less often, and buying less new stuff both count.',
  },
};

/** Returns a small ordered list of recommendation objects, largest driver first. */
export function getRecommendations(breakdown) {
  const ranked = rankBreakdown(breakdown).filter((entry) => entry.value > 0);
  return ranked.slice(0, 3).map((entry) => ({
    key: entry.key,
    label: entry.label,
    text: RECOMMENDATIONS[entry.key]?.text ?? '',
  }));
}
