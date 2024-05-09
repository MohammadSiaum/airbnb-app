'use client';

import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc'
import Modal from './Modal';
import useRegisterModal from '../../hooks/useRegisterModal';
import Heading from '../Heading';
import InputField from '../input/InputField'
import { toast } from 'react-toastify';
import Button from '../Button';
import Link from 'next/link';
import useLoginModal from '../../hooks/useLoginModal';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

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
            name: '',
            email: '',
            password: ''
        }
    });


    const onSubmit = (data) => {
        setIsLoading(true);
        
        axios.post('/api/register', data)
          .then(() => {
            registerModal.onClose();
            toast.success('Register successfully');
            reset();
          })
          .catch((error) => {
            // console.log(error);
            toast.error('Register Fail');
          })
          .finally(() => {
            setIsLoading(false);
          })
    }

    const toggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
      <div className='flex flex-col gap-4'>
         <Heading 
            title={"Welcome to Airbnb"}
            subtitle={"Create an account !"}
         />
         <InputField 
            id="name"
            label={"Name"}
            disable={isLoading}
            register={register}
            errors={errors}
            required
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
                 Already have an account?
              </h4>
              <h4 
                onClick={toggle}
                className='underline text-rose-500 cursor-pointer'
                >
                 Log in
              </h4>
           </div>
         </div>
      </div>
    )
    return (
        <Modal 
           disable={isLoading}
           isOpen={registerModal.isOpen}
           title={"Register"}
           actionLabel={'Continue'}
           onClose={registerModal.onClose}
           onSubmit={handleSubmit(onSubmit)}
           body={bodyContent}
           footer={footerContent}
        />

    );
};

export default RegisterModal;