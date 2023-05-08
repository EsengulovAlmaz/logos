import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const Accordion = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="accordion" onClick={() => setOpen(prev => !prev)}>
      <div className="accrodion__wrapper">
        <h2 className="accordion__title">{data.title}</h2>
        {open
          ? <AiOutlineArrowUp />
          : <AiOutlineArrowDown />
        }
      </div>
      {
        open
          ? <p>{data.answer}</p>
          : ""
      }
    </div>
  )
};

export default Accordion;