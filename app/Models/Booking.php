<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'service_id',
        'professional_id',
        'scheduled_at',
        'status',
        'notes',
        'total_amount',
        'payment_preference_id',
        'payment_id',
        'payment_status',
        'payment_details',
        'payment_method',
        'payment_completed_at',
        'cancelled_at',
        'completed_at',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'payment_completed_at' => 'datetime',
        'payment_details' => 'array',
        'total_amount' => 'float',
        'cancelled_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // Relación con el servicio
    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    // Accessor para mostrar la fecha en zona horaria de Colombia
    public function getScheduledAtBogotaAttribute()
    {
        return $this->scheduled_at ? Carbon::parse($this->scheduled_at)->setTimezone('America/Bogota') : null;
    }

    // Relación con el profesional
    public function professional()
    {
        return $this->belongsTo(User::class, 'professional_id');
    }

    // Relación con el cliente
    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    // Relación con el usuario (para el controlador que usa 'user')
    public function user()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    // Método para obtener reservas por cliente
    public static function getBookingsByCustomer($customer_id)
    {
        return self::where('customer_id', $customer_id)
            ->orderBy('scheduled_at', 'desc')
            ->with('service', 'customer', 'professional')
            ->get();
    }

    // Método para marcar como pagado
    public function markAsPaid($paymentId, $paymentDetails = [])
    {
        $this->update([
            'payment_status' => 'paid',
            'payment_id' => $paymentId,
            'payment_details' => $paymentDetails,
            'payment_completed_at' => now(),
            'status' => 'confirmed',
        ]);
    }

    // Método para verificar si está pagado
    public function isPaid()
    {
        return $this->payment_status === 'paid';
    }

    // Método para obtener el monto total
    public function getTotalAmount()
    {
        return $this->total_amount ?? $this->service->price;
    }

    // Método para calcular el total automáticamente
    public function calculateTotal()
    {
        $basePrice = $this->service->price;
        // Aquí puedes agregar lógica para descuentos, impuestos, etc.
        return $basePrice;
    }

    // Accessor para el estado de pago en español
    public function getPaymentStatusSpanishAttribute()
    {
        return match ($this->payment_status) {
            'pending' => 'Pendiente',
            'paid' => 'Pagado',
            'failed' => 'Fallido',
            'cancelled' => 'Cancelado',
            default => $this->payment_status,
        };
    }

    // Accessor para el estado de la reserva en español
    public function getStatusSpanishAttribute(): string
    {
        return match ($this->status) {
            'pending' => 'Pendiente',
            'confirmed' => 'Confirmada',
            'completed' => 'Completada',
            'cancelled' => 'Cancelada',
            default => $this->status,
        };
    }

    public function rating()
    {
        return $this->hasOne(Rating::class);
    }

}