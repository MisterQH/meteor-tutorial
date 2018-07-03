// @flow
/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Task from '../Task';

describe('Task', () => {
  let props;
  const component = () => shallow(<Task {...props} />);

  beforeEach(() => {
    props = { task: {} };
  });

  it('shows a private button when showPrivateButton is true', () => {
    props.showPrivateButton = true;
    expect(component().find('.toggle-private').length).to.equal(1);
  });
});
