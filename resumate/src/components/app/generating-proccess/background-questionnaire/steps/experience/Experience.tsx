import { useRecoilState } from "recoil";
import { experienceState } from "../../../store/state";
import { useState } from "react";
import {
  ExperiencePeriod,
  ExperiencePeriodTime,
} from "@/types/experience-period";
import { uniqueId } from "lodash";
import { useClickOutside } from "@/hooks/useClickOutside";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/shared/button/Button";
import { TextArea } from "@/components/shared/inputs/textarea/TextArea";
import { TextInput } from "@/components/shared/inputs/text-input/TextInput";
import "./Experience.css";

export const Experience = () => {
  const [experiencePeriods, setExperiencePeriods] =
    useRecoilState<ExperiencePeriod[]>(experienceState);
  const [editedExperiencePeriod, setEditedExperiencePeriod] = useState<
    ExperiencePeriod | undefined
  >();
  const [error, setError] = useState<string>();

  const isEditedExperienceNew = !experiencePeriods.find(
    (period) => period.id === editedExperiencePeriod?.id
  );

  const toDate = (time: ExperiencePeriodTime | null): Date | null => {
    if (time && time.year && time.month) {
      const year = parseInt(time.year, 10);
      const month = parseInt(time.month, 10) - 1;
      if (!isNaN(year) && month >= 0 && month <= 11) {
        return new Date(year, month);
      }
    }
    return null;
  };

  const toExperiencePeriodTime = (date: Date | null): ExperiencePeriodTime => {
    if (date) {
      return {
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
      };
    } else {
      const now = new Date();
      return {
        year: now.getFullYear().toString(),
        month: (now.getMonth() + 1).toString(),
      };
    }
  };

  const removePeriod = (experience: ExperiencePeriod) => {
    const newPeriods = experiencePeriods.filter(
      (currentExperience) => currentExperience.id !== experience.id
    );
    setExperiencePeriods(newPeriods);
  };

  const addPeriod = (period: ExperiencePeriod) => {
    const newPeriods = [...experiencePeriods, period];
    setExperiencePeriods(newPeriods);
  };

  const openAddNewPeriod = () => {
    setEditedExperiencePeriod({
      id: uniqueId("periodid"),
      jobTitle: "",
      city: "",
      description: "",
      employer: "",
      endDate: { year: "", month: "" },
      startDate: { year: "", month: "" },
      isCurrent: false,
    });
  };

  const handleStartDateChange = (date: Date | null) => {
    updateEditedPeriod({
      startDate: toExperiencePeriodTime(date),
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    if (editedExperiencePeriod) {
      updateEditedPeriod({ endDate: toExperiencePeriodTime(date) });
    }
  };

  const updateEditedPeriod = (experiencePart: Partial<ExperiencePeriod>) => {
    if (editedExperiencePeriod) {
      setEditedExperiencePeriod({
        ...editedExperiencePeriod,
        ...experiencePart,
      });
    }
  };

  const closeAddNewPeriod = () => {
    setEditedExperiencePeriod(undefined);
    setError(undefined);
  };

  const ref = useClickOutside(closeAddNewPeriod);

  const handleDoneEditPeriod = () => {
    if (editedExperiencePeriod) {
      const clonedPeriods = [...experiencePeriods];
      const periodIndex = clonedPeriods.findIndex(
        (expPeriod) => expPeriod.id === editedExperiencePeriod.id
      );
      // updating existing period
      if (periodIndex !== -1) {
        clonedPeriods[periodIndex] = { ...editedExperiencePeriod };
        setExperiencePeriods(clonedPeriods);
      } else {
        // creating new period
        addPeriod(editedExperiencePeriod);
      }

      setEditedExperiencePeriod(undefined);
      setError(undefined);
    }
  };

  const renderEditPeriod = () => {
    return (
      editedExperiencePeriod && (
        <div ref={ref} className="flex flex-col gap-[10px]">
          <div
            ref={ref}
            className="flex flex-col items-stretch py-2 px-4 bg-[#dbdbdb] rounded-md gap-[10px]"
          >
            <div className="flex gap-[10px]">
              <TextInput
                autoFocus
                label="Job Title"
                wrapperClassName="flex-1"
                inputClassName="bg-[#c8c8c8] outline-none focus:online-none"
                value={editedExperiencePeriod.jobTitle}
                onChange={(newJobTitle) =>
                  updateEditedPeriod({ jobTitle: newJobTitle })
                }
              />
              <TextInput
                label="Employer"
                wrapperClassName="flex-1"
                inputClassName="bg-[#c8c8c8] outline-none focus:online-none"
                value={editedExperiencePeriod.employer}
                onChange={(newEmployer) =>
                  updateEditedPeriod({ employer: newEmployer })
                }
              />
            </div>
            <div className="flex gap-[10px]">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <DatePicker
                  maxDate={toDate(editedExperiencePeriod.endDate) || undefined}
                  selected={toDate(editedExperiencePeriod.startDate)}
                  onChange={handleStartDateChange}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  wrapperClassName="date_picker"
                  className="bg-[#c8c8c8] outline-none focus:online-none w-full"
                  placeholderText="MM/YYYY"
                  onKeyDown={(e) => e.preventDefault()} // Prevent typing
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <DatePicker
                  minDate={
                    toDate(editedExperiencePeriod.startDate) || undefined
                  }
                  selected={toDate(editedExperiencePeriod.endDate)}
                  onChange={handleEndDateChange}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  wrapperClassName="date_picker"
                  className={
                    editedExperiencePeriod.isCurrent
                      ? "bg-[#c8c8c8] cursor-not-allowed w-full"
                      : "bg-[#c8c8c8] outline-none focus:online-none w-full"
                  }
                  placeholderText="MM/YYYY"
                  onKeyDown={(e) => e.preventDefault()} // Prevent typing
                  disabled={editedExperiencePeriod.isCurrent}
                />
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <input
                type="checkbox"
                checked={editedExperiencePeriod.isCurrent ?? false}
                onChange={(e) =>
                  updateEditedPeriod({
                    isCurrent: e.target.checked,
                    endDate: undefined,
                  })
                }
              />
              <span className="text-sm">I currently work here</span>
            </div>
            <div className="flex gap-[10px]">
              <TextArea
                wrapperClassName="flex-1"
                inputClassName="bg-[#c8c8c8]"
                label="Description"
                value={editedExperiencePeriod.description}
                rows={5}
                onChange={(newDescription) =>
                  updateEditedPeriod({ description: newDescription })
                }
              />
            </div>
            <Button onClick={handleDoneEditPeriod} buttonClassName="mt-auto">
              Done
            </Button>
          </div>
          {error && (
            <div className="text-sm text-[red] text-center">{error}</div>
          )}
        </div>
      )
    );
  };

  const periodRenderer = (expPeriod: ExperiencePeriod) => {
    return editedExperiencePeriod?.id === expPeriod.id ? (
      renderEditPeriod()
    ) : (
      <div
        key={expPeriod.id}
        className="group flex items-center py-2 px-4 bg-[#dbdbdb] hover:bg-[#cacaca] transition-all rounded-md"
      >
        <span className="font-bold text-md mr-[7px]">{expPeriod.jobTitle}</span>
        <span className="text-sm opacity-60">| {expPeriod.employer} </span>
        <span className="text-sm opacity-60 ml-[5px]">
          {expPeriod.startDate?.month && expPeriod.startDate?.year
            ? `${expPeriod.startDate.month}/${expPeriod.startDate.year}`
            : ""}
          {expPeriod.isCurrent
            ? " - Current"
            : expPeriod.endDate?.month && expPeriod.endDate?.year
            ? ` - ${expPeriod.endDate.month}/${expPeriod.endDate.year}`
            : ""}
        </span>
        <div className="flex items-center gap-1 ml-auto opacity-0  group-hover:opacity-100 transition-all">
          <svg
            onClick={() => setEditedExperiencePeriod(expPeriod)}
            className="size-5 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          <svg
            onClick={() => removePeriod(expPeriod)}
            className="size-5 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <section className="personal flex-1 flex flex-col pt-[70px] items-stretch">
      <h2 className="font-bold text-3xl text-center mb-5">
        Let's Talk About
        <br />
        Your Experience
      </h2>
      <main className="flex-1 px-10 flex flex-col gap-2 overflow-y-scroll">
        {experiencePeriods.map(periodRenderer)}
        {isEditedExperienceNew && renderEditPeriod()}
        <Button
          onClick={openAddNewPeriod}
          disabled={!!editedExperiencePeriod || experiencePeriods.length >= 4}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Add New Experience Period
        </Button>
      </main>
    </section>
  );
};
