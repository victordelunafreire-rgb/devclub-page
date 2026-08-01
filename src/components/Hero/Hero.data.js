export const HERO_FRAME_COUNT = 120;

export const heroFramePaths = Array.from(
	{ length: HERO_FRAME_COUNT },
	(_, index) => `/hero-frames/frame-${String(index + 1).padStart(4, '0')}.jpg`,
);
