import {
	SiAeromexico,
	SiBmw,
	SiCocacola,
	SiDuolingo,
	SiKia,
	SiMercadopago,
	SiMotorola,
	SiNetflix,
	SiNissan,
	SiSpotify,
	SiThenorthface,
	SiYoutube,
} from 'react-icons/si';

// `scale` normalises optical weight, not bounding box: at the same cell height a
// round badge (BMW, Motorola) reads much heavier than a long wordmark (Netflix,
// Coca-Cola), so the compact marks are dialled down and the wide ones up. Values
// are eyeballed against each other, which is the only way to judge this.
export const partners = [
	{ id: 1, name: 'Netflix', icon: SiNetflix, scale: 1 },
	{ id: 2, name: 'YouTube', icon: SiYoutube, scale: 1.35 },
	{ id: 3, name: 'Coca-Cola', icon: SiCocacola, scale: 1.68 },
	{ id: 4, name: 'Duolingo', icon: SiDuolingo, scale: 1.04 },
	{ id: 5, name: 'Mercado Pago', icon: SiMercadopago, scale: 1.4 },
	{ id: 6, name: 'BMW', icon: SiBmw, scale: 1.08 },
	{ id: 7, name: 'Nissan', icon: SiNissan, scale: 1.19 },
	{ id: 8, name: 'Motorola', icon: SiMotorola, scale: 1.01 },
	{ id: 9, name: 'Kia', icon: SiKia, scale: 1.71 },
	{ id: 10, name: 'The North Face', icon: SiThenorthface, scale: 1.6 },
	{ id: 11, name: 'Spotify', icon: SiSpotify, scale: 1.01 },
	{ id: 12, name: 'Aeroméxico', icon: SiAeromexico, scale: 1.25 },
];

// Cells are deliberately fewer than the pool: the spare brands are what a swap
// draws from without duplicating a logo already on screen.
export const PARTNER_COLUMNS = 5;
export const PARTNER_ROWS = 2;
export const PARTNER_CELLS = PARTNER_COLUMNS * PARTNER_ROWS;

// Side of the square box a mark is drawn into, before its own `scale`. Simple
// Icons all share a 24x24 viewBox, so this is the box, not the visible glyph —
// a wide wordmark only fills a middle band of it, which is exactly what the
// per-logo scale compensates for.
export const LOGO_BASE_SIZE = 76;
export const CELL_HEIGHT = 132;
