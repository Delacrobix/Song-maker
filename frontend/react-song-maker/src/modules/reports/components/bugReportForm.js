import React from 'react';

const BugReportForm = () => {
  return (
    <section className='bug-report-form'>
      <div className='description'>
        <h2>BUG REPORT</h2>
        <p>
          Bug reporting is an important process. It is most effective for many
          users to test a game all at once, rather than have one person test it
          over a long period of time in order to find as many software bugs as
          possible. This form will redirect to a page which does not exist.
          Regardless, I recommend using it only for reference (as comical as
          that sounds based on my experience (or lack thereof)) and not actually
          inputting any real information.
        </p>
        <p>
          Use this form to report any bugs you may find. Here is what each of
          the "bug severity" options mean:
        </p>
        <ol>
          <li>
            <div className='minor'>Minor:</div> These are bugs that don't really
            affect the game's playability. Things like missing or broken
            textures would fit into this category.
          </li>
          <li>
            <div className='moderate'>Moderate:</div> The moderate category
            would include bugs that affect the functionality of some of the
            game's less important features. For example, a problem with an
            object the player can pick up would fall under the moderate
            category.
          </li>
          <li>
            <div className='major'>Major:</div> A major bug affects the
            playability of the game's more important feature. A door not opening
            would be an example of a major bug.
          </li>
          <li>
            <div className='game_breaking'>Game-breaking:</div> A game-breaking
            bug is a glitch that makes the game unplayable, either immediately
            after launch or during gameplay. Game crashes (especially persistent
            crashes) or other issues that make the game completely unplayable
            would fall under this category.
          </li>
        </ol>
      </div>
      <div className='submit_form'>
        <form action='' method='post'>
          <p>Your email is required.</p>
          <input
            type='email'
            className='email_input'
            name='email_input'
            placeholder='firstname.lastname@example.com'
            required
          />
          <p>Bug Severity (required):</p>
          <select name='bug_severity' className='bug_severity' required>
            <option value='--Please Select--'>--Please Select--</option>
            <option value='Minor'>Minor</option>
            <option value='Moderate'>Moderate</option>
            <option value='Major'>Major</option>
            <option value='Game-breaking'>Game-breaking</option>
          </select>
          <hr />
          <p>How often does it occur?</p>
          <input type='radio' className='rarely' name='rarely' value='Rarely' />
          <label for='rarely'> Rarely | </label>
          <input
            type='radio'
            className='somewhat_rare radius_input'
            name='somewhat_rare'
            value='Somewhat Rarely'
          />
          <label for='somewhat_rare'>Somewhat Rarely | </label>
          <input
            type='radio'
            className='somewhat_often radius_input'
            name='somewhat_often'
            value='Somewhat Often'
          />
          <label for='somewhat_often'>Somewhat Often | </label>
          <input
            type='radio'
            className='common radius_input'
            name='common'
            value='Commonly'
          />
          <label for='common'>Commonly | </label>
          <input
            type='radio'
            className='very_often radius_input'
            name='very_often'
            value='Very Often'
          />
          <label for='very_often'>Very Commonly </label>
          <hr />
          <p className='over-message'>
            Please input any debug information here:
          </p>
          <input
            type='text'
            name='debug_info'
            className='debug_info'
            placeholder='Ex. Exception at 0x0000000 - memory map'
          />
          <p className='over-message'>
            Any further questions, comments or issues:
          </p>
          <input
            type='text'
            name='details'
            className='details'
            placeholder='Ex. I noticed strange game performance in some areas.'
          />
          <p>
            Once you have confirmed everything in your bug report, hit 'submit'.
            You won't be able to change your bug report later.
          </p>
          <input
            type='submit'
            className='submit'
            name='submit'
            value='Submit'
          />
        </form>
      </div>
    </section>
  );
};

export default BugReportForm;
