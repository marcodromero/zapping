import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import ChannelBrand from '../../components/ChannelBrand';

describe('ChannelBrand', () => {
  test('should render the channel brand correctly', () => {
    const mockTvgLogo = 'https://example.com/logo.png';
    const mockName = 'Example Channel';
    render(<ChannelBrand tvgLogo={mockTvgLogo} name={mockName} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toBe('https://example.com/logo.png');
    expect(screen.getByText(mockName)).toBeDefined();
  });
});
