import { useState, useEffect } from 'react'

export function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' })
  const [label, setLabel] = useState('Registration Opens In')

  useEffect(() => {
    function calculate() {
      const now     = new Date()
      const regOpen = new Date('2026-06-15T00:00:00')
      const regEnd  = new Date('2026-08-24T23:59:59')
      let target: Date, lbl: string

      if (now < regOpen) {
        target = regOpen
        lbl = 'Registration Opens In'
      } else if (now <= regEnd) {
        target = regEnd
        lbl = 'Registration Closes In'
      } else {
        setLabel('NHCUP 2026 Has Concluded')
        setTimeLeft({ d: '00', h: '00', m: '00', s: '00' })

        return
      }

      setLabel(lbl)
      const diff = target.getTime() - now.getTime()
      setTimeLeft({
        d: String(Math.floor(diff / 86400000)).padStart(2, '0'),
        h: String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      })
    }

    calculate()
    const id = setInterval(calculate, 1000)

    return () => clearInterval(id)
  }, [])

  return { timeLeft, label }
}
