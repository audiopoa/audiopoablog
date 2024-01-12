/**
 * @typedef {import("@prismicio/client").Content.ButtonCtaSlice} ButtonCtaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ButtonCtaSlice>} ButtonCtaProps
 * @param {ButtonCtaProps}
 */
const ButtonCta = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for button_cta (variation: {slice.variation}) Slices
    </section>
  );
};

export default ButtonCta;
