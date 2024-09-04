// lib/getProgramLabel.js
import  { programOptions }  from './programOptions';

export const getProgramLabel = (value) => {
    const program = programOptions.find(option => option.value === value);
    return program ? program.label : null;
};
