"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "../../hooks/useRentModal";
import Heading from "../Heading";
import CountrySelect from "../input/CountrySelect";
import Counter from "../input/Counter";
import { categories } from "../navbar/Categories";
import CategoryInput from "../input/CategoryInput";
import ImageUpload from "../input/ImageUpload";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import InputField from "../input/InputField";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  // console.log(category);

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);
    const response = await toast.promise(

      axios.post("/api/listings", data)
        .then(() => {
        //   toast.success("Listing Created.");
          router.refresh();
          reset();
          setStep(STEPS.CATEGORY);
          rentModal.onClose();
        })

        .catch(() => {
        //   toast.error("Something went wrong!");
          // console.log(data);
        })

        .finally(() => {
          setIsLoading(false);
        }),

      {
        pending: "Listing is creating",
        success: "Listing Created",
        error: "Listing created fail",
      }
    );
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "CREATE";
    }
    return "NEXT";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "BACK";
  }, [step]);

  // step-0: Category
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title={"Which of these best describes your places?"}
        subtitle={"Pick a category"}
      />
      <div
        className="
                 grid
                 grid-cols-1
                 md:grid-cols-2
                 gap-3
                 max-h-[50vh]
                 overflow-y-auto
                 px-2
               "
      >
        {categories.map((item) => (
          <div
            key={item.label}
            className="col-span-1 font-semibold text-neutral-600"
          >
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  // step-1: location
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Where is your place located?"}
          subtitle={"Help guests find you.."}
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  // step-2: info
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-10">
        <Heading
          title={"Share some basics about your place"}
          subtitle={"What amenities do you have?"}
        />

        <hr />
        <Counter
          title={"Guests"}
          subtitle={"How many guests do you allow?"}
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />

        <hr />

        <Counter
          title={"Rooms"}
          subtitle={"How many rooms do you have?"}
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />

        <hr />
        <Counter
          title={"Bathrooms"}
          subtitle={"How many bathrooms do you have?"}
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
        <hr />
      </div>
    );
  }

  // step-3: images
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Add a photo of your place"}
          subtitle={"Show guests what your place looks like!"}
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  // step-4: Description
  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"How would you describe your place?"}
          subtitle={"Short and sweet works best!"}
        />
        <InputField
          id="title"
          label={"Title"}
          disable={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <InputField
          id="description"
          label={"Description"}
          disable={isLoading}
          register={register}
          errors={errors}
          required
          className={"h-24"}
        />
      </div>
    );
  }

  // step-5: price
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title={"Now, set your price"}
          subtitle={"How much do you cahrge per night?"}
        />
        <InputField
          id="price"
          label={"Pirce"}
          formatPrice
          type="number"
          disable={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title={"Airbnb your home"}
      body={bodyContent}
    />
  );
};

export default RentModal;
