import { Slide as SpectacleSlide, Link } from "spectacle";

export const Slide = ({ title, children, ...props }) => {
  return (
    <SpectacleSlide
      title={title}
      speakerNotes={props.speakerNotes}
      {...props}
    >
      {children}
    </SpectacleSlide>
  );
};

export default Slide;