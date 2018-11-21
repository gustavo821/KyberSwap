import React from "react"
import { Modal } from '../CommonElement'
import * as analytics from "../../utils/analytics"

const ImportByPKeyView = (props) => {

  function handldeSubmit() {
    let privateKey = document.getElementById("private_key").value
    props.importPrivateKey(privateKey)
    analytics.trackClickSubmitPrKey()
  }

  function submit(e) {
    if (e.key === 'Enter') {
      handldeSubmit(e)
    }
  }

	function toggleShowPw() {
		let input = document.getElementById('private_key')
		if (input.classList.contains('security')) {
			input.classList.remove('security')
			input.parentElement.classList.add('unlock')
			analytics.trackClickShowPassword("show")
		} else if (input.type == 'text') {
			input.classList.add('security')
			input.parentElement.classList.remove('unlock')
			analytics.trackClickShowPassword("hide")
		}
	}

  return (
    <div>
      <div className="import-account__block" onClick={(e) => props.modalOpen()}>
        <div className="import-account__icon private-key"/>
        <div className="import-account__name">{props.translate("import.from_private_key") || "PRIVATE KEY"}</div>
      </div>

      <Modal
        className={{ base: 'reveal medium', afterOpen: 'reveal medium import-privatekey' }}
        isOpen={props.isOpen}
        onRequestClose={() => props.onRequestClose()}
        content={
          <div>
            <div className="title">{ props.translate("import.from_private_key_input_title") || "ENTER YOUR PRIVATE KEY"}</div><a className="x" onClick={props.onRequestClose}>&times;</a>
            <div className="content with-overlap">
              <div className="row">
                <div className="column">
                  <center>
                    <label className={!!props.pKeyError ? "error" : ""}>
                      <div className="input-reveal">
                        <input className="text-center security" id="private_key"
                               type="text"
                               onChange={(e) => props.onChange(e)}
                               onKeyPress={(e) => submit(e)}
                               value={props.privateKey}
                               autoFocus
                               autoComplete="off"
                               spellCheck="false"
                               onFocus={(e) => {analytics.trackClickInputPrKey()}}
                               required />
                        <p>{props.privateKeyVisible}</p>
                        <a className="toggle" onClick={toggleShowPw}></a>
                        <a className="tootip"></a>
                      </div>
                      {!!props.pKeyError &&
                      <span className="error-text">{props.pKeyError}</span>
                      }
                    </label>
                  </center>
                </div>
              </div>
            </div>
            <div className="overlap">
              <button className="button accent cur-pointer" id="submit_pkey" onClick={() => handldeSubmit()} >{props.translate("modal.import") || "Import"}</button>
            </div>

          </div>
        }
      />
    </div>
  )
}

export default ImportByPKeyView
