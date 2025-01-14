<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Booking;
use App\Models\User; // Usamos User en lugar de Professional
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    // Mostrar la vista de la reserva y los servicios disponibles
    public function show(Service $service)
    {
        // Obtener los usuarios que tienen el rol de 'profesional'
        $professionals = User::whereHas('roles', function ($query) {
            $query->where('slug', 'profesional'); // Filtrar por el rol 'profesional'
        })->get();

        return Inertia::render('Booking/booking', [
            'service' => $service,
            'professionals' => $professionals,
        ]);
    }

    // Guardar la reserva
    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'customer_id' => 'required|exists:users,id',
            'professional_id' => 'required|exists:users,id',
            'scheduled_at' => 'required|date',
            'status' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        Booking::create([
            'service_id' => $request->service_id,
            'customer_id' => $request->customer_id,
            'professional_id' => $request->professional_id,
            'scheduled_at' => $request->scheduled_at,
            'status' => $request->status,
            'notes' => $request->notes,
        ]);

        return redirect()->route('booking.success');
    }
}
