export const chordsPrompt = (tonality) => {
  return `Dame una progresión armonica de 4 acordes en ${tonality}. Escribe los acordes en cifrado americano y con el siguiente formato: acorde | acorde | acorde | acorde`;
};

export function getValidChordCases() {
  const majorCases = ['major', 'maj', 'M', '7', 'maj7', '∆7'];
  const minorCases = ['minor', 'min', 'm', 'm7', 'min7'];
  const dimCases = ['°', 'dim', 'dim7'];
  const susCases = ['sus4', 'sus2'];
  const sharpCases = [
    '#',
    '#min',
    '#m7',
    '#min7',
    '#minor7',
    '#major7',
    '#maj7',
    '#M7',
    '#7',
    '#dim7',
    '#dim',
    '#°',
  ];
  const flatCases = [
    'b',
    '♭',
    'b7',
    'bm7',
    'bmin7',
    'bminor7',
    'bmaj7',
    'bM7',
    'bdim7',
    'bdim',
    'b°',
  ];

  return [
    ...minorCases,
    ...majorCases,
    ...dimCases,
    ...susCases,
    ...sharpCases,
    ...flatCases,
  ];
}

export function getExecutableCasesObject() {
  const executableMajorCases = {
    maj: '',
    M: '',
    major: '',
    '∆7': 'maj7',
  };

  const executableMinorCases = {
    min: 'm',
    minor: 'm',
    min7: 'm7',
  };

  const executableDimCases = {
    '°': 'dim',
  };

  const executableSharpCases = {
    '#min': '#m',
    '#min7': '#m7',
    '#minor7': '#m7',
    '#major7': '#7',
    '#M7': '#7',
    '#°': '#dim',
  };

  const executableFlatCases = {
    '♭': 'b',
    bmin: 'bm',
    bmin7: 'bm7',
    bminor7: 'bm7',
    bmajor7: 'b7',
    bM7: 'b7',
    'b°': 'bdim',
  };

  return Object.assign(
    {},
    executableMajorCases,
    executableMinorCases,
    executableDimCases,
    executableSharpCases,
    executableFlatCases
  );
}
