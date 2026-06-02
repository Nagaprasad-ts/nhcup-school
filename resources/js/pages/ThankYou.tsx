import { Head, Link } from '@inertiajs/react'
import RegisterLayout from '@/layouts/RegisterLayout'

interface Registration {
  id                 : number
  school_name        : string
  school_email       : string
  school_mobile      : string
  sport_name         : string
  fee_label          : string
  amount             : number
  coach_name         : string
  coach_email        : string
  razorpay_payment_id?: string
  razorpay_order_id  ?: string
}

interface Props { registration: Registration }

export default function ThankYou({ registration }: Props) {
  return (
    <>
      <Head title="Registration Confirmed — NHCUP 2026" />
      <RegisterLayout>
        <div className="flex items-center justify-center py-16 px-5">
          <div className="w-full max-w-[620px]">

            {/* Success header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-[2.2rem] mx-auto mb-5">
                <i className="fas fa-check text-green-600" />
              </div>
              <h1 className="font-orbitron text-[clamp(1.6rem,4vw,2.2rem)] font-black text-dark mb-2">
                Registration <span className="bg-gradient-to-br from-navy to-sky bg-clip-text text-transparent">Confirmed!</span>
              </h1>
              <p className="text-muted text-[0.95rem] leading-[1.7]">
                Your team has been successfully registered for <strong className="text-dark">{registration.sport_name}</strong>.
                A confirmation email has been sent to <strong className="text-navy">{registration.coach_email}</strong>.
              </p>
            </div>

            {/* Registration ID badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-navy/8 border border-navy/20 rounded-full px-5 py-2">
                <span className="font-rajdhani text-[0.8rem] font-bold tracking-[2px] uppercase text-muted">Registration ID</span>
                <span className="font-orbitron font-black text-[1rem] text-navy">#{registration.id}</span>
              </div>
            </div>

            {/* Details card */}
            <div className="bg-white rounded-[18px] border border-[rgba(27,48,145,0.12)] shadow-[0_8px_40px_rgba(27,48,145,0.10)] overflow-hidden mb-6">

              {/* School */}
              <div className="px-6 py-4 border-b border-[rgba(27,48,145,0.08)]">
                <div className="font-rajdhani font-bold text-[0.72rem] tracking-[3px] uppercase text-navy mb-3">🏫 School</div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                  <Row label="School Name" value={registration.school_name} />
                  <Row label="Mobile"      value={registration.school_mobile} />
                  <Row label="Email"       value={registration.school_email} />
                </div>
              </div>

              {/* Sport */}
              <div className="px-6 py-4 border-b border-[rgba(27,48,145,0.08)]">
                <div className="font-rajdhani font-bold text-[0.72rem] tracking-[3px] uppercase text-navy mb-3">🏆 Sport</div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                  <Row label="Sport"    value={registration.sport_name} />
                  <Row label="Category" value={registration.fee_label} />
                </div>
              </div>

              {/* Payment */}
              <div className="px-6 py-4">
                <div className="font-rajdhani font-bold text-[0.72rem] tracking-[3px] uppercase text-navy mb-3">💳 Payment</div>
                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3">
                  <Row label="Amount Paid" value={`₹${registration.amount.toLocaleString()}`} highlight />
                  {registration.razorpay_payment_id && (
                    <Row label="Payment ID" value={registration.razorpay_payment_id} mono />
                  )}
                  {registration.razorpay_order_id && (
                    <Row label="Order ID" value={registration.razorpay_order_id} mono />
                  )}
                </div>
              </div>
            </div>

            {/* Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-[12px] px-5 py-4 mb-6 flex gap-3">
              <i className="fas fa-exclamation-triangle text-amber-500 mt-0.5 shrink-0" />
              <p className="font-inter text-[0.85rem] text-amber-800 leading-[1.6]">
                Please save this page or screenshot it. You may be required to present your
                <strong> Registration ID #{registration.id}</strong> and
                <strong> Payment ID</strong> at the venue.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/" className="inline-flex items-center gap-2.5 bg-gradient-to-br from-gold to-gold-d text-navy-d font-rajdhani font-extrabold text-base tracking-[2px] uppercase px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(245,197,24,0.35)] transition-all hover:-translate-y-0.5 hover:scale-[1.03]">
                <i className="fas fa-home" /> Back to Home
              </Link>
              <Link href="/#sports" className="inline-flex items-center gap-2.5 bg-transparent text-navy font-rajdhani font-bold text-base tracking-[2px] uppercase px-8 py-3.5 rounded-full border-2 border-navy transition-all hover:bg-navy hover:text-white">
                <i className="fas fa-plus" /> Register Another
              </Link>
            </div>

          </div>
        </div>
      </RegisterLayout>
    </>
  )
}

function Row({ label, value, highlight, mono }: {
  label: string; value: string; highlight?: boolean; mono?: boolean
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-rajdhani text-[0.72rem] font-bold tracking-[1px] uppercase text-muted">{label}</span>
      <span className={`text-[0.9rem] font-semibold break-all ${highlight ? 'text-navy font-bold text-[1rem]' : 'text-dark'} ${mono ? 'font-mono text-[0.8rem]' : ''}`}>
        {value}
      </span>
    </div>
  )
}
