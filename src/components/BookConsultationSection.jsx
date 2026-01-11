import React from 'react'
import { FaShieldHalved, FaListCheck } from 'react-icons/fa6';
import { DatePicker } from '@heroui/date-picker';
import { now, getLocalTimeZone, isWeekend, today } from '@internationalized/date';
import { useLocale } from "@react-aria/i18n";

export default function BookConsultationSection() {
  const Today = today(getLocalTimeZone());
  const Now = now(getLocalTimeZone());
  
  const [date, setDate] = React.useState(Now);
  const [email, setEmail] = React.useState("");

  let disabledRanges = [];

  let { locale } = useLocale();
  let isDateUnavailable = (date) => {
    return isWeekend(date, locale) || 
    disabledRanges.some((interval) => date.compare(interval[1]) <= 0);
  }

  return (
    <div className="ConsultationSection">
        <div className="ConsultationContainer lg:px-8">
          <div className="ConsultationGrid lg:max-w-none lg:grid-cols-2">
            <div className="ConsultationContent lg:max-w-lg">
              <h2 className="ConsultationTitle">Book A Free Consultation</h2>
              <p className="ConsultationDescription">Schedule a free consultation to discuss your goals, challenges, and ideas. We'll review your needs, suggest the right approach, and outline clear next steps - no commitment required.</p>
              <form name='Consultations' id='consultations' method='POST' className="ConsultationForm">
                <label htmlFor="email-address" className="ConsultationLabel">Email address</label>
                <div className="ConsultationInputs">
                  <input
                    id="email-address"
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="ConsultationInput sm:text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <DatePicker
                      className="DatePicker"

                      isRequired={true}
                      isReadOnly={false}
                      isDisabled={false}
                      isInvalid={false}
                      hideTimeZone={true}
                      showMonthAndYearPickers={false}

                      label="Reserve Date"
                      firstDayOfWeek='mon'
                      defaultValue={Now.add({days: 1})}
                      minValue={Today}
                      isDateUnavailable={isDateUnavailable}

                      onChange={setDate}
                      errorMessage={(value) => {
                        if (value.isInvalid) {
                          return "Please enter a valid date.";
                        }
                      }}

                      classNames={{
                        base: "DatePickerBase",
                        calendar: "DatePickerCalendar",
                        calendarContent: "DatePickerCalendarContent",
                        selectorButton: "DatePickerSelectorButton",
                        selectorIcon: "DatePickerSelectorIcon",
                        popoverContent: "DatePickerPopoverContent",
                        timeInputLabel: "DatePickerTimeInputLabel",
                        timeInput: "DatePickerTimeInput"
                      }}
                    />
                </div>

                <button
                  type="submit"
                  onSubmit={() => {}}
                  className="ConsultationButton"
                > Let's Talk
                </button>
              </form>
            </div>
            <dl className="ConsultationFeatures sm:grid-cols-2 lg:pt-2">
              <div className="ConsultationFeature">
                <div className="ConsultationIconWrapper">
                  <FaShieldHalved className='ConsultationIcon' />
                </div>
                <dt className="ConsultationFeatureTitle">No Obligation</dt>
                <dd className="ConsultationFeatureDescription">A short, free call to understand your needs and see if we're a good fit - no pressure, no commitment.</dd>
              </div>
              <div className="ConsultationFeature">
                <div className="ConsultationIconWrapper">
                  <FaListCheck className='ConsultationIcon' />
                </div>
                <dt className="ConsultationFeatureTitle">Clear Next Steps</dt>
                <dd className="ConsultationFeatureDescription">You'll leave with practical advice, scope clarity, and a recommended path forward.</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
  )
}
