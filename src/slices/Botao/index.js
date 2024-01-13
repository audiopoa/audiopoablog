/**
 * @typedef {import("@prismicio/client").Content.BotaoSlice} BotaoSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BotaoSlice>} BotaoProps
 * @param {BotaoProps}
 */
const Botao = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for botao (variation: {slice.variation}) Slices
    </section>
  );
};

export default Botao;
