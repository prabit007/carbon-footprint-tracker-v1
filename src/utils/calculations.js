import { CATEGORY_THRESHOLDS } from '../data/emissionFactors';

const KG_PER_TONNE = 1000;
const PETROL_FACTOR = 2.31; // kg CO2e per litre of petrol
const ELECTRICITY_FACTOR = 0.37; // kg CO2e per kWh of electricity
const FLIGHT_FACTOR = 0.18; // kg CO2e per flight Kilometers

/** Calculates CO2e emissions from petrol, electricity, and flight Kilometers. */
export function calculateFootprint(answers) {
  const petrolLiters = Number(answers.petrolLiters) || 0;
  const electricityKwh = Number(answers.electricityKwh) || 0;
  const flightKilometers = Number(answers.flightKilometers) || 0;

  const transportKg = petrolLiters * PETROL_FACTOR;
  const energyKg = electricityKwh * ELECTRICITY_FACTOR;
  const otherKg = flightKilometers * FLIGHT_FACTOR;
  const totalKg = transportKg + energyKg + otherKg;
  const total = Math.round((totalKg / KG_PER_TONNE) * 100) / 100;

  const roundKg = (val) => Math.round(val) / 1000;

  return {
    transport: roundKg(transportKg),
    energy: roundKg(energyKg),
    other: roundKg(otherKg),
    total,
  };
}

export function round(value) {
  return Math.round(value * 100) / 100;
}

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
    { key: 'energy', label: 'Electricity', value: breakdown.energy },
    { key: 'other', label: 'Other', value: breakdown.other },
  ];
  const total = breakdown.total || 1;
  return entries
    .map((entry) => ({ ...entry, share: entry.value / total }))
    .sort((a, b) => b.value - a.value);
}

const RECOMMENDATIONS = {
  transport: {
    text: 'Transportation is your largest source of emissions. Swapping a couple of trips a week for a bus, bike, or walk is the fastest way to bring this down.',
  },
  energy: {
    text: 'Electricity make up a lot of your share. Try reducing your electricity consumption by switching off lights and electronics when not in use.',
  },
  other: {
    text: 'Flights make up a lot of your share. Try reducing your flights by taking fewer trips when possible.',
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
