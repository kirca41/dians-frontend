import React, {useState, useEffect, useRef} from 'react';

import '../styles/Dropdown.css';

const Dropdown = ({ options, selected, onSelectedChange }) => {
    const [open, setOpen] = useState(false);

    const ref = useRef();

    useEffect(() => {
        const onBodyClick = (event) => {
          if (ref.current.contains(event.target)) {
            return;
          }
          setOpen(false);
        };
        document.body.addEventListener("click", onBodyClick, { capture: true });
        return () => {
          document.body.removeEventListener("click", onBodyClick, {
            capture: true,
          });
        };
    }, []);

    const renderedOptions = options.map((option) => {
        if(option.value === selected.value) {
            return null;
        }
        return (
            <div 
                key={option.value}
                onClick={() => onSelectedChange(option)}
                className="dropdown-item"
            >
                {option.label}
            </div>
        );
    });

    return (
        <div ref={ref} className="dropdown">
            <div>
                <div className="dropdown-field" onClick={() => setOpen(!open)}>
                    <div className="dropdown-selected">
                        <span>{selected.label}</span>
                        <i aria-hidden="true" className="chevron down icon"></i>
                    </div>
                    <div className={`${!open ? 'dropdown-hide' : ''}`}>
                        {renderedOptions}             
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;