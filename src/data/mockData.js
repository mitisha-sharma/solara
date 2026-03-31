// ─── Panel Analysis Results ───────────────────────────────────────────────────
export const mockAnalysisResults = {
  clean: {
    status: 'clean',
    confidence: 97.3,
    message: 'Panel surface is clear. No cleaning required.',
    efficiency: 98.1,
    lastCleaned: '3 days ago',
  },
  dirty: {
    status: 'dirty',
    confidence: 94.8,
    dirtType: 'dust_pollen',
    dirtLabel: 'Dust & Pollen',
    severity: 'moderate',
    efficiencyLoss: 14.2,
    message: 'Moderate dust and pollen accumulation detected.',
    lastCleaned: '21 days ago',
  },
  bird: {
    status: 'dirty',
    confidence: 98.1,
    dirtType: 'bird_droppings',
    dirtLabel: 'Bird Droppings',
    severity: 'high',
    efficiencyLoss: 23.7,
    message: 'Bird droppings detected on panel surface. Immediate cleaning recommended.',
    lastCleaned: '8 days ago',
  },
  soiling: {
    status: 'dirty',
    confidence: 91.5,
    dirtType: 'heavy_soiling',
    dirtLabel: 'Heavy Soiling',
    severity: 'critical',
    efficiencyLoss: 35.4,
    message: 'Heavy soiling across panel surface. Critical performance impact.',
    lastCleaned: '45 days ago',
  },
};

// ─── Energy Prediction Data ───────────────────────────────────────────────────
export const mockEnergyData = {
  hourly: [
    { time: '6AM',  actual: 0.2,  predicted: 0.3,  optimal: 0.4  },
    { time: '7AM',  actual: 1.1,  predicted: 1.2,  optimal: 1.5  },
    { time: '8AM',  actual: 2.8,  predicted: 2.9,  optimal: 3.4  },
    { time: '9AM',  actual: 4.2,  predicted: 4.4,  optimal: 5.1  },
    { time: '10AM', actual: 5.6,  predicted: 5.8,  optimal: 6.7  },
    { time: '11AM', actual: 6.4,  predicted: 6.7,  optimal: 7.8  },
    { time: '12PM', actual: 7.1,  predicted: 7.3,  optimal: 8.4  },
    { time: '1PM',  actual: 6.9,  predicted: 7.1,  optimal: 8.2  },
    { time: '2PM',  actual: 6.2,  predicted: 6.5,  optimal: 7.6  },
    { time: '3PM',  actual: 5.1,  predicted: 5.4,  optimal: 6.3  },
    { time: '4PM',  actual: 3.8,  predicted: 4.1,  optimal: 4.9  },
    { time: '5PM',  actual: 2.1,  predicted: 2.4,  optimal: 2.9  },
    { time: '6PM',  actual: 0.6,  predicted: 0.8,  optimal: 1.0  },
  ],
  weekly: [
    { day: 'Mon', kwh: 38.4, predicted: 40.1 },
    { day: 'Tue', kwh: 41.2, predicted: 42.0 },
    { day: 'Wed', kwh: 35.8, predicted: 37.5 },
    { day: 'Thu', kwh: 44.1, predicted: 44.8 },
    { day: 'Fri', kwh: 39.7, predicted: 41.2 },
    { day: 'Sat', kwh: 46.3, predicted: 47.0 },
    { day: 'Sun', kwh: 43.9, predicted: 45.1 },
  ],
  tomorrow: {
    total: 47.3,
    peak: 8.6,
    peakTime: '12:30 PM',
    weatherCondition: 'Partly Cloudy',
    temperature: 28,
    uvIndex: 7,
    confidence: 91,
  },
};

// ─── Dashboard Stats ──────────────────────────────────────────────────────────
export const mockDashboardStats = {
  totalPanels: 24,
  cleanPanels: 18,
  dirtyPanels: 6,
  systemEfficiency: 84.3,
  todayOutput: 43.1,
  monthOutput: 1284.7,
  co2Saved: 642.3,
  nextCleaningIn: 3,
};

// ─── Recommendations ──────────────────────────────────────────────────────────
export const mockRecommendations = [
  {
    id: 1,
    type: 'cleaning',
    priority: 'high',
    title: 'Clean Panels A3, A4, B1',
    description: 'Dust accumulation on 3 panels is causing a 14% efficiency drop. Manual rinse recommended.',
    impact: '+14% efficiency',
    effort: 'Low',
    timeframe: 'Today',
    icon: 'droplets',
  },
  {
    id: 2,
    type: 'tilt',
    priority: 'medium',
    title: 'Adjust Tilt Angle by 5°',
    description: 'Current tilt at 28°. Optimal for your latitude (13.08°N) is 23° in summer months.',
    impact: '+6% output',
    effort: 'Medium',
    timeframe: 'This week',
    icon: 'sliders',
  },
  {
    id: 3,
    type: 'fault',
    priority: 'high',
    title: 'Potential Micro-crack on Panel C2',
    description: 'Output from Panel C2 is 31% below average. Physical inspection recommended.',
    impact: 'Prevent further loss',
    effort: 'High',
    timeframe: 'Urgent',
    icon: 'alert-triangle',
  },
  {
    id: 4,
    type: 'schedule',
    priority: 'low',
    title: 'Schedule Cleaning in 3 Days',
    description: 'Rain forecast in 6 days. Optimal window for cleaning is 3 days before rain.',
    impact: 'Maintain efficiency',
    effort: 'Low',
    timeframe: 'In 3 days',
    icon: 'calendar',
  },
  {
    id: 5,
    type: 'performance',
    priority: 'medium',
    title: 'Morning Shading Detected',
    description: 'Panels on Row A show reduced morning output. A nearby tree may be causing partial shading.',
    impact: '+8% morning output',
    effort: 'Medium',
    timeframe: 'This month',
    icon: 'sun',
  },
];

// ─── Weather Data ─────────────────────────────────────────────────────────────
export const mockWeather = {
  current: { temp: 31, condition: 'Sunny', humidity: 52, wind: 14, uv: 8 },
  forecast: [
    { day: 'Today',    icon: '☀️',  high: 33, low: 24, solar: 'Excellent' },
    { day: 'Tomorrow', icon: '⛅',  high: 30, low: 23, solar: 'Good'      },
    { day: 'Wed',      icon: '🌤️', high: 29, low: 22, solar: 'Good'      },
    { day: 'Thu',      icon: '🌧️', high: 26, low: 21, solar: 'Poor'      },
    { day: 'Fri',      icon: '☀️', high: 32, low: 24, solar: 'Excellent'  },
  ],
};