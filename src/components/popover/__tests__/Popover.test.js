import React from 'react';
import {render} from '@testing-library/react';
import Popover from '../Popover';

describe('Popover', () => {
  // this is just a little hack to silence a warning that we'll get until we
  // upgrade to 16.9. See also: https://github.com/facebook/react/pull/14853
  const originalError = console.error;

  let div;

  beforeAll(() => {
    div = document.createElement('div');
    div.setAttribute('id', 'test-target');

    // HACK - See above
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  // HACK - See above
  afterAll(() => {
    console.error = originalError;
  });

  test('renders a div with class "popover"', () => {
    render(<Popover target="test-target" is_open />, {
      container: document.body.appendChild(div)
    });

    expect(document.body.querySelector('.popover')).not.toBe(null);
  });

  test('renders nothing if is_open=false', () => {
    render(<Popover target="test-target" is_open={false} />, {
      container: document.body.appendChild(div)
    });

    expect(document.body.querySelector('.popover')).toBe(null);
  });

  test('renders its content', () => {
    render(
      <Popover target="test-target" is_open={true}>
        Popover content
      </Popover>,
      {container: document.body.appendChild(div)}
    );

    expect(document.body.querySelector('.popover')).toHaveTextContent(
      'Popover content'
    );
  });
});
