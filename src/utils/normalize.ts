export function normalizeCreditLimit(raw: string, scale = 1): string {
    if (!raw) return '';

    const n = parseFloat(raw.replace(/[^\d.]/g, ''))
    return isNaN(n) ? '' : (n / scale).toFixed(2)
}

export function normalizeBirthday(raw: string): string {
    const digits = raw.replace(/[^\d]/g, '')

    if (digits.length === 8) {
        if (raw.includes('-') || /^\d{8}$/.test(raw)) {
            const y = digits.slice(0, 4)
            const m = digits.slice(4, 6)
            const d = digits.slice(6, 8)
            return `${y}-${m}-${d}`
        }

        if (raw.includes('/')) {
            const [dd, mm, yyyy] = raw.split('/')
            if (yyyy?.length === 4) {
                return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`
            }
        }
    }

    return ''
}
