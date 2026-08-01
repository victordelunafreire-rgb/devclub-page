import styled from 'styled-components';

export const SectionBackdropFill = styled.div`
    position: absolute;
    inset: 0;

    z-index: -2;

    background: ${(props) =>
			props.$elevated
				? props.theme.backgroundElevated
				: props.theme.background};
`;
