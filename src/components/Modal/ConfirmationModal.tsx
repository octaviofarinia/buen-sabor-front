import { Base } from '../../API/BaseAPIInterface';
import { Button } from '../Botones/Button';
import { useState } from 'react';
import { notify } from '../Toast/ToastAlert';
interface ConfirmationModal {
  callback: () => void | Promise<void>;
  contentText: string;
  confirmationText: string;
  aditionalInfo?: string | JSX.Element;
  alertText?: string;
}

export const ConfirmationModal = ({
  callback,
  contentText,
  confirmationText,
  aditionalInfo,
  alertText,
}: ConfirmationModal) => {
  const [visible, toggleVisible] = useState<boolean>(false);

  return (
    <div className=" flex w-full">
      <Button
        callback={() => toggleVisible(true)}
        content="Generar nota de credito"
        type="button"
        color="rojo"
        fullsize={true}
      />
      <div
        className={`${
          visible ? 'visible' : 'hidden'
        } fixed inset-0 z-10 overflow-y-auto bg-neutral-400 bg-opacity-75 transition-opacity dark:bg-neutral-700 dark:bg-opacity-75`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={true}
      >
        <div className="flex h-full w-full items-center justify-center px-4 pt-4 pb-20 text-center  ">
          {/*Modal panel : This is where you put the pop-up's content, the div on top this coment is the wrapper */}
          <div
            className="mx-52 flex h-min transform  
          flex-col gap-5 overflow-hidden rounded-lg bg-neutral-100 p-10 text-left align-bottom shadow-2xl transition-all sm:my-8 dark:bg-neutral-900"
          >
            <div className="flex justify-between gap-5">
              <h2 className="w-full flex-grow text-2xl text-neutral-900 dark:text-neutral-100">{contentText}</h2>
              <Button callback={() => toggleVisible(false)} content="x" type="button" />
            </div>
            <div>{aditionalInfo}</div>
            <div className="flex gap-5 overflow-hidden overflow-x-auto rounded-lg px-8 sm:-mx-6 lg:-mx-8 ">
              <Button
                callback={() => {
                  callback();
                  toggleVisible(false);
                  alertText && notify(alertText, 'info');
                }}
                content={confirmationText}
                type="button"
                fullsize={true}
                color="verde"
              />
              <Button
                callback={() => toggleVisible(false)}
                content="No"
                type="button"
                fullsize={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
