import React, { ChangeEvent } from "react";

import { FieldInternalProps } from "../../../packages/types/items";

const Input = (props: FieldInternalProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.target.value);
  };

  return (
    <>
      <input className="form-control" disabled={props.disabled} value={props.value} onChange={onChange} />
      <pre className="text-info">{JSON.stringify(props, null, 2)}</pre>
    </>
  );
};

export default Input;
