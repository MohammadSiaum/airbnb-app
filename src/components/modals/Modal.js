"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disable,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disable) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 200);
  }, [disable, onClose]);

  const handleSubmit = useCallback(() => {
    if (disable) {
      return;
    }
    onSubmit();
  }, [disable, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disable || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disable, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="
                  flex
                  justify-center
                  items-center
                  overflow-x-hidden
                  overflow-y-hidden
                  fixed
                  inset-0
                  z-50
                  outline-none
                  focus:outline-none
                  bg-neutral-800/70
               "
      >
        <div
          className="
                     relative
                     w-full
                     md:w-4/5
                     lg:w-3/6
                     xl:w-2/5
                     my-6
                     mx-auto
                     h-full
                     lg:h-auto
                     md:h-auto
                  "
        >
          <div
            className={`
                    translate
                    duration-300
                    h-full
                    ${showModal ? "translate-y-0" : "translate-y-full"}
                    ${showModal ? "opacity-100" : "opacity-0"}
                `}
          >
            {/* CONTAIN */}
            <div
              className="
                    translate
                    h-full
                    lg:h-auto
                    md:h-auto
                    border-0
                    rounded-lg
                    shadow-lg
                    relative
                    flex
                    flex-col
                    w-full
                     bg-white
                    outline-none
                    focus:outline-none
                "
            >
              {/* HEADER */}
              <div
                className="
                      flex
                      items-center
                      p-8
                      rounded-t
                      justify-center
                      relative
                      border-b

                   "
              >
                <button
                  onClick={handleClose}
                  className="
                          p-1
                          border-0
                          hover:opacity-70
                          transition
                          absolute
                          left-9

                       "
                >
                  <IoMdClose size={20} />
                </button>
                <div className="text-xl font-semibold">{title}</div>
              </div>
              {/* BODY */}
              <div className="relative p-8 flex-auto">{body}</div>
              {/* FOOTER */}
              <div className="flex flex-col gap-2 px-8 py-2">
                <div
                   className="
                     flex
                     flex-row
                     items-center
                     gap-4
                     w-full
                   "
                >
                  {secondaryAction && secondaryActionLabel && (    
                    <Button 
                       outline
                       disable={disable}
                       label={secondaryActionLabel}
                       onClick={handleSecondaryAction}
                    />
                    )}
                    <Button 
                       disable={disable}
                       label={actionLabel}
                       onClick={handleSubmit}
                    />
                </div>
                <div className="mb-4">
                  {footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
