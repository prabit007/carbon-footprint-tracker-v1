export const TRANSPORT_FACTORS = {
  petrol: { label: 'Petrol car', kgPerKm: 0.192 },
  diesel: { label: 'Diesel car', kgPerKm: 0.171 },
  motorcycle: { label: 'Motorcycle', kgPerKm: 0.103 },
  bus: { label: 'Bus', kgPerKm: 0.089 },
  ev: { label: 'Electric vehicle', kgPerKm: 0.045 },
  bicycle: { label: 'Bicycle', kgPerKm: 0 },
  walking: { label: 'Walking', kgPerKm: 0 },
};

export const ELECTRICITY_KG_PER_KWH = 0.05;

export const TONNES_PER_FLIGHT = 0.5;

export const BENCHMARKS = {
  nepalIllustrative: 1.8,
  globalAverage: 6.6,
  parisAlignedTarget2030: 2.3,
};

export const CATEGORY_THRESHOLDS = [
  { max: 2, label: 'Low', tone: 'low' },
  { max: 4, label: 'Moderate', tone: 'moderate' },
  { max: 7, label: 'High', tone: 'high' },
  { max: Infinity, label: 'Very High', tone: 'veryHigh' },
];