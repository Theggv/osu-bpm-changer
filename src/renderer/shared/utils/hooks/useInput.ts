import React from 'react';

export const useInput = (initialValue: string) => {
  const [value, setValue] = React.useState<string>(initialValue);

  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue(event.target.value as string);
  };

  return {
    value,
    setValue,
    bind: {
      value,
      onChange,
    },
  };
};
