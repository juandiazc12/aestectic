<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'service_id',
        'scheduled_at',
        'status',
        'notes',
        'professional_id',
        'payment_method',
        'payment_status',
        'payment_transaction_id',
        'payment_amount',
        'card_type',
        'bank_name',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function professional()
    {
        return $this->belongsTo(User::class, 'professional_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public static function getBookingsByCustomer($customer_id)
    {
        return self::where('customer_id', $customer_id)
            ->orderBy('scheduled_at', 'desc')
            ->with('service', 'customer', 'professional')
            ->get();
    }
}