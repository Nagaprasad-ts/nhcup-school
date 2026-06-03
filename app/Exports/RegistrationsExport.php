<?php

namespace App\Exports;

use App\Models\Registration;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RegistrationsExport implements FromQuery, WithHeadings, WithMapping, WithStyles
{
    public function __construct(private bool $paidOnly = false) {}

    public function query()
    {
        return Registration::query()
            ->when($this->paidOnly, fn ($q) => $q->where('payment_status', 'paid'))
            ->orderBy('id');
    }

    public function headings(): array
    {
        return [
            'ID',
            'School Name',
            'School Address',
            'School Mobile',
            'School Email',
            'Principal Name',
            'Principal Contact',
            'Coach Name',
            'Coach Contact',
            'Coach Email',
            'Sport',
            'Fee Type',
            'Payment Status',
            'Amount (₹)',
            'Razorpay Order ID',
            'Razorpay Payment ID',
            'Registered At',
        ];
    }

    public function map($row): array
    {
        return [
            $row->id,
            $row->school_name,
            $row->school_address,
            $row->school_mobile,
            $row->school_email,
            $row->principal_name,
            $row->principal_contact,
            $row->coach_name,
            $row->coach_contact,
            $row->coach_email,
            $row->sport_name,
            $row->fee_label ?? '-',
            ucfirst($row->payment_status),
            $row->amount,
            $row->razorpay_order_id ?? '-',
            $row->razorpay_payment_id ?? '-',
            $row->created_at->format('d M Y, h:i A'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
