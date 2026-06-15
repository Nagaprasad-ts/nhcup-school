<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>NHCUP 2026 — Registration Confirmed</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #eef2f7;
      padding: 32px 16px;
      color: #1a1a2e;
    }

    .wrapper {
      max-width: 620px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 8px 40px rgba(27, 48, 145, 0.12);
    }

    /* ── Header ── */
    .header {
      background: linear-gradient(135deg, #0f1e6b 0%, #1b3091 60%, #2d4ab0 100%);
      padding: 40px 40px 32px;
      text-align: center;
      position: relative;
    }
    .header-logo {
      font-size: 40px;
      margin-bottom: 12px;
      display: block;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #f5c518;
      margin-bottom: 6px;
    }
    .header-sub {
      font-size: 13px;
      color: rgba(255,255,255,0.75);
      letter-spacing: 1px;
    }
    .header-badge {
      display: inline-block;
      background: rgba(245, 197, 24, 0.15);
      border: 1px solid rgba(245, 197, 24, 0.5);
      color: #f5c518;
      border-radius: 50px;
      padding: 5px 20px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 16px;
    }

    /* ── Banner stripe ── */
    .stripe {
      height: 4px;
      background: linear-gradient(90deg, #1b3091, #5db8df, #f5c518);
    }

    /* ── Body ── */
    .body {
      padding: 36px 40px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 700;
      color: #1b3091;
      margin-bottom: 10px;
    }
    .intro {
      font-size: 15px;
      line-height: 1.75;
      color: #4b5563;
      margin-bottom: 24px;
    }

    /* ── Success pill ── */
    .success-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #d1fae5;
      color: #065f46;
      border: 1px solid #6ee7b7;
      border-radius: 50px;
      padding: 10px 22px;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 28px;
    }

    /* ── Detail cards ── */
    .card {
      background: #f8faff;
      border: 1px solid #dbeafe;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 16px;
    }
    .card-header {
      background: linear-gradient(135deg, #1b3091, #2d4ab0);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 10px 18px;
    }
    .card-body { padding: 4px 0; }
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 18px;
      border-bottom: 1px solid #e0eaff;
      font-size: 14px;
      gap: 12px;
    }
    .row:last-child { border-bottom: none; }
    .row .lbl { color: #6b7280; font-weight: 500; white-space: nowrap; }
    .row .val { color: #111827; font-weight: 600; text-align: right; word-break: break-word; }

    /* ── Payment card ── */
    .card--payment .card-header {
      background: linear-gradient(135deg, #7a5800, #f5c518);
      color: #1a0f00;
    }
    .payment-id {
      font-family: monospace;
      font-size: 12px;
      background: #fff;
      border: 1px solid #dbeafe;
      border-radius: 6px;
      padding: 2px 8px;
      color: #1b3091;
    }

    /* ── Notice box ── */
    .notice {
      background: #fffbeb;
      border: 1px solid #fcd34d;
      border-radius: 10px;
      padding: 14px 18px;
      font-size: 13px;
      line-height: 1.6;
      color: #92400e;
      margin: 24px 0;
    }
    .notice strong { color: #78350f; }

    /* ── CTA ── */
    .cta {
      font-size: 14px;
      line-height: 1.75;
      color: #4b5563;
      margin-top: 20px;
    }
    .cta a { color: #1b3091; font-weight: 600; text-decoration: none; }

    /* ── Footer ── */
    .footer {
      background: #0a1240;
      padding: 24px 40px;
      text-align: center;
    }
    .footer p {
      font-size: 12px;
      color: rgba(255,255,255,0.35);
      line-height: 1.8;
    }
    .footer .footer-brand {
      font-size: 14px;
      font-weight: 700;
      color: #f5c518;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }

    @media (max-width: 480px) {
      .body { padding: 24px 20px; }
      .header { padding: 28px 20px 24px; }
      .footer { padding: 20px; }
      .row { flex-direction: column; align-items: flex-start; gap: 2px; }
      .row .val { text-align: left; }
    }
  </style>
</head>
<body>
  <div class="wrapper">

    {{-- Header --}}
    <div class="header">
      <span class="header-logo">🏆</span>
      <h1>NHCUP 2026</h1>
      <p class="header-sub">State Level Inter-School Tournament</p>
    </div>
    <div class="stripe"></div>

    {{-- Body --}}
    <div class="body">

      <p class="greeting">Dear {{ $registration->coach_name }},</p>
      <p class="intro">
        Your Registration for the
        <strong>NHCUP 2026 — {{ $registration->sport_name }}</strong>
        has been successfully! Your Payment has been received
      </p>

      <div class="success-pill">
        ✅ Payment Confirmed — ₹{{ number_format($amountRupees) }}
      </div>

      {{-- Entry Form Download --}}
      @if(isset($sport) && $sport && $sport->pdf_entry)
      <div style="background:#f0f4ff;border:2px solid #1b3091;border-radius:12px;padding:22px 24px;margin:20px 0;text-align:center;">
        <p style="font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#1b3091;margin-bottom:8px;">📋 Action Required — Entry Form</p>
        <p style="font-size:13px;color:#4b5563;line-height:1.65;margin-bottom:18px;">
          Submitting the <strong>Entry Form with all player details is mandatory</strong> to complete your participation.
          Please download, fill in your team details and submit it to the organizers before the event.
        </p>
        <a href="{{ config('app.url') }}{{ $sport->pdf_entry }}"
           style="display:inline-block;background:linear-gradient(135deg,#1b3091,#2d4ab0);color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:12px 30px;border-radius:50px;">
          ⬇&nbsp; Download Entry Form
        </a>
        @if($sport->pdf_rules)
        <br /><br />
        <a href="{{ config('app.url') }}{{ $sport->pdf_rules }}"
           style="display:inline-block;color:#1b3091;text-decoration:none;font-size:12px;font-weight:600;border:1.5px solid #1b3091;padding:8px 22px;border-radius:50px;">
          📖&nbsp; View Rules &amp; Regulations
        </a>
        @endif
      </div>
      @endif

      {{-- School Details --}}
      <div class="card">
        <div class="card-header">🏫 School Details</div>
        <div class="card-body">
          <div class="row">
            <span class="lbl">School Name: </span>
            <span class="val">{{ $registration->school_name }}</span>
          </div>
          <div class="row">
            <span class="lbl">Address: </span>
            <span class="val">{{ $registration->school_address }}</span>
          </div>
          <div class="row">
            <span class="lbl">Mobile: </span>
            <span class="val">{{ $registration->school_mobile }}</span>
          </div>
          <div class="row">
            <span class="lbl">Email: </span>
            <span class="val">{{ $registration->school_email }}</span>
          </div>
        </div>
      </div>

      {{-- Principal --}}
      <div class="card">
        <div class="card-header">👤 Principal Details</div>
        <div class="card-body">
          <div class="row">
            <span class="lbl">Name: </span>
            <span class="val">{{ $registration->principal_name }}</span>
          </div>
          <div class="row">
            <span class="lbl">Contact: </span>
            <span class="val">{{ $registration->principal_contact }}</span>
          </div>
        </div>
      </div>

      {{-- Coach --}}
      <div class="card">
        <div class="card-header">🏅 Coach / In-charge</div>
        <div class="card-body">
          <div class="row">
            <span class="lbl">Name: </span>
            <span class="val">{{ $registration->coach_name }}</span>
          </div>
          <div class="row">
            <span class="lbl">Contact: </span>
            <span class="val">{{ $registration->coach_contact }}</span>
          </div>
          <div class="row">
            <span class="lbl">Email: </span>
            <span class="val">{{ $registration->coach_email }}</span>
          </div>
        </div>
      </div>

      {{-- Sport & Payment --}}
      <div class="card card--payment">
        <div class="card-header">💳 Sport &amp; Payment</div>
        <div class="card-body">
          <div class="row">
            <span class="lbl">Sport: </span>
            <span class="val">{{ $registration->sport_name }}</span>
          </div>
          <div class="row">
            <span class="lbl">Fee Type: </span>
            <span class="val">{{ $registration->fee_label }}</span>
          </div>
          <div class="row">
            <span class="lbl">Quantity: </span>
            <span class="val">{{ $registration->quantity }}</span>
          </div>
          <div class="row">
            <span class="lbl">Amount Paid: </span>
            <span class="val">₹{{ number_format($amountRupees) }}</span>
          </div>
          @if($registration->razorpay_payment_id)
          <div class="row">
            <span class="lbl">Payment ID: </span>
            <span class="val"><span class="payment-id">{{ $registration->razorpay_payment_id }}</span></span>
          </div>
          <div class="row">
            <span class="lbl">Order ID: </span>
            <span class="val"><span class="payment-id">{{ $registration->razorpay_order_id }}</span></span>
          </div>
          @endif
        </div>
      </div>

      {{-- Payment ID notice --}}
      @if($registration->razorpay_payment_id)
      <div class="notice">
        <strong>📌 Important:</strong> Please save this email and note your
        <strong>Payment ID ({{ $registration->razorpay_payment_id }})</strong>.
        You may be required to present it at the venue for verification on the day of the event.
      </div>
      @endif

      {{-- CTA --}}
      <p class="cta">
        For any queries or clarifications, please reach out to us:<br />
        📧 <a href="mailto:nhcup@newhorizonindia.edu">nhcup@newhorizonindia.edu</a><br />
        📞 <strong>96634 12000</strong>
      </p>

      <p class="cta" style="margin-top:16px;">
        We look forward to an exciting championship. Best of luck to your team! 🎉
      </p>

      <p class="cta" style="margin-top:16px;">
        The institution reserves the right to confirm or cancel the registration based on payment inconsistencies.
      </p>

    </div>

    {{-- Footer --}}
    <div class="footer">
      <p class="footer-brand">NHCUP 2026</p>
      <p style="margin-top:8px;">
        This is an automated email — please do not reply directly.<br />
        © {{ date('Y') }} NHCUP. All Rights Reserved.
      </p>
    </div>

  </div>
</body>
</html>
