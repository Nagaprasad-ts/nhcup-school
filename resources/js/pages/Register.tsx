import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import type { Sport } from '@/data/sports';
import RegisterLayout from '@/layouts/RegisterLayout';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
    school_name: string;
    school_address: string;
    school_mobile: string;
    school_email: string;
    coach_email: string;
    principal_name: string;
    principal_contact: string;
    coach_name: string;
    coach_contact: string;
    declaration: boolean;
}

interface FormErrors {
    [k: string]: string;
}
interface FeeOption {
    id: number;
    label: string;
    amount: number;
}
interface Props {
    sports?: Sport[];
    sportId?: string;
    sportFees?: Record<string, FeeOption[]>;
}

interface OrderResponse {
    registration_id: number;
    order_id: string;
    amount: number;
    currency: string;
    key_id: string;
    name: string;
    email: string;
    contact: string;
    description: string;
}

// Razorpay types are declared globally in resources/js/types/razorpay.d.ts

// ─── Shared UI atoms ──────────────────────────────────────────────────────────
const btnPrimary =
    'inline-flex items-center gap-2.5 bg-gradient-to-br from-gold to-gold-d text-navy-d font-rajdhani font-extrabold text-base tracking-[2px] uppercase px-8 py-3.5 rounded-full shadow-[0_4px_20px_rgba(245,197,24,0.35)] border-0 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(245,197,24,0.55)] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none';
const inputBase =
    'w-full px-3.5 py-2.5 font-inter text-[0.9rem] border-[1.5px] rounded-[10px] bg-white text-dark outline-none transition-all duration-200 focus:border-navy focus:shadow-[0_0_0_3px_rgba(27,48,145,0.10)] resize-y';
const inputError =
    'border-nhred bg-nhred/5 focus:border-nhred focus:shadow-[0_0_0_3px_rgba(220,38,38,0.08)]';
const inputOk = 'border-[rgba(27,48,145,0.2)] hover:border-navy/50';

// ─── Topbar (shared by FeeSelector & RegistrationForm) ───────────────────────
function RegTopbar({ sport }: { sport: Sport }) {
    return (
        <div className="mb-7 flex flex-wrap items-center justify-end gap-2.5 max-md:flex-col max-md:items-stretch">
            <div className="flex gap-2.5 max-md:flex-row">
                <a
                    href={sport.pdf_entry}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-nhred/30 bg-nhred/8 px-4.5 py-2.5 font-rajdhani text-[0.88rem] font-bold tracking-[1.5px] text-nhred uppercase transition-all hover:bg-nhred hover:text-white hover:shadow-[0_8px_30px_rgba(220,38,38,0.25)]"
                >
                    <i className="fas fa-file-pdf" /> Entry Form
                </a>
                <a
                    href={sport.pdf_rules}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-[1.5px] border-navy/25 bg-navy/7 px-4.5 py-2.5 font-rajdhani text-[0.88rem] font-bold tracking-[1.5px] whitespace-nowrap text-navy uppercase transition-all hover:bg-navy hover:text-white hover:shadow-[0_8px_30px_rgba(27,48,145,0.25)]"
                >
                    <i className="fas fa-book-open" /> Rules &amp; Regulations
                </a>
            </div>
        </div>
    );
}

// ─── Sport mini-header ────────────────────────────────────────────────────────
function SportHeader({
    sport,
    subtitle,
}: {
    sport: Sport;
    subtitle?: React.ReactNode;
}) {
    return (
        <div className="mb-5 flex items-center gap-4 rounded-[14px] border-2 border-[rgba(27,48,145,0.12)] bg-white px-6 py-4 shadow-[0_2px_16px_rgba(27,48,145,0.08)] max-md:flex-col max-md:gap-2.5 max-md:text-center">
            <span className="shrink-0 text-[2rem]">{sport.icon}</span>
            <div>
                <span className="mb-1 inline-block rounded-full border border-navy/20 bg-navy/7 px-3 py-0.5 font-rajdhani text-[0.72rem] font-bold tracking-[3px] text-navy uppercase">
                    {sport.badge}
                </span>
                <h2 className="m-0 mb-1 font-orbitron text-[clamp(1.1rem,2.5vw,1.5rem)] font-black text-dark">
                    {sport.name}{' '}
                    <span className="bg-linear-to-br from-navy to-sky bg-clip-text text-transparent">
                        Registration
                    </span>
                </h2>
                {subtitle && (
                    <p className="font-rajdhani text-[0.85rem] font-semibold text-muted">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}

// ─── State screens ────────────────────────────────────────────────────────────
function StateScreen({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-[60vh] items-center justify-center px-5 py-10">
            <div className="w-full max-w-105 rounded-[20px] border border-[rgba(27,48,145,0.12)] bg-white px-10 py-12 text-center shadow-[0_8px_40px_rgba(27,48,145,0.15)]">
                {children}
            </div>
        </div>
    );
}

// ─── Form field wrapper ───────────────────────────────────────────────────────
function RegField({
    label,
    required,
    error,
    children,
    colSpan,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
    colSpan?: boolean;
}) {
    return (
        <div className={colSpan ? 'col-span-2 max-md:col-span-1' : ''}>
            <label className="mb-1.5 block font-rajdhani text-[0.88rem] font-bold tracking-[0.5px] text-dark">
                {label}
                {required && <span className="ml-1 text-nhred">*</span>}
            </label>
            {children}
            {error && (
                <p className="mt-1.5 flex items-center gap-1 text-[0.78rem] text-nhred">
                    <i className="fas fa-exclamation-circle text-[0.75rem]" />{' '}
                    {error}
                </p>
            )}
        </div>
    );
}

// ─── Form section wrapper ─────────────────────────────────────────────────────
function FormSection({
    icon,
    title,
    children,
}: {
    icon: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="border-b border-[rgba(27,48,145,0.08)] px-8 py-7 last:border-0 max-md:px-5 max-md:py-5">
            <div className="mb-5 flex items-center gap-2 font-rajdhani text-[0.78rem] font-bold tracking-[3px] text-navy uppercase">
                <i className={`fas ${icon} text-[0.9rem]`} /> {title}
            </div>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                {children}
            </div>
        </div>
    );
}

// ─── Sport Selector ───────────────────────────────────────────────────────────
function SportSelector({
    sports,
    onSelect,
}: {
    sports: Sport[];
    onSelect: (s: Sport) => void;
}) {
    return (
        <div>
            <div className="reveal mb-12 text-center">
                <span className="mb-4 inline-block rounded-full border border-navy/20 bg-navy/7 px-[18px] py-1 font-rajdhani text-[0.8rem] font-bold tracking-[4px] text-navy uppercase">
                    Step 1
                </span>
                <h2 className="mb-4 font-orbitron text-[clamp(2rem,5vw,3.2rem)] leading-tight font-black text-dark">
                    Choose Your{' '}
                    <span className="bg-gradient-to-br from-navy to-sky bg-clip-text text-transparent">
                        Sport
                    </span>
                </h2>
                <div className="mx-auto mt-4 h-[3px] w-[60px] rounded-sm bg-gradient-to-r from-navy to-sky" />
                <p className="mt-4 text-base leading-[1.8] text-muted">
                    Select the sport you want to register your team for.
                </p>
            </div>
            <div className="mx-auto grid max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(185px,1fr))] gap-4 max-[480px]:grid-cols-2 max-md:grid-cols-2">
                {sports.map((s) => (
                    <button
                        key={s.sport_id}
                        onClick={() => onSelect(s)}
                        className="group cursor-pointer rounded-[18px] border-2 border-[rgba(27,48,145,0.12)] bg-white p-7 text-center shadow-[0_2px_16px_rgba(27,48,145,0.10)] transition-all duration-300 hover:-translate-y-2 hover:border-navy hover:shadow-[0_8px_30px_rgba(27,48,145,0.25)] max-[480px]:p-5"
                    >
                        <span className="mb-3 block text-[2.8rem] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg] max-[480px]:text-[2.2rem]">
                            {s.icon}
                        </span>
                        <div className="mb-1 font-orbitron text-[0.9rem] font-bold tracking-[0.5px] text-dark">
                            {s.name}
                        </div>
                        <div className="font-rajdhani text-[0.8rem] tracking-[1px] text-muted uppercase">
                            {s.teams}
                        </div>
                        <div className="mt-2.5 inline-block rounded-full border border-navy/20 bg-navy/7 px-2.5 py-0.5 font-rajdhani text-[0.7rem] font-bold tracking-[2px] text-navy uppercase">
                            {s.badge}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

// ─── Fee Selector ─────────────────────────────────────────────────────────────
function FeeSelector({
    sport,
    fees,
    onSelect,
}: {
    sport: Sport;
    fees: FeeOption[];
    onSelect: (f: FeeOption) => void;
    onBack: () => void;
}) {
    return (
        <div className="mx-auto max-w-215">
            <RegTopbar sport={sport} />
            <SportHeader sport={sport} subtitle={sport.teams} />
            <div className="rounded-[18px] border border-[rgba(27,48,145,0.12)] bg-white p-8 shadow-[0_8px_40px_rgba(27,48,145,0.15)] max-md:p-5">
                <div className="mb-5 flex items-center gap-2 font-rajdhani text-[0.78rem] font-bold tracking-[3px] text-navy uppercase">
                    <i className="fas fa-tags" /> Select Registration Type
                </div>
                <div className="flex flex-col gap-3">
                    {fees.map((fee) => (
                        <button
                            key={fee.id}
                            onClick={() => onSelect(fee)}
                            className="group flex w-full cursor-pointer items-center gap-4 rounded-[14px] border-2 border-[rgba(27,48,145,0.10)] bg-page2 px-6 py-4 text-left transition-all duration-300 hover:translate-x-1 hover:border-navy hover:bg-navy/4 hover:shadow-[0_8px_30px_rgba(27,48,145,0.25)]"
                        >
                            <div className="flex-1 font-rajdhani text-[1.1rem] font-bold tracking-[0.5px] text-dark">
                                {fee.label}
                            </div>
                            <div className="rounded-full bg-navy/8 px-4 py-1.5 font-orbitron text-[1.2rem] font-black text-navy">
                                ₹{fee.amount}
                            </div>
                            <i className="fas fa-arrow-right text-[0.9rem] text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ─── Registration Form ────────────────────────────────────────────────────────
function RegistrationForm({
    sport,
    fee,
}: {
    sport: Sport;
    fee: FeeOption;
    onBack: () => void;
}) {
    const [form, setForm] = useState<FormData>({
        school_name: '',
        school_address: '',
        school_mobile: '',
        school_email: '',
        coach_email: '',
        principal_name: '',
        principal_contact: '',
        coach_name: '',
        coach_contact: '',
        declaration: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState<'form' | 'failed'>('form');

    useEffect(() => {
        if (!document.getElementById('razorpay-script')) {
            const s = document.createElement('script');
            s.id = 'razorpay-script';
            s.src = 'https://checkout.razorpay.com/v1/checkout.js';
            s.async = true;
            document.body.appendChild(s);
        }
    }, []);

    const set =
        (field: keyof FormData) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const val =
                e.target.type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : e.target.value;
            setForm((p) => ({ ...p, [field]: val }));
            setErrors((p) => ({ ...p, [field]: '' }));
        };

    const validate = (): FormErrors => {
        const e: FormErrors = {};

        if (!form.school_name.trim()) {
            e.school_name = 'School name is required.';
        }

        if (!form.school_address.trim()) {
            e.school_address = 'School address is required.';
        }

        if (!form.school_mobile.trim()) {
            e.school_mobile = 'School mobile is required.';
        }

        if (!form.school_email.trim()) {
            e.school_email = 'School email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.school_email)) {
            e.school_email = 'Enter a valid email.';
        }

        if (!form.coach_email.trim()) {
            e.coach_email = 'Coach email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.coach_email)) {
            e.coach_email = 'Enter a valid email.';
        }

        if (!form.principal_name.trim()) {
            e.principal_name = "Principal's name is required.";
        }

        if (!form.principal_contact.trim()) {
            e.principal_contact = "Principal's contact is required.";
        }

        if (!form.coach_name.trim()) {
            e.coach_name = 'Coach name is required.';
        }

        if (!form.coach_contact.trim()) {
            e.coach_contact = 'Coach contact is required.';
        }

        if (!form.declaration) {
            e.declaration = 'You must accept the declaration.';
        }

        return e;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs = validate();

        if (Object.keys(errs).length) {
            setErrors(errs);

            return;
        }

        setLoading(true);

        try {
            const { data } = await axios.post<
                OrderResponse | { status: string }
            >('/register', {
                ...form,
                sport_id: sport.sport_id,
                sport_name: sport.name,
                sport_fee_id: fee.id,
            });

            if ('status' in data) {
                // free sport — shouldn't happen anymore but handle gracefully
                setLoading(false);
                
                return;
            }

            openRazorpay(data as OrderResponse);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 422) {
                setErrors(
                    (err.response.data as { errors: FormErrors }).errors ?? {},
                );
            } else {
                setStep('failed');
            }

            setLoading(false);
        }
    };

    const openRazorpay = (order: OrderResponse) => {
        const rzp = new window.Razorpay({
            key: order.key_id,
            amount: order.amount,
            currency: order.currency,
            name: 'NHCUP 2026',
            description: order.description,
            order_id: order.order_id,
            prefill: {
                name: order.name,
                email: order.email,
                contact: order.contact,
            },
            theme: { color: '#1b3091' },
            modal: { ondismiss: () => setLoading(false) },
            handler: async (res) => {
                try {
                    await axios.post('/register/verify-payment', {
                        razorpay_payment_id: res.razorpay_payment_id,
                        razorpay_order_id: res.razorpay_order_id,
                        razorpay_signature: res.razorpay_signature,
                    });
                } catch {
                    // Verification failed — webhook will retry
                }
                
                // Redirect to thank-you page
                window.location.href = `/thank-you/${order.registration_id}`;
            },
        });
        rzp.on('payment.failed', () => {
            setStep('failed');
            setLoading(false);
        });
        rzp.open();
    };

    if (step === 'failed') {
        return (
            <StateScreen>
                <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-nhred/10 text-[1.8rem] text-nhred">
                    <i className="fas fa-times" />
                </div>
                <h2 className="mb-2 font-orbitron text-[1.4rem] font-bold text-dark">
                    Submission Failed
                </h2>
                <p className="mb-6 text-[0.9rem] text-muted">
                    Something went wrong. Please try again.
                </p>
                <button className={btnPrimary} onClick={() => setStep('form')}>
                    Try Again
                </button>
            </StateScreen>
        );
    }

    return (
        <div className="mx-auto max-w-[860px]">
            <RegTopbar sport={sport} />
            <SportHeader
                sport={sport}
                subtitle={
                    <>
                        {sport.categories.join(' / ')} ·{' '}
                        {sport.genders.join(' & ')} · Max {sport.max_players}{' '}
                        players ·{' '}
                        <strong className="text-navy">
                            {fee.label} — ₹{fee.amount}
                        </strong>
                    </>
                }
            />

            <form
                className="overflow-hidden rounded-[18px] border border-[rgba(27,48,145,0.12)] bg-white shadow-[0_8px_40px_rgba(27,48,145,0.15)]"
                onSubmit={handleSubmit}
            >
                {/* School */}
                <FormSection icon="fa-school" title="School Information">
                    <RegField
                        label="School Name"
                        required
                        error={errors.school_name}
                    >
                        <input
                            type="text"
                            placeholder="e.g. St. Joseph's High School"
                            value={form.school_name}
                            onChange={set('school_name')}
                            className={`${inputBase} ${errors.school_name ? inputError : inputOk}`}
                        />
                    </RegField>
                    <RegField
                        label="School Mobile"
                        required
                        error={errors.school_mobile}
                    >
                        <input
                            type="tel"
                            placeholder="98765 43210"
                            value={form.school_mobile}
                            onChange={set('school_mobile')}
                            className={`${inputBase} ${errors.school_mobile ? inputError : inputOk}`}
                        />
                    </RegField>
                    <RegField
                        label="School Email"
                        required
                        error={errors.school_email}
                    >
                        <input
                            type="email"
                            placeholder="school@example.edu"
                            value={form.school_email}
                            onChange={set('school_email')}
                            className={`${inputBase} ${errors.school_email ? inputError : inputOk}`}
                        />
                    </RegField>
                    <RegField
                        label="School Address"
                        required
                        error={errors.school_address}
                        colSpan
                    >
                        <textarea
                            rows={2}
                            placeholder="Full school address"
                            value={form.school_address}
                            onChange={set('school_address')}
                            className={`${inputBase} ${errors.school_address ? inputError : inputOk}`}
                        />
                    </RegField>
                </FormSection>

                {/* Principal */}
                <FormSection icon="fa-user-tie" title="Principal Details">
                    <RegField
                        label="Principal Name"
                        required
                        error={errors.principal_name}
                    >
                        <input
                            type="text"
                            placeholder="Full name"
                            value={form.principal_name}
                            onChange={set('principal_name')}
                            className={`${inputBase} ${errors.principal_name ? inputError : inputOk}`}
                        />
                    </RegField>
                    <RegField
                        label="Principal Contact"
                        required
                        error={errors.principal_contact}
                    >
                        <input
                            type="tel"
                            placeholder="98765 43210"
                            value={form.principal_contact}
                            onChange={set('principal_contact')}
                            className={`${inputBase} ${errors.principal_contact ? inputError : inputOk}`}
                        />
                    </RegField>
                </FormSection>

                {/* Coach */}
                <FormSection
                    icon="fa-whistle"
                    title="Coach / In-charge Details"
                >
                    <RegField
                        label="Coach Name"
                        required
                        error={errors.coach_name}
                    >
                        <input
                            type="text"
                            placeholder="Full name"
                            value={form.coach_name}
                            onChange={set('coach_name')}
                            className={`${inputBase} ${errors.coach_name ? inputError : inputOk}`}
                        />
                    </RegField>
                    <RegField
                        label="Coach Contact"
                        required
                        error={errors.coach_contact}
                    >
                        <input
                            type="tel"
                            placeholder="98765 43210"
                            value={form.coach_contact}
                            onChange={set('coach_contact')}
                            className={`${inputBase} ${errors.coach_contact ? inputError : inputOk}`}
                        />
                    </RegField>
                    <RegField
                        label="Coach Email"
                        required
                        error={errors.coach_email}
                        colSpan
                    >
                        <input
                            type="email"
                            placeholder="coach@school.edu"
                            value={form.coach_email}
                            onChange={set('coach_email')}
                            className={`${inputBase} ${errors.coach_email ? inputError : inputOk}`}
                        />
                        <p className="mt-1.5 text-[0.75rem] text-muted">
                            Confirmation email will be sent here after
                            registration.
                        </p>
                    </RegField>
                </FormSection>

                {/* Declaration */}
                <div className="border-b border-[rgba(27,48,145,0.08)] px-8 py-7 max-md:px-5 max-md:py-5">
                    <label
                        className={`flex cursor-pointer items-start gap-3 ${errors.declaration ? 'text-nhred' : ''}`}
                    >
                        <input
                            type="checkbox"
                            checked={form.declaration}
                            onChange={set('declaration')}
                            className="mt-0.5 h-4.5 w-4.5 shrink-0 cursor-pointer accent-navy"
                        />
                        <span className="font-inter text-[0.88rem] leading-[1.6] text-muted">
                            I certify that all players are eligible as per NHCUP
                            2026 rules, are enrolled students of the
                            institution, and the information provided is
                            accurate. I accept responsibility for the conduct of
                            the team throughout the championship.
                        </span>
                    </label>
                    {errors.declaration && (
                        <p className="mt-2 flex items-center gap-1 text-[0.78rem] text-nhred">
                            <i className="fas fa-exclamation-circle text-[0.75rem]" />{' '}
                            {errors.declaration}
                        </p>
                    )}
                </div>

                {/* Fee row */}
                <div className="flex items-center justify-between border-b border-[rgba(27,48,145,0.08)] bg-navy/3 px-8 py-5 max-md:px-5">
                    <span className="flex items-center gap-2 font-rajdhani text-[0.95rem] font-bold tracking-[1px] text-navy uppercase">
                        <i className="fas fa-receipt" /> {fee.label}
                    </span>
                    <strong className="font-orbitron text-[1.3rem] font-black text-navy-d">
                        ₹{fee.amount}
                    </strong>
                </div>

                {/* Submit */}
                <div className="px-8 py-6 max-md:px-5">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${btnPrimary} w-full justify-center text-[1.05rem]`}
                    >
                        {loading ? (
                            <>
                                <span className="h-4 w-4 animate-btn-spin rounded-full border-2 border-white/40 border-t-white" />{' '}
                                Submitting…
                            </>
                        ) : (
                            <>
                                <i className="fas fa-credit-card" /> Pay ₹
                                {fee.amount} &amp; Register
                            </>
                        )}
                    </button>
                    <p className="mt-4 text-center font-inter text-[0.78rem] text-muted">
                        By submitting you agree to the NHCUP 2026 rules and
                        regulations. Registration fee is non-refundable.
                    </p>
                </div>
            </form>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Register({
    sports = [],
    sportId,
    sportFees = {},
}: Props) {
    const initial = sportId
        ? (sports.find((s) => s.sport_id === sportId) ?? null)
        : null;
    const [sport, setSport] = useState<Sport | null>(initial);
    const [fee, setFee] = useState<FeeOption | null>(null);

    const feesForSport = sport ? (sportFees[sport.sport_id] ?? []) : [];

    // Auto-select fee when sport has exactly one option
    useEffect(() => {
        if (sport && feesForSport.length === 1) {
            setFee(feesForSport[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sport?.sport_id]);

    const handleSelectSport = (s: Sport) => {
        setSport(s);
        setFee(null);
        window.history.pushState({}, '', `/register/${s.sport_id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBack = () => {
        if (fee && feesForSport.length > 1) {
            setFee(null);
        } else {
            setSport(null);
            setFee(null);
            window.history.pushState({}, '', '/register');
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderContent = () => {
        if (!sport) {
            return (
                <SportSelector sports={sports} onSelect={handleSelectSport} />
            );
        }

        if (!fee) {
            if (feesForSport.length > 1) {
                return (
                    <FeeSelector
                        sport={sport}
                        fees={feesForSport}
                        onSelect={(f) => {
                            setFee(f);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        onBack={handleBack}
                    />
                );
            }

            return null;
        }

        return <RegistrationForm sport={sport} fee={fee} onBack={handleBack} />;
    };

    return (
        <>
            <Head title={sport ? `${sport.name} Registration — NHCUP 2026` : 'Register — NHCUP 2026'} />
            <RegisterLayout>
                <div className="mx-auto w-full max-w-[1200px] px-[5%] py-[60px] max-md:px-[4%] max-md:py-10">
                    {renderContent()}
                </div>
            </RegisterLayout>
        </>
    );
}
