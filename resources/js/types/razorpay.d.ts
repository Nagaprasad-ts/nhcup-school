// Global Razorpay type declarations — shared across all pages

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id: string;
    prefill?: { name?: string; email?: string; contact?: string };
    theme?: { color?: string };
    modal?: { ondismiss?: () => void };
    handler: (response: RazorpayPaymentResponse) => void;
}

interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RazorpayInstance {
    open(): void;
    on(event: string, callback: (data: unknown) => void): void;
}

interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
}
