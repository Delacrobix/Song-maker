import React, { useEffect, useRef } from 'react';
import Vex from 'vexflow';

const Tab = () => {
  useEffect(() => {
    const { Renderer, TabStave, TabNote, Bend, Vibrato, Formatter } = Vex.Flow;
    // Create an SVG renderer and attach it to the DIV element with id="output".
    const div = document.getElementById('output');
    const renderer = new Renderer(div, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 300);
    const context = renderer.getContext();

    // Create a tab stave of width 400 at position 10, 40 on the canvas.
    const stave = new TabStave(10, 40, 400);
    stave.addClef('tab').setContext(context).draw();

    const notes = [
      // A single note
      new TabNote({
        positions: [{ str: 3, fret: 7 }],
        duration: 'q',
      }),

      // A chord with the note on the 3rd string bent
      new TabNote({
        positions: [
          { str: 2, fret: 10 },
          { str: 3, fret: 9 },
        ],
        duration: 'q',
      }).addModifier(new Bend('Full'), 1),

      // A single note with a harsh vibrato
      new TabNote({
        positions: [{ str: 2, fret: 5 }],
        duration: 'h',
      }).addModifier(new Vibrato().setHarsh(true).setVibratoWidth(70), 0),
    ];

    Formatter.FormatAndDraw(context, stave, notes);
  });
  return <div id='output' className='score-output'></div>;
};

export default Tab;
