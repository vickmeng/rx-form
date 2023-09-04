import React from 'react';
import { render } from '@testing-library/react';
import { GroupControl, ListControl, requiredValidator } from '@rx-form/core';

import { Field, Group, Error, List } from '../index';

describe('nest components', () => {
  it('should render correctly', () => {
    const groupControl = new GroupControl({
      name: ['', { validators: [requiredValidator] }],
      familyMembers: new ListControl([
        new GroupControl({
          name: ['Tom'],
          tel: ['13133333333'],
        }),
      ]),
    });

    const { asFragment } = render(
      <Group control={groupControl}>
        {(props) => (
          <>
            <Field<string> name="name">{({ value }) => <input value={value} readOnly />}</Field>
            <Error name="name">{({ errors }) => <>{errors?.required && '至少填一名家庭成员'}</>}</Error>

            <List name="familyMembers">
              {({ childControls }) => {
                return (
                  <>
                    {childControls.map((control, i) => {
                      return (
                        <Group name={`${i}`} key={`${i}`}>
                          {() => {
                            return (
                              <>
                                <Field<string> name="name">{({ value }) => <input value={value} readOnly />}</Field>
                                <Field<string> name="tel">{({ value }) => <input value={value} readOnly />}</Field>
                              </>
                            );
                          }}
                        </Group>
                      );
                    })}
                  </>
                );
              }}
            </List>
          </>
        )}
      </Group>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
