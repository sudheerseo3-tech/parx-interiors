export type BhkType = '1BHK' | '2BHK' | '3BHK' | '4BHK+'
export type ServiceType = 'Full Home' | 'Modular Kitchen' | 'Wardrobes' | 'TV Unit' | 'False Ceiling' | 'Living & Dining'

interface PriceRange { min: number; max: number }

// Base full-home price ranges in Lakhs (₹)
const BHK_BASE: Record<BhkType, PriceRange> = {
  '1BHK':  { min: 4.5,  max: 8   },
  '2BHK':  { min: 8,    max: 15  },
  '3BHK':  { min: 15,   max: 26  },
  '4BHK+': { min: 26,   max: 50  },
}

// Each service as a fraction of the full-home price
const SERVICE_FRACTION: Record<ServiceType, PriceRange> = {
  'Full Home':       { min: 1.00, max: 1.00 },
  'Modular Kitchen': { min: 0.20, max: 0.28 },
  'Wardrobes':       { min: 0.12, max: 0.18 },
  'TV Unit':         { min: 0.06, max: 0.10 },
  'False Ceiling':   { min: 0.08, max: 0.12 },
  'Living & Dining': { min: 0.18, max: 0.25 },
}

export function getEstimate(bhk: BhkType, services: ServiceType[]): PriceRange {
  if (!bhk || services.length === 0) return { min: 0, max: 0 }

  const base = BHK_BASE[bhk]

  if (services.includes('Full Home')) {
    return { min: base.min, max: base.max }
  }

  // Sum fractions for selected individual services, cap at full-home price
  const totalMin = services.reduce((sum, s) => sum + base.min * SERVICE_FRACTION[s].min, 0)
  const totalMax = services.reduce((sum, s) => sum + base.max * SERVICE_FRACTION[s].max, 0)

  return {
    min: Math.min(parseFloat(totalMin.toFixed(1)), base.min),
    max: Math.min(parseFloat(totalMax.toFixed(1)), base.max),
  }
}

export function formatLakhs(val: number): string {
  if (val >= 100) return `₹${(val / 100).toFixed(1)} Cr`
  return `₹${val.toFixed(1)}L`
}
