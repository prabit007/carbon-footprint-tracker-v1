// ---------------------------------------------------------------------------
// calculations.js
//
// Pure functions that turn form answers into emissions numbers. Nothing in
// here touches React or the DOM, so it's easy to test or reuse.
// ---------------------------------------------------------------------------

import {
  TRANSPORT_FACTORS,
  ELECTRICITY_KG_PER_KWH,
  LPG_KG_PER_CYLINDER,
  TONNES_PER_FLIGHT,
  SHOPPING_FACTORS,
  CATEGORY_THRESHOLDS,
} from '../data/emissionFactors';

const KG_PER_TONNE = 1000;

/** Annual transport emissions, in tonnes CO2e. */
export function calculateTransportEmissions({ distanceKm, mode, daysPerWeek }) {
  const factor = TRANSPORT_FACTORS[mode]?.kgPerKm ?? 0;
  const km = Number(distanceKm) || 0;
  const days = Number(daysPerWeek) || 0;
  const annualKg = km * factor * days * 52;
  return annualKg / KG_PER_TONNE;
}

/** Annual electricity + LPG emissions, in tonnes CO2e. */
export function calculateEnergyEmissions({ monthlyKwh, lpgCylindersPerMonth }) {
  const kwh = Number(monthlyKwh) || 0;
  const cylinders = Number(lpgCylindersPerMonth) || 0;
  const electricityKg = kwh * 12 * ELECTRICITY_KG_PER_KWH;
  const lpgKg = cylinders * 12 * LPG_KG_PER_CYLINDER;
  return (electricityKg + lpgKg) / KG_PER_TONNE;
}

/** Annual "other lifestyle" emissions (flights + shopping), in tonnes CO2e. */
export function calculateOtherEmissions({ flightsPerYear, shoppingLevel }) {
  const flights = Number(flightsPerYear) || 0;
  const flightTonnes = flights * TONNES_PER_FLIGHT;
  const shoppingTonnes = SHOPPING_FACTORS[shoppingLevel]?.tonnesPerYear ?? 0;
  return flightTonnes + shoppingTonnes;
}

/**
 * Runs every category calculation and returns a full breakdown plus total.
 * Household size divides the electricity share of energy emissions, since
 * a home's power use is shared across the people living there.
 */
export function calculateFootprint(answers) {
  const transport = calculateTransportEmissions(answers.transport);

  const rawEnergy = calculateEnergyEmissions(answers.energy);
  const household = Math.max(1, Number(answers.lifestyle?.householdSize) || 1);
  const energy = rawEnergy / household;

  const other = calculateOtherEmissions(answers.lifestyle);

  const total = transport + energy + other;

  return {
    transport: round(transport),
    energy: round(energy),
    other: round(other),
    total: round(total),
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
    { key: 'transport', label: 'Transportation', icon: '🚗', value: breakdown.transport },
    { key: 'energy', label: 'Electricity & gas', icon: '⚡', value: breakdown.energy },
    { key: 'other', label: 'Flights & shopping', icon: '✈️', value: breakdown.other },
  ];
  const total = breakdown.total || 1;
  return entries
    .map((entry) => ({ ...entry, share: entry.value / total }))
    .sort((a, b) => b.value - a.value);
}

const RECOMMENDATIONS = {
  transport: {
    icon: '🚗',
    text: 'Transportation is your largest source of emissions. Swapping a couple of trips a week for a bus, bike, or walk — or carpooling when you drive — is the fastest way to bring this down.',
  },
  energy: {
    icon: '⚡',
    text: 'Electricity and gas make up your biggest share. Look at what runs when no one is using it: standby devices, water heaters, and lighting left on are usually the easiest wins.',
  },
  other: {
    icon: '✈️',
    text: 'Flights and shopping are your biggest lever right now. Combining trips, flying less often, and buying less new stuff both count.',
  },
};

/** Returns a small ordered list of recommendation objects, largest driver first. */
export function getRecommendations(breakdown) {
  const ranked = rankBreakdown(breakdown).filter((entry) => entry.value > 0);
  return ranked.slice(0, 3).map((entry) => ({
    key: entry.key,
    icon: RECOMMENDATIONS[entry.key]?.icon ?? entry.icon,
    label: entry.label,
    text: RECOMMENDATIONS[entry.key]?.text ?? '',
  }));
}

/**
 * Applies a set of "what if" lifestyle changes to the original answers and
 * recalculates. Each option in `changes` is a boolean flag; see
 * WhatIfSimulator.jsx for the option definitions.
 */
export function simulateChanges(answers, changes) {
  const adjusted = JSON.parse(JSON.stringify(answers));

  if (changes.driveLess20) {
    adjusted.transport.distanceKm = (Number(adjusted.transport.distanceKm) || 0) * 0.8;
  }
  if (changes.publicTransportTwice) {
    // Swap two travel days a week from the current mode to bus.
    const currentDays = Number(adjusted.transport.daysPerWeek) || 0;
    const swapDays = Math.min(2, currentDays);
    const currentMode = adjusted.transport.mode;
    const currentKm = Number(adjusted.transport.distanceKm) || 0;
    const currentFactor = TRANSPORT_FACTORS[currentMode]?.kgPerKm ?? 0;
    const busFactor = TRANSPORT_FACTORS.bus.kgPerKm;
    // Represent the swap as a reduction proportional to the factor difference.
    const weeklySavingKg = swapDays * currentKm * Math.max(currentFactor - busFactor, 0);
    adjusted._transportWeeklySavingKg = (adjusted._transportWeeklySavingKg || 0) + weeklySavingKg;
  }
  if (changes.reduceElectricity10) {
    adjusted.energy.monthlyKwh = (Number(adjusted.energy.monthlyKwh) || 0) * 0.9;
  }
  if (changes.fewerFlights) {
    adjusted.lifestyle.flightsPerYear = Math.max(
      0,
      (Number(adjusted.lifestyle.flightsPerYear) || 0) - 1
    );
  }

  const result = calculateFootprint(adjusted);

  if (adjusted._transportWeeklySavingKg) {
    const annualSavingTonnes = (adjusted._transportWeeklySavingKg * 52) / KG_PER_TONNE;
    result.transport = round(Math.max(0, result.transport - annualSavingTonnes));
    result.total = round(Math.max(0, result.total - annualSavingTonnes));
  }

  return result;
}
