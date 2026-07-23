import { useEffect, useRef } from 'react';

export function AmbientParticles({ color = '#FF6B4A' }) {
	const canvasRef = useRef(null);
	const particlesRef = useRef([]);
	const animationRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');

		function resize() {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
			initParticles();
		}

		function initParticles() {
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			const maxRadius = Math.max(canvas.width, canvas.height) * 0.45;
			const count = 3000;
			const particles = [];

			for (let i = 0; i < count; i++) {
				const angle = Math.random() * Math.PI * 2;
				const gaussian = (Math.random() + Math.random() + Math.random()) / 3;
				const distance = gaussian * maxRadius;

				particles.push({
					baseX: centerX + Math.cos(angle) * distance,
					baseY: centerY + Math.sin(angle) * distance,
					x: 0,
					y: 0,
					offset: Math.random() * 1000,
					radius: 0.88 + Math.random() * 2.2,
					opacity: 0.65,
				});
			}

			particlesRef.current = particles;
		}

		resize();
		window.addEventListener('resize', resize);

		let frame = 0;

		function animate() {
			frame += 6;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.globalCompositeOperation = 'lighter';

			particlesRef.current.forEach((p) => {
				const driftX = Math.sin((frame + p.offset) * 0.01) * 6;
				const driftY = Math.cos((frame + p.offset) * 0.008) * 6;

				p.x = p.baseX + driftX;
				p.y = p.baseY + driftY;

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = color;
				ctx.globalAlpha = p.opacity;
				ctx.fill();
			});

			animationRef.current = requestAnimationFrame(animate);
		}

		animate();

		return () => {
			cancelAnimationFrame(animationRef.current);
			window.removeEventListener('resize', resize);
		};
	}, [color]);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				pointerEvents: 'none',
			}}
		/>
	);
}
