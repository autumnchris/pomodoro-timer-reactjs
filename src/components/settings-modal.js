import React from 'react';

const SettingsModal = ({ workLength, breakLength, handleChange, handleSubmit, settingsFormError, showModal }) => {

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <div className="modal-header">Set Custom Timer (in minutes)</div>
        <div className="modal-body">
          <form className="settings-form" onSubmit={(event) => handleSubmit(event)}>
            <div className="form-group">
              <label htmlFor="work-length">Work:</label>
              <input type="text" name="workLength" onChange={(event) => handleChange(event)} value={workLength} id="work-length" required />
            </div>
            <div className="form-group">
              <label htmlFor="break-length">Break:</label>
              <input type="text" name="breakLength" onChange={(event) => handleChange(event)} value={breakLength} id="break-length" required />
            </div>
            <div className="button-group">
              <input type="submit" className="button modal-button" value="Save" />
              <input type="button" className="button modal-button cancel" onClick={() => showModal(false)} value="Cancel" />
            </div>
          </form>
          { settingsFormError ? <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> Please enter a number between 1 and 60.</p> : null}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
