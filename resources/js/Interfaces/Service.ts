export interface Services {
    current_page: number
    data: Daum[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: any
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
}

export interface Daum {
    id: number
    name: string
    image: string
    description: string
    price: string
    status: 'activo' | 'suspendido' // Añadimos el tipo para 'status' (activo o suspendido)
    created_at: string
    updated_at: string
}

export interface Link {
    url?: string
    label: string
    active: boolean
}