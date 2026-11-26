import { useEffect, useState } from 'react'
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Button } from './components/ui/button';
import { RegisterForm } from './components/RegisterForm';



export function App() {
  return (
    <div className="mt-8"><RegisterForm/></div>
  )
}




export function MyForm() {
    const [email, setEmail] = useState("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }
    return (
      <form onSubmit={handleSubmit}>
        <Label htmlFor="inp1">Email:
          <Input id="inp1"
              type="email" value={email} onChange={(e) => { setEmail(e.target.value) }}
          />
        </Label>
        <Button type="submit">Submit</Button>
      </form>
    )
}



function SlowComponent({ n = 600, m = 100 }: { n?: number; m?: number }) {
  // n columns x m rows of 1px divs: hue sweeps left→right,
  // lightness sweeps top→bottom, like a color picker palette
  const cells = []
  for (let y = 0; y < m; y++) {
    const lightness = 95 - (y / Math.max(m - 1, 1)) * 90
    for (let x = 0; x < n; x++) {
      const hue = (x / n) * 360
      cells.push(
        <div
          key={`${x}-${y}`}
          style={{ width: 1, height: 1, backgroundColor: `hsl(${hue} 100% ${lightness}%)` }}
        />
      )
    }
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n}, 1px)`, width: n }}>
      {cells}
    </div>
  )
}





