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
              <input type="text" name="workValue" onChange={(event) => handleChange(event)} value={workValue} id="work-value" />
            </div>
            <div className="form-group">
              <label htmlFor="break-value">Break:</label>
              <input type="text" name="breakValue" onChange={(event) => handleChange(event)} value={breakValue} id="break-value" />
            </div>
            <div className="button-group">
              <input type="submit" className="button modal-button" value="Save" />
              <input type="button" className="button modal-button cancel" onClick={() => showModal(false)} value="Cancel" />
            </div>
          </form>
          {settingsFormError.isError ? <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> {settingsFormError.timer} must be a number greater than 0 and less than 61.</p> : null}
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
