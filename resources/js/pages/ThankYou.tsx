import { Head, Link } from '@inertiajs/react';
import RegisterLayout from '@/layouts/RegisterLayout';

interface Registration {
    id: number;
    school_name: string;
    school_email: string;
    school_mobile: string;
    sport_name: string;
    fee_label: string;
    quantity: number;
    amount: number;
    coach_name: string;
    coach_email: string;
    razorpay_payment_id?: string;
    razorpay_order_id?: string;
}

interface Props {
    registration: Registration;
}

export default function ThankYou({ registration }: Props) {
    return (
        <>
            <Head title="Registration Confirmed — NHCUP 2026" />
            <RegisterLayout>
                <div className="flex items-center justify-center px-5 py-16">
                    <div className="w-full max-w-[620px]">
                        {/* Success header */}
                        <div className="mb-8 text-center">
                            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-[2.2rem]">
                                <i className="fas fa-check text-green-600" />
                            </div>
                            <h1 className="mb-2 font-orbitron text-[clamp(1.6rem,4vw,2.2rem)] font-black text-dark">
                                Registration{' '}
                                <span className="bg-gradient-to-br from-navy to-sky bg-clip-text text-transparent">
                                    Confirmed!
                                </span>
                            </h1>
                            <p className="text-[0.95rem] leading-[1.7] text-muted">
                                Your team has been successfully registered for{' '}
                                <strong className="text-dark">
                                    {registration.sport_name}
                                </strong>
                                . A confirmation email has been sent to{' '}
                                <strong className="text-navy">
                                    {registration.coach_email}
                                </strong>
                                .
                            </p>
                        </div>

                        {/* Registration ID badge */}
                        <div className="mb-6 flex justify-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-navy/20 bg-navy/8 px-5 py-2">
                                <span className="font-rajdhani text-[0.8rem] font-bold tracking-[2px] text-muted uppercase">
                                    Registration ID
                                </span>
                                <span className="font-orbitron text-[1rem] font-black text-navy">
                                    #{registration.id}
                                </span>
                            </div>
                        </div>

                        {/* Details card */}
                        <div className="mb-6 overflow-hidden rounded-[18px] border border-[rgba(27,48,145,0.12)] bg-white shadow-[0_8px_40px_rgba(27,48,145,0.10)]">
                            {/* School */}
                            <div className="border-b border-[rgba(27,48,145,0.08)] px-6 py-4">
                                <div className="mb-3 font-rajdhani text-[0.72rem] font-bold tracking-[3px] text-navy uppercase">
                                    🏫 School
                                </div>
                                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                                    <Row
                                        label="School Name"
                                        value={registration.school_name}
                                    />
                                    <Row
                                        label="Mobile"
                                        value={registration.school_mobile}
                                    />
                                    <Row
                                        label="Email"
                                        value={registration.school_email}
                                    />
                                </div>
                            </div>

                            {/* Sport */}
                            <div className="border-b border-[rgba(27,48,145,0.08)] px-6 py-4">
                                <div className="mb-3 font-rajdhani text-[0.72rem] font-bold tracking-[3px] text-navy uppercase">
                                    🏆 Sport
                                </div>
                                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                                    <Row
                                        label="Sport"
                                        value={registration.sport_name}
                                    />
                                    <Row
                                        label="Category"
                                        value={registration.fee_label}
                                    />
                                    <Row
                                        label="Quantity"
                                        value={String(registration.quantity)}
                                    />
                                </div>
                            </div>

                            {/* Payment */}
                            <div className="px-6 py-4">
                                <div className="mb-3 font-rajdhani text-[0.72rem] font-bold tracking-[3px] text-navy uppercase">
                                    💳 Payment
                                </div>
                                <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                                    <Row
                                        label="Amount Paid"
                                        value={`₹${registration.amount.toLocaleString()}`}
                                        highlight
                                    />
                                    {registration.razorpay_payment_id && (
                                        <Row
                                            label="Payment ID"
                                            value={
                                                registration.razorpay_payment_id
                                            }
                                            mono
                                        />
                                    )}
                                    {registration.razorpay_order_id && (
                                        <Row
                                            label="Order ID"
                                            value={
                                                registration.razorpay_order_id
                                            }
                                            mono
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notice */}
                        <div className="mb-6 flex gap-3 rounded-[12px] border border-amber-200 bg-amber-50 px-5 py-4">
                            <i className="fas fa-exclamation-triangle mt-0.5 shrink-0 text-amber-500" />
                            <p className="font-inter text-[0.85rem] leading-[1.6] text-amber-800">
                                Please save this page or screenshot it. You may
                                be required to present your
                                <strong>
                                    {' '}
                                    Registration ID #{registration.id}
                                </strong>{' '}
                                and
                                <strong> Payment ID</strong> at the venue.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-gold to-gold-d px-8 py-3.5 font-rajdhani text-base font-extrabold tracking-[2px] text-navy-d uppercase shadow-[0_4px_20px_rgba(245,197,24,0.35)] transition-all hover:-translate-y-0.5 hover:scale-[1.03]"
                            >
                                <i className="fas fa-home" /> Back to Home
                            </Link>
                            <Link
                                href="/#sports"
                                className="inline-flex items-center gap-2.5 rounded-full border-2 border-navy bg-transparent px-8 py-3.5 font-rajdhani text-base font-bold tracking-[2px] text-navy uppercase transition-all hover:bg-navy hover:text-white"
                            >
                                <i className="fas fa-plus" /> Register Another
                            </Link>
                        </div>
                    </div>
                </div>
            </RegisterLayout>
        </>
    );
}

function Row({
    label,
    value,
    highlight,
    mono,
}: {
    label: string;
    value: string;
    highlight?: boolean;
    mono?: boolean;
}) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="font-rajdhani text-[0.72rem] font-bold tracking-[1px] text-muted uppercase">
                {label}
            </span>
            <span
                className={`text-[0.9rem] font-semibold break-all ${highlight ? 'text-[1rem] font-bold text-navy' : 'text-dark'} ${mono ? 'font-mono text-[0.8rem]' : ''}`}
            >
                {value}
            </span>
        </div>
    );
}
