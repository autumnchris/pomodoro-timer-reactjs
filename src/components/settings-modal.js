import React from 'react';

const SettingsModal = ({ workValue, breakValue, handleChange, handleSubmit, settingsFormError, showModal }) => {

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <div className="modal-header">Set Custom Timer (in minutes)</div>
        <div className="modal-body">
          <form className="settings-form" onSubmit={(event) => handleSubmit(event, workValue, breakValue)} id="settings-form" noValidate>
            <div className="form-group">
              <label htmlFor="work-value">Work:</label>
              <input type="text" name="workValue" onChange={(event) => handleChange(event)} value={workValue} inputMode="numeric" id="work-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="break-value">Break:</label>
              <input type="text" name="breakValue" onChange={(event) => handleChange(event)} value={breakValue} inputMode="numeric" id="break-value" required />
            </div>
            <div className="button-group">
              <button type="submit" className="button modal-button">Save</button>
              <button type="button" className="button modal-button cancel" onClick={() => showModal(false)}>Cancel</button>
            </div>
          </form>
          {settingsFormError.isError ? <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {settingsFormError.timer} must be a number greater than 0 and less than 61.</p> : null}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
