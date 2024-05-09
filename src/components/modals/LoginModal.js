'use client';

import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import Modal from './Modal';
import Heading from '../Heading';
import InputField from '../input/InputField'
import { toast } from 'react-toastify';
import Button from '../Button';
import useLoginModal from '../../hooks/useLoginModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useRegisterModal from '../../hooks/useRegisterModal';

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
        }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });


    const onSubmit = (data) => {
        setIsLoading(true);
        signIn('credentials', {
         ...data,
         redirect: false,
        })
          .then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
               toast.success("Successfull login.");
               router.refresh();
               loginModal.onClose();
               reset();

            }

            if(callback?.error) {
               toast.error(callback.error);

            }
          })
    }

    const toggle = useCallback(() => {
      loginModal.onClose();
      registerModal.onOpen();
      
    }, [loginModal, registerModal])

    const bodyContent = (
      <div className='flex flex-col gap-4'>
         <Heading 
            title={"Welcome Back"}
            subtitle={"Login to your account !"}
         />
         <InputField 
            id="email"
            label={"Email"}
            type='email'
            disable={isLoading}
            register={register}
            errors={errors}
            required
         />
         <InputField 
            id="password"
            label={"Password"}
            type='password'
            disable={isLoading}
            register={register}
            errors={errors}
            required
         />
      </div>
    );

    const footerContent = (
      <div className='flex flex-col gap-4 mt-5'>
         <hr className='mb-2'/>
         <Button 
            outline
            label={"Continue with Google"}
            icon={FcGoogle}
            onClick={() => signIn('google')}
         />
         <Button 
            outline
            label={"Continue with GitHub"}
            icon={AiFillGithub}
            onClick={() => signIn('github')}
         />
         <div
           className='
              text-neutral-600
              text-center
              mt-4
              font-light
              text-md
              
           '
         >
           <div className='
                   font-semibold
                   flex
                   flex-row
                   justify-center
                   gap-1
           '
           >
              <h4>
                 First time using Airbnb?
              </h4>
              <h4 
                onClick={toggle}
                className='underline text-rose-500 cursor-pointer'
                >
                 Register
              </h4>
           </div>
         </div>
      </div>
    )
    return (
        <Modal 
           disable={isLoading}
           isOpen={loginModal.isOpen}
           title={"Log In"}
           actionLabel={'Continue'}
           onClose={loginModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           body={bodyContent}
           footer={footerContent}
        />

    );
};

export default LoginModal;