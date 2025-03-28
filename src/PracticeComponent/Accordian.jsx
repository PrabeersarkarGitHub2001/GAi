import React, { useState } from "react";

const CustomAccordion = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ border: "1px solid #ccc", marginBottom: "10px", borderRadius: "5px" }}>
            <div
                style={{ padding: "10px", cursor: "pointer", background: "black" }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <strong>{title}</strong> {isOpen ? "▲" : "▼"}
            </div>
            {isOpen && (
                <div style={{ padding: "10px", background: "ash" }}>
                    {content}
                </div>
            )}
        </div>
    );
};

const Accordian = () => {
    return (
        <div>
            <CustomAccordion title="Section 1" content="Content for section 1" />
            <CustomAccordion title="Section 2" content="Content for section 2" />
            <CustomAccordion title="Section 3" content="Content for section 3" />
        </div>
    );
};

export default Accordian;
