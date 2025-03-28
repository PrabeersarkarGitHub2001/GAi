import React, { useState } from "react";

const CustomDropdown = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         country: "",
//     });

//     const handleChange = (event) => {
//         setFormData({ ...formData, [event.target.name]: event.target.value });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log("Submitted Data:", formData);
//     };

//     return (
//         <form onSubmit={handleSubmit} style={{ width: "300px", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
//             <label>
//                 Name:
//                 <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }} />
//             </label>

//             <label>
//                 Country:
//                 <select name="country" value={formData.country} onChange={handleChange} style={{ width: "100%", marginBottom: "10px" }}>
//                     <option value="">Select Country</option>
//                     <option value="USA">USA</option>
//                     <option value="Canada">Canada</option>
//                     <option value="India">India</option>
//                 </select>
//             </label>

//             <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#1976D2", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
//                 Submit
//             </button>
//         </form>
//     );
// };
const [displayNumber, setDisplayNumber] = useState(""); // Shown in input
    const [rawNumber, setRawNumber] = useState(""); // Stored value (only digits)

    const formatPhoneNumber = (value) => {
        // Remove non-numeric characters
        let cleaned = value.replace(/\D/g, "");

        // Store raw number (only digits)
        setRawNumber(cleaned);

        // Apply formatting for display
        if (cleaned.length > 6) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
        } else if (cleaned.length > 3) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}`;
        } else if (cleaned.length > 0) {
            return `(${cleaned.slice(0, 3)}`;
        }
        return cleaned;
    };

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const formattedValue = formatPhoneNumber(inputValue);
        setDisplayNumber(formattedValue);
    };

    return (
        <div>
            <input
                type="text"
                value={displayNumber}
                onChange={handleChange}
                maxLength={14} // Prevents excess input
                placeholder="(123) 456-7890"
            />
            <p>Raw Stored Number: {rawNumber}</p> {/* For demonstration */}
        </div>
    );
};


export default CustomDropdown;
