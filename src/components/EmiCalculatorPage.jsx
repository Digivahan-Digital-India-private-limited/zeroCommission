import EmiCalculator from './EmiCalculator'
import { Calculator } from 'lucide-react'

export default function EmiCalculatorPage() {
  return (
    <div className="min-h-screen" style={{ background: '#f8f9ff', paddingTop: '100px' }}>
      {/* Calculator */}
      <EmiCalculator />
    </div>
  )
}
