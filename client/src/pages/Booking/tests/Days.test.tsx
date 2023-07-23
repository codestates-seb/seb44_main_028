import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Days from '../components/Days';

describe('Days', () => {
  test('renders days of the week', () => {
    render(<Days />);

    const dayElements = screen.getAllByRole('columnheader');
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

    expect(dayElements).toHaveLength(7);
    dayElements.forEach((dayElement, index) => {
      expect(dayElement).toHaveTextContent(daysOfWeek[index]);
    });
  });
});
